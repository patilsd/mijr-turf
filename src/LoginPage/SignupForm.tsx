// // import React from 'react';
// // import { Phone, KeyRound } from 'lucide-react';
// // import { InputField } from './InputField';

// // interface SignupFormProps {
// //   formData: { firstName: string; lastName: string; mobile: string; otp: string; teamName: string };
// //   errors: Record<string, string>;
// //   otpSent: boolean;
// //   onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   onSendOTP: () => void;
// //   onSubmit: (e: React.FormEvent) => void;
// // }

// // export const SignupForm: React.FC<SignupFormProps> = ({
// //   formData,
// //   errors,
// //   otpSent,
// //   onInputChange,
// //   onSendOTP,
// //   onSubmit,
// // }) => {
// //   return (
// //     <form onSubmit={onSubmit} className="space-y-4">
// //       {/* First & Last Name Fields */}
// //       <div className="grid grid-cols-2 gap-4">
// //         <InputField
// //           label="First Name"
// //           name="firstName"
// //           value={formData.firstName}
// //           onChange={onInputChange}
// //           error={errors.firstName}
// //         />
// //         <InputField
// //           label="Last Name"
// //           name="lastName"
// //           value={formData.lastName}
// //           onChange={onInputChange}
// //           error={errors.lastName}
// //         />
// //       </div>

// //       {/* Mobile Number Field */}
// //       <div className="flex items-center space-x-2">
// //         <div className="flex-grow">
// //           <InputField
// //             label="Mobile Number"
// //             name="mobile"
// //             value={formData.mobile}
// //             onChange={onInputChange}
// //             error={errors.mobile}
// //             type="tel"
// //             maxLength={10}
// //             Icon={Phone}
// //             pattern="[0-9]*"
// //           />
// //         </div>
// //         {/* Send OTP Button */}
// //         {!otpSent && (
// //           <button
// //             type="button"
// //             onClick={onSendOTP}
// //             disabled={!formData.mobile || formData.mobile.length < 10}
// //             className={`inline-flex items-center mt-6 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white ${
// //               formData.mobile.length === 10
// //                 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
// //                 : 'bg-gray-400 cursor-not-allowed'
// //             }`}
// //           >
// //             Send OTP
// //           </button>
// //         )}
// //       </div>

// //       {/* OTP Field */}
// //       {otpSent && (
// //         <InputField
// //           label="OTP"
// //           name="otp"
// //           value={formData.otp}
// //           onChange={onInputChange}
// //           error={errors.otp}
// //           maxLength={6}
// //           Icon={KeyRound}
// //         />
// //       )}

// //       {/* Team Name Field */}
// //       <InputField
// //         label="Team Name"
// //         name="teamName"
// //         value={formData.teamName}
// //         onChange={onInputChange}
// //         error={errors.teamName}
// //       />

// //       {/* Submit Button */}
// //       <button
// //         type="submit"
// //         className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
// //       >
// //         Sign Up
// //       </button>
// //     </form>
// //   );
// // };


// import React, { useState, useEffect } from 'react';
// import { Phone, KeyRound } from 'lucide-react';
// import { InputField } from './InputField';

// interface SignupFormProps {
//   formData: { firstName: string; lastName: string; mobile: string; otp: string; teamName: string };
//   errors: Record<string, string>;
//   otpSent: boolean;
//   onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSendOTP: (mobile: string) => void;
//   onSubmit: (e: React.FormEvent) => void;
// }

// export const SignupForm: React.FC<SignupFormProps> = ({
//   formData,
//   errors,
//   otpSent,
//   onInputChange,
//   onSendOTP,
//   onSubmit,
// }) => {
//   const [timer, setTimer] = useState(30); // Countdown timer
//   const [isResendAllowed, setIsResendAllowed] = useState(false); // Controls Resend button visibility
//   const [timerDisplayed, setTimerDisplayed] = useState(true); // Show timer only once

//   // Handle the countdown timer
//   useEffect(() => {
//     let countdown: NodeJS.Timeout;

