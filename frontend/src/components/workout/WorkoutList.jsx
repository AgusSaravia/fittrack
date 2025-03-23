import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

const WorkoutList = ({ workouts }) => {
  const { deleteWorkout } = useContext(WorkoutContext);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{new Date(workout.date).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/workout/${workout._id}`}
                  className="btn btn-xs btn-primary mr-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteWorkout(workout._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;
