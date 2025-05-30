import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { LoginForm } from "./features/auth/components/LoginForm";
import { RegisterForm } from "./features/auth/components/RegisterForm";
import { Toaster } from "./components/ui/sonner";
import UsersPage from "./features/users/UsersPage";
import StatsPage from "./features/Stats/StatsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes />} />
        <Route element={<PublicRoutes />}>
          <Route
            path="/login"
            element={<LoginForm onToggleMode={() => {}} />}
          />
          <Route
            path="/register"
            element={<RegisterForm onToggleMode={() => {}} />}
          />
          <Route path="/forgot-password" element={<PublicRoutes />} />
          <Route path="/reset-password/:token" element={<PublicRoutes />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<StatsPage />} />
          <Route path="/dashboard/usuarios" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<PublicRoutes />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
