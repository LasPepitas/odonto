export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}
export interface UserPayload {
  email: string;
  full_name: string;
  role: string;
}

export interface UserPayloadWithPassword extends UserPayload {
  password: string;
}
