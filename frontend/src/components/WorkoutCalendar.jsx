import React, { useState, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import WorkoutForm from "./workout/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const CustomDayButton = ({ day, modifiers, ...buttonProps }) => (
  <button {...buttonProps}>
    {day.date.getDate()}
    {modifiers.hasWorkout && (
      <span
        className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
          modifiers.selected ? "bg-primary-content" : "bg-primary"
        }`}
      />
    )}
  </button>
);

const WorkoutCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const { workouts, deleteWorkout } = useContext(WorkoutContext);

  const workoutDates = workouts.map((w) => new Date(w.date));

  const selectedWorkouts = workouts.filter((w) =>
    isSameDay(new Date(w.date), selectedDate)
  );

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setShowWorkoutForm(false);
    setEditingWorkout(null);
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setSelectedDate(new Date(workout.date));
    setShowWorkoutForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await deleteWorkout(id);
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  const handleFormComplete = () => {
    setShowWorkoutForm(false);
    setEditingWorkout(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 min-h-screen bg-base-200">
      {/* ── Calendar panel ─────────────────────────────── */}
      <div className="bg-base-100 rounded-2xl shadow-md p-5 lg:w-80 flex-shrink-0 self-start">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          modifiers={{ hasWorkout: workoutDates }}
          classNames={{
            root: "w-full",
            months: "flex flex-col",
            month_caption:
              "flex justify-center items-center relative h-10 mb-2",
            caption_label: "text-base font-semibold",
            nav: "absolute inset-x-0 top-0 h-10 flex items-center justify-between pointer-events-none",
            button_previous:
              "btn btn-ghost btn-sm btn-circle pointer-events-auto",
            button_next:
              "btn btn-ghost btn-sm btn-circle pointer-events-auto",
            month_grid: "w-full border-collapse",
            weekdays: "flex",
            weekday:
              "w-10 h-8 flex items-center justify-center text-xs text-base-content/50 font-medium",
            week: "flex mt-1",
            day: "relative w-10 h-10 flex items-center justify-center p-0",
            day_button:
              "relative w-10 h-10 rounded-full text-sm font-medium hover:bg-base-200 transition-colors flex items-center justify-center",
            selected:
              "!bg-primary !text-primary-content hover:!bg-primary/90",
            today: "font-bold text-primary",
            outside: "text-base-content/30",
            disabled: "text-base-content/20 cursor-not-allowed",
            hidden: "invisible",
          }}
          components={{ DayButton: CustomDayButton }}
        />

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-base-200 flex items-center gap-2 text-xs text-base-content/50">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          Days with workouts
        </div>
      </div>

      {/* ── Detail panel ───────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {showWorkoutForm ? (
          <div className="bg-base-100 rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">
                {editingWorkout ? "Edit Workout" : "New Workout"}
                <span className="ml-2 text-base-content/50 font-normal text-sm">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowWorkoutForm(false)}
              >
                Cancel
              </button>
            </div>
            <WorkoutForm
              selectedDate={selectedDate}
              workout={editingWorkout}
              onComplete={handleFormComplete}
            />
          </div>
        ) : (
          <div className="bg-base-100 rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <p className="text-sm text-base-content/50 mt-0.5">
                  {selectedWorkouts.length === 0
                    ? "No workouts"
                    : `${selectedWorkouts.length} workout${selectedWorkouts.length > 1 ? "s" : ""}`}
                </p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowWorkoutForm(true)}>
                + New Workout
              </button>
            </div>

            {selectedWorkouts.length > 0 ? (
              <div className="space-y-3">
                {selectedWorkouts.map((workout) => (
                  <div
                    key={workout._id}
                    className="bg-base-200 rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{workout.name}</p>
                      <p className="text-sm text-base-content/50 mt-0.5">
                        {workout.exercises.length} exercise
                        {workout.exercises.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {workout.exercises.slice(0, 4).map((ex, i) => (
                          <span
                            key={i}
                            className="badge badge-ghost badge-sm text-xs"
                          >
                            {ex.name}
                          </span>
                        ))}
                        {workout.exercises.length > 4 && (
                          <span className="badge badge-ghost badge-sm text-xs">
                            +{workout.exercises.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleEdit(workout)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-error"
                        onClick={() => handleDelete(workout._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-base-content/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mb-3 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-medium text-base">No workouts on this day</p>
                <p className="text-sm mt-1">
                  Click <span className="font-semibold">+ New Workout</span> to add one
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCalendar;
