import React from "react";
import ExerciseListItem from "./ExerciseListItem";

const ExercisesList = ({ exercises, isLoading, error }) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md my-4 text-red-700 border border-red-200">
        <p className="font-medium">Failed to load exercises</p>
        <p className="text-sm">{error.message || "Please try again later"}</p>
      </div>
    );
  }

  // Handle empty state
  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center my-4">
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No exercises found
        </h3>
        <p className="text-gray-500">
          Start by adding a new exercise to your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 pb-8">
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={exercise.id || exercise._id || index}
            exercise={exercise}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesList;
