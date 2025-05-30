import { apiClient } from "../../../services";

export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
export const register = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};
