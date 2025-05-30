export interface Credentials {
  email: string;
  password: string;
}

export interface UserRequestRegister {
  full_name: string;
  email: string;
  password: string;
  role: "dentist" | "assistant" | "admin"; // Roles disponibles
}
