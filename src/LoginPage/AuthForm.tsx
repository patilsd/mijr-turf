// import React from 'react';
// import { Phone, KeyRound } from 'lucide-react';
// import { InputField } from './InputField';

// interface LoginFormData {
//   mobile: string;
//   otp: string;
// }

// interface SignupFormData {
//   firstName: string;
//   lastName: string;
//   mobile: string;
//   otp: string;
//   teamName: string;
// }

// // interface FormData {
// //   firstName: string;
// //   lastName: string;
// //   mobile: string;
// //   otp: string;
// //   teamName: string;
// // }


//   interface AuthFormProps {
//     isLogin: boolean;
//     formData: LoginFormData | SignupFormData;
//     errors: Record<string, string>;
//     otpSent: boolean;
//     onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onSendOTP: () => void;
//     onSubmit: (e: React.FormEvent) => void;
//   }


// export const AuthForm: React.FC<AuthFormProps> = ({
//   isLogin,
//   formData,
//   errors,
//   otpSent,
//   onInputChange,
//   onSendOTP,
//   onSubmit,
// }) => {
//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {!isLogin && (
//         <div className="grid grid-cols-2 gap-4">
//           <InputField
//             label="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={onInputChange}
//             error={errors.firstName}
//           />
//           <InputField
//             label="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={onInputChange}
//             error={errors.lastName}
//           />
//         </div>
//       )}

// <div className="flex items-center space-x-2">
//   <div className="flex-grow">
//   <InputField
//   label="Mobile Number"
//   name="mobile"
//   value={formData.mobile}
//   onChange={onInputChange}
//   error={errors.mobile}
//   type="tel"
//   maxLength={10}
//   Icon={Phone}
//   pattern="[0-9]*"
// />

//   </div>
//   {!otpSent && (
//   <button
//     type="button"
//     onClick={onSendOTP}
//     disabled={!formData.mobile || formData.mobile.length < 10}
//     className={`inline-flex items-center mt-6 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white ${
//       formData.mobile && formData.mobile.length === 10
//         ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//         : 'bg-gray-400 cursor-not-allowed'
//     }`}
//   >
//     Send OTP
//   </button>
// )}

// </div>


//       {otpSent && (
//         <InputField
//           label="OTP"
//           name="otp"
//           value={formData.otp}
//           onChange={onInputChange}
//           error={errors.otp}
//           maxLength={6}
//           Icon={KeyRound}
//         />
//       )}

//       {!isLogin && (
//         <InputField
//           label="Team Name"
//           name="teamName"
//           value={formData.teamName}
//           onChange={onInputChange}
//           error={errors.teamName}
//         />
//       )}

//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//       >
//         {isLogin ? 'Login' : 'Sign Up'}
//       </button>
//     </form>
//   );
// };


