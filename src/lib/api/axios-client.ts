import axios from "axios";
import { interceptorError } from "./refresh-token";

export const AxiosClient = axios.create({
  baseURL: process.env.CMS,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosClient.interceptors.response.use(function (response: any) {
  return response?.data;
}, interceptorError);

AxiosClient.interceptors.request.use(function (config: any) {
  const token = window?.localStorage?.getItem("auth_token");
  if (config.url.includes("/users/me") && !token) return null;
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export const fetcherClient = (url: string, params: any) => AxiosClient.get(url, { params });
export const optionsFetch = {
  fetcher: fetcherClient,
};
export default AxiosClient;
