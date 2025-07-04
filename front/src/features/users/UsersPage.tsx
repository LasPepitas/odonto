import { useState } from "react";
import ModalAddUser from "./components/ModalAddUser";
import UserTable from "./components/UserTable";
import useUsers from "./hooks/useUsers";
import type { User } from "./interfaces";
import ModalEditUser from "./components/ModalEditUser";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ModalDeleteUser from "./components/ModalDeleteUser";
const UsersPage = () => {
  const { addUser, updateUserById, removeUser, fetchUsers, loading, users } =
    useUsers();
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="space-y-1">
      <Card className="flex flex-row p-4 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">{users.length} usuarios registrados</p>
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
          <Button onClick={() => setIsOpenModalAdd(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo usuario
          </Button>
        </div>
      </Card>
      <UserTable
        setSelectedUser={setSelectedUser}
        setIsOpenModalEdit={setIsOpenModalEdit}
        setIsOpenModalDelete={setIsOpenModalDelete}
        users={users.filter((user) =>
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        loading={loading}
      />
      <ModalAddUser
        isOpen={isOpenModalAdd}
        setIsOpen={setIsOpenModalAdd}
        addUser={addUser}
        isLoading={loading}
      />
      <ModalEditUser
        isOpen={isOpenModalEdit}
        setIsOpen={setIsOpenModalEdit}
        selectedUser={selectedUser}
        isLoading={loading}
        setSelectedUser={setSelectedUser}
        updateUserById={updateUserById}
      />
      <ModalDeleteUser
        isOpen={isOpenModalDelete}
        setIsOpen={setIsOpenModalDelete}
        selectedUser={selectedUser}
        isLoading={loading}
        setSelectedUser={setSelectedUser}
        deleteUserById={removeUser}
      />
    </div>
  );
};

export default UsersPage;
