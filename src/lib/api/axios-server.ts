import axios from "axios";
import { cookies } from "next/headers";

export const axiosServer = (axios as any).create({
  baseURL: process.env.CMS,
  headers: {
    "Content-Type": "application/json",
  },
  next: { revalidate: 100 },
});
axiosServer.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  (error: any) => Promise.reject(error),
);
