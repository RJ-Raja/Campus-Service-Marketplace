import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Campus Service Marketplace
          </h1>
          <p className="text-lg text-gray-600">
            Your marketplace for campus services
          </p>
        </header>

        {/* Navigation */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Home
            </Link>
            <Link
              to="/api-test"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              API Test
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Dashboard
            </Link>
          </div>
        </nav>

        {/* Welcome Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Our Platform
          </h2>
          <p className="text-gray-600 mb-4">
            This is your starting point for a professional campus marketplace
            application. The backend and frontend are now connected and ready
            for development.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Login or register to access a protected
              Dashboard and test auth flows.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
