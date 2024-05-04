import React, { createContext, useContext, useState } from "react";
import  {useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { axiosApi } from "./interceptors";
const API_URL = "http://localhost:5000/api";



interface User {
  email: string;
  role: string;
  full_name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    full_name: string,
    email: string,
    password: string,
    repeat_password: string
  ) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate(); // Use useHistory from react-router-dom
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosApi.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { access_token, role, full_name } = response.data;

      setUser({ email, role, full_name });

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify({ email, role, full_name }));

      if (role === "admin") {
      navigate("/add")
      } else {
     navigate("/")
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const register = async (
    full_name: string,
    email: string,
    password: string,
    repeat_password: string
  ) => {
    try {
      const response = await axiosApi.post(`${API_URL}/signup`, {
        full_name,
        email,
        password,
        repeat_password,
      });

      const { access_token, role } = response.data;

      setUser({ email, role, full_name });
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify({ email, role, full_name }));

      if (role === "admin") {
   navigate("/admin/dashboard")
      } else {
    navigate("/")
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleAuthError = (error: any) => {
    // Error handling logic
    console.error(error);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};