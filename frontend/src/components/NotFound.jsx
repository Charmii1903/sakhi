import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-beige-100 text-center px-4">
      {/* 404 Number */}
      <h1 className="text-9xl font-extrabold text-orange-400 mb-4 transition-transform transform hover:scale-105">404</h1>
      
      {/* Oops Message */}
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Oops! Page not found.
      </p>
      <p className="text-lg md:text-xl text-gray-600 mb-6">
        It looks like the page you're looking for doesn't exist or has been moved.
      </p>

      {/* Decorative Illustration */}
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-8 shadow-lg transition-transform transform hover:scale-105">
        <span className="text-orange-400 text-7xl">🔍</span>
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-orange-400 text-white font-medium rounded-lg shadow-lg hover:bg-orange-500 focus:ring-2
         focus:ring-orange-300 focus:outline-none transition-transform transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
