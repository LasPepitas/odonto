import { apiClient } from "../../../services";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};
