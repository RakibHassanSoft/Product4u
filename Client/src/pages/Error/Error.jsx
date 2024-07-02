import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold animate-pulse mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none transform hover:scale-105 transition-transform"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-white text-purple-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none transform hover:scale-105 transition-transform"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
