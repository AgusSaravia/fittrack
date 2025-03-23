import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../context/WorkoutContext";

const RecentWorkoutsTable = ({ workouts, limit = 5 }) => {
  const { deleteWorkout } = useContext(WorkoutContext);

  if (!workouts || workouts.length === 0) {
    return <p className="text-center py-4">No recent workouts.</p>;
  }

  const recentWorkouts = workouts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden mt-6">
      <div className="text-primary-content p-4">
        <h2 className="text-xl font-bold">Recent Workouts</h2>
      </div>

      <div className="divide-y divide-base-200">
        {recentWorkouts.map((workout) => (
          <div
            key={workout._id}
            className="p-4 hover:bg-base-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{workout.name}</h3>
              <div className="flex space-x-2">
                <Link
                  to={`/workout/${workout._id}`}
                  className="btn btn-xs btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteWorkout(workout._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Date:</span>{" "}
              {new Date(workout.date).toLocaleDateString()}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Exercises:</p>
              <div className="flex flex-wrap gap-1">
                {workout.exercises.slice(0, 5).map((exercise, index) => (
                  <span
                    key={index}
                    className="inline-block bg-base-200 text-xs px-2 py-1 rounded"
                  >
                    {exercise.name}
                  </span>
                ))}
                {workout.exercises.length > 5 && (
                  <span className="inline-block bg-base-200 text-xs px-2 py-1 rounded">
                    +{workout.exercises.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {workouts.length > limit && (
        <div className="p-3 bg-base-200 text-center">
          <Link to="/workouts" className="text-sm font-medium text-primary">
            View all workouts
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentWorkoutsTable;
