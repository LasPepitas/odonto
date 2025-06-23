import { useEffect, useState } from "react";
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

const ModalEdit = ({
  isOpen,
  setIsOpen,
  selectedTreatment,
  updateTreatment,
  isLoading,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedTreatment: Treatment | null;
  updateTreatment: (treatment: Treatment) => Promise<void>;
  isLoading: boolean;
}) => {
  const [treatment, setTreatment] = useState<Treatment>({
    name: "",
    description: "",
    cost: 0,
  });

  // Rellena el formulario cuando se abre el modal y hay tratamiento seleccionado
  useEffect(() => {
    if (selectedTreatment) {
      setTreatment(selectedTreatment);
    }
  }, [selectedTreatment]);

  const handleUpdate = async () => {
    try {
      await updateTreatment(treatment);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating treatment:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar tratamiento</DialogTitle>
          <DialogDescription>
            Modifica los campos necesarios y guarda los cambios.
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
                setTreatment({
                  ...treatment,
                  cost: parseFloat(e.target.value),
                })
              }
              placeholder="Costo del tratamiento"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              !treatment.name ||
              !treatment.description ||
              treatment.cost <= 0 ||
              isLoading
            }
          >
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEdit;
