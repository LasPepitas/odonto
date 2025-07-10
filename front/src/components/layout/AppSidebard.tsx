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
import { SmileIcon } from "lucide-react";

export function AppSidebar() {
  const { user } = useAuthStore() as AuthStore;
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <SmileIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">DentalCare Pro</span>
                <span className="text-xs">Gestión Dental</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-fit">
            Menú Odontológico
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col h-full justify-between">
            <SidebarMenu>
              {appRoutes
                .filter((item) => item.icon && item.rols.includes(user?.role))
                .map(
                  ({ path, label, icon: Icon }) =>
                    Icon && (
                      <SidebarMenuItem key={path}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === path}
                        >
                          <Link
                            to={path}
                            className="flex items-center space-x-2 text-black hover:!bg-blue-600 hover:text-white font-bold p-2 rounded transition-colors duration-200"
                          >
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                )}
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
