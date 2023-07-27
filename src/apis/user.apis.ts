import { User } from "../models/user.model";

export type LoginRequest = Pick<User, "name" | "email" | "password">;
export type LoginResponse = {
  user: Pick<User, "name" | "email" | "id">;
  token: string;
};

export type RegisterRequest = Pick<User, "name" | "email" | "password">;
export type RegisterResponse = {
  user: Pick<User, "name" | "email" | "id">;
  token: string;
};

export interface GetAllUsersRequest {}
export type GetAllUsersResponse = {
  users: Pick<User, "name" | "email" | "id">[];
};

export interface LogoutRequest {}
export interface LogoutResponse {}
