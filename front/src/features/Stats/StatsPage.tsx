import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Stethoscope,
  AlertTriangle,
  Plus,
  ChevronRight,
  DollarSign,
  LineChart,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import useAppointments from "@/features/appointments/hooks/useAppointments";
import useInventory from "@/features/inventory/hooks/useInventory";
import usePatients from "@/features/patients/hooks/UsePatients";
import { useNavigate } from "react-router-dom";
import usePayments from "../payments/hooks/usePayments";
import { getStatusColor } from "./utils";

export function StatsPage() {
  const { appointments } = useAppointments();
  const { items: inventory } = useInventory();
  const { patients } = usePatients();
  const { payments } = usePayments();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter(
    (appt) => appt.appointment_datetime.slice(0, 10) === today
  );
  const inventoryAlerts = inventory.filter(
    (item) => item.stock < item.min_stock
  );

  const totalPayments = payments.reduce(
    (acc, payment) => acc + (Number(payment?.amount) || 0),
    0
  );

  const treatmentCounts = appointments
    .filter((appt) => appt.treatment?.name)
    .reduce<Record<string, number>>((acc, appt) => {
      const name = appt.treatment!.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

  const mostCommonTreatmentEntry = Object.entries(treatmentCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const mostCommonTreatment = mostCommonTreatmentEntry?.[0] || "N/A";
  const mostCommonTreatmentCount = mostCommonTreatmentEntry?.[1] || 0;

  const attendedAppointments = appointments.filter(
    (appt) => appt.status === "completed"
  );

  const summaryCards = [
    {
      title: "Total Pacientes",
      value: patients.length.toString(),
      description: "Total registrados en el sistema",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Citas Hoy",
      value: todayAppointments.length.toString(),
      description: `${todayAppointments.filter((a) => a.status !== "finalizada").length} pendientes`,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Citas Atendidas",
      value: attendedAppointments.length.toString(),
      description: "Total finalizadas hasta hoy",
      icon: CheckCircle,
      color: "text-lime-600",
      bgColor: "bg-lime-100",
    },
    {
      title: "Tratamiento más común",
      value: mostCommonTreatment,
      description: `${mostCommonTreatmentCount} veces aplicado`,
      icon: LineChart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pagos Recibidos",
      value: `S/. ${totalPayments.toFixed(2)}`,
      description: "Monto total acumulado",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Alertas Inventario",
      value: inventoryAlerts.length.toString(),
      description: "Materiales con stock bajo",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido de vuelta, Dr. Juan Pérez</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/dashboard/citas")}
        >
          <Plus className="size-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`size-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Citas de Hoy</CardTitle>
                <CardDescription>
                  {todayAppointments.length} citas programadas
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard/citas")}
              >
                Ver todas
                <ChevronRight className="size-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-900 min-w-[60px]">
                      {appointment.appointment_datetime.slice(11, 16)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {appointment.patient?.full_name || "Paciente"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {appointment.treatment?.name || "Tratamiento"}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas frecuentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/pacientes")}
            >
              <Users className="size-4 mr-2" />
              Nuevo Paciente
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/citas")}
            >
              <Calendar className="size-4 mr-2" />
              Agendar Cita
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/tratamientos")}
            >
              <Stethoscope className="size-4 mr-2" />
              Registrar Tratamiento
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/inventario")}
            >
              <AlertTriangle className="size-4 mr-2" />
              Ver Alertas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
