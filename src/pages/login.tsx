// pages/login.tsx
"use client";
import { useAuth } from "../lib/authProvider";

import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e:any) => {
    e.preventDefault()
    try { 
      await login(email, password);
      console.log("User Login successfully");
      // You can redirect to another page or perform other actions on successful login
    } catch (error: any) {
      console.error("Error in login:", error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8  bg-white rounded shadow-lg">
        <div className="text-xl font-extrabold text-start text-white p-4 bg-violet-700 rounded">
          Login
        </div>
        <form className="space-y-4 p-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={(e)=>handleLogin(e)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <p className="mt-5">
              Don't have any Account?
              <Link to={"/auth/register"}>
                {" "}
                <span className="text-blue-700">Register Here</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;