export interface Patient {
  id?: number;
  full_name: string;
  dni: string;
  phone: string;
  address: string;
  birth_date: string;
}
export interface UsePatientsReturn {
  isLoading: boolean;
  error: string | null;
  patients: Patient[];
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => Promise<void>;
}
