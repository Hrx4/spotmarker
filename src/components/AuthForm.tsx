import React, { useState } from 'react';

type AuthFormProps = {
  isSignup?: boolean;
  onSubmit: (formData: { email: string; password: string; name?: string }) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '', name: '' };

    if (isSignup && !formData.name.trim()) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address.';
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }
    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password, name } = formData;
      onSubmit({ email, password, name });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
      {isSignup && (
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      {isSignup && (
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSignup ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
