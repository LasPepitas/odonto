export const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmada":
      return "bg-green-100 text-green-800";
    case "en-curso":
      return "bg-blue-100 text-blue-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800";
    case "cancelada":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const convertAppointmentToEvent = (appointment: any) => {
  const start = new Date(appointment.appointment_datetime);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // duración de 1 hora

  return {
    title: appointment.treatment?.name || "Cita odontológica",
    start,
    end,
    allDay: false,
    status: appointment.status,
    patient: appointment.patient,
    dentist: appointment.dentist,
    treatment: appointment.treatment,
    id: appointment.id,
  };
};
export const convertAppointmentsToEvents = (appointments: any[]) => {
  return appointments.map(convertAppointmentToEvent);
};
