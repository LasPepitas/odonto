import { useEffect, useState } from "react";
import type { AppointmentRequest } from "../interfaces";
import { createAppointment, getAppointments } from "../services";
const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [notPayedAppointments, setNotPaidAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addAppointment = async (appointmentData: AppointmentRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newAppointment = await createAppointment(appointmentData);
      setAppointments((prev) => [...prev, newAppointment]);
    } catch (err) {
      setError("Error al crear cita");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAppointments();
      setAppointments(data.data);
      setNotPaidAppointments(
        data.data.filter((appointment) => appointment.status === "completed")
      );
    } catch (err) {
      setError("Error al obtener citas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);
  return {
    appointments,
    loading,
    error,
    addAppointment,
    fetchAppointments,
  };
};

export default useAppointments;
