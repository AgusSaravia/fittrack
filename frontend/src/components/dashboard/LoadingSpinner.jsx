import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-600">Loading Exercises...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
