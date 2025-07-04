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
import type { User } from "../interfaces";

// Props del modal
interface ModalDeleteUserProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedUser: User | null;
  isLoading: boolean;
  setSelectedUser: (user: User | null) => void;
  deleteUserById: (id: number) => Promise<void>;
}

const ModalDeleteUser: FC<ModalDeleteUserProps> = ({
  isOpen,
  setIsOpen,
  selectedUser,
  isLoading,
  setSelectedUser,
  deleteUserById,
}) => {
  const handleCancel = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUserById(selectedUser.id);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setIsOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Eliminar Usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <strong>{selectedUser?.full_name}</strong>? Esta acción no se puede
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

export default ModalDeleteUser;
