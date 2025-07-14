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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, loading } = useAuthStore() as AuthStore;

  const handleLogin = async () => {
    if (loading) return;
    if (!credentials.email || !credentials.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    await login({
      email: credentials.email,
      password: credentials.password,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-md shadow-2xl border border-blue-100">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full animate-bounce">
              <Tooth className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Bienvenido a DentalCare Pro
          </CardTitle>
          <CardDescription className="text-gray-500">
            Accede a tu cuenta para gestionar tu clínica
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="doctor@clinica.com"
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
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="pr-10"
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
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
          <p className="text-sm text-gray-600 text-center">
            ¿No tienes cuenta?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Regístrate aquí
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
