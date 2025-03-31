import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../utils/apiClient";
import { toast } from "react-toastify";

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async () => {
    if (!isAuthenticated) {
      setWorkouts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/workouts");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch workouts");
      }

      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setError("Failed to load workouts. Please try again.");
      toast.error("Could not load your workouts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts();
    } else {
      setWorkouts([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const createWorkout = async (workoutData) => {
    try {
      const response = await apiClient.post("/workouts", workoutData);

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }

      const newWorkout = await response.json();
      setWorkouts([...workouts, newWorkout]);
      return newWorkout;
    } catch (error) {
      console.error("Error creating workout:", error);
      throw error;
    }
  };

  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await apiClient.put(`/workouts/${id}`, workoutData);

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
      console.error("Error updating workout:", error);
      throw error;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      const response = await apiClient.delete(`/workouts/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to delete workout: ${response.statusText}`);
      }

      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== id)
      );
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw error;
    }
  };

  const contextValue = {
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
  };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};
