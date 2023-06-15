import { axiosServer } from "@/lib/api/axios-server";
import { MetadataRoute } from "next";

export default async function sitemap() {
  const product = await axiosServer.get("/items/projects?limit=10000").catch((res: any) => console.log(res.data));
  const profile = await axiosServer.get("/users?limit=100000").catch((res: any) => console.log(res.data));
  const locProduct =
    product?.data?.map((item: any) => ({ url: "https://club.icantech.vn/detail/" + item.id, lastModified: new Date() })) || [];

  const locProfile =
    profile?.data?.map((item: any) => ({ url: "https://club.icantech.vn/profile?id=" + item.id, lastModified: new Date() })) || [];
  return locProduct.concat(locProfile);
}
