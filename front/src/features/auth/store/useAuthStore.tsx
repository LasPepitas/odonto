import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, register } from "../services";
import { toast } from "sonner";
import type { Credentials, UserRequestRegister } from "../interfaces";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      token: null,
      login: async (credentials: Credentials) => {
        set({ loading: true });
        try {
          const { user, access_token } = await login(credentials);
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            loading: false,
          });
          toast.success("Iniciando sesión correctamente");
        } catch (error) {
          console.error("Error de autenticación:", error);
          toast.error(
            "Error de autenticación, por favor verifica tus credenciales"
          );
          set({ loading: false });
          throw error;
        }
      },
      register: async (userData: UserRequestRegister) => {
        set({ loading: true });
        try {
          const user = await register(userData);
          set({ user, isAuthenticated: true, loading: false });
          toast.success("Registro exitoso, iniciando sesión");
        } catch (error) {
          console.error("Error de registro:", error);
          toast.error("Error de registro, por favor verifica tus datos");
          set({ loading: false });
          throw error;
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // unique name for the storage
    }
  )
);

export default useAuthStore;
