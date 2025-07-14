import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit, Trash2, Phone } from "lucide-react";
import ModalAddPatient from "./components/ModalAddPatient";
import UsePatients from "./hooks/UsePatients";
import type { UsePatientsReturn } from "./interfaces";
import { PatientManagement } from "./components/PatientsTable";

export function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { patients, addPatient, isLoading } =
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
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                addPatient={addPatient}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PatientManagement
            patients={filteredPatients}
            isLoading={isLoading}
            setIsDialogOpen={setIsDialogOpen}
          />
        </CardContent>
      </Card>
    </div>
  );
}
