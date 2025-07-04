import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Treatment } from "../interfaces";

const TableTreatments = ({
  treatments,
  isLoading,
  setIsOpenModalEdit,
  setIsOpenModalDelete,
  setSelectedTreatment,
}: {
  treatments: Treatment[];
  isLoading: boolean;
  setIsOpenModalEdit: (open: boolean) => void;
  setIsOpenModalDelete: (open: boolean) => void;
  setSelectedTreatment: (treatment: Treatment | null) => void;
}) => {
  if (isLoading) {
    return (
      <Card className="flex items-center justify-center h-64">
        <CardContent className="flex flex-col items-center justify-center">
          <Loader2 className="ml-2 animate-spin size-10 text-gray-500" />
          <div className="text-gray-500">Cargando tratamientos...</div>
        </CardContent>
      </Card>
    );
  }
  const handleDelete = (treatmentId: number) => {
    setIsOpenModalDelete(true);
    setSelectedTreatment(treatments.find((t) => t.id === treatmentId) || null);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Costo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treatments?.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell className="font-medium">{treatment.name}</TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600 truncate max-w-[200px] lg:max-w-[500px] xl:max-w-none">
                    {treatment.description}
                  </div>
                </TableCell>
                <TableCell className="font-medium">€{treatment.cost}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(treatment.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsOpenModalEdit(true);
                        setSelectedTreatment(treatment);
                      }}
                    >
                      <Edit className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableTreatments;
