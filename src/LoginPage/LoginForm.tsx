
import React, { useState, useEffect } from 'react';
import { Phone, KeyRound } from 'lucide-react';
import { InputField } from './InputField';

interface LoginFormProps {
  formData: { mobile: string; otp: string };
  errors: Record<string, string>;
  otpSent: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOTP: (mobile: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  otpSent,
  onInputChange,
  onSendOTP,
  onSubmit,
}) => {
  const [timer, setTimer] = useState(30); // Countdown timer
  const [isResendAllowed, setIsResendAllowed] = useState(false); // Controls Resend button visibility
  const [timerDisplayed, setTimerDisplayed] = useState(true); // Show timer only once

  // Handle the countdown timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (otpSent && timer > 0 && timerDisplayed) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendAllowed(true); 
      setTimerDisplayed(false);
    }

    return () => clearInterval(countdown); 
  }, [otpSent, timer, timerDisplayed]);

  const handleSendOTP = () => {
    onSendOTP(formData.mobile); 
    setTimer(30); 
    setIsResendAllowed(false); 
    setTimerDisplayed(true); 
  };

  const handleResendOTP = () => {
    onSendOTP(formData.mobile); 
    setIsResendAllowed(true); 
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Mobile Number Field */}
      <div className="flex items-center space-x-2">
        <div className="flex-grow">
          <InputField
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={onInputChange}
            error={errors.mobile}
            type="tel"
            maxLength={10}
            Icon={Phone}
            pattern="[0-9]*"
          />
        </div>
        {/* Send OTP Button */}
        {!otpSent && (
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={!formData.mobile || formData.mobile.length < 10}
            className={`inline-flex items-center mt-6 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white ${
              formData.mobile.length === 10
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Send OTP
          </button>
        )}
      </div>

      {/* OTP Field */}
      {otpSent && (
        <div className="space-y-2">
          {/* OTP Input */}
          <InputField
            label="OTP"
            name="otp"
            value={formData.otp}
            onChange={onInputChange}
            error={errors.otp}
            maxLength={6}
            Icon={KeyRound}
          />

          {/* Timer or Resend OTP Button */}
          <div className="flex justify-end">
            {timerDisplayed && timer > 0 ? (
              <span className="text-sm text-gray-700">Resend OTP in {timer} sec</span>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
      >
        Login
      </button>
    </form>
  );
};
