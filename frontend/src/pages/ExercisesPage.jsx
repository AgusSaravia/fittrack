import React from "react";
import ExerciseDashboard from "../components/ExerciseDashboard";

const ExercisesPage = () => {
  return (
    <div className="min-h-screen bg-zinc-700-to-br flex items-center justify-center py-20">
      <div className="bg-zinc-150 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4 ">
        <div className="p-16">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            Explore Exercises
          </h1>
          <p className="text-lg mb-8 text-center">
            Discover a wide range of exercises to help you reach your fitness
            goals.
          </p>
          <ExerciseDashboard />
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
