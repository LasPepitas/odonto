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

export interface AuthStore {
  user: UserRequestRegister | null;
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  register: (userData: UserRequestRegister) => Promise<void>;
  logout: () => void;
}
