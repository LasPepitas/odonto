import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { InventoryItemRequest } from "../interfaces";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: InventoryItemRequest;
  onUpdate: (updated: InventoryItemRequest) => void;
  loading?: boolean;
};

const ModalEdit = ({ isOpen, setIsOpen, item, onUpdate, loading }: Props) => {
  const [formData, setFormData] = useState<InventoryItemRequest>(item);
  const [sumarStock, setSumarStock] = useState<number>(0);
  const [restarStock, setRestarStock] = useState<number>(0);

  useEffect(() => {
    setFormData(item);
    setSumarStock(0);
    setRestarStock(0);
  }, [item]);

  const handleChange = (
    field: keyof InventoryItemRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (sumarStock > 0 && restarStock > 0) {
      return toast.warning("No puedes sumar y restar stock al mismo tiempo.");
    }
    if (sumarStock < 0 || restarStock < 0) {
      return toast.error("Los valores de stock deben ser positivos.");
    }

    const newStock = formData?.actual_stock + sumarStock - restarStock;

    if (newStock < 0) {
      return toast.error("El stock resultante no puede ser negativo.");
    }

    const updatedItem = {
      ...formData,
      actual_stock: newStock,
    };

    onUpdate(updatedItem);
    toast.success("Material actualizado correctamente");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Material</DialogTitle>
          <DialogDescription>Modifica los datos del material</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Nombre</Label>
            <Input
              value={formData?.material_name}
              onChange={(e) => handleChange("material_name", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Categoría</Label>
            <Select
              value={formData?.categoria}
              onValueChange={(value) => handleChange("categoria", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anestesicos">Anestésicos</SelectItem>
                <SelectItem value="obturacion">Obturación</SelectItem>
                <SelectItem value="proteccion">Protección</SelectItem>
                <SelectItem value="instrumental">Instrumental</SelectItem>
                <SelectItem value="cirugia">Cirugía</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Proveedor</Label>
            <Input
              value={formData?.proveedor}
              onChange={(e) => handleChange("proveedor", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Costo (S/)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData?.costo_unitario}
              onChange={(e) =>
                handleChange("costo_unitario", Number(e.target.value))
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Stock Actual</Label>
            <Input
              value={formData?.actual_stock}
              disabled
              className="col-span-3 bg-gray-100 text-gray-600"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Sumar Stock</Label>
            <Input
              type="number"
              value={sumarStock}
              onChange={(e) => setSumarStock(Number(e.target.value))}
              className="col-span-3"
              placeholder="0"
              min={0}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Restar Stock</Label>
            <Input
              type="number"
              value={restarStock}
              onChange={(e) => setRestarStock(Number(e.target.value))}
              className="col-span-3"
              placeholder="0"
              min={0}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Stock Mínimo</Label>
            <Input
              type="number"
              value={formData?.min_stock}
              onChange={(e) =>
                handleChange("min_stock", Number(e.target.value))
              }
              className="col-span-3"
              placeholder="0"
              min={0}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEdit;
