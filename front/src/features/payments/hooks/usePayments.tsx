import { useEffect, useState } from "react";
import { getAllPayments, createPayment } from "../services";
import type { Payment, PaymentPayload } from "../interfaces";

const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data } = await getAllPayments();
      setPayments(data.data);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async (paymentData: PaymentPayload) => {
    setLoading(true);
    try {
      const newPayment = await createPayment(paymentData);
      setPayments((prev) => [...prev, newPayment]);
    } catch (error) {
      console.error("Error al registrar pago:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);
  console.log("Payments loaded:", payments);
  return {
    payments,
    loading,
    fetchPayments,
    addPayment,
  };
};

export default usePayments;
