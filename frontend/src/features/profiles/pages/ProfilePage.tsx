import React from 'react';
import ProfileForm from '../components/ProfileForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Complete Your Provider Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
