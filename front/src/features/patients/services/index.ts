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
export const updatePatient = async (id: number, data: Patient) => {
  const response = await apiClient.put(`/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await apiClient.delete(`/patients/${id}`);
  return response.data;
};
