import axios from "axios";
import { Context, createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


type AuthContextType = {
  isAuthenticated: boolean | undefined;
  logUserIn: () => void;
  refreshUser: () => Promise<any>;
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

type AuthContextPropsType = {
  children: ReactNode;
};

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

//Sharing of centralized and updated userData
//Authentication state




export const AuthProvider = ({ children }: AuthContextPropsType) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  let url: string;
  
  if(import.meta.env.VITE_ENV === "development"){
    url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/auth/user`;
  } else {
    url = `${import.meta.env.VITE_API_URL_PRODUCTION}/auth/user`;
  }
  
  const logUserIn = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: url
    }).then((res) => {
      setUserData(res);
        if(res.status === 200){
          setIsAuthenticated(true);
          navigate("/");    
        }
      }).catch((err) => {
        if(err.response.status === 401){
          console.log(err)
          setIsAuthenticated(false);
      };
    });
  };

  const refreshUser = () => {
    return axios({
      method: "POST",
      withCredentials: true,
      url: url
    }).then((res) => {
      setUserData(res);
      setIsAuthenticated(true);
      return res;
    }).catch((err) => {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      }
      return null;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logUserIn, userData, setUserData, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Make sure you are rendering AuthProvider at the top level of your application."
    );
  }
  return context;
};

export default AuthProvider;
