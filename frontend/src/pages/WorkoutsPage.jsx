import React from "react";
import WorkoutDashboard from "../components/WorkoutDashboard";

const WorkoutsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Workouts</h1>
      <WorkoutDashboard />
    </div>
  );
};

export default WorkoutsPage;
