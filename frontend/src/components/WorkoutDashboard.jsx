import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import HeroSection from "./workout/WorkoutHero";
import WorkoutList from "./workout/WorkoutList";
import LoadingSpinner from "./dashboard/LoadingSpinner";
import ErrorDisplay from "./dashboard/ErrorDisplay";
import WorkoutForm from "./workout/WorkoutForm";
import { AuthContext } from "../context/AuthContext";

const WorkoutDashboard = () => {
  const { token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL
            ? `${import.meta.env.VITE_API_URL}/workouts`
            : "http://localhost:8080/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error loading workouts");
        }

        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchWorkouts();
    } else {
      setLoading(false);
      setError("Authentication token not found. Please login.");
    }
  }, [token]);

  const handleAddWorkout = () => {
    setEditingWorkout(null);
    setShowForm(true);
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/workouts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting workout");
      }
      // Remove deleted workout from state
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSaveWorkout = async (workoutData) => {
    try {
      let response;

      if (editingWorkout) {
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/workouts/${editingWorkout._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(workoutData),
          }
        );
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workoutData),
        });
      }

      if (!response.ok) {
        throw new Error("Error saving the workout");
      }

      const savedWorkout = await response.json();

      if (editingWorkout) {
        setWorkouts(
          workouts.map((w) => (w._id === savedWorkout._id ? savedWorkout : w))
        );
      } else {
        setWorkouts([...workouts, savedWorkout]);
      }

      setShowForm(false);
      setEditingWorkout(null);
    } catch (err) {
      console.error(err);
      alert("Error saving the workout");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="min-h-screen bg-base-200">
      <HeroSection />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <Link to="/workout/new" className="btn btn-primary">
            Add Workout
          </Link>
        </div>

        {workouts.length === 0 ? (
          <div className="text-center p-8 bg-base-100 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">No workouts yet</h3>
            <p className="mb-4">Create your first workout to start training.</p>
            <button className="btn btn-primary" onClick={handleAddWorkout}>
              Create Workout
            </button>
          </div>
        ) : (
          <WorkoutList
            workouts={workouts}
            onEdit={handleEditWorkout}
            onDelete={handleDeleteWorkout}
          />
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90svh]">
            <h2 className="text-2xl font-bold mb-4">
              {editingWorkout ? "Edit Workout" : "New Workout"}
            </h2>
            <Link to="/" className="btn btn-md btn-primary btn-outline">
              back
            </Link>
            <WorkoutForm
              workout={editingWorkout}
              onSave={handleSaveWorkout}
              onCancel={() => {
                setShowForm(false);
                setEditingWorkout(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutDashboard;
