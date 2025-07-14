import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoaderPaymentTable = () => {
  const rows = Array.from({ length: 8 });

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Tratamiento</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-40 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SkeletonLoaderPaymentTable;
