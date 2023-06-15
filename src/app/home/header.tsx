"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import RightHeader from "./right-header";
import { CloseOutlineIcon, PersonalIcon, BellIcon, UploadOvanIcon } from "@/ui/icons/action";
import useOnClickOutside from "@/hook/outside";
import { useAuth } from "@/hook/auth";
import { ImageCMS } from "@/ui/image";
import { ButtonPink } from "@/ui/button";
import Link from "next/link";
import ModalView from "@/ui/modal";
import ConfirmLogout from "@/components/modal/confirmLogout";
import Notify from "@/ui/notify";
import { SearchIcon } from "public/images/svg";

const Header = () => {
  const ref = useRef<any>();
  const { logout, isLogin, profile } = useAuth();
  const params = usePathname();
  const router = useRouter();
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [isNotify, setNotify] = useState(false);
  const [activeNoti, setActiveNoti] = useState(0);
  const onClick = () => {
    if (params === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      router.refresh();
    }
    if (params !== "/") router.push("/");
  };
  const actionNav = () => {
    if (isNotify) {
      setNotify(false);
    } else {
      setNav(!nav);
    }
  };
  useOnClickOutside(ref, actionNav);
  const actionLogout = (status: any) => {
    if (status) {
      logout();
    }
  };
  const logoutConfirm = () => {
    setLogout(!isLogout);
  };
  const notify = () => {
    setNotify(true);
  };
  const login = () => {
    const loginUrl = `${process.env.CMS}/auth/login/google?redirect=${process.env.CMS}/api/redirect-with-token?redirect_fe=${window.location.origin}/login`;
    window.location.replace(loginUrl);
  };
  useEffect(() => {
    if (nav) actionNav();
  }, [pathname]);
  useEffect(() => {
    if (isNotify) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isNotify]);
  return (
    <div>
      <ModalView open={isLogout} toggle={() => setLogout(false)}>
        <ConfirmLogout action={actionLogout} isLogout={isLogout} toggle={() => logoutConfirm()}></ConfirmLogout>
      </ModalView>
      {nav && (
        <div className="fixed z-[112] w-full h-full top-0">
          <div className="relative z-[112] w-full h-full top-0">
            <div className={`absolute top-0 w-full h-screen ${nav ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(0,0,0,1)]"}`}></div>
            <div ref={ref} className={`absolute w-screen h-screen bg-white  `}>
              <div className=" border-b-[1px] border-[#D6D6D6]">
                <div className="logo flex items-center justify-between h-16 px-3">
                  {isNotify ? (
                    <img className="w-[32px]" src="/images/back.png" onClick={() => actionNav()} />
                  ) : (
                    <CloseOutlineIcon onClick={() => actionNav()} />
                  )}
                  {isNotify ? (
                    <div className="flex items-center" onClick={notify}>
                      <BellIcon />
                      <p className="ml-[10px]">Thông báo</p>
                    </div>
                  ) : (
                    <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
                      <img className="md:w-[153px] w-[123px]" src="/images/header/icantech-logo.svg" />
                      <img src="/images/header/club.png" className="w-[85px] mt-[8px] ml-[10px]" />
                    </div>
                  )}
                  <IconLeaderBoard />
                </div>
              </div>

              {isNotify ? (
                <div className="notify-tab">
                  <Notify isMobile={true} profile={profile} setActiveNoti={setActiveNoti} activeNoti={activeNoti} />
                </div>
              ) : (
                <div className="profile-tab">
                  <div className="w-full h-[calc(100%-200px)]">
                    {isLogin === false ? (
                      <div className="px-5 py-6">
                        <div
                          onClick={login}
                          className="cursor-pointer bg-pink text-white py-[13px] w-full flex justify-center rounded-[10px] text-[13px] font-[800]"
                          style={{
                            boxShadow:
                              "5px 10px 20px rgba(134, 153, 168, 0.2), inset 0px -3px 8px rgba(255, 255, 255, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          Đăng nhập
                        </div>
                        <Link
                          className="flex items-center py-5 mt-4 border-b-[1px] border-lightest-grey"
                          onClick={() => actionNav()}
                          href={`/search`}
                        >
                          <IconSearch className="ml-[3px]" />
                          <p className="ml-[10px]">Tìm kiếm</p>
                        </Link>
                      </div>
                    ) : (
                      <div className="p-[24px]">
                        <div
                          className="flex items-center mb-3 "
                          onClick={() => {
                            router.push("/profile?id=" + profile.id);
                            if (nav) actionNav();
                          }}
                        >
                          <div
                            className="w-[40px] h-[40px] rounded-full overflow-hidden border-[1.5px] border-[#FFFFFF]"
                            style={{
                              filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
                            }}
                          >
                            <ImageCMS src={profile?.avatar} width={300} height={300} className="w-full h-full" />
                          </div>
                          <p className="ml-[12px] body-18-bold text-blue">{profile?.user_meta_id?.nick_name}</p>
                        </div>
                        <div className="divide-y divide-lightest-grey">
                          <Link className="flex items-center py-5" onClick={() => actionNav()} href={`/search`}>
                            <IconSearch className="ml-[3px]" />
                            <p className="ml-[10px]">Tìm kiếm</p>
                          </Link>
                          <Link className="flex items-center py-5" onClick={() => actionNav()} href={`/profile?id=${profile?.id}`}>
                            <PersonalIcon className="ml-[3px]" />
                            <p className="ml-[10px]">Trang cá nhân</p>
                          </Link>
                          <div className="flex items-center py-5" onClick={notify}>
                            <BellIcon />
                            <p className="ml-[10px]">Thông báo</p>
                          </div>
                          <div className="flex items-center py-5" onClick={logoutConfirm}>
                            <LogoutIcon />
                            <p className="ml-[10px]">Đăng xuất</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="sticky top-0 z-[111] bg-white header-nav">
        <div className="bg-white flex justify-between items-center px-3 md:px-5 lg:px-0 md:mx-1 lg:mx-[140px] min-h-[64px]">
          <div className="md:hidden block">
            <img className="w-8" onClick={() => actionNav()} src="/images/nav.png" />
          </div>
          <div className="logo">
            <div onClick={onClick} className="flex items-center cursor-pointer">
              <img className="md:w-[153px] w-[123px]" src="/images/header/icantech-logo.svg" />
              <img src="/images/header/club.png" className="w-[85px] mt-[8px] ml-[10px]" />
            </div>
          </div>
          <div className="md:min-w-[340px] md:flex items-center hidden">
            <RightHeader />
          </div>
          <Link className="md:hidden" href="/leaderboard">
            <IconLeaderBoard className="md:hidden" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;

const IconLeaderBoard = (props: any) => {
  return (
    <svg {...props} width={42} height={42} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_3272_25012)">
        <rect
          width="31.942"
          height="31.8535"
          rx={4}
          transform="matrix(0.999996 -0.00208937 0.00182938 0.999998 5 5.10669)"
          fill="url(#paint0_linear_3272_25012)"
          shapeRendering="crispEdges"
        />
        <rect
          x="-0.500912"
          y="-0.498954"
          width="32.942"
          height="32.8535"
          rx="4.5"
          transform="matrix(0.999996 -0.00208937 0.00182938 0.999998 5.00091 5.10564)"
          stroke="#E81A1A"
          shapeRendering="crispEdges"
        />
      </g>
      <g clipPath="url(#clip0_3272_25012)">
        <g filter="url(#filter1_d_3272_25012)">
          <path
            d="M17.0863 26.9049L21.0517 27.4177L24.9769 26.9049C23.1202 26.9049 22.4689 25.3416 22.3421 23.2732C22.3251 22.9994 22.3177 22.7169 22.3177 22.4283L22.3177 22.2329C21.9061 22.337 21.4636 22.3929 20.988 22.3929C20.5294 22.3929 20.1013 22.3411 19.702 22.2442L19.702 22.4283C19.702 22.7205 19.695 23.0066 19.6784 23.2835C19.5581 25.3467 18.9399 26.9049 17.0863 26.9049Z"
            fill="#FAD207"
          />
          <path
            d="M15.6041 27.9909L15.6041 29.7249L21.0316 30.2377L26.4592 29.7249L26.4592 27.9909C26.4592 27.391 26.0459 26.9049 25.5358 26.9049L16.5274 26.9049C16.1111 26.9049 15.7592 27.229 15.6442 27.674C15.618 27.7745 15.6041 27.8806 15.6041 27.9909Z"
            fill="#FFE043"
          />
          <path
            d="M15.6442 27.6741L25.3693 27.6741C25.6099 27.6741 25.8052 27.9038 25.8052 28.1868L25.8052 29.725L26.4592 29.725L26.4592 27.991C26.4592 27.3911 26.0459 26.905 25.5358 26.905L16.5274 26.905C16.1111 26.905 15.7592 27.229 15.6442 27.6741ZM19.6784 23.2836C20.0978 23.3728 20.5372 23.4184 20.988 23.4184C21.4545 23.4184 21.9092 23.3697 22.3421 23.2733C22.3251 22.9995 22.3176 22.717 22.3176 22.4283L22.3176 22.233L20.988 22.172L19.702 22.2442L19.702 22.4283C19.702 22.7206 19.695 23.0067 19.6784 23.2836Z"
            fill="#FAA515"
          />
          <path
            d="M10.1547 13.497C10.1547 17.2994 12.7852 20.3933 16.0182 20.3933L16.8683 20.3933C16.4868 19.9292 16.1595 19.4068 15.8783 18.8525C13.651 18.773 11.8209 16.8047 11.5092 14.2661L14.4776 14.2661C14.3856 13.7077 14.3206 13.1858 14.2748 12.7279L10.8086 12.7279C10.4477 12.7279 10.1547 13.0725 10.1547 13.497Z"
            fill="#FAD207"
          />
          <path
            d="M14.7941 18.6587C14.9004 18.9074 15.0125 19.1473 15.1297 19.3781C15.3107 19.7349 15.5051 20.0713 15.7113 20.3835C15.8129 20.3902 15.9153 20.3933 16.0182 20.3933L16.8683 20.3933L16.7717 19.6567L15.8783 18.8525C15.8783 18.8525 15.1406 18.7725 14.7941 18.6587ZM13.3973 12.7279C13.4463 13.2431 13.5107 13.7562 13.5904 14.2661L14.4776 14.2661L14.7998 13.497L14.2749 12.7279L13.3973 12.7279Z"
            fill="#FAA515"
          />
          <path
            d="M10.1547 13.497C10.1547 17.1784 12.6204 20.1954 15.7113 20.3835C15.5051 20.0713 15.3107 19.7349 15.1297 19.3781C15.0125 19.1473 14.9004 18.9074 14.7941 18.6587C13.0786 18.0952 11.7686 16.3781 11.5092 14.2661L13.5904 14.2661C13.5108 13.7562 13.4463 13.2431 13.3973 12.7279L10.8086 12.7279C10.4477 12.7279 10.1547 13.0725 10.1547 13.497ZM25.1077 20.3933L25.9578 20.3933C29.1908 20.3933 31.8213 17.2994 31.8213 13.497C31.8213 13.0725 31.5284 12.7279 31.1674 12.7279L27.7012 12.7279C27.6554 13.1858 27.5904 13.7077 27.4985 14.2661L30.4668 14.2661C30.1551 16.8047 28.325 18.773 26.0978 18.8525C25.8166 19.4068 25.4892 19.9292 25.1077 20.3933Z"
            fill="#FAD207"
          />
          <path
            d="M27.4985 14.2661L28.3856 14.2661C28.4652 13.7562 28.5296 13.2431 28.5787 12.7279L27.7012 12.7279L27.1739 13.5152L27.4985 14.2661ZM25.1077 20.3933L25.9578 20.3933C26.0607 20.3933 26.1631 20.3902 26.2647 20.3835C26.4709 20.0713 26.6654 19.7349 26.8463 19.3781C26.9635 19.1473 27.0756 18.9074 27.182 18.6587C26.8354 18.7725 26.0978 18.8525 26.0978 18.8525L25.2841 19.5295L25.1077 20.3933Z"
            fill="#FAA515"
          />
          <path
            d="M13.9039 29.725L28.0722 29.725C28.5537 29.725 28.9441 30.1841 28.9441 30.7504L28.9441 32.7501C28.9441 33.3165 28.5537 33.7756 28.0722 33.7756L13.9039 33.7756C13.4223 33.7756 13.032 33.3165 13.032 32.7501L13.032 30.7504C13.032 30.1841 13.4223 29.725 13.9039 29.725Z"
            fill="#50758D"
          />
          <path
            d="M27.2003 33.7756L28.0722 33.7756C28.5539 33.7756 28.9441 33.3167 28.9441 32.7501L28.9441 30.7504C28.9441 30.1839 28.5539 29.725 28.0722 29.725L28.0722 32.7501C28.0722 33.3167 27.682 33.7756 27.2003 33.7756Z"
            fill="#2B597F"
          />
          <path
            d="M14.1654 10.9077C14.1654 10.9077 14.1654 11.2974 14.2081 11.9332C14.2238 12.167 14.2456 12.4346 14.2749 12.7279C14.3206 13.1858 14.3856 13.7078 14.4776 14.2661C14.7165 15.7074 15.1367 17.3917 15.8783 18.8525C16.1595 19.4068 16.4868 19.9293 16.8683 20.3933C17.5981 21.2813 18.5249 21.9582 19.702 22.2443C20.1013 22.3412 20.5294 22.3929 20.988 22.3929C21.4636 22.3929 21.9061 22.3371 22.3177 22.233C23.4738 21.9417 24.3867 21.2706 25.1077 20.3933C25.4892 19.9293 25.8166 19.4068 26.0978 18.8525C26.8393 17.3917 27.2596 15.7074 27.4985 14.2661C27.5904 13.7078 27.6554 13.1858 27.7012 12.7279C27.7304 12.4346 27.7522 12.167 27.7679 11.9332C27.8106 11.2974 27.8106 10.9077 27.8106 10.9077L14.1654 10.9077Z"
            fill="#FFE043"
          />
          <path
            d="M20.5985 13.1469L20.0471 14.9232L18.263 14.9232C18.0326 14.9232 17.9368 15.2318 18.1232 15.3736L19.5666 16.4714L19.0153 18.2478C18.9441 18.4772 19.1949 18.6679 19.3812 18.5262L20.8247 17.4283L22.2681 18.5262C22.4545 18.6679 22.7053 18.4772 22.6341 18.2478L22.0828 16.4714L23.5262 15.3736C23.7126 15.2318 23.6168 14.9232 23.3864 14.9232L21.6022 14.9232L21.0509 13.1469C20.9796 12.9175 20.6696 12.9175 20.5985 13.1469Z"
            fill="#FC4755"
          />
          <path
            d="M16.9991 32.1605L24.9769 32.1605C25.1575 32.1605 25.3039 31.9883 25.3039 31.7759C25.3039 31.5635 25.1575 31.3914 24.9769 31.3914L16.9991 31.3914C16.8185 31.3914 16.6721 31.5635 16.6721 31.7759C16.6721 31.9883 16.8185 32.1605 16.9991 32.1605Z"
            fill="#2B597F"
          />
          <path
            d="M14.1654 10.9076L21.2691 10.3949L26.9387 10.9076L27.8106 10.9076C27.8106 10.9076 27.8106 11.2973 27.7679 11.9331C27.7522 12.1669 27.7304 12.4346 27.7012 12.7278C27.6554 13.1857 27.5904 13.7077 27.4985 14.266C27.2596 15.7073 26.8393 17.3917 26.0978 18.8524C25.8166 19.4067 25.4892 19.9292 25.1077 20.3932C24.3867 21.2705 23.4738 21.9417 22.3177 22.2329C21.9061 22.337 21.4636 22.3929 20.988 22.3929C20.8398 22.3929 20.6951 22.3877 20.5534 22.377C20.8659 22.3534 21.1633 22.3042 21.4458 22.2329C22.6019 21.9417 23.5148 21.2705 24.2358 20.3932C24.6173 19.9292 24.9447 19.4067 25.2259 18.8524C25.9674 17.3917 26.3877 15.7073 26.6266 14.266C26.7185 13.7077 26.7835 13.1857 26.8293 12.7278L26.8301 12.7191C26.8717 12.3003 26.5925 11.9331 26.2341 11.9331L14.2081 11.9331C14.1654 11.2973 14.1654 10.9076 14.1654 10.9076Z"
            fill="#FAA20C"
          />
          <path
            d="M27.8324 8.29272L14.1436 8.29272C13.5297 8.29272 13.032 8.87811 13.032 9.6002C13.032 10.3223 13.5297 10.9077 14.1436 10.9077L27.8324 10.9077C28.4463 10.9077 28.9441 10.3223 28.9441 9.6002C28.9441 8.87811 28.4463 8.29272 27.8324 8.29272Z"
            fill="#FFE043"
          />
          <path
            d="M26.9605 10.9077L27.8324 10.9077C28.4462 10.9077 28.9441 10.3221 28.9441 9.6002C28.9441 9.23923 28.8194 8.91211 28.6184 8.67574C28.4174 8.43937 28.1393 8.29272 27.8324 8.29272L26.9605 8.29272C27.2674 8.29272 27.5455 8.43937 27.7465 8.67574C27.9475 8.91211 28.0722 9.23923 28.0722 9.6002C28.0722 10.3221 27.5743 10.9077 26.9605 10.9077Z"
            fill="#FAA515"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_3272_25012"
          x="0.00731659"
          y="0.0483398"
          width="41.9855"
          height="41.9034"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3272_25012" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3272_25012" result="shape" />
        </filter>
        <filter
          id="filter1_d_3272_25012"
          x="9.15471"
          y="8.29272"
          width="23.6666"
          height="28.4828"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.175 0 0 0 0 0.175 0 0 0 0 0.175 0 0 0 0.37 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3272_25012" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3272_25012" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_3272_25012" x1="6.34053" y1="15.5476" x2="22.9004" y2="26.3875" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF505A" stopOpacity="0.99" />
          <stop offset={1} stopColor="#F52F2F" />
        </linearGradient>
        <clipPath id="clip0_3272_25012">
          <rect width="21.6667" height="25.4828" fill="white" transform="matrix(-0.999994 0 0 1 31.8213 8.29272)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconSearch = (props: any) => {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={11} cy={11} r={7} stroke="#484848" strokeWidth={2} />
      <path
        d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"
        stroke="#484848"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M20 20L17 17" stroke="#484848" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};
const LogoutIcon = (props: any) => {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.875 3.375H2.625V21.375H7.875M16.125 7.125L21.375 12.375M21.375 12.375L16.125 17.625M21.375 12.375H8.625"
        stroke="#4F4F4F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
