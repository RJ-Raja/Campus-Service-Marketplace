import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext';
import { LoginPayload } from '../api/authAPI';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginPayload) => {
    await login(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
          <AuthForm
            mode="login"
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

export default LoginPage;
