import { AxiosErrorResponse, Credentials } from "@/types/types";
import apiClient from "../helpers/apiClient";
import { AxiosError } from "axios";

export async function Login(credentials: Credentials) {
  try {
    const res = await apiClient.post("/auth/login", credentials);
    return {
      success: true,
      user: res.data.user,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return {
          success: false,
          error: {
            error: "Invalid credentials",
            message: "Please check your email and password.",
            statusCode: 400,
          } as AxiosErrorResponse,
        };
      }
      return {
        success: false,
        error: error.response?.data as AxiosErrorResponse,
      };
    }
    return {
      success: false,
      error: {
        error: "An unexpected error occurred",
        message: "Please try again later.",
        statusCode: 500,
      },
    };
  }
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
