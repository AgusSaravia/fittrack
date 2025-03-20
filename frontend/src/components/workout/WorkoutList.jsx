import React from "react";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = ({ workouts, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          onEdit={() => onEdit(workout)}
          onDelete={() => onDelete(workout._id)}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
