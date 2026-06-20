import React, { useState, useEffect } from 'react';
import { healthCheckAPI } from '../api/healthAPI';

interface HealthData {
  timestamp: string;
  uptime: number;
  environment: string;
}

interface ConnectionData {
  database: string;
  redis: string;
  cloudinary: string;
  timestamp: string;
}

const APITest: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(null);

  const testHealthCheck = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await healthCheckAPI.getHealth();
      if (response.data) {
        setHealthData(response.data);
      }
    } catch (err) {
      setError(
        `Health check failed: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await healthCheckAPI.testConnection();
      if (response.data) {
        setConnectionData(response.data);
      }
    } catch (err) {
      setError(
        `Connection test failed: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-test on component mount
  useEffect(() => {
    testHealthCheck();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            API Testing Hub
          </h1>
          <p className="text-lg text-gray-600">
            Test your backend connections
          </p>
        </header>

        {/* Navigation */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-8">
          <a
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Home
          </a>
        </nav>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-8">
            <p className="text-red-700 font-semibold">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Test Buttons */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Test Endpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testHealthCheck}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold"
            >
              {loading ? 'Testing...' : 'Health Check'}
            </button>
            <button
              onClick={testConnection}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-semibold"
            >
              {loading ? 'Testing...' : 'Test All Connections'}
            </button>
          </div>
        </section>

        {/* Health Check Response */}
        {healthData && (
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ✅ Health Check Response
            </h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          </section>
        )}

        {/* Connection Test Response */}
        {connectionData && (
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ✅ Connection Test Response
            </h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(connectionData, null, 2)}
              </pre>
            </div>
          </section>
        )}

        {/* Instructions */}
        <section className="bg-blue-50 rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📋 Instructions
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">1.</span>
              <span>
                Click "Health Check" to verify that the backend server is
                running.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">2.</span>
              <span>
                Click "Test All Connections" to verify MongoDB, Redis, and
                Cloudinary connections.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">3.</span>
              <span>
                Make sure your backend is running with{' '}
                <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                  npm run dev
                </code>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">4.</span>
              <span>
                Ensure all environment variables are configured correctly in
                the backend <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env</code> file.
              </span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default APITest;
