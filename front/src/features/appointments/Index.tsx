import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalAdd from "./components/ModalAdd";
import ModalEventDetails from "./components/ModalEventDetails";
import useAppointments from "./hooks/useAppointments";
import { convertAppointmentsToEvents } from "./utils";
import type { UseAppointmentsReturn } from "./interfaces";
import useAuthStore from "../auth/store/useAuthStore";

moment.locale("es");
const localizer = momentLocalizer(moment);

const messagesCalendar = {
  week: "Semana",
  work_week: "Semana de trabajo",
  day: "Día",
  month: "Mes",
  previous: "Atrás",
  next: "Después",
  today: "Hoy",
  agenda: "El Diario",
  noEventsInRange: "No hay eventos en este rango",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total) => `+${total} más`,
};

const AppointmentsPage = () => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const { user } = useAuthStore();
  console.log("User:", user);
  const { appointments, addAppointment, loading, fetchAppointments } =
    useAppointments() as UseAppointmentsReturn;
  // const events = convertAppointmentsToEvents(appointments);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };
  useEffect(() => {
    if (user?.dentist_id) {
      fetchAppointments({ dentist_id: user.dentist_id });
    }
  }, [fetchAppointments]);
  useEffect(() => {
    if (appointments.length > 0) {
      setEvents(convertAppointmentsToEvents(appointments));
    }
  }, [appointments]);
  return (
    <div className="min-h-screen pb-4 space-y-2">
      <Card className="flex flex-row items-center justify-between p-4 bg-white shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600">
            Programa y administra las citas de tus pacientes
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsModalAddOpen(true)}
        >
          <Plus className="size-4 mr-2" />
          Nueva Cita
        </Button>
      </Card>

      <Card className="p-4">
        <Calendar
          localizer={localizer}
          culture="es"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh" }}
          messages={messagesCalendar}
          onSelectEvent={handleSelectEvent}
        />
      </Card>

      <ModalAdd
        isDialogOpen={isModalAddOpen}
        setIsDialogOpen={setIsModalAddOpen}
        addAppointment={addAppointment}
        loading={loading}
      />

      <ModalEventDetails
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default AppointmentsPage;
