import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import PaymentTable from "./components/PaymentTable";
import ModalAddPayment from "./components/ModalAddPayment";
import usePayments from "./hooks/usePayments";
import type { Payment } from "./interfaces";

const PaymentsPage = () => {
  const { addPayment, loading, payments } = usePayments();

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  return (
    <div className="space-y-1">
      <Card className="flex flex-row p-4 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
          <p className="text-gray-600">{payments.length} pagos registrados</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8 w-[200px]"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsOpenModalAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Pago
          </Button>
        </div>
      </Card>
      <PaymentTable
        payments={payments?.filter((payment) =>
          payment?.patient_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )}
        loading={loading}
        setSelectedPayment={setSelectedPayment}
      />
      <ModalAddPayment
        isOpen={isOpenModalAdd}
        setIsOpen={setIsOpenModalAdd}
        addPayment={addPayment}
        isLoading={loading}
      />
      {/* Similar para editar y eliminar si lo necesitas */}
    </div>
  );
};

export default PaymentsPage;
