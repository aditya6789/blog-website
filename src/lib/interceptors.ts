import axios from "axios";
import { getToken } from "./common";

export const axiosApi = axios.create({ baseURL: "http://localhost:5000/api" });

// Axios interceptors
axiosApi.interceptors.request.use(
  (config) => {
    // Modify the request config if needed

    const token = getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => {
    // Modify the response config if needed
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);