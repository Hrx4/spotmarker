import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Signin: React.FC = () => {
  const handleSignin = (formData: { email: string; password: string }) => {
    console.log('Signin Data:', formData);
    axios.post(`${import.meta.env.VITE_URL}user/login`, {
        ...formData
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm onSubmit={handleSignin} />
    </div>
  );
};

export default Signin;
