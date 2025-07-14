import { apiClient } from "@/services";
import type { InventoryItemRequest } from "../interfaces";

export const getInventoryItems = async () => {
  try {
    const response = await apiClient.get("/inventory");
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    throw error;
  }
};

export const addInventoryItem = async (item: InventoryItemRequest) => {
  try {
    const response = await apiClient.post("/inventory", item);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory item:", error);
    throw error;
  }
};

export const updateInventoryItem = async (item: InventoryItemRequest) => {
  try {
    const response = await apiClient.put(`/inventory/${item.id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory item:", error);
    throw error;
  }
};

export const deleteInventoryItem = async (id: number) => {
  try {
    const response = await apiClient.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
};
