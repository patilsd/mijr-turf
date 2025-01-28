import React from 'react';
import { Ticket as Cricket } from 'lucide-react';

interface HeaderProps {
  isLogin: boolean;
  onToggleForm: (isLogin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isLogin, onToggleForm }) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <Cricket className="w-8 h-18 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-0 text-center">Mumbai Indians</h2>
      <h3 className="text-xl text-gray-600 mb-6 text-center">Junior Turf Cricket</h3>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => onToggleForm(true)}
          className={`px-4 py-2 rounded-md transition-colors ${
            isLogin
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => onToggleForm(false)}
          className={`px-4 py-2 rounded-md transition-colors ${
            !isLogin
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};