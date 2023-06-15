"use client";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/navigation";
const ComingContent = () => {
  return (
    <div>
      <div className="logo p-[20px] flex items-center justify-center">
        <a href="/" className="flex items-center">
          <img width="100%" src="/images/header/icantech-logo.svg" />
          <img src="/images/header/club.png" className="w-[85px] mt-[15px] ml-[10px]" />
        </a>
      </div>
      <div className="banner">
        <img src="/images/default-icantech.png" />
      </div>
      <div className="content text-center m-auto my-[20px]">
        <img src="/images/hi-login.png" className="w-[40%] text-center m-auto" />
        <p className="text-center mt-[20px] font-bold text-blue mx-[20px]">Bạn hãy dùng máy tính để có trải nghiệm tốt hơn nhé!</p>
      </div>
    </div>
  );
};
const ComingSoon = ({ children }: any) => {
  return <div>{isMobile ? <ComingContent /> : children}</div>;
};
export default ComingSoon;
