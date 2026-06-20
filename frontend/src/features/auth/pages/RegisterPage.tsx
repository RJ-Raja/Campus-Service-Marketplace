import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterPayload } from '../api/authAPI';
import AuthForm from '../components/AuthForm';

const RegisterPage: React.FC = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    defaultValues: {
      email: '',
      password: '',
      role: 'Service Buyer',
    },
  });

  const onSubmit = async (values: RegisterPayload) => {
    await registerUser(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Register</h1>
          <AuthForm
            mode="register"
            registerFn={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
