import axios from "axios";
import { interceptorError } from "./refresh-token";

export const AxiosController = axios.create({
  baseURL: process.env.CONTROLLER,
  headers: {
    "Content-Type": "application/json",
  },
});
export const AxiosServerController = axios.create({
  baseURL: process.env.CONTROLLER,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosController.interceptors.response.use(function (response: any) {
  return response.data;
}, interceptorError);

AxiosController.interceptors.request.use(function (config: any) {
  const token = window?.localStorage?.getItem("auth_token");
  if (config.url === "/users/me" && !token) return false;
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export const fetcherController = (url: string, params: any) => AxiosController.get(url, { params });
export default AxiosController;
