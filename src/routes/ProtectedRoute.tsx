import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

export const ProtectedRoute = () => {
  const context = useAuth();
  console.log("context", context.isAuthenticated);
  // Check if the user is authenticated
  if (!context.isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/signIn" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};