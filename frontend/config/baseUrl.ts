import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
// import {
//   TOKEN_LOCAL_STORAGE,
//   getLocalStorage,
// } from "";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});
// API.post("/api/v1/user",{})
// API.interceptors.request.use(
//   (config: InternalAxiosRequestConfig<any>) => {
//     const token = getLocalStorage(TOKEN_LOCAL_STORAGE);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

export default API;