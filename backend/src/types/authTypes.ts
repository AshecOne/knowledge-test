import User from "../models/User";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
}

export const userToResponse = (user: User): UserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  gender: user.gender,
});

export interface JwtPayload {
  id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  gender: "male" | "female";
}
