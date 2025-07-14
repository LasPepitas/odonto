import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { LoginForm } from "./features/auth/components/LoginForm";
import { RegisterForm } from "./features/auth/components/RegisterForm";
import { Toaster } from "./components/ui/sonner";
import { appRoutes } from "./routes";

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
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/" replace />}
          />
          <Route
            path="/dashboard/*"
            element={<Navigate to="/dashboard/" replace />}
          />
        </Route>
        <Route path="*" element={<PublicRoutes />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
