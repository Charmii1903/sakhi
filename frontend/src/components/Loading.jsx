import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning Loader */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
        {/* Loading Text */}
        <p className="text-lg font-semibold text-orange-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;



