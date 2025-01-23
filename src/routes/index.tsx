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
import Logout from "../components/auth/Logout";
import Body from "../components/Body/Body";


const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/chapters" element={<Chapter />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/logout" element={<Logout />} />  
        <Route path="/challenges" element={<Challenge_Free />} />
        <Route path="/tasks" element={<Challenge_Chapter />} />

        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};


export default MyRoutes;

