import React from 'react';
import CreateServiceForm from '../components/CreateServiceForm';

const CreateServicePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create Service Listing</h1>
        <CreateServiceForm />
      </div>
    </div>
  );
};

export default CreateServicePage;
