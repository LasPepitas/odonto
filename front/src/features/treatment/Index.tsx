import { useState } from "react";
import TableTreatments from "./components/TableTreatments";
import ModalAdd from "./components/ModalAdd";
import { Card } from "@/components/ui/card";
import useTreatments from "./hooks/useTreatments";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import type { Treatment } from "./interfaces";
const TreatmentsPage = () => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const {
    treatments,
    addTreatment,
    updateTreatmentById,
    deleteTreatmentById,
    isLoading,
  } = useTreatments();
  return (
    <div className="space-y-1">
      <Card className="flex md:flex-row items-center justify-between p-4 bg-white shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Tratamientos
          </h1>
          <p className="text-gray-600">
            Administra los tratamientos y procedimientos
          </p>
        </div>
        <div className="md:mt-4">
          <button
            onClick={() => setIsOpenModalAdd(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Agregar Tratamiento
          </button>
        </div>
      </Card>
      <TableTreatments
        treatments={treatments}
        isLoading={isLoading}
        setIsOpenModalEdit={setIsOpenModalEdit}
        setIsOpenModalDelete={setIsOpenModalDelete}
        setSelectedTreatment={setSelectedTreatment}
      />
      <ModalAdd
        isOpenModalAdd={isOpenModalAdd}
        setIsOpenModalAdd={setIsOpenModalAdd}
        addTreatment={addTreatment}
        isLoading={isLoading}
      />
      <ModalEdit
        isOpen={isOpenModalEdit}
        setIsOpen={setIsOpenModalEdit}
        selectedTreatment={selectedTreatment}
        updateTreatmentById={updateTreatmentById}
        isLoading={isLoading}
      />
      <ModalDelete
        isOpen={isOpenModalDelete}
        setIsOpen={setIsOpenModalDelete}
        selectedTreatment={selectedTreatment}
        isLoading={isLoading}
        setSelectedTreatment={setSelectedTreatment}
        deleteTreatmentById={deleteTreatmentById}
      />
    </div>
  );
};

export default TreatmentsPage;
