import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const SkeletonLoaderTableUser = () => {
  return (
    <Card>
      <CardContent className="animate-pulse">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 7 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 bg-gray-300 rounded-full" />
                    <div>
                      <div className="w-32 h-4 bg-gray-300 rounded mb-1" />
                      <div className="w-24 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-20 h-4 bg-gray-300 rounded" />
                </TableCell>
                <TableCell>
                  <div className="w-24 h-4 bg-gray-300 rounded" />
                </TableCell>
                <TableCell>
                  <div className="w-8 h-8 bg-gray-300 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SkeletonLoaderTableUser;
