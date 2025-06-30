import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import SidebarLayout from "@/components/layout/Sidebar";
import LoadingPage from "@/components/common/LoaderPage/LoadingPage";
const PrivateRoutes = () => {
  const { token, isAuthenticated, loading, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token || !isAuthenticated) {
        navigate("/login");
      }
      if (token) {
        await checkAuth();
      }
    };
    verifyAuth();
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
