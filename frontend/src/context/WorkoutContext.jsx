import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const WorkoutContext = createContext();

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api"
    : import.meta.env.VITE_API_URL;

const WorkoutProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    if (token) {
      fetchWorkouts(controller.signal);
    }
    return () => controller.abort();
  }, [token]);

  const fetchWorkouts = async (signal) => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch workouts: ${response.statusText}`);
      }
      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const createWorkout = async (workoutData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create workout: ${response.statusText}`);
      }

      const newWorkout = await response.json();
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      return newWorkout;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update workout: ${response.statusText}`);
      }

      const updatedWorkout = await response.json();
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout._id === id ? updatedWorkout : workout
        )
      );
      return updatedWorkout;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete workout: ${response.statusText}`);
      }

      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== id)
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

export { WorkoutProvider };
