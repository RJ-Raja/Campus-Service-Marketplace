import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginPayload, RegisterPayload } from '../api/authAPI';

interface AuthFormProps {
  mode: 'login' | 'register';
  registerFn: UseFormRegister<RegisterPayload | LoginPayload>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<RegisterPayload | LoginPayload>;
  isSubmitting: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, registerFn, onSubmit, errors, isSubmitting }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...registerFn('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...registerFn('password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...registerFn('role')}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="Service Buyer">Service Buyer</option>
            <option value="Service Provider">Service Provider</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
