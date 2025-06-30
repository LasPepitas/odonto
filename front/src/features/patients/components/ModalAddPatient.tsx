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
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Patient } from "../interfaces";
const ModalAddPatient = ({
  isDialogOpen,
  setIsDialogOpen,
  addPatient,
  isLoading,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  addPatient?: (patient: Patient) => Promise<void>;
  isLoading?: boolean;
}) => {
  const [newPatient, setNewPatient] = useState({
    full_name: "",
    dni: "",
    phone: "",
    address: "",
    birth_date: new Date().toISOString().split("T")[0],
  });
  const handleAddPatient = async () => {
    try {
      await addPatient(newPatient);
      setIsDialogOpen(false);
      setNewPatient({
        full_name: "",
        dni: "",
        phone: "",
        address: "",
        birth_date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewPatient((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4 mr-2" />
          Nuevo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Paciente</DialogTitle>
          <DialogDescription>
            Ingresa la información del nuevo paciente
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Nombre
            </Label>
            <Input
              id="full_name"
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dni" className="text-right">
              DNI
            </Label>
            <Input id="dni" className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <Input id="phone" className="col-span-3" onChange={handleChange} />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Dirección
            </Label>
            <Input
              id="address"
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birth_date" className="text-right">
              Fecha de Nacimiento
            </Label>
            <Input
              id="birth_date"
              type="date"
              className="col-span-3"
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddPatient}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPatient;
