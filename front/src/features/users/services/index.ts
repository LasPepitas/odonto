import { apiClient } from "../../../services";
import type { UserPayload } from "../interfaces";

export const getUsers = async (search: string | null) => {
  const params = search ? { params: { search } } : {};
  const response = await apiClient.get("/users", params);
  return response.data;
};

export const createUser = async (userData: UserPayload) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (id: number, userData: UserPayload) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUserById = async (id: number) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
export const getDentists = async () => {
  const response = await apiClient.get("/dentists");
  return response.data;
};
