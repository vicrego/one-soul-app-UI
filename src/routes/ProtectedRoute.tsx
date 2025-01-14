import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const context = useAuth();
  console.log("isAuthenticated",context)
  //console.log("token protected", token)

  // Check if the user is authenticated
  if (!context.isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/signIn" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};