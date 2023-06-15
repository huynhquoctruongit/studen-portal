"use client";
import { useAuth } from "@/hook/auth";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import AxiosController, { fetcherController } from "@/lib/api/axios-controller";
import { Button } from "@/ui/button";
import { MyImage } from "@/ui/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import Input from "@/ui/form/input";
import { checkName, getErrCode, standardizedNickname } from "@/lib/helper";

const OnBoarding = ({ onSuccess, type }: any) => {
  const [avatar, setAvatar] = useState(0);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const ref: any = useRef();
  const patname = usePathname();
  const [loading, setLoading] = useState(false);
  const { profile, getProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    ref?.current?.focus();
  }, []);
  const handleFinish = async () => {
    let error = "";
    if (!nickname) error = "Vui lòng nhập nickname";
    const check = nickname && checkName(nickname);
    if (!check) error = "Nickname không hợp lệ, Nickname không được chứa ký tự đặt biệt, bạn hãy thử lại nhé !";
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    try {
      const user_meta: any = await AxiosController.post("/api/v1/me/meta-data", { nick_name: nickname });
      if (!user_meta?.data) return;
      await AxiosClient.patch("/users/" + profile?.id, { avatar: avatar });
      await getProfile();
      if (patname === "/login") router.push("/");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errCode = error?.response?.data?.code || "";
      if (getErrCode[errCode] as any) {
        setError(getErrCode[errCode]);
      }
    }
    setLoading(false);
  };
  const finish = () => {
    setLoading(true);
    setError("");
    queueMicrotask(handleFinish);
  };
  const { data: list } = useSWR("/items/avatars", fetcherClient);
  const listAvatar = list?.data || [];
  useEffect(() => {
    if (listAvatar.length > 0) {
      setAvatar(listAvatar[0].image);
    }
  }, [listAvatar]);

  const name = profile?.first_name ? profile?.first_name + " " + profile?.last_name : "bạn";
  const editNickName = (e: any) => {
    const value = e.target.value;
    if (value.length > 20) return;
    setNickname(value);
  };
  return (
    <div>
      <p className="text-18-bold md:text-30-bold  md:mb-[74px] text-blue md:leading-[50px]">
        Welcome {name}, mình khởi tạo tài khoản cá nhân tại đây nhé!
      </p>
      <div className="flex justify-center">
        <img className="block md:hidden h-[175px] my-6" src="/images/letgo-login.png" height="175px" />
      </div>
      <div className="flex items-center justify-between">
        <div className="form w-full">
          <div>
            <p className="text-blue">Nickname cool ngầu của bạn là?</p>
            <div className="relative">
              <Input
                className="input-login px-[12px] py-[10px] bg-[#DEF8FF] rounded-[5px] mt-[4px] w-full"
                type="text"
                defaultValue="Nhập nickname của bạn"
                value={nickname}
                onChange={editNickName}
                error={error}
                ref={ref}
              />
              <div className="absolute text-[13px] leading-5 font-bold mt-1 text-[#818181] top-[14px] right-0 pr-3">
                <span className={"animate " + (nickname?.length >= 20 ? "text-pink " : "")}>{nickname?.length || 0}/20 ký tự </span>
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            <p className="text-blue">Lựa chọn avatar để bắt đầu</p>
            <div className="flex items-center mt-8 ">
              {listAvatar.slice(0, 2).map((item: any) => (
                <div key={item.image} className="relative flex items-center">
                  <div
                    onClick={() => setAvatar(item.image)}
                    className={`${
                      item.image === avatar ? "border-[2px] border-blue shadow-avatar" : "shadow"
                    } relative cursor-pointer w-[100px] h-[100px] overflow-hidden rounded-full mr-[35px]`}
                  >
                    <MyImage className="w-full h-full object-cover" width={"100"} height="100" src={item.image} />
                  </div>
                  {item.image === avatar && (
                    <img
                      src="/images/icons/tick.png"
                      className={`w-[30px] absolute ${(type = "popup" ? "right-[22px]" : "right-[25px]")}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-[32px]">
            <Button onClick={loading ? () => {} : finish}>Bắt đầu</Button>
          </div>
          {/* {error && <div className="bg-gray-100 rounded px-3 py-2 font-bold text-[red] mt-4">{error}</div>} */}
        </div>
        <img className="hidden md:block" src="/images/letgo-login.png" width="372px" />
      </div>
    </div>
  );
};

export default OnBoarding;
