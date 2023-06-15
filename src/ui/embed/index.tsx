"use client";
import { ArrowDownIcon, LockClosedIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { CloseIcon, CloseOutlineIcon, ClosePinkOutlineIcon, DownIcon, PlayIcon, XIcon } from "../icons/action";
import { ImageCMS } from "../image";
import ModalView from "../modal";
import CodeCombat from "./codecombat";
import Scratch from "./scratch";
import Roblox from "./roblox";
import { useToast } from "@/hook/use-toast";
import PythonPro from "./pythonpro";
import AxiosClient from "@/lib/api/axios-client";
import { isMobile } from "react-device-detect";
import KidProgramming from "./kid-programimng";

const PlayProject = ({ data }: any) => {
  const subject = data?.subject_id?.subject_name;
  const { toggleToast }: any = useToast();
  const [show, setShow] = useState(false);
  const icons: any = {
    Scratch: <PlayIcon className="w-6 h-6 stroke-pink" />,
    Minecraft: <DownIcon className="w-6 h-6 stroke-pink" />,
    Roblox: <PlayIcon className="w-6 h-6 stroke-pink" />,
    "Python CodeCombat": <PlayIcon className="w-6 h-6 stroke-pink" />,
    "Python Pro": <PlayIcon className="w-6 h-6 stroke-pink" />,
    Website: <PlayIcon className="w-6 h-6 stroke-pink" />,
    "Lập trình nhí": <PlayIcon className="w-6 h-6 stroke-pink" />,
  };
  const text: any = {
    "Python CodeCombat": "Chạy dự án",
    "Python Pro": "Chạy dự án",
    Scratch: "Chạy dự án",
    Roblox: "Chạy dự án",
    Minecraft: "Tải file code",
    Website: "Chạy dự án",
    "Lập trình nhí": "Chạy dự án",
  };

  const downloadFiles = (files: any) => {
    async function download_next(i: number) {
      if (i >= files.length) {
        return;
      }
      const value = await AxiosClient.get("/files/" + files[i]);
      const endpont = value.data?.filename_download;
      var a: any = document.createElement("a");
      a.href = process.env.CMS + "/assets/" + files[i] + "/" + endpont;
      a.target = "_parent";
      if ("download" in a) {
        a.download = files[i];
      }
      (document.body || document.documentElement).appendChild(a);
      if (a.click) {
        a.click(); // The click method is supported by most browsers.
      }
      a.parentNode.removeChild(a);
      setTimeout(function () {
        download_next(i + 1);
      }, 500);
    }
    download_next(0);
  };
  const openDeepLink = (url: string) => {
    var link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const onClick = async () => {
    if (subject === "Minecraft") {
      if (isMobile) return setShow(true);
      const source = data?.project_source?.split(",");
      if (!source) {
        toggleToast({
          show: true,
          status: "fail",
          message: "Không có file nào được tìm thấy",
          time: 5000,
        });
        return;
      }
      downloadFiles(source);
      return;
    } else {
      if (data?.project_link) {
        if (subject === "Roblox") {
          const id = data.project_link.match(/[0-9]{2,10}/g)[0];
          if (id) {
            const robloxLink = "roblox://placeId=" + id;
            openDeepLink(robloxLink);
          }
          setShow(true);
          return;
        }
        setShow(true);
      } else {
        toggleToast({
          show: true,
          status: "fail",
          message: "Dự án bị lỗi",
          time: 5000,
        });
      }
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden w-full h-full">
      <div className="relative w-full h-full">
        <div className="xl:w-[546px] xl:h-[366px]">
          <ImageCMS src={data?.project_thumbnail} width={546} height={366} className="w-full h-[366px] object-cover" />
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(Game-minecraft.png)",
          }}
        ></div>
        {subject !== "Website" && (
          <div
            onClick={onClick}
            style={{ transform: "translate(-50%,-50%)", backdropFilter: "blur(54px)" }}
            className="absolute top-[50%] cursor-pointer hover:hover left-[50%] z-10 flex items-center px-5 py-3 rounded-full bg-white"
          >
            {icons[subject]}
            <span className="color-pink ml-2"> {text[subject]}</span>
          </div>
        )}

        {subject === "Website" && (
          <a
            href={data.project_link}
            target="_blank"
            rel="noreferrer"
            style={{ transform: "translate(-50%,-50%)", backdropFilter: "blur(54px)" }}
            className="absolute top-[50%] cursor-pointer hover:hover left-[50%] z-10 flex items-center px-5 py-3 rounded-full bg-white"
          >
            {icons[subject]}
            <span className="color-pink ml-2"> {text[subject]}</span>
          </a>
        )}
      </div>

      <ModalView open={show}>
        {!isMobile && (
          <div className="relative bg-white rounded-lg hidden xl:block">
            <ClosePinkOutlineIcon
              onClick={() => setShow(false)}
              className=" z-10 cursor-pointer stroke-pink hover:opacity-70 absolute w-8 h-8 top-4 right-4"
            />
            {(subject === "Scratch" || subject === "Minecraft") && <Scratch src={data?.project_link || ""} />}
            {subject === "Roblox" && <Roblox src={data?.project_link || ""} />}
            {subject === "Python CodeCombat" && <CodeCombat src={data?.project_link || ""} />}
            {subject === "Python Pro" && <PythonPro src={data?.project_link || ""} />}
            {subject === "Lập trình nhí" && <KidProgramming src={data?.project_link || ""} />}
          </div>
        )}
        {isMobile && (
          <div className="relative bg-white rounded-lg block xl:hidden">
            <ClosePinkOutlineIcon
              onClick={() => setShow(false)}
              className=" z-10 cursor-pointer hover:opacity-70 absolute w-4 h-4 top-4 right-4"
            />
            {/* <CloseIcon onClick={() => } className=" z-10 cursor-pointer hover:opacity-70 absolute w-4 h-4 top-4 right-4" /> */}
            <div className="px-10 py-8 text-blue font-bold text-center">
              Bạn hãy sử dụng máy tính để <br /> trải nghiệm tính năng này nhé!
            </div>
          </div>
        )}
      </ModalView>
    </div>
  );
};

export default PlayProject;
