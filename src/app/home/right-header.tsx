"use client";
import { useAuth } from "@/hook/auth";
import { ButtonPink } from "@/ui/button";
import { BellIcon, UploadOvanIcon } from "@/ui/icons/action";
import Link from "next/link";
import useOnClickOutside from "@/hook/outside";
import { useRef, useState } from "react";
import ModalView from "@/ui/modal";
import UploadProject from "@/ui/upload-project";
import Notify from "@/ui/notify";
import Profile from "@/ui/profile";
import { ImageCMS } from "@/ui/image";
import AxiosClient from "@/lib/api/axios-client";
import { useEffect } from "react";
import ConfirmLogout from "@/components/modal/confirmLogout";
import { isMobile } from "react-device-detect";

const RightHeader = () => {
  const [modal, setModal] = useState(false);
  const [modalProfle, setModalProfile] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [notiListUnseen, setUnseenList] = useState<any[]>([]);

  const [upload, setUpload] = useState(false);
  const [activeNoti, setActiveNoti] = useState(0);
  const [activeProfile, setActiveProfile] = useState(0);
  const { logout, isLogin, profile } = useAuth();

  const ref = useRef<any>();
  const ref2 = useRef<any>();

  useOnClickOutside(ref, () => {
    setModal(false);
  });
  useOnClickOutside(ref2, () => {
    setModalProfile(false);
  });
  useEffect(() => {
    if (profile) {
      updateNoti();
    }
  }, [profile]);
  const updateNoti = () => {
    if (profile?.id) {
      AxiosClient.get(`/items/notifications?filter[status]=unseen&filter[target_user_id]=${profile?.id}&sort=-id`).then(
        (res: any) => {
          if (res) {
            const filterUnseen = res?.data.filter((item: any) => item.source_user_id !== profile?.id);
            setUnseenList(filterUnseen);
          }
        },
      );
    }
  };

  const login = () => {
    const loginUrl = `${process.env.CMS}/auth/login/google?redirect=${process.env.CMS}/api/redirect-with-token?redirect_fe=${window.location.origin}/login`;
    window.location.replace(loginUrl);
  };

  const logoutConfirm = () => {
    setLogout(true);
  };
  const actionLogout = async (status: any) => {
    if (status) {
      await logout();
    }
  };
  if (isLogin)
    return (
      <div className="action flex items-center animate-page">
        <Link href="search" className="block md:hidden">
          <img src="/images/header/glass.png" className="w-[30px] cursor-pointer" />
        </Link>
        <Link href="/leaderboard" className="md:mr-[32px] hidden md:block">
          <div className="w-[40px] h-[40px] md:w-[87px] md:h-[50px] md:bg-[url(/images/leaderboard.png)] bg-[url(/images/leaderboard-mb.png)] bg-no-repeat bg-contain"></div>
        </Link>
        <ModalView open={isLogout} toggle={() => setLogout(false)}>
          <ConfirmLogout action={actionLogout} isLogout={isLogout} toggle={() => setLogout(false)}></ConfirmLogout>
        </ModalView>
        {!isMobile && (
          <ButtonPink className="" onClick={() => setUpload(true)} icon={UploadOvanIcon}>
            Tải dự án
          </ButtonPink>
        )}

        <ModalView open={upload} toggle={() => setUpload(false)}>
          <UploadProject data={{}} close={() => setUpload(false)} />
        </ModalView>
        <Link href="search" className="hidden md:block">
          <img src="/images/header/glass.png" className="w-[30px] cursor-pointer ml-[37px]" />
        </Link>
        <div className="relative ml-7 cursor-pointer hidden md:block" ref={ref} onClick={() => setModal(true)}>
          <BellIcon className="" />
          {notiListUnseen?.length ? (
            <div
              className="absolute bottom-4 right-[-6px] px-[2px] min-w-[18px] min-h-[18px] rounded-full bg-pink text-11-bold text-white flex items-center justify-center"
              style={{ lineHeight: "17px" }}
            >
              {notiListUnseen?.length >= 100 ? "99+" : notiListUnseen?.length}
            </div>
          ) : (
            ""
          )}

          {modal && (
            <Notify updateNoti={updateNoti} setModal={setModal} profile={profile} setActiveNoti={setActiveNoti} activeNoti={activeNoti} />
          )}
        </div>
        <div className="ml-7 w-12 h-22 cursor-pointer items-center hidden md:block relative" ref={ref2}>
          <div>
            <div onClick={() => setModalProfile(true)} className="w-12 h-12">
              <ImageCMS
                src={profile?.avatar}
                width={100}
                height={100}
                className="w-full h-full rounded-full border-[1.5px] border-white shadow"
              />
            </div>
          </div>
          {modalProfle && (
            <Profile action={logoutConfirm} setModalProfile={setModalProfile} activeProfile={activeProfile} profile={profile} />
          )}
        </div>
      </div>
    );

  if (isLogin === false)
    return (
      <div className="action ml-auto flex justify-end items-center animate-page">
        <Link href="/leaderboard" className="md:mr-[32px]">
          <img src="/images/leaderboard.png" className="w-[87px]" />
        </Link>
        <Link href="search">
          <img src="/images/header/glass.png" className="w-[30px] cursor-pointer ml-[0px]" />
        </Link>
        <div
          onClick={login}
          className="cursor-pointer bg-pink ml-[40px] text-white py-[13px] px-[32px] rounded-[10px] text-[13px] font-[800]"
          style={{
            boxShadow:
              "5px 10px 20px rgba(134, 153, 168, 0.2), inset 0px -3px 8px rgba(255, 255, 255, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          Đăng nhập
        </div>
      </div>
    );
  return null;
};
export default RightHeader;
