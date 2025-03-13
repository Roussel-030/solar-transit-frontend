import { Role } from "./Role";

export type RegisterRequest = {
  id?: number;
  username: string;
  password: string;
  role: Role;
};

export type RegisterResponse = {
  access_token: string;
  token_type?: string;
};
