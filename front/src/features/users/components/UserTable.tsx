import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreHorizontal, Shield } from "lucide-react";
import type { User } from "../interfaces";
import { getRoleInfo } from "../utils";
import SkeletonLoaderTableUser from "./SkeletonLoaderTableUser";

const USERS_PER_PAGE = 10;

const UserTable = ({
  setSelectedUser,
  setIsOpenModalEdit,
  setIsOpenModalDelete,
  users = [],
  loading = false,
}: {
  setSelectedUser: (user: User) => void;
  setIsOpenModalEdit: (open: boolean) => void;
  setIsOpenModalDelete: (open: boolean) => void;
  users?: User[];
  loading?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsOpenModalEdit(true);
  };

  const handleDeleteUser = (userId: number) => {
    setSelectedUser(users.find((user) => user.id === userId) || null);
    setIsOpenModalDelete(true);
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  if (loading) {
    return <SkeletonLoaderTableUser />;
  }

  return (
    <Card>
      <CardContent>
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
            {currentUsers.map((user) => {
              const roleInfo = getRoleInfo(user.role);
              const initials = user.full_name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase();

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={user.full_name}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.created_at}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            console.log("Reset password for", user.id)
                          }
                          className="text-blue-600"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Restablecer contraseña
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Siguiente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTable;
