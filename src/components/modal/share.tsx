import { useState } from "react";
import { Button } from "@/ui/button";
import { FacebookShareButton } from "react-share";
import { usePathname } from "next/navigation";
import { domain } from "@/lib/helper";
const ShareModal = ({ url_share }: any) => {
  const [copy, setCopy] = useState(false);
  let href = "";
  let url = "";
  if (typeof window !== "undefined") {
    href = window.location.href;
    url = url_share || window.location.origin + window.location.pathname + window.location.search;
  }

  const copyButton = () => {
    if (href) {
      navigator.clipboard.writeText(href);
    }
    setCopy(true);
  };

  return (
    <div className="md:w-[500px] p-[24px] bg-white rounded-[8px]  ">
      <p className="text-24-bold text-blue mb-[32px]">Chia sẻ</p>
      <div className="flex items-center">
        <FacebookShareButton url={url || ""} className="network__share-button">
          <div className="mr-[26px] text-center">
            <img className="w-[56px] m-auto" src="/images/icons/fb.png" />
            <p className="mt-[6px]">Facebook</p>
          </div>
        </FacebookShareButton>

        {/* <div className="text-center">
          <img className="w-[56px] m-auto" src="/images/icons/zalo.png" />
          <p className="mt-[6px]">Zalo</p>
        </div> */}
      </div>
      <p className="mt-[20px] text-blue">Link</p>
      <div className="relative mt-[10px]">
        <input
          value={href}
          type="text"
          readOnly
          className="text-ellipsis overflow-hidden input-copy-clipboard input-share focus-visible:outline-none bg-[#DEF8FF] pl-[12px] pr-[106px] py-[8px] rounded-[5px] text-blue w-full"
        />
        <div
          onClick={() => copyButton()}
          className="absolute right-[4px] top-[4px] bg-blue text-white px-[12px] py-[4px] rounded-[5px] body-13 cursor-pointer"
        >
          {copy ? "Đã sao chép" : "Sao chép"}
        </div>
      </div>
    </div>
  );
};
export default ShareModal;

export const ShareModalGolbal = ({ data }: any) => {
  const [copy, setCopy] = useState(false);
  let url = domain + "/detail/" + data?.id + "?slug=" + data.detail_slug;
  let href = domain + "/detail/" + data?.id + "?slug=" + data.project_slug;
  const copyButton = () => {
    if (href) {
      navigator.clipboard.writeText(href);
      setCopy(true);
    }
  };

  return (
    <div className="md:w-[500px] p-[24px] bg-white rounded-[8px]  ">
      <p className="text-24-bold text-blue mb-[32px]">Chia sẻ</p>
      <div className="flex items-center">
        <FacebookShareButton url={url || ""} className="network__share-button">
          <div className="mr-[26px] text-center">
            <img className="w-[56px] m-auto" src="/images/icons/fb.png" />
            <p className="mt-[6px]">Facebook</p>
          </div>
        </FacebookShareButton>

        {/* <div className="text-center">
          <img className="w-[56px] m-auto" src="/images/icons/zalo.png" />
          <p className="mt-[6px]">Zalo</p>
        </div> */}
      </div>
      <p className="mt-[20px] text-blue">Link</p>
      <div className="relative mt-[10px]">
        <input
          value={href}
          type="text"
          readOnly
          className="text-ellipsis overflow-hidden input-copy-clipboard input-share focus-visible:outline-none bg-[#DEF8FF] pl-[12px] pr-[106px] py-[8px] rounded-[5px] text-blue w-full"
        />
        <div
          onClick={() => copyButton()}
          className="absolute right-[4px] top-[4px] bg-blue text-white px-[12px] py-[4px] rounded-[5px] body-13 cursor-pointer"
        >
          {copy ? "Đã sao chép" : "Sao chép"}
        </div>
      </div>
    </div>
  );
};
