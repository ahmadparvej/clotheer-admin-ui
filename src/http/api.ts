import { Credentials, UpdateUser, User, UsersData } from "../types";
import api from "./client";

//Auth Service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const logout = () => api.post("/auth/logout");

export const self = async (): Promise<User> => {
  const data: User = await api.get("/auth/self");
  return data ?? {};
};

export const getUsers = async (params: string): Promise<UsersData> => {
  const data: UsersData = await api.get(`/users?${params}`);
  return data ?? [] ;
};

export const createUser = async (user: User) => {
  await api.post("/users", user);
};

export const updateUser = async (user: UpdateUser, id: number) => {
  await api.put(`/users/${id}`, user);
};