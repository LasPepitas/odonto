import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: any;
  onConfirm: (id: number) => void;
};

const ModalDelete = ({ isOpen, setIsOpen, item, onConfirm }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex items-start gap-2">
          <AlertTriangle className="text-red-600 mt-1" />
          <div>
            <DialogTitle>Eliminar Material</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas eliminar{" "}
              <strong>{item?.material_name}</strong> del inventario? Esta acción
              no se puede deshacer.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm(item?.id);
              setIsOpen(false);
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDelete;
