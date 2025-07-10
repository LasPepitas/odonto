import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "moment/locale/es";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalAdd from "./components/ModalAdd";
import "globalize/lib/cultures/globalize.culture.es";

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Consulta odontológica",
    start: new Date(2025, 6, 15, 10, 0), // 15 julio 2025, 10:00 AM
    end: new Date(2025, 6, 15, 11, 0), // 11:00 AM
    allDay: false,
  },
];

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
      <Calendar
        localizer={localizer}
        culture={"es"}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        messages={messagesCalendar}
        // formats={{
        //   timeGutterFormat: "HH:mm",
        //   eventTimeRangeFormat: ({ start, end }, culture, local) =>
        //     `${local.format(start, "HH:mm")} - ${local.format(end, "HH:mm")}`,
        // }}
      />
      <ModalAdd
        isDialogOpen={isModalAddOpen}
        setIsDialogOpen={setIsModalAddOpen}
      />
    </div>
  );
};

export default AppointmentsPage;
