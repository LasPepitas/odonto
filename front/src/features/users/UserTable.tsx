import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  UserPlus,
  Shield,
} from "lucide-react";
import { getUsers } from "./services";
const UserTable = () => {
  // Estado inicial con los usuarios que proporcionaste
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "dr.juarez@clinicapp.com",
      full_name: "Dr. Luis Juárez",
      role: "dentist",
      created_at: "2025-05-29 21:50:03",
      status: "active",
      last_login: "2025-05-30 10:00:00",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Función para obtener información del rol
  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return { label: "Administrador", color: "bg-purple-500" };
      case "dentist":
        return { label: "Dentista", color: "bg-blue-500" };
      default:
        return { label: role, color: "bg-gray-500" };
    }
  };

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Filtrar usuarios basado en el término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers para las acciones
  const handleEditUser = (user) => {
    console.log("Edit user:", user);
    // Aquí iría la lógica para editar el usuario
  };

  const handleDeleteUser = (id) => {
    console.log("Delete user with id:", id);
    // Aquí iría la lógica para eliminar el usuario
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Lista de Usuarios</CardTitle>
            <CardDescription>
              {filteredUsers.length} usuarios encontrados
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                className="pl-8 w-[200px]"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo usuario
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* Contenido del diálogo para agregar nuevo usuario */}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
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
                    <div className="text-sm">N/A</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === "active"
                        ? "Activo"
                        : user.status === "inactive"
                          ? "Inactivo"
                          : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.last_login}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.created_at}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
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
      </CardContent>
    </Card>
  );
};

export default UserTable;
