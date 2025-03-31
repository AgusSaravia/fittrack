import React from "react";
import { Routes, Route } from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/dashboard/Navbar";
import Home from "./pages/HomePage";
import WorkoutForm from "./components/workout/WorkoutForm";
import { AuthProvider } from "./context/AuthContext";
import { WorkoutProvider } from "./context/WorkoutContext";
import WorkoutCalendar from "./components/WorkoutCalendar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/workout/:id" element={<WorkoutForm />} />
            <Route path="/workouts/new" element={<WorkoutForm />} />
            <Route path="/workouts/calendar" element={<WorkoutCalendar />} />
          </Route>
        </Routes>
      </WorkoutProvider>
    </AuthProvider>
  );
};

export default App;
