import { useEffect, useState } from "react";
import {
  createUser,
  deleteUserById,
  updateUser,
  getUsers,
  getDentists,
} from "../services";
import type { User, UserPayload } from "../interfaces";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dentists, setDentists] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers("");
      setUsers(data);
    } catch (err) {
      setError("Error al obtener usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user: UserPayload) => {
    setLoading(true);
    try {
      const newUser = await createUser(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      setError("Error al crear usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserById = async (id: number, user: UserPayload) => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(id, user);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
    } catch (err) {
      setError("Error al actualizar usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id: number) => {
    setLoading(true);
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError("Error al eliminar usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDentists = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getDentists();
      setDentists(data);
    } catch (err) {
      setError("Error al obtener dentistas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDentists();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUserById,
    removeUser,
    dentists,
    setDentists,
  };
};

export default useUsers;
