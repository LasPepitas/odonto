import { useEffect, useState } from "react";
import type { FC } from "react";
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
import type { User } from "../interfaces";

// Payload para editar (sin id ni created_at)
interface UserPayload {
  email: string;
  full_name: string;
  role: string;
}

// Props del modal
interface ModalEditUserProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedUser: User | null;
  isLoading: boolean;
  setSelectedUser: (user: User | null) => void;
  updateUserById: (id: number, user: UserPayload) => Promise<void>;
}

const ModalEditUser: FC<ModalEditUserProps> = ({
  isOpen,
  setIsOpen,
  selectedUser,
  isLoading,
  setSelectedUser,
  updateUserById,
}) => {
  const [formData, setFormData] = useState<UserPayload>({
    full_name: "",
    email: "",
    role: "",
  });

  // Actualiza el formulario al seleccionar usuario
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({ full_name: "", email: "", role: "" });
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    try {
      await updateUserById(selectedUser.id, formData);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    } finally {
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifica los datos del usuario seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="role">Rol</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="admin, user, etc."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditUser;
