import { Credentials, User } from "../types";
import api from "./client";

//Auth Service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const logout = () => api.post("/auth/logout");

export const self = async (): Promise<User> => {
  const data: User = await api.get("/auth/self");
  return data ?? {};
};

export const getUsers = async (): Promise<readonly User[]> => {
  const data: readonly User[] = await api.get("/users");
  return data ?? [] ;
};

export const createUser = async (user: User) => {
  await api.post("/users", user);
}; 