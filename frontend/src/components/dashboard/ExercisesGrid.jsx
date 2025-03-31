import React from "react";
import ExerciseCard from "./ExerciseCard";

const ExercisesGrid = ({ exercises }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id || exercise._id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExercisesGrid;
