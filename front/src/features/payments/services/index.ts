import { apiClient } from "@/services";

export const getAllPayments = async () => {
  const response = await apiClient.get("/payments");
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await apiClient.post("/payments", paymentData);
  return response.data;
};
