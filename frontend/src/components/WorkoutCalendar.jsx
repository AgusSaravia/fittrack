import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkoutForm from "./workout/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";

const WorkoutCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const { workouts, deleteWorkout } = useContext(WorkoutContext);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    const filteredWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date).toLocaleDateString();
      const selectedDateString = selectedDate.toLocaleDateString();
      return workoutDate === selectedDateString;
    });
    setSelectedWorkouts(filteredWorkouts);
  }, [selectedDate, workouts]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowWorkoutForm(false);
    setEditingWorkout(null);
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setSelectedDate(new Date(workout.date));
    setShowWorkoutForm(true);
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleCreateNew = () => {
    setEditingWorkout(null);
    setShowWorkoutForm(true);
  };

  const handleWorkoutComplete = () => {
    setShowWorkoutForm(false);
    setEditingWorkout(null);
  };

  const highlightDates = workouts.map((workout) => new Date(workout.date));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Create Workout for a Specific Date
      </h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        highlightDates={highlightDates}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          Workouts for {selectedDate.toLocaleDateString()}
        </h3>
        {selectedWorkouts.length > 0 ? (
          <ul>
            {selectedWorkouts.map((workout) => (
              <li
                key={workout._id}
                className="flex items-center justify-between py-2 border-b"
              >
                <span>{workout.name}</span>
                <div>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEditWorkout(workout)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteWorkout(workout._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts for this date.</p>
        )}
        <button
          className="btn btn-sm btn-success mt-2"
          onClick={handleCreateNew}
        >
          Create New Workout
        </button>
      </div>

      {showWorkoutForm && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            {editingWorkout ? "Edit Workout" : "Create Workout"} for{" "}
            {selectedDate.toLocaleDateString()}
          </h3>
          <div className="flex justify-end mb-2">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setShowWorkoutForm(false)}
            >
              Cancel
            </button>
          </div>
          <WorkoutForm
            selectedDate={selectedDate}
            workout={editingWorkout}
            onComplete={handleWorkoutComplete}
          />
        </div>
      )}
    </div>
  );
};

export default WorkoutCalendar;
