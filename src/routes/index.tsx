import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { useAuth } from "../provider/authProvider";
import Loading from "../components/Loading";
import About from "../components/Body/About";
import { ProtectedRoute } from "./ProtectedRoute";
import Chapter from "../components/Body/content/Chapter";
import Topics from "../components/Body/content/Topics";
import Challenge_Free from "../components/Body/content/Challenge_Free";
import Challenge_Chapter from "../components/Body/content/Challenge_Chapter";
/*
const Routes = () => {
  const { token } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <ProtectedRoute /> : <Navigate to="/signIn" replace />,
      children: token && [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
  ]);

  
    return <RouterProvider router={router} />;
  };
  
  export default Routes;
*/


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Protected Routes (Correct way) */}
      <Route element={<ProtectedRoute />}> {/* Use ProtectedRoute as a parent Route */}
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Loading />} />
        <Route path="/about" element={<About />} />
        <Route path="/chapters" element={<Chapter />} />
        <Route path="/topics" element={<Topics />} />
        
        <Route path="/challenges" element={<Challenge_Free />} />
        <Route path="/tasks" element={<Challenge_Chapter />} />

        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};


export default MyRoutes;

