import { create } from "zustand";
import { toast } from "sonner";
import type { Appointment, AppointmentRequest } from "../interfaces";
import { createAppointment, getAppointments } from "../services";
import { convertAppointmentToEvent } from "../utils";

interface AppointmentsState {
  appointments: Appointment[];
  notPayedAppointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointment: AppointmentRequest) => Promise<void>;
  setAppointments: (appointments: Appointment[]) => void;
}

const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  notPayedAppointments: [],
  loading: false,
  error: null,

  setAppointments: (appointments) => set({ appointments }),

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await getAppointments();
      set({
        appointments: data.data,
        notPayedAppointments: data.data.filter(
          (appointment) => appointment.status === "completed"
        ),
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las citas");
      set({ error: "Error al obtener citas" });
    } finally {
      set({ loading: false });
    }
  },

  addAppointment: async (appointmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await createAppointment(appointmentData);
      set((state) => ({
        appointments: [...state.appointments, response.data],
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la cita");
      set({ error: "Error al crear cita" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAppointmentsStore;
