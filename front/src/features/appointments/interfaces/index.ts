export interface AppointmentRequest {
  patient_id: number;
  dentist_id: number;
  treatment_id: number;
  appointment_datetime: string;
  status?: "scheduled" | "completed" | "cancelled";
}
export interface UseAppointmentsReturn {
  appointments: Appointment[];
  setAppointments: (appointments: AppointmentRequest[]) => void;
  loading: boolean;
  error: string | null;
  addAppointment: (appointmentData: AppointmentRequest) => Promise<void>;
  fetchAppointments: () => Promise<void>;
}
export interface Appointment {
  id: number;
  patient_id: number;
  dentist_id: number;
  treatment_id: number;
  appointment_datetime: string;
  status: "scheduled" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}
