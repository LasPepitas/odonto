import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import type { AuthStore } from "@/features/auth/interfaces";
import { appRoutes } from "@/routes";
import { SmileIcon, CalendarDays, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useAppointments from "@/features/appointments/hooks/useAppointments";
import { useEffect } from "react";
import useInventory from "@/features/inventory/hooks/useInventory";

export function AppSidebar() {
  const { user } = useAuthStore() as AuthStore;
  const location = useLocation();
  const { appointments, fetchAppointments } = useAppointments();
  const { items, getInventory } = useInventory();
  useEffect(() => {
    if (user?.dentist_id) {
      fetchAppointments({ dentist_id: user.dentist_id });
    } else {
      fetchAppointments();
    }
  }, [user]);
  return (
    <Sidebar>
      <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Header con branding */}
        <SidebarHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-3 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <SmileIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    DentalCare
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Pro Edition
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Menú principal */}
        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Gestión Principal
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu className="space-y-1">
                {appRoutes
                  .filter((item) => item.icon && item.rols.includes(user?.role))
                  .map(({ path, label, icon: Icon, badge }) => (
                    <SidebarMenuItem key={path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === path}
                        className="group relative h-11 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-blue-600 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/25"
                      >
                        <Link
                          to={path}
                          className="flex w-full items-center gap-3 px-3"
                        >
                          <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                          <span className="font-medium">{label}</span>
                          {badge && (
                            <Badge className="ml-auto h-5 px-2 text-xs">
                              {badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Panel de resumen: Citas Hoy */}
          <div className="mt-8 px-3">
            <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 dark:from-emerald-900/20 dark:to-emerald-800/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                  <CalendarDays className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    Citas Hoy
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {
                      appointments.filter(
                        (appointment) =>
                          new Date(
                            appointment.appointment_datetime
                          ).toDateString() === new Date().toDateString()
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de alertas */}
          <div className="mt-4 px-3">
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-4 dark:from-amber-900/20 dark:to-amber-800/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Alertas
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {/* 7 materiales con stock bajo */}
                    <span className="font-bold text-2xl">
                      {
                        items.filter(
                          (item) => item.actual_stock < item.min_stock
                        ).length
                      }{" "}
                    </span>
                    materiales con stock bajo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SidebarContent>

        {/* Footer con el usuario */}
        <SidebarFooter className="border-t border-slate-200/50 p-3 dark:border-slate-700/50">
          <NavUser user={user} />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
