import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import APITest from './pages/APITest.tsx';
import LoginPage from './features/auth/pages/LoginPage.tsx';
import RegisterPage from './features/auth/pages/RegisterPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from './features/auth/components/ProtectedRoute.tsx';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/api-test" element={<APITest />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Fallback for browsers without React Router
// Comment out the Router above and uncomment below if you don't want React Router
/*
function SimpleApp() {
  const [page, setPage] = React.useState<'home' | 'test'>('home');

  return (
    <>
      {page === 'home' ? (
        <App />
      ) : (
        <APITest />
      )}
    </>
  );
}
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
