import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ModalEventDetails = ({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>Detalles de la cita agendada</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Paciente:</strong> {event.patient?.full_name}
          </p>
          <p>
            <strong>Fecha:</strong> {event.start.toLocaleDateString()}
          </p>
          <p>
            <strong>Hora:</strong>{" "}
            {event.start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            <strong>Duración:</strong> 1 hora
          </p>
          <p>
            <strong>Estado:</strong> {event.status}
          </p>
          <p>
            <strong>Tratamiento:</strong> {event.treatment?.name}
          </p>
          <p>
            <strong>Descripción:</strong> {event.treatment?.description}
          </p>
        </div>
        <div className="pt-4 text-right">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEventDetails;
