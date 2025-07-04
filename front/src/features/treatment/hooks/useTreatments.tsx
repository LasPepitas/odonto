import { useEffect, useState } from "react";
import {
  createTreatment,
  getTreatments,
  updateTreatment,
  deleteTreatment,
} from "../servicios";
import type { Treatment } from "../interfaces";
const useTreatments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  console.log("treatments from useTreatments", treatments);
  const fetchTreatments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTreatments = await getTreatments();
      setTreatments(fetchedTreatments.data);
    } catch (err) {
      setError("Error fetching treatments");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const addTreatment = async (treatment: Treatment) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTreatment = await createTreatment(treatment);
      setTreatments((prev) => [...prev, newTreatment.data]);
    } catch (err) {
      setError("Error adding treatment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTreatmentById = async (treatment: Treatment) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateTreatment(treatment.id, treatment);
      console.log("updated treatment", updated);
      setTreatments((prev) =>
        prev.map((t) => (t.id === updated.data.id ? updated.data : t))
      );
    } catch (err) {
      setError("Error updating treatment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTreatmentById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTreatment(id);
      setTreatments((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Error deleting treatment");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch of treatments
  useEffect(() => {
    fetchTreatments();
  }, []);

  return {
    isLoading,
    error,
    treatments,
    fetchTreatments,
    addTreatment,
    updateTreatmentById,
    deleteTreatmentById,
  };
};

export default useTreatments;
