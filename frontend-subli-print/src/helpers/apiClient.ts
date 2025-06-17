import axios from "axios";

// import { refreshAuthToken } from "./authService";
const apiRestClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_REST,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// apiRestClient.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     if (err.response?.status === 401) {
//       await refreshAuthToken();
//       return apiRestClient(err.config);
//     }
//     return Promise.reject(err);
//   }
// );

export default apiRestClient;
