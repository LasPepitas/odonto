import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useTreatments from "../hooks/useTreatments";
import type { Treatment } from "../interfaces";

const TableTreatments = ({
  treatments,
  isLoading,
}: {
  treatments: Treatment[];
  isLoading: boolean;
}) => {
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
                      //   onClick={() => handleViewDetails(treatment)}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button variant="outline" size="sm">
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
