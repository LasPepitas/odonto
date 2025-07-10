export interface Credentials {
  email: string;
  password: string;
}
export enum UserRole {
  DENTIST = "dentist",
  ASSISTANT = "assistant",
  ADMIN = "admin",
}
export interface UserRequestRegister {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}
export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  register: (userData: UserRequestRegister) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
