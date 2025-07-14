import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, Edit, Trash2 } from "lucide-react";
import { getStockStatus } from "../utils";
import type { InventoryItem } from "../interfaces";
const InventoryTable = ({
  inventory,
  setSelectedItem,
  setIsModalEditOpen,
  setIsModalDeleteOpen,
}: {
  inventory: InventoryItem[];
  setSelectedItem: (item: InventoryItem | null) => void;
  setIsModalEditOpen: (open: boolean) => void;
  setIsModalDeleteOpen: (open: boolean) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Stock Actual</TableHead>
          <TableHead>Stock Mínimo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead>Costo Unitario</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.actual_stock, item.min_stock);
          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.material_name}
              </TableCell>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{item.actual_stock}</span>
                  <span className="text-sm text-gray-600">{"unidades"}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{item.min_stock}</span>
              </TableCell>
              <TableCell>
                <Badge className={stockStatus.color}>
                  {stockStatus.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{item.proveedor}</TableCell>
              <TableCell className="font-medium">
                €{item.costo_unitario}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalEditOpen(true);
                    }}
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
