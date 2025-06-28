import {
  UserPlus,
  Calendar,
  FileText,
  DollarSign,
  Box,
  UserCog,
  BarChart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { Link } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";

// Menú para sistema odontológico.
const items = [
  {
    title: "Pacientes",
    url: "/dashboard/pacientes",
    icon: UserPlus,
  },
  {
    title: "Citas",
    url: "/dashboard/citas",
    icon: Calendar,
  },
  {
    title: "Tratamientos",
    url: "/dashboard/tratamientos",
    icon: FileText,
  },
  {
    title: "Pagos",
    url: "/dashboard/pagos",
    icon: DollarSign,
  },
  {
    title: "Inventario",
    url: "/dashboard/inventario",
    icon: Box,
  },
  {
    title: "Usuarios",
    url: "/dashboard/usuarios",
    icon: UserCog,
  },
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: BarChart,
  },
];
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/dashboard/avatars/shadcn.jpg",
  },
};
export function AppSidebar() {
  const { user } = useAuthStore();
  console.log("AppSidebar user", user);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-fit">
            Menú Odontológico
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col h-full justify-between">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={window.location.pathname === item.url}
                  >
                    <Link
                      to={item.url}
                      className="flex items-center space-x-2 text-black hover:!bg-blue-600 hover:text-white font-bold p-2 rounded transition-colors duration-200"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
