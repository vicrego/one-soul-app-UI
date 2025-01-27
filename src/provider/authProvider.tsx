import axios from "axios";
import { Context, createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

//const AuthContext = createContext();

type AuthContextType = {
  isAuthenticated: boolean;
  logUserIn: (userId: any) => void;
  //userInfo: (userId: any) => void;
  userData: {};
};

type AuthContextPropsType = {
  children: ReactNode;
};

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: AuthContextPropsType) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({});
  

  const navigate = useNavigate();

/*  const logUserIn = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5050/auth/protected",
    }).then((res) => {
      console.log("loguserin", userData)
      if(res.status === 200){
        setIsAuthenticated(true);
        navigate("/");    
      }
    }).catch((err) => {
      if(err.response.status === 401){
        setIsAuthenticated(false);
      }
    })
  };
*/
/*
  const logUserIn = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5050/auth/protected",
    }).then((res) => {
      console.log("loguserin", userData)
      if(res.status === 200){
        setIsAuthenticated(true);
        navigate("/");    
      }
    }).catch((err) => {
      if(err.response.status === 401){
        setIsAuthenticated(false);
      };
    });
  };
*/
  const logUserIn = (userId: any) => {
    console.log("userinfo auth", userId)
    axios({
      method: "POST",
      data: {
        userId: userId,
      },
      withCredentials: true,
      url: "http://localhost:5050/auth/user",
    }).then((res) => {
      console.log("prot res",res);
      setUserData(res);
      /*if(res.status === 200){
        setIsAuthenticated(true);
        navigate("/");    
      }*/
        if(res.status === 200){
          setIsAuthenticated(true);
          navigate("/");    
        }
      }).catch((err) => {
        if(err.response.status === 401){
          setIsAuthenticated(false);
      };
    });
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
    <AuthContext.Provider value={{ isAuthenticated, logUserIn, userData }}>
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
