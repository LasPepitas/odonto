import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSlots } from "../utils";
import UsePatients from "@/features/patients/hooks/UsePatients";
import type { UsePatientsReturn } from "@/features/patients/interfaces";
import useUsers from "@/features/users/hooks/useUsers";
import useTreatments from "@/features/treatment/hooks/useTreatments";
import { useState } from "react";
import useAppointments from "../hooks/useAppointments";
import type { UseAppointmentsReturn } from "../interfaces";

const ModalAdd = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) => {
  const { patients } = UsePatients() as UsePatientsReturn;
  const { dentists } = useUsers();
  const { treatments } = useTreatments();
  const { addAppointment } = useAppointments() as UseAppointmentsReturn;

  const [appointmentData, setAppointmentData] = useState({
    patient_id: "",
    dentist_id: "",
    treatment_id: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleAddAppointment = () => {
    if (selectedDate && selectedTime) {
      const datetime = `${selectedDate}T${selectedTime}`;
      addAppointment({
        patient_id: parseInt(appointmentData.patient_id, 10),
        dentist_id: parseInt(appointmentData.dentist_id, 10),
        treatment_id: parseInt(appointmentData.treatment_id, 10),
        status: "scheduled",
        appointment_datetime: datetime,
      })
        .then(() => {
          setIsDialogOpen(false);
        })
        .catch((error) => {
          console.error("Error al crear cita:", error);
        });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Cita</DialogTitle>
          <DialogDescription>
            Programa una nueva cita para un paciente
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patient" className="text-right">
              Paciente
            </Label>
            <Select
              onValueChange={(value) =>
                setAppointmentData((prev) => ({ ...prev, patient_id: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dentist" className="text-right">
              Odontólogo
            </Label>
            <Select
              onValueChange={(value) =>
                setAppointmentData((prev) => ({ ...prev, dentist_id: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar odontólogo" />
              </SelectTrigger>
              <SelectContent>
                {dentists.map((dentist) => (
                  <SelectItem key={dentist.id} value={dentist.id.toString()}>
                    {dentist.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Hora
            </Label>
            <Select onValueChange={(value) => setSelectedTime(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar hora" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="treatment" className="text-right">
              Tratamiento
            </Label>
            <Select
              onValueChange={(value) =>
                setAppointmentData((prev) => ({ ...prev, treatment_id: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar tratamiento" />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((treatment) => (
                  <SelectItem
                    key={treatment.id}
                    value={treatment.id.toString()}
                  >
                    {treatment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleAddAppointment}
            className="cursor-pointer"
          >
            Agendar Cita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdd;