//     if (otpSent && timer > 0 && timerDisplayed) {
//       countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setIsResendAllowed(true); 
//       setTimerDisplayed(false); 
//     }

//     return () => clearInterval(countdown); 
//   }, [otpSent, timer, timerDisplayed]);

//   const handleSendOTP = () => {
//     onSendOTP(formData.mobile); 
//     setTimer(30); 
//     setIsResendAllowed(false); 
//     setTimerDisplayed(true); 
//   };

//   const handleResendOTP = () => {
//     onSendOTP(formData.mobile); 
//     setIsResendAllowed(true); 
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {/* First & Last Name Fields */}
//       <div className="grid grid-cols-2 gap-4">
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={onInputChange}
//           error={errors.firstName}
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={onInputChange}
//           error={errors.lastName}
//         />
//       </div>

//       {/* Mobile Number Field */}
//       <div className="flex items-center space-x-2">
//         <div className="flex-grow">
//           <InputField
//             label="Mobile Number"
//             name="mobile"
//             value={formData.mobile}
//             onChange={onInputChange}
//             error={errors.mobile}
//             type="tel"
//             maxLength={10}
//             Icon={Phone}
//             pattern="[0-9]*"
//           />
//         </div>
//         {/* Send OTP Button */}
//         {!otpSent && (
//           <button
//             type="button"
//             onClick={handleSendOTP}
//             disabled={!formData.mobile || formData.mobile.length < 10}
//             className={`inline-flex items-center mt-6 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white ${
//               formData.mobile.length === 10
//                 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//                 : 'bg-gray-400 cursor-not-allowed'
//             }`}
//           >
//             Send OTP
//           </button>
//         )}
//       </div>

//       {/* OTP Field */}
//       {otpSent && (
//         <div className="space-y-2">
//           {/* OTP Input */}
//           <InputField
//             label="OTP"
//             name="otp"
//             value={formData.otp}
//             onChange={onInputChange}
//             error={errors.otp}
//             maxLength={6}
//             Icon={KeyRound}
//           />

//           {/* Timer or Resend OTP Button */}
//           <div className="flex justify-end">
//             {timerDisplayed && timer > 0 ? (
//               <span className="text-sm text-gray-700">Resend OTP in {timer} sec</span>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleResendOTP}
//                 className="text-sm font-medium text-blue-600 hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Team Name Field */}
//       <InputField
//         label="Team Name"
//         name="teamName"
//         value={formData.teamName}
//         onChange={onInputChange}
//         error={errors.teamName}
//       />

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Phone, KeyRound } from 'lucide-react';
import { InputField } from './InputField';

interface SignupFormProps {
  formData: { firstName: string; lastName: string; mobile: string; otp: string; teamName: string };
  errors: Record<string, string>;
  otpSent: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOTP: (mobile: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
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
      setIsResendAllowed(true); // Enable Resend OTP button once timer reaches 0
      setTimerDisplayed(false); // Disable timer display after it ends
    }

    return () => clearInterval(countdown); // Clear interval on component unmount
  }, [otpSent, timer, timerDisplayed]);

  const handleSendOTP = () => {
    onSendOTP(formData.mobile); // Send OTP
    setTimer(30); // Reset timer to 30 seconds
    setIsResendAllowed(false); // Disable Resend button until timer ends
    setTimerDisplayed(true); // Allow timer display for the first OTP
  };

  const handleResendOTP = () => {
    onSendOTP(formData.mobile); // Resend OTP
    setIsResendAllowed(true); // Resend button remains visible
    setTimerDisplayed(false); // Do not display timer again
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* First & Last Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onInputChange}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onInputChange}
          error={errors.lastName}
        />
      </div>

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
              <span className="text-sm text-gray-600">{timer} sec</span>
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

      {/* Team Name Field */}
      <InputField
        label="Team Name"
        name="teamName"
        value={formData.teamName}
        onChange={onInputChange}
        error={errors.teamName}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
};
