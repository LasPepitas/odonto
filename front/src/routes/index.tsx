import PatientsPage from "@/features/patients/Index";
import { StatsPage } from "@/features/Stats/StatsPage";
import TreatmentsPage from "@/features/treatment/Index";
import UsersPage from "@/features/users/UsersPage";
import {
  UserPlus,
  Calendar,
  FileText,
  DollarSign,
  Box,
  UserCog,
  BarChart,
} from "lucide-react";

export const appRoutes = [
  {
    path: "/dashboard/",
    label: "Inicio",
    rols: ["admin", "dentist", "receptionist"],
    element: <StatsPage />,
    icon: null,
  },
  {
    path: "/dashboard/pacientes",
    label: "Pacientes",
    rols: ["admin", "dentist", "receptionist"],
    element: <PatientsPage />,
    icon: UserPlus,
  },
  {
    path: "/dashboard/citas",
    label: "Citas",
    rols: ["admin", "dentist", "receptionist"],
    element: <div>Citas</div>, // reemplazar por: <AppointmentsPage />
    icon: Calendar,
  },
  {
    path: "/dashboard/tratamientos",
    label: "Tratamientos",
    rols: ["admin", "dentist"],
    element: <TreatmentsPage />,
    icon: FileText,
  },
  {
    path: "/dashboard/pagos",
    label: "Pagos",
    rols: ["admin", "receptionist"],
    element: <div>Pagos</div>, // reemplazar por: <PaymentsPage />
    icon: DollarSign,
  },
  {
    path: "/dashboard/inventario",
    label: "Inventario",
    rols: ["admin"],
    element: <div>Inventario</div>, // reemplazar por: <InventoryPage />
    icon: Box,
  },
  {
    path: "/dashboard/usuarios",
    label: "Usuarios",
    rols: ["admin"],
    element: <UsersPage />,
    icon: UserCog,
  },
  {
    path: "/dashboard/reportes",
    label: "Reportes",
    rols: ["admin"],
    element: <div>Reportes</div>, // reemplazar por: <ReportsPage />
    icon: BarChart,
  },
];
