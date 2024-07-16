import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    console.log("--token inside interceptor", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("--Authorization header set:", config.headers.Authorization);
    } else {
      console.log("--No token found in localStorage");
    }
    return config;
  },
  (error: any) => {
    console.log("--Error in request interceptor", error);
    return Promise.reject(error);
  }
);

export default API;
