
import './App.css'

import { Box } from '@chakra-ui/react'
import Body from './components/Body/Body'
import { Navigate, Route, Router, /*Routes*/ } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import About from './components/Body/About'
import Topics from './components/Body/content/Topics'
import Chapter from './components/Body/content/Chapter'
import Loading from './components/Loading'
import Challenge_Chapter from './components/Body/content/Challenge_Chapter'
import Challenge_Free from './components/Body/content/Challenge_Free'
import AuthProvider, { useAuth } from './provider/authProvider'

/*
function App() {

  return (
    <Box >
      <AuthProvider>
        <Routes>

          
      /*    
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        */    
          {/*With Account */}
          /*
          <Route path="/" element={<Loading />} />
          <Route path="/home" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/challenges" element={<Challenge_Free />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/tasks" element={<Challenge_Chapter />} />
        </Routes>
      </AuthProvider>
    </Box>
  )
}

export default App
*/
/*
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/signIn" />;
  }

  return children;
};

function App() {
  return (
    <Box>
      <AuthProvider>
        
          <Routes>
            
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            
            
            <Route path="/" element={<RequireAuth><Loading /></RequireAuth>} />
            <Route path="/home" element={<RequireAuth><Body /></RequireAuth>} />
            <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
            <Route path="/chapters" element={<RequireAuth><Chapter /></RequireAuth>} />
            <Route path="/challenges" element={<RequireAuth><Challenge_Free /></RequireAuth>} />
            <Route path="/topics" element={<RequireAuth><Topics /></RequireAuth>} />
            <Route path="/tasks" element={<RequireAuth><Challenge_Chapter /></RequireAuth>} />
          </Routes>
        
      </AuthProvider>
    </Box>
  );
}

export default App;
*/

/*
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from './routes/ProtectedRoute'

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
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
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/signIn",
      element: <div>Login</div>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
*/
import Routes from "./routes";
import MyRoutes from './routes'

function App() {
  return (
    <AuthProvider>
      <MyRoutes/>
    </AuthProvider>
  );
}

export default App;



