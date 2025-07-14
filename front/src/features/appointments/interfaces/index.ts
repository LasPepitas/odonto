export interface AppointmentRequest {
  patient_id: number;
  dentist_id: number;
  treatment_id: number;
  appointment_datetime: string;
  status?: "scheduled" | "completed" | "cancelled";
}
export interface UseAppointmentsReturn {
  appointments: AppointmentRequest[];
  loading: boolean;
  error: string | null;
  addAppointment: (appointmentData: AppointmentRequest) => Promise<void>;
  fetchAppointments: () => Promise<void>;
}
