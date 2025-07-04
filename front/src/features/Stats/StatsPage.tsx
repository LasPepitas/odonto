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
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Pacientes",
    value: "1,234",
    description: "+12% desde el mes pasado",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Citas Hoy",
    value: "23",
    description: "5 pendientes",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Tratamientos Activos",
    value: "89",
    description: "12 finalizados esta semana",
    icon: Stethoscope,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Alertas Inventario",
    value: "7",
    description: "Materiales con stock bajo",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

const todayAppointments = [
  {
    time: "09:00",
    patient: "María García",
    treatment: "Limpieza dental",
    status: "confirmada",
  },
  {
    time: "10:30",
    patient: "Carlos López",
    treatment: "Endodoncia",
    status: "en-curso",
  },
  {
    time: "12:00",
    patient: "Ana Martínez",
    treatment: "Ortodoncia",
    status: "pendiente",
  },
  {
    time: "14:30",
    patient: "Luis Rodríguez",
    treatment: "Implante",
    status: "confirmada",
  },
  {
    time: "16:00",
    patient: "Elena Sánchez",
    treatment: "Blanqueamiento",
    status: "pendiente",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmada":
      return "bg-green-100 text-green-800";
    case "en-curso":
      return "bg-blue-100 text-blue-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function StatsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido de vuelta, Dr. Juan Pérez</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Citas de Hoy</CardTitle>
                <CardDescription>
                  {todayAppointments.length} citas programadas
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
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
                      {appointment.time}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {appointment.patient}
                      </div>
                      <div className="text-sm text-gray-600">
                        {appointment.treatment}
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas frecuentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="size-4 mr-2" />
              Nuevo Paciente
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="size-4 mr-2" />
              Agendar Cita
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Stethoscope className="size-4 mr-2" />
              Registrar Tratamiento
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="size-4 mr-2" />
              Ver Alertas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Calendario Semanal</CardTitle>
          <CardDescription>Vista general de la semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
              (day, index) => (
                <div key={day} className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {day}
                  </div>
                  <div
                    className={`h-20 rounded-lg border-2 border-dashed ${index < 5 ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"} flex items-center justify-center`}
                  >
                    {index < 5 && (
                      <div className="text-xs text-blue-600 font-medium">
                        {Math.floor(Math.random() * 8) + 3} citas
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
