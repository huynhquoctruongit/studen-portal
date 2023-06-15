"use client";
import { useAuth } from "@/hook/auth";
import AxiosClient from "@/lib/api/axios-client";
import { useTracker } from "@/lib/open-replay/contex";
import Loading from "@/ui/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import OnBoarding from "./onboarding";

export default function Login() {
  const router = useRouter();
  const { initTracker, startTracking } = useTracker();
  const { isLogin, profile, getProfile } = useAuth();
  const params: any = useSearchParams();
  useEffect(() => {
    (async () => {
      try {
        const directus_refresh_token = params.get("refresh_token") || localStorage.getItem("refresh_token");
        const res = await AxiosClient.post(`/auth/refresh`, {
          refresh_token: directus_refresh_token,
          mode: "json",
        });

        const { refresh_token, access_token, expires } = res.data;
        localStorage.setItem("auth_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expires", expires);
        await getProfile();
        initTracker();
        startTracking();
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    if (profile?.user_meta_id) router.replace("/");
  }, [profile?.user_meta_id]);

  if (isLogin === null) return <div className="h-[70vh] w-full" />;
  if ((isLogin === true && profile?.user_meta_id) || isLogin === false) {
    return <Loading className="h-[60vh] w-full" key="w11ewe" />;
  }
  if (isLogin === true && !profile?.user_meta_id)
    return (
      <>
        <title>Đăng nhập</title>
        <meta property="og:title" content="Đăng nhập" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Sân chơi dành cho các bạn lập trình viên nhí, giúp học viên rèn luyện vững chắc kĩ năng lập trình thông qua việc thực hành tạo ra sản phẩm & thi đấu cọ sát với bạn bè"
        />
        <meta property="og:image" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        <div className="bg pb-14 animate-page" key="wewe ">
          <div className="max-w-[1146px] mx-auto ">
            <p className="heading text-center text-pink pt-12 mb-10 hidden md:block">
              Đăng nhập để tham gia cộng đồng <br /> Cao thủ ICANTECH nhé
            </p>
            <div className="md:p-[100px] p-6 mx-auto bg-white ">
              <OnBoarding />
            </div>
          </div>
        </div>
      </>
    );
}
