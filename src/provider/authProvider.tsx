/*
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";



interface AuthContextType {
  user: any | null; // Or a more specific user type
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}, // Empty function as default
  token: null,
  setToken: () => {},
});


//const AuthContext = createContext();

const AuthProvider = ({ children }: any) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken: any) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

*/

import axios from "axios";
import { Context, createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

//const AuthContext = createContext();

type AuthContextType = {
  isAuthenticated: boolean;
  logUserIn: () => void;
};

type AuthContextPropsType = {
  children: ReactNode;
};

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: AuthContextPropsType) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const logUserIn = () => {
    //onsole.log("user",user)
    // For the example I just set a prop. But you'll need to do more here
    axios({
      method: "GET",
      /*data: {
        token: "hey",
      },*/
      withCredentials: true,
      url: "http://localhost:5050/auth/protected",
    }).then((res) => {
      console.log("prot res",res);
      if(res.status === 200){
        setIsAuthenticated(true);
        navigate("/");    
      }
    })


      
    // Redirect to homepage
    //navigate("/about");
  };

/*
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  console.log("token here", token)

  // Function to set the authentication token
  const setToken = (newToken) => {
    console.log("new token",newToken)
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
*/
  return (
    <AuthContext.Provider value={{ isAuthenticated, logUserIn }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("context", context)
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Make sure you are rendering AuthProvider at the top level of your application."
    );
  }
  return context;
};



export default AuthProvider;
