import { useEffect, useState } from "react";
import {
  addInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
} from "../services";
import type { InventoryItem, InventoryItemRequest } from "../interfaces";
export default function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getInventory = async () => {
    setLoading(true);
    try {
      const { data } = await getInventoryItems();
      setItems(data.data);
    } catch (err) {
      setError("Error fetching inventory items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const addItem = async (item: InventoryItemRequest) => {
    setLoading(true);
    try {
      const { data } = await addInventoryItem(item);
      setItems((prev) => [...prev, data]);
    } catch (err) {
      setError("Error adding inventory item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item: InventoryItemRequest) => {
    setLoading(true);
    try {
      const { data } = await updateInventoryItem(item);
      setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    } catch (err) {
      setError("Error updating inventory item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteItem = async (id: number) => {
    setLoading(true);
    try {
      await deleteInventoryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Error deleting inventory item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInventory();
  }, []);
  return {
    items,
    loading,
    error,
    getInventory,
    addItem,
    updateItem,
    deleteItem,
  };
}
