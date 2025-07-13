import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import SidebarLayout from "@/components/layout/Sidebar";
import LoadingPage from "@/components/common/LoaderPage/LoadingPage";
import type { AuthStore } from "@/features/auth/interfaces";
import { appRoutes } from ".";
const PrivateRoutes = () => {
  const { token, isAuthenticated, loading, checkAuth, user } =
    useAuthStore() as AuthStore;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token || !isAuthenticated) {
        navigate("/login");
      }
      if (token) {
        await checkAuth();
      }
    };
    const verifyAccessRoute = () => {
      const allowedRoutes = appRoutes.filter((route) =>
        route.rols.includes(user?.role || "")
      );
      const isAllowedRoute = allowedRoutes.some(
        (route) => route.path === pathname
      );
      if (!isAllowedRoute) {
        navigate("/dashboard/");
      }
    };

    verifyAuth();
    verifyAccessRoute();
  }, [token, checkAuth, isAuthenticated]);
  if (loading) {
    return <LoadingPage />;
  }
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default PrivateRoutes;
