import api from "@/lib/axios";
import { RegisterDto } from "../types/register-dto";
import { LoginDto } from "../types/login-dto";

export const register = async (body: RegisterDto) => {
  const response = await api.post("/auth/register", body);
  return response.data;
};

export const login = async (body: LoginDto) => {
  const response = await api.post("/auth/login", body);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};