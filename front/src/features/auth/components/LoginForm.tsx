import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmileIcon as Tooth, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import type { AuthStore } from "../interfaces";
// interface LoginFormProps {
//   onToggleMode: () => void;
// }

// TODO: ARREGLAR ERRORES DE TIPADO

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, loading } = useAuthStore() as AuthStore;
  const handleLogin = async () => {
    if (loading) return; // Evita múltiples clics si ya está cargando
    if (!credentials.email || !credentials.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    await login({
      email: credentials.email,
      password: credentials.password,
    });
    // Redirige al usuario a la página de dashboard después de iniciar sesión
    navigate("/dashboard");
  };

  return (
    <Card className="w-full shadow-xl max-w-md mx-auto mt-10">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <Tooth className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 ">
          DentalCare Pro
        </CardTitle>
        <CardDescription className="text-gray-600">
          Ingresa a tu cuenta para gestionar tu clínica dental
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="doctor@clinica.com"
              className="w-full"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value.toLowerCase(),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pr-10"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Regístrate aquí
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
