import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Treatment } from "../interfaces";

const ModalAdd = ({
  isOpenModalAdd,
  setIsOpenModalAdd,
  addTreatment,
  isLoading,
}: {
  isOpenModalAdd: boolean;
  setIsOpenModalAdd: (open: boolean) => void;
  addTreatment: (treatment: Treatment) => Promise<void>;
  isLoading: boolean;
}) => {
  const [treatment, setTreatment] = useState<Treatment>({
    name: "",
    description: "",
    cost: 0,
  });
  const handleSave = async () => {
    try {
      await addTreatment(treatment);
      setIsOpenModalAdd(false);
      setTreatment({ name: "", description: "", cost: 0 });
    } catch (error) {
      console.error("Error saving treatment:", error);
    }
  };
  return (
    <Dialog open={isOpenModalAdd} onOpenChange={setIsOpenModalAdd}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar tratamiento</DialogTitle>
          <DialogDescription>
            Información completa del tratamiento
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del tratamiento</Label>
            <Input
              id="name"
              value={treatment.name}
              onChange={(e) =>
                setTreatment({ ...treatment, name: e.target.value })
              }
              placeholder="Limpieza dental"
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={treatment.description}
              onChange={(e) =>
                setTreatment({ ...treatment, description: e.target.value })
              }
              placeholder="Tratamiento de limpieza dental"
            />
          </div>
          <div>
            <Label htmlFor="cost">Costo (€)</Label>
            <Input
              id="cost"
              type="number"
              min={0}
              value={treatment.cost}
              onChange={(e) =>
                setTreatment({ ...treatment, cost: parseFloat(e.target.value) })
              }
              placeholder="Costo del tratamiento"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpenModalAdd(false)}>
            Cerrar
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              !treatment.name ||
              !treatment.description ||
              treatment.cost <= 0 ||
              isLoading
            }
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdd;
