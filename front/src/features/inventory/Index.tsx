import { useState } from "react";
import ModalAdd from "./components/ModalAdd";
import { inventory } from "./utils";
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
const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
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
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
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
          <InventoryTable inventory={filteredInventory} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
