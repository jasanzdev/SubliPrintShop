import { Credentials } from "@/types/types";
import apiClient from "../helpers/apiClient";

export async function Login(credentials: Credentials) {
  const { email, password } = credentials;
  const res = await apiClient.post("/auth/login", { email, password });
  return await res.data;
}

export async function Logout() {
  localStorage.removeItem("accessToken");
}

export async function RefreshAuthToken() {
  const res = await apiClient.post("/auth/refresh");
  const token = res.data.accessToken;
  localStorage.setItem("accessToken", token);
  return token;
}
