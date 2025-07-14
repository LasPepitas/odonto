export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  min_stock: number;
  unit: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Guantes de látex",
    stock: 20,
    min_stock: 50,
    unit: "paquetes",
  },
  {
    id: 2,
    name: "Algodón dental",
    stock: 120,
    min_stock: 100,
    unit: "bolsas",
  },
  {
    id: 3,
    name: "Anestesia local",
    stock: 5,
    min_stock: 10,
    unit: "ampollas",
  },
  {
    id: 4,
    name: "Mascarillas quirúrgicas",
    stock: 45,
    min_stock: 30,
    unit: "cajas",
  },
  {
    id: 5,
    name: "Resina compuesta",
    stock: 2,
    min_stock: 5,
    unit: "tubos",
  },
];

import { useState } from "react";

export default function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);

  return {
    items,
    loading: false,
    error: null,
    // Métodos CRUD opcionales si quieres simular cambios
    addItem: (item: InventoryItem) => setItems((prev) => [...prev, item]),
    updateItem: (id: number, updated: Partial<InventoryItem>) =>
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      ),
  };
}
