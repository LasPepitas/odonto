import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { Patient } from "../interfaces";

export default function ModalEditPatient({
  isOpen,
  setIsOpen,
  selectedPatient,
  updatePatient,
  isLoading,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedPatient: Patient | null;
  updatePatient: (id: number, patient: Patient) => Promise<void>;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<Patient | null>(null);

  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        ...selectedPatient,
        birth_date: selectedPatient.birth_date.slice(0, 10),
      });
    }
  }, [selectedPatient]);

  const handleChange = (key: keyof Patient, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData) return;
    await updatePatient(formData.id, formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
          <DialogDescription>
            Modifica la información del paciente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {formData && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Nombre</Label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">DNI</Label>
                <Input
                  value={formData.dni}
                  onChange={(e) => handleChange("dni", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Teléfono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Dirección</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Fecha Nacimiento</Label>
                <Input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleChange("birth_date", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
