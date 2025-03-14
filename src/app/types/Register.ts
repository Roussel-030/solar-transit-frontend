import { Role } from "./Role";

export type RegisterRequest = {
  id?: number;
  username: string;
  password: string;
  role: Role;
  created_at?: Date;
};

export type RegisterResponse = {
  access_token: string;
  token_type?: string;
};

export type UserResponse = {
  count: number;
  data: RegisterRequest[];
};
