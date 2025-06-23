import { apiClient } from "../../../services";
import type { Credentials, UserRequestRegister } from "../interfaces";

export const login = async (credentials: Credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
export const register = async (userData: UserRequestRegister) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const profile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};
