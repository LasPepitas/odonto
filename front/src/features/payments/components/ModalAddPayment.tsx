import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppointments from "@/features/appointments/hooks/useAppointments";

const ModalAddPayment = ({ isOpen, setIsOpen, addPayment, isLoading }) => {
  const { appointments } = useAppointments();
  const [formData, setFormData] = useState({
    appointment_id: "",
    treatment_id: "",
    amount: "",
    payment_date: new Date().toISOString().split("T")[0],
  });

  const handleChangeAppointment = (value: string) => {
    const selectedAppointment = appointments.find(
      (a) => a.id === parseInt(value)
    );
    if (selectedAppointment) {
      setFormData({
        ...formData,
        appointment_id: value,
        treatment_id: selectedAppointment.treatment?.id.toString() || "",
        amount: selectedAppointment.treatment?.cost?.toString() || "",
      });
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await addPayment({
      ...formData,
      appointment_id: parseInt(formData.appointment_id),
      treatment_id: parseInt(formData.treatment_id),
    });
    setIsOpen(false);
  };

  const selectedTreatment = appointments.find(
    (a) => a.id === parseInt(formData.appointment_id)
  )?.treatment;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar nuevo pago</DialogTitle>
          <DialogDescription>
            Completa los datos del pago a registrar
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* CITA */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="appointment" className="text-right">
              Cita
            </Label>
            <Select
              onValueChange={(value) => handleChangeAppointment(value)}
              value={formData.appointment_id}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar cita" />
              </SelectTrigger>
              <SelectContent>
                {appointments.map((appt) => (
                  <SelectItem key={appt.id} value={appt.id.toString()}>
                    {appt.patient?.full_name} -{" "}
                    {appt.appointment_datetime.slice(0, 16).replace("T", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TRATAMIENTO - Solo visible */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatment" className="text-right">
              Tratamiento
            </Label>
            <Input
              className="col-span-3 bg-gray-100"
              value={selectedTreatment?.name || ""}
              readOnly
              disabled
            />
          </div>

          {/* MONTO - Solo visible */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Monto
            </Label>
            <Input
              id="amount"
              type="number"
              className="col-span-3 bg-gray-100"
              value={formData.amount}
              readOnly
              disabled
            />
          </div>

          {/* FECHA DE PAGO */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment_date" className="text-right">
              Fecha de Pago
            </Label>
            <Input
              id="payment_date"
              type="date"
              className="col-span-3"
              value={formData.payment_date}
              onChange={(e) => handleChange("payment_date", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.appointment_id}
          >
            Guardar Pago
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPayment;
