import React from "react";
import ExerciseListItem from "./ExerciseListItem";

const ExercisesList = ({ exercises }) => {
  return (
    <div className="flex flex-col gap-3 pb-8">
      {exercises.map((exercise) => (
        <ExerciseListItem key={exercise._id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExercisesList;
