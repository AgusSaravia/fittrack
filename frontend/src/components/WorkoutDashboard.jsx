import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeroSection from "./workout/WorkoutHero";
import WorkoutList from "./workout/WorkoutList";
import LoadingSpinner from "./dashboard/LoadingSpinner";
import ErrorDisplay from "./dashboard/ErrorDisplay";
import RecentWorkoutsTable from "./RecentWorkoutsTable";
import { WorkoutContext } from "../context/WorkoutContext";

const WorkoutDashboard = () => {
  const { workouts, loading, error } = useContext(WorkoutContext);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="min-h-screen bg-base-200">
      <HeroSection />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/workouts/calendar" className="btn btn-primary">
            Go to Calendar
          </Link>
        </div>

        {workouts.length === 0 ? (
          <div className="text-center p-8 bg-base-100 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">No workouts yet</h3>
            <p className="mb-4">Create your first workout to start training.</p>
            <Link to="/workouts/new" className="btn btn-primary">
              Create Workout
            </Link>
          </div>
        ) : (
          <>
            <WorkoutList workouts={workouts} />
            <RecentWorkoutsTable workouts={workouts} />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutDashboard;
