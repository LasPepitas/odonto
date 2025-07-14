export interface InventoryItem {
  id: number;
  material_name: string;
  categoria: string;
  actual_stock: number;
  min_stock: number;
  proveedor: string;
  costo_unitario: string;
}

export interface InventoryItemRequest {
  material_name: string;
  categoria: string;
  proveedor: string;
  costo_unitario: number;
  actual_stock: number;
  min_stock: number;
}
