import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "../interfaces";
import SkeletonLoaderPaymentTable from "./SkeletonLoaderPaymentTable";

const PaymentTable = ({
  payments = [],
  loading = false,
}: {
  payments: Payment[];
  loading: boolean;
}) => {
  if (loading) {
    return <SkeletonLoaderPaymentTable />;
  }

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
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.patient_name}</TableCell>
                <TableCell>
                  <Badge>{payment.treatment_name}</Badge>
                </TableCell>
                <TableCell>S/ {payment.amount}</TableCell>
                <TableCell>{payment.payment_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentTable;
