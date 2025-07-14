import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Patient } from "../interfaces";

export default function ModalDeletePatient({
  isOpen,
  setIsOpen,
  selectedPatient,
  deletePatient,
  isLoading,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedPatient: Patient | null;
  deletePatient: (id: number) => Promise<void>;
  isLoading: boolean;
}) {
  const handleDelete = async () => {
    if (!selectedPatient) return;
    await deletePatient(selectedPatient.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Eliminar Paciente</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar a{" "}
            <b>{selectedPatient?.full_name}</b>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
