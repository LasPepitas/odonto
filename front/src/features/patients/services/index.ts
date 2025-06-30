import { apiClient } from "@/services";
import type { Patient } from "../interfaces";

export const createPatient = async (data: Patient) => {
  const response = await apiClient.post("/patients", data);
  return response.data;
};

export const getPatients = async () => {
  const response = await apiClient.get("/patients");
  return response.data;
};
