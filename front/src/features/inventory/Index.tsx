import { useState } from "react";
import ModalAdd from "./components/ModalAdd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import InventoryTable from "./components/InventoryTable";
import useInventory from "./hooks/useInventory";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { addItem, items, loading, updateItem, deleteItem } = useInventory();
  const filteredInventory = items.filter(
    (item) =>
      item.material_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.proveedor?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-2">
      <Card className="md:flex-row justify-between items-center p-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventario de Materiales
          </h1>
          <p className="text-gray-600">
            Gestiona el stock de materiales y suministros
          </p>
        </div>
        <div className="max-md:flex-col flex space-x-2 space-y-1">
          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <Input
              placeholder="Buscar por nombre, categoría o proveedor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ModalAdd
            isDialogOpen={isModalAddOpen}
            setIsDialogOpen={setIsModalAddOpen}
            addItem={addItem}
            loading={loading}
          />
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Materiales</CardTitle>
          <CardDescription>
            {filteredInventory.length} materiales en inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryTable
            inventory={filteredInventory}
            setSelectedItem={setSelectedItem}
            setIsModalEditOpen={setIsModalEditOpen}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
          />
        </CardContent>
      </Card>
      <ModalEdit
        isOpen={isModalEditOpen}
        setIsOpen={setIsModalEditOpen}
        onUpdate={updateItem}
        loading={loading}
        item={selectedItem}
      />
      <ModalDelete
        isOpen={isModalDeleteOpen}
        setIsOpen={setIsModalDeleteOpen}
        item={selectedItem}
        onConfirm={deleteItem}
      />
    </div>
  );
};

export default InventoryPage;
