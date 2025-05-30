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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmileIcon as Tooth } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const { register, loading } = useAuthStore();
  const [credentials, setCredentials] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "dentist", // Valor por defecto
  });
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (loading) return; // Evita múltiples clics si ya está cargando
    if (!credentials.full_name || !credentials.email || !credentials.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    await register({
      full_name: credentials.full_name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
    });
    // Redirige al usuario a la página de dashboard después de registrarse
    navigate("/dashboard");
  };
  console.log("RegisterForm credentials:", credentials);
  return (
    <Card className="w-full shadow-xl max-w-md mx-auto mt-10">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <Tooth className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-gray-600">
          Regístrate para acceder a DentalCare Pro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Nombre completo</Label>
          <Input
            id="full_name"
            type="text"
            placeholder="Dr. Juan Pérez"
            value={credentials.full_name}
            onChange={(e) =>
              setCredentials({ ...credentials, full_name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="doctor@clinica.com"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Rol</Label>
          <Select
            value={credentials.role}
            onValueChange={(value) =>
              setCredentials({ ...credentials, role: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dentist">Dentista</SelectItem>
              <SelectItem value="receptionist">Recepcionista</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Crear Cuenta"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Inicia sesión aquí
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
