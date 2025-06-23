import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import SidebarLayout from "@/components/layout/Sidebar";
const PrivateRoutes = () => {
  const { token, isAuthenticated, loading, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token && !isAuthenticated) {
        navigate("/login");
      }
      if (token && !isAuthenticated) {
        await checkAuth();
      }
    };
    verifyAuth();
  }, [token, checkAuth, navigate]);
  if (loading) {
    return <div>Loading...</div>;
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
