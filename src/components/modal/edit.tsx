"use client";
import { ImageCMS } from "@/ui/image";
import { Button, ButtonPink } from "@/ui/button";
import Link from "next/link";
import Input from "@/ui/form/input";
import TextArea from "@/ui/form/textarea";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import AxiosController, { fetcherController } from "@/lib/api/axios-controller";
import useSWR from "swr";
import { MyImage } from "@/ui/image";
import { useState } from "react";
import { useToast } from "@/hook/use-toast";
import { checkName, getErrCode } from "@/lib/helper";

const EditProfile = ({ profile, toggle, updateProfile }: any) => {
  const { toggleToast }: any = useToast();
  const [info, setInfo] = useState({
    nickname: profile?.user_meta_id.nick_name,
    avatar: profile?.avatar,
    description: profile?.user_meta_id?.introduction,
    cover: profile?.user_meta_id?.cover_image,
  });

  const [error, setError]: any = useState("");
  const [errorBio, setErrorBio]: any = useState("");
  const [disable, setDisable]: any = useState(false);
  const { data: list } = useSWR("/items/avatars", fetcherClient);
  const { data: coverLists } = useSWR("/items/cover_image", fetcherClient);
  const listAvatar = list?.data || [];
  const handleFinish = async () => {
    let error = "";

    if (!info?.nickname) error = "Vui lòng nhập nickname";
    const check = info?.nickname && checkName(info?.nickname);
    if (!check) error = "Nickname không hợp lệ, Nickname không được chứa ký tự đặt biệt, bạn hãy thử lại nhé !";
    if (error) {
      setError(error);
      setDisable(false);
      return;
    }
    try {
      const user_meta: any = await AxiosController.patch(`/api/v1/me/meta-data`, {
        nick_name: info?.nickname,
        cover_image: info?.cover,
        introduction: info?.description,
      });
      if (!user_meta?.data) return;
      await AxiosClient.patch("/users/" + profile?.id, {
        avatar: info?.avatar,
        user_meta_id: user_meta?.data.id,
      });
      toggleToast({
        show: true,
        status: "success",
        message: "Bạn đã cập nhật trang cá nhân thành công",
        time: 5000,
      });
      if (updateProfile) updateProfile();
      if (toggle) toggle();
      setDisable(false);
    } catch (error: any) {
      const errCode = error?.response?.data?.code || "";
      if (getErrCode[errCode] as any) {
        if (errCode === "PROFANITY_WORD_FOUND_IN_INTRODUCTION") {
          setErrorBio(getErrCode[errCode]);
          setDisable(false);
        } else {
          setError(getErrCode[errCode]);
          setDisable(false);
        }
      } else {
        toggleToast({
          show: true,
          status: "fail",
          message: "Bạn đã cập nhật trang cá nhân thất bại",
          time: 5000,
        });
        if (toggle) toggle();
        setDisable(false);
      }
    }
  };
  const finish = () => {
    setError("");
    setErrorBio("");
    if (!disable) {
      setDisable(true);
      queueMicrotask(handleFinish);
    }
  };
  return (
    <div className="w-[calc(100vw-40px)] mx-auto xl:mx-0  xl:w-[843px] max-h-[95vh] overflow-scroll bg-white rounded-md md:rounded-[16px] px-3 py-6 md:p-[24px] scroll-none">
      <p className="body-18-bold text-blue">Chỉnh sửa thông tin cá nhân</p>
      <div>
        <p className="text-blue mt-[12px]">Nickname</p>
        <div className="relative">
          <Input
            className="w-full bg-[#DEF8FF]"
            type="text"
            defaultValue={info?.nickname}
            value={info?.nickname}
            onChange={(e: any) => {
              const value = e.target.value;
              if (value.length > 20) return;
              setInfo({
                ...info,
                nickname: value,
              });
            }}
            error={error}
          />
          <div className="absolute text-[13px] leading-5 font-bold mt-1 text-[#818181] top-[14px] right-0 pr-3">
            <span className={"animate " + (info?.nickname?.length >= 20 ? "text-pink " : "")}>{info?.nickname?.length || 0}/20 ký tự </span>
          </div>
        </div>
        <p className="text-blue mt-[12px]">Mô tả về bạn</p>
        <div className="relative">
          <TextArea
            className="w-full bg-[#DEF8FF] rounded-[5px] mt-[4px] min-h-[81px] pr-[100px]"
            type="text"
            disabled={false}
            defaultValue={info?.description}
            value={info?.description}
            onChange={(e: any) => {
              if (e.target.value.length > 140) return;
              setInfo({
                ...info,
                description: e.target.value,
              });
            }}
            error={errorBio}
          />
          <div className="absolute text-[13px] leading-5 font-bold mt-1 text-[#818181] top-[14px] right-0 pr-3">
            <span className={"animate " + (info?.description?.length >= 140 ? "text-pink " : "")}>
              {info?.description?.length || 0}/140 ký tự{" "}
            </span>
          </div>
        </div>
      </div>
      <p className="text-blue mt-[12px]">Chọn hình đại diện</p>
      <div className="grid grid-cols-4 md:grid-cols-5 mt-[12px] gap-y-[15px] min-h-[100px]">
        {listAvatar.map((item: any) => (
          <div key={item.image} className="relative flex justify-center items-center">
            <div
              onClick={() =>
                setInfo({
                  ...info,
                  avatar: item.image,
                })
              }
              className={`${
                item.image === info?.avatar ? "outline outline-offset-1 outline-[2px] shadow-avatar" : "shadow"
              } relative cursor-pointer  overflow-hidden rounded-full  md:mr-[35px] `}
            >
              <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
                <ImageCMS className="w-full h-full object-cover" width={"120"} height="120" src={item.image} />
              </div>
            </div>
            {item.image === info?.avatar && <img src="/images/icons/tick.png" className="w-[20px] absolute md:right-[36px] right-[-2px]" />}
          </div>
        ))}
      </div>
      <div>
        <p className="text-blue mt-[12px] mb-[4px]">Chọn hình bìa</p>
        <div className="grid  md:grid-cols-2 gap-3 md:gap-[15px]">
          {coverLists?.data?.map((item: any) => (
            <div key={item?.thumnail} className="relative max-w-[99%]">
              <div
                onClick={() =>
                  setInfo({
                    ...info,
                    cover: item?.thumnail,
                  })
                }
                className={`cursor-pointer ${item?.thumnail === info?.cover && "outline outline-offset-1 outline-[2px] rounded-[10px]"}`}
              >
                <div className="relative focus-visible:outline-[transparent] rounded-[10px] overflow-hidden w-full" key={item?.id}>
                  <ImageCMS width="1146" height="300" src={item?.thumnail} className="object-cover w-full" />
                </div>
              </div>
              {item?.thumnail === info?.cover && <img src="/images/icons/tick.png" className="w-[20px] absolute right-[-11px] top-[40%]" />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-[22px]">
        <Button type="outlined" className="mr-[16px]" onClick={toggle}>
          Huỷ
        </Button>
        <Button onClick={finish} className={disable ? "opacity-[0.5] cursor-wait" : ""}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};
export default EditProfile;
