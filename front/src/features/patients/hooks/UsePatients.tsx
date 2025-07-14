import { useEffect, useState } from "react";
import {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} from "../services";
import { toast } from "sonner";
import type { Patient } from "../interfaces";

const UsePatients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState([]);
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPatients = await getPatients();
      setPatients(fetchedPatients.data);
      toast.success("Pacientes cargados correctamente", {
        duration: 500,
      });
    } catch (err) {
      setError("Error fetching patients");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const addPatient = async (patient: Patient) => {
    setIsLoading(true);
    setError(null);
    try {
      const newPatient = await createPatient(patient);
      setPatients((prev) => [...prev, newPatient.data]);
      toast.success("Paciente agregado correctamente");
    } catch (err) {
      setError("Error adding patient");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const updatePatientData = async (id: number, patient: Patient) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPatient = await updatePatient(id, patient);
      setPatients((prev) =>
        prev.map((p) => (p.id === id ? updatedPatient.data : p))
      );
      toast.success("Paciente actualizado correctamente");
    } catch (err) {
      setError("Error updating patient");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePatientData = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      toast.success("Paciente eliminado correctamente");
    } catch (err) {
      setError("Error deleting patient");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch of patients
  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    isLoading,
    error,
    patients,
    fetchPatients,
    addPatient,
    updatePatient: updatePatientData,
    deletePatient: deletePatientData,
  };
};

export default UsePatients;
