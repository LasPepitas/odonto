import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ModalAddPatient from "./components/ModalAddPatient";
import UsePatients from "./hooks/UsePatients";
import type { UsePatientsReturn, Patient } from "./interfaces";
import { PatientManagement } from "./components/PatientsTable";
import ModalEditPatient from "./components/ModalEditPatient";
import ModalDeletePatient from "./components/ModalDeletePatient";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { patients, addPatient, isLoading, updatePatient, deletePatient } =
    UsePatients() as UsePatientsReturn;
  const filteredPatients = patients.filter(
    (patient) =>
      patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );
  return (
    <div className="space-y-6">
      {/* Patients Table */}
      <Card>
        <CardHeader>
          <div className="flex max-md:flex-col justify-between items-center">
            <div className="flex-row">
              <CardTitle>Lista de Pacientes</CardTitle>
              <CardDescription>
                {filteredPatients.length} pacientes encontrados
              </CardDescription>
            </div>
            <div className="max-md:flex-col flex space-x-2 space-y-1 mt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                <Input
                  placeholder="Buscar pacientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ModalAddPatient
                isDialogOpen={isModalAddOpen}
                setIsDialogOpen={setIsModalAddOpen}
                addPatient={addPatient}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PatientManagement
            setModalEditOpen={setIsModalEditOpen}
            setModalDeleteOpen={setIsModalDeleteOpen}
            setSelectedPatient={setSelectedPatient}
            searchTerm={searchTerm}
            patients={filteredPatients}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <ModalEditPatient
        isOpen={isModalEditOpen}
        setIsOpen={setIsModalEditOpen}
        selectedPatient={selectedPatient}
        updatePatient={updatePatient}
        isLoading={isLoading}
      />
      <ModalDeletePatient
        isOpen={isModalDeleteOpen}
        setIsOpen={setIsModalDeleteOpen}
        selectedPatient={selectedPatient}
        deletePatient={deletePatient}
        isLoading={isLoading}
      />
    </div>
  );
}
