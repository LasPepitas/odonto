export interface Payment {
  id: number;
  appointment_id: number;
  treatment_id: number;
  patient_name: string;
  amount: number;
  payment_date: string;
}
export interface PaymentPayload {
  appointment_id: number;
  treatment_id: number;
  amount: number;
  payment_date: string;
}
