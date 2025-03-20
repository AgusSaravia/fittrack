import React from "react";

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{workout.name}</h2>

        <div className="my-2">
          <div className="badge badge-primary">
            {workout.exercises.length} exercises
          </div>
        </div>

        <ul className="text-sm list-disc list-inside mb-4">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index}>{exercise.name}</li>
          ))}
          {workout.exercises.length > 3 && (
            <li className="text-gray-500">
              +{workout.exercises.length - 3} more...
            </li>
          )}
        </ul>

        <p className="text-xs text-gray-500 mb-4">
          Created: {new Date(workout.createdAt).toLocaleDateString()}
        </p>

        <div className="card-actions justify-end">
          <button onClick={onEdit} className="btn btn-sm btn-outline">
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn btn-sm btn-error btn-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
