import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../dashboard/LoadingSpinner";

const ProtectedRoute = () => {
  const { user, token, loading } = useContext(AuthContext);

  // Check if token exists in localStorage/sessionStorage directly
  const storageToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const isAuthenticated = Boolean(token || storageToken);

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
