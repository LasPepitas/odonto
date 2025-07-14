import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import type { InventoryItemRequest } from "../interfaces";

const ModalAdd = ({
  isDialogOpen,
  setIsDialogOpen,
  addItem,
  loading,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  addItem: (item: InventoryItemRequest) => void;
  loading?: boolean;
}) => {
  const [formData, setFormData] = useState<InventoryItemRequest>({
    material_name: "",
    categoria: "",
    proveedor: "",
    costo_unitario: 0,
    actual_stock: 0,
    min_stock: 0,
  });

  const handleChange = (
    field: keyof InventoryItemRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    addItem(formData);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4 mr-2" />
          Nuevo Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nuevo Material</DialogTitle>
          <DialogDescription>
            Añade un nuevo material al inventario
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="material_name" className="text-right">
              Nombre
            </Label>
            <Input
              id="material_name"
              value={formData.material_name}
              onChange={(e) => handleChange("material_name", e.target.value)}
              placeholder="Nombre del material"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoria" className="text-right">
              Categoría
            </Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => handleChange("categoria", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anestesicos">Anestésicos</SelectItem>
                <SelectItem value="obturacion">
                  Materiales de obturación
                </SelectItem>
                <SelectItem value="proteccion">Protección</SelectItem>
                <SelectItem value="instrumental">Instrumental</SelectItem>
                <SelectItem value="cirugia">Cirugía</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="actual_stock" className="text-right">
              Cantidad
            </Label>
            <Input
              id="actual_stock"
              type="number"
              value={formData.actual_stock}
              onChange={(e) =>
                handleChange("actual_stock", Number(e.target.value))
              }
              className="col-span-3"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="min_stock" className="text-right">
              Stock Mínimo
            </Label>
            <Input
              id="min_stock"
              type="number"
              value={formData.min_stock}
              onChange={(e) =>
                handleChange("min_stock", Number(e.target.value))
              }
              className="col-span-3"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="proveedor" className="text-right">
              Proveedor
            </Label>
            <Input
              id="proveedor"
              value={formData.proveedor}
              onChange={(e) => handleChange("proveedor", e.target.value)}
              className="col-span-3"
              placeholder="Nombre del proveedor"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="costo_unitario" className="text-right">
              Costo (S/)
            </Label>
            <Input
              id="costo_unitario"
              type="number"
              step="0.01"
              value={formData.costo_unitario}
              onChange={(e) =>
                handleChange("costo_unitario", Number(e.target.value))
              }
              className="col-span-3"
              placeholder="0.00"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {loading ? "Añadiendo..." : "Añadir Material"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdd;
