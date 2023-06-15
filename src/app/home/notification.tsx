import { ButtonPink } from "@/ui/button";
import { BellIcon, UploadOvanIcon } from "@/ui/icons/action";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="bg-white flex justify-between items-center px-5 lg:px-0  mx-1 lg:mx-[140px] min-h-[64px]">
      <div className="logo">
        <Link href="#" className="flex items-center">
          <img src="/images/header/icantech-logo.svg" />
          <img src="/images/header/club.png" className="w-[85px] mt-[15px] ml-[10px]" />
        </Link>
      </div>

      <div className="action flex items-center">
        <ButtonPink icon={UploadOvanIcon}>Tải dự án</ButtonPink>
        <Link href="search">
          <img src="/images/header/glass.png" className="w-[30px] cursor-pointer ml-7" />
        </Link>
        <div className="relative ml-7">
          <BellIcon className="" />
          <div
            className="absolute bottom-4 right-[-6px] w-[18px] h-[18px] rounded-full bg-pink text-11-bold text-white flex items-center justify-center"
            style={{ lineHeight: "17px" }}
          >
            5
          </div>
        </div>
        <div className="ml-7 w-12 h-12">
          <Image
            src="/images/demo/demo1.png"
            className="w-full h-full rounded-full border-[1.5px] border-white shadow"
            width={48}
            height={48}
            alt="not found"
          />
        </div>
        <Link
          href="/login"
          className="cursor-pointer bg-pink ml-[40px] text-white py-[13px] px-[32px] rounded-[10px] text-[13px] font-[800]"
          style={{
            boxShadow:
              "5px 10px 20px rgba(134, 153, 168, 0.2), inset 0px -3px 8px rgba(255, 255, 255, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};
export default Header;
