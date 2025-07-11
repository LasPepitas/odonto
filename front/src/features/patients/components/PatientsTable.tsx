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
import ModalAddPatient from "./ModalAddPatient";
import UsePatients from "../hooks/UsePatients";
import type { UsePatientsReturn } from "../interfaces";

// const patients = [
//   {
//     id: 1,
//     name: "María García",
//     dni: "12345678A",
//     phone: "+34 666 123 456",
//     email: "maria.garcia@email.com",
//     address: "Calle Mayor 123, Madrid",
//     age: 35,
//     lastVisit: "2024-01-15",
//     status: "activo",
//   },
//   {
//     id: 2,
//     name: "Carlos López",
//     dni: "87654321B",
//     phone: "+34 666 789 012",
//     email: "carlos.lopez@email.com",
//     address: "Avenida Libertad 45, Barcelona",
//     age: 42,
//     lastVisit: "2024-01-10",
//     status: "activo",
//   },
//   {
//     id: 3,
//     name: "Ana Martínez",
//     dni: "11223344C",
//     phone: "+34 666 345 678",
//     email: "ana.martinez@email.com",
//     address: "Plaza España 7, Valencia",
//     age: 28,
//     lastVisit: "2023-12-20",
//     status: "inactivo",
//   },
//   {
//     id: 4,
//     name: "Luis Rodríguez",
//     dni: "55667788D",
//     phone: "+34 666 901 234",
//     email: "luis.rodriguez@email.com",
//     address: "Calle Sol 89, Sevilla",
//     age: 55,
//     lastVisit: "2024-01-12",
//     status: "activo",
//   },
// ];

export function PatientManagement() {
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
  const castDateToAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Pacientes
          </h1>
          <p className="text-gray-600">
            Administra la información de tus pacientes
          </p>
        </div>
      </div>

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.full_name}
                  </TableCell>
                  <TableCell>{patient.dni}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="size-3 mr-1" />
                        {patient.phone}
                      </div>
                      {/* <div className="flex items-center text-sm text-gray-600">
                        <Mail className="size-3 mr-1" />
                        {patient.email}
                      </div> */}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {patient.address}
                  </TableCell>
                  <TableCell>
                    {castDateToAge(patient.birth_date)} años
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
