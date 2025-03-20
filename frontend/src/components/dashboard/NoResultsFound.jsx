import React from "react";

const NoResultsFound = ({ resetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-semibold">No exercises found</h3>
      <p className="text-gray-500 mt-2">Try different search criteria</p>
      <button className="btn btn-primary mt-4" onClick={resetFilters}>
        Show all exercises
      </button>
    </div>
  );
};

export default NoResultsFound;
