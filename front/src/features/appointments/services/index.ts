import { apiClient } from "@/services";
import type { AppointmentRequest } from "../interfaces";

export const getAppointments = async () => {
  const response = await apiClient.get("/appointments");
  return response.data;
};
export const createAppointment = async (
  appointmentData: AppointmentRequest
) => {
  const response = await apiClient.post("/appointments", appointmentData);
  return response.data;
};
