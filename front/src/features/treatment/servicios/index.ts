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
