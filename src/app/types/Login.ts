import { Role } from "./Role";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type?: string;
  role: Role;
};
