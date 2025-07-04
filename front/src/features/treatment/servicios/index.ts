import { apiClient } from "@/services";
import type { Treatment } from "../interfaces";

export const getTreatments = async () => {
  try {
    const response = await apiClient.get("/treatments");
    return response.data;
  } catch (error) {
    console.error("Error fetching servicios:", error);
    throw error;
  }
};

export const createTreatment = async (data: Treatment) => {
  try {
    const response = await apiClient.post("/treatments", data);
    return response.data;
  } catch (error) {
    console.error("Error creating servicio:", error);
    throw error;
  }
};

export const updateTreatment = async (id: number, data: Treatment) => {
  try {
    const response = await apiClient.put(`/treatments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating servicio:", error);
    throw error;
  }
};

export const deleteTreatment = async (id: number) => {
  try {
    const response = await apiClient.delete(`/treatments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting servicio:", error);
    throw error;
  }
};
