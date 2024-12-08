import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Signup: React.FC = () => {
  const handleSignup = (formData: { email: string; password: string; name?: string }) => {
    console.log('Signup Data:', {...formData});
    axios.post(`${import.meta.env.VITE_URL}user`, {
        ...formData
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm isSignup onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
