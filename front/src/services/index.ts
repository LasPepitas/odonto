import useAuthStore from "@/features/auth/store/useAuthStore";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for cross-origin requests
});

// interceptors to handle errors globally
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Obtén el token desde Zustand
    console.log("Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // // get req.headers['x-tenant-id'];
    // const tenantId = localStorage.getItem('tenantId');
    // console.log('tenantId', tenantId);
    // if (tenantId) {
    //     config.headers['x-tenant-id'] = tenantId;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
