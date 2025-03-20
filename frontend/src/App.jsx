import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/dashboard/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

const Home = () => (
  <div className="min-h-screen bg-base-200 flex items-center justify-center">
    <div className="bg-base-100 rounded-lg shadow-lg p-6 mx-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-base-content mb-4">
        Welcome to FitTrack
      </h1>
      <p className="text-base-content/70 md:text-lg mb-6">
        Your fitness journey starts here
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Link to="/exercises" className="btn btn-primary w-full md:w-auto">
          Exercises
        </Link>
        <Link to="/workouts" className="btn btn-secondary w-full md:w-auto">
          Workouts
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
        <Link to="/login" className="btn btn-outline w-full md:w-auto">
          Login
        </Link>
        <Link to="/register" className="btn btn-outline w-full md:w-auto">
          Register
        </Link>
      </div>
      <div className="mt-4 flex gap-4">
        <Link to="/profile" className="btn btn-outline">
          My Profile
        </Link>
      </div>
    </div>
  </div>
);

export default App;
