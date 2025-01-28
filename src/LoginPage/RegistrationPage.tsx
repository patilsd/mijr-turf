
import React, { useState, useEffect } from 'react';
import { BackgroundSlider } from './BackgroundSlider';
import { Header } from './Header';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  'https://wallpapers.com/images/hd/cricket-ground-background-a2rr2mi4xx5wedcl.jpg',
  'https://www.shutterstock.com/image-vector/illustration-batsman-playing-cricket-action-600nw-2250080231.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCptt2jNwMf2doQ7wRy9HvWMdJI40TX2HREQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkwArqJXeJPSXE6HMvmODFUZ0mQc-SDXZJlA&s'
];

function RegistrationPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(true);

  // Separate state for login and signup forms
  const [loginFormData, setLoginFormData] = useState({ mobile: '', otp: '' });
  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    otp: '',
    teamName: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle input change dynamically for login and signup
  const handleInputChange = (formType: 'login' | 'signup') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow only numbers for mobile and otp fields
    if ((name === 'mobile' || name === 'otp') && !/^\d*$/.test(value)) {
      setErrors(prev => ({ ...prev, [name]: 'Enter a valid number' }));
      return;
    }

    if (formType === 'login') {
      setLoginFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error message when valid input is entered
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSendOTP = (formType: 'login' | 'signup') => {
    const mobile = formType === 'login' ? loginFormData.mobile : signupFormData.mobile;

    if (!mobile) {
      setErrors(prev => ({ ...prev, mobile: 'Mobile number is required' }));
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setErrors(prev => ({ ...prev, mobile: 'Please enter a valid 10-digit mobile number' }));
      return;
    }
    setOtpSent(true);
    alert('OTP sent to your Mobile Number');
  };

  const handleSubmit = (formType: 'login' | 'signup') => (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    const formData = formType === 'login' ? loginFormData : signupFormData;

    if (formType === 'signup') {
      if (!signupFormData.firstName) newErrors.firstName = 'First name is required';
      if (!signupFormData.lastName) newErrors.lastName = 'Last name is required';
      if (!signupFormData.teamName) newErrors.teamName = 'Team name is required';
    }
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (otpSent && !formData.otp) newErrors.otp = 'OTP is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    navigate('/dashboard');
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900">
      <BackgroundSlider
        images={backgroundImages}
        currentIndex={currentImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />

      <div className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
        <Header isLogin={isLogin} onToggleForm={setIsLogin} />

        {/* Render separate forms */}
        {isLogin ? (
          <LoginForm
            formData={loginFormData}
            errors={errors}
            otpSent={otpSent}
            onInputChange={handleInputChange('login')}
            onSendOTP={() => handleSendOTP('login')}
            onSubmit={handleSubmit('login')}
          />
        ) : (
          <SignupForm
            formData={signupFormData}
            errors={errors}
            otpSent={otpSent}
            onInputChange={handleInputChange('signup')}
            onSendOTP={() => handleSendOTP('signup')}
            onSubmit={handleSubmit('signup')}
          />
        )}
      </div>
    </div>
  );
}

export default RegistrationPage;
