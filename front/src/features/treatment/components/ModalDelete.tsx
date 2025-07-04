import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";

// Tipado del tratamiento
interface Treatment {
  id: number;
  name: string;
}

// Props del componente
interface ModalDeleteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedTreatment: Treatment | null;
  isLoading: boolean;
  setSelectedTreatment: (treatment: Treatment | null) => void;
  deleteTreatmentById: (id: number) => Promise<void>;
}

const ModalDelete: FC<ModalDeleteProps> = ({
  isOpen,
  setIsOpen,
  selectedTreatment,
  isLoading,
  setSelectedTreatment,
  deleteTreatmentById,
}) => {
  const handleCancel = () => {
    setIsOpen(false);
    setSelectedTreatment(null);
  };

  const handleDelete = async () => {
    if (!selectedTreatment) return;
    try {
      await deleteTreatmentById(selectedTreatment.id);
    } catch (error) {
      console.error("Error al eliminar tratamiento:", error);
    } finally {
      setIsOpen(false);
      setSelectedTreatment(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Eliminar Tratamiento</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar el tratamiento{" "}
            <strong>{selectedTreatment?.name}</strong>? Esta acción no se puede
            deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDelete;
