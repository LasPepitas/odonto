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
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import type { AuthStore } from "@/features/auth/interfaces";
import { appRoutes } from "@/routes";

export function AppSidebar() {
  const { user } = useAuthStore() as AuthStore;
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
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
