import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import SidebarLayout from "@/components/layout/Sidebar";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  const isLoading = false; // Replace with actual loading state logic
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Already redirected in useEffect
  }

  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default PrivateRoutes;
