import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { LoginForm } from "./features/auth/components/LoginForm";
import { RegisterForm } from "./features/auth/components/RegisterForm";
import { Toaster } from "./components/ui/sonner";
import UsersPage from "./features/users/UsersPage";
import StatsPage from "./features/Stats/StatsPage";
import TreatmentsPage from "./features/treatment/Index";
import PatientsPage from "./features/patients/Index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<PublicRoutes />} />
          <Route path="/reset-password/:token" element={<PublicRoutes />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<StatsPage />} />
          <Route path="/dashboard/usuarios" element={<UsersPage />} />
          <Route path="/dashboard/tratamientos" element={<TreatmentsPage />} />
          <Route path="/dashboard/pacientes" element={<PatientsPage />} />
        </Route>
        <Route path="*" element={<PublicRoutes />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
