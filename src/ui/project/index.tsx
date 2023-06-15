"use client";
import React, { useState } from "react";
import { Comment, Love, ShareIcon, View } from "@/ui/icons/action";
import Link from "next/link";
import { Avatar, ImageCMS } from "../image";
import { useHotProject, useNewProject } from "@/hook/status-project";
import { usePathname } from "next/navigation";
import ModalView from "../modal";
import { Button } from "../button";
import AxiosClient from "@/lib/api/axios-client";
import UploadProject from "../upload-project";
import ActionProject from "./edit";
import { useAuth } from "@/hook/auth";
import { usePin } from "@/hook/use-pin";
import { checkBannedText } from "@/lib/helper";
import { usePopup } from "@/components/popup";
import { useBehavior } from "@/context/heart";

interface propsAux {
  data: any;
  className?: string;
  type?: "topten" | "hot";
  edit?: boolean;
  updateUI?: () => void;
}
const Project = React.memo(({ data, className, type, edit, updateUI = () => {} }: propsAux) => {
  const pathname = usePathname();
  const { profile } = useAuth();
  const { projectPinned } = usePin();
  const { setShare } = usePopup();
  const isMyprofile = data.user_created?.id === profile?.id && pathname === "/profile";
  const { checkIsHot } = useHotProject();
  const { checkIsNew } = useNewProject();
  const [del, setDel] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const editProject = () => {
    setEdit(!isEdit);
  };
  const { like }: any = useBehavior();

  const statistic = data.project_statistic_id;
  const isHot = pathname === "/profile" ? false : checkIsHot(data.id);
  const isNew = pathname === "/profile" ? false : checkIsNew(data.id);
  const isPin = projectPinned[data.id] ? true : false;
  const isLiked = like[data.id] ? true : false;

  const deleteProject = async () => {
    await AxiosClient.delete("/items/projects/" + data.id);
    await updateUI();
    setDel(false);
  };

  return (
    <div>
      <div className="relative block xl:hover:translate-y-[-24px] transition duration-300 ease-in-out cursor-pointer">
        <Link href={"/detail/" + data.id + "?slug=" + data.project_slug}>
          {type === "topten" && (
            <div
              className="absolute rounded-[20px] w-[calc(100%+12px)] h-[calc(100%+12px)] top-[50%] left-[50%]"
              style={{
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(to left top, #FFDE7B 0% , #FFCD4B 50%, #FFB800 100%)",
              }}
            ></div>
          )}
        </Link>

        <div className={"relative z-1 bg-white group/project overflow-hidden md:hover:shadow-project animate rounded-2xl " + className}>
          <Link href={"/detail/" + data.id + "?slug=" + data.project_slug}>
            <div className="md:h-[261px] relative rounded-tl-2xl rounded-tr-2xl border-[1px] border-b-[0px] border-[#DEDCDC] overflow-hidden">
              <ImageCMS
                src={data?.project_thumbnail}
                width={362}
                height={261}
                className={`h-full object-cover w-full ${isEdit ? "opacity-[0.3]" : "opacity-[1]"}`}
              />
              {isNew && (
                <div className="absolute bottom-0 right-1">
                  <img className="w-[77px]" alt="" src="/images/icons/new.png" />
                </div>
              )}
              {isHot && (
                <div className="absolute top-0 right-0">
                  <img className="w-[77px]" alt="" src="/images/icons/hot.png" />
                </div>
              )}
            </div>
          </Link>
          <div
            className={
              type === "topten"
                ? "shadow-inset"
                : "border-[1px] border-[#DEDCDC] border-t-[0px] rounded-b-2xl group-hover/project:border-none"
            }
          >
            <div>
              <div className="relative px-4">
                <div className="absolute left-4 bottom-0 h-16 w-16 rounded-full overflow-hidden border-[1.5px] border-white drop-shadow">
                  <Link href={"/profile?id=" + data?.user_created?.id}>
                    <Avatar src={data?.user_created?.avatar} width={64} height={64} className="object-cover h-16 w-16" />
                  </Link>
                </div>
                <div className="ml-[72px]">
                  <Link
                    href={"/detail/" + data.id + "?slug=" + data.project_slug}
                    className="text-title block pt-1 text-[#0159A0] truncate"
                  >
                    {checkBannedText(data?.project_title)}
                  </Link>
                  <div className="flex items-center">
                    <span className="body-13">bởi</span>{" "}
                    <Link
                      href={"profile?id=" + data?.user_created?.id}
                      className="hover:underline underline-offset-2 text-blue body-13-bold ml-1"
                    >
                      {data?.user_created?.user_meta_id?.nick_name || "ICANTECH Club-er"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-[1px] w-full bg-[#DEDCDC]"></div>
              <Link href={"/detail/" + data.id + "?slug=" + data.project_slug} className="p-4 flex gap-5">
                <div className="flex items-center">
                  <View className="mr-[6px]" />
                  <span className="body-13-bold text-[#4F4F4F]">{statistic?.num_view_total || 0}</span>
                </div>
                <div className="flex items-center">
                  <Comment className="mr-[6px]" />
                  <span className="body-13-bold text-[#4F4F4F]">{statistic?.num_comment_total || 0}</span>
                </div>
                <div className="flex items-center">
                  {isLiked ? <Love className="mr-[6px] fill-[#FF4949]" /> : <Love className="mr-[6px]" />}

                  <span className="body-13-bold text-[#4F4F4F]">{statistic?.num_like_total || 0}</span>
                </div>
                <div
                  className="flex items-center ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShare({ id: data.id, project_slug: data.project_slug });
                  }}
                >
                  <ShareIcon className=" w-5 h-5" />
                </div>
              </Link>
              {(type === "topten" || type === "hot") && (
                <div className="absolute top-0 right-0">
                  <img src="/images/icons/top-ten.png" width={68} alt="" />
                </div>
              )}

              <div className="absolute top-0 left-0  flex items-center gap-4 m-4">
                {data?.subject_id?.subject_name && (
                  <div
                    style={{ backdropFilter: "blur(24px)" }}
                    className="rounded-full text-blue text-11 px-[18px] py-[3px] border-[1px] border-blue bg-white"
                  >
                    {data?.subject_id?.subject_name}
                  </div>
                )}
                {isPin && (
                  <div
                    style={{ backdropFilter: "blur(24px)" }}
                    className="rounded-full text-white text-11 px-[18px] py-[3px] border-[1px] border-negative bg-negative"
                  >
                    Đã Ghim
                  </div>
                )}
              </div>
            </div>

            {edit && (
              <div className="absolute top-0 right-0" onClick={editProject}>
                <div className="rounded-full text-blue text-11 px-[18px] py-[3px] m-4">
                  <img className="w-[46px]" src="/images/icons/edit.png" />
                </div>
              </div>
            )}
          </div>
        </div>
        {isMyprofile && (
          <ActionProject data={{ upload_type: data.upload_type }} isPin={isPin} id={data.id} setDel={setDel} setUpdate={setUpdate} />
        )}
      </div>

      {isMyprofile && (
        <>
          <ModalView open={del} toggle={() => setDel(false)}>
            <div className="bg-white p-10 rounded-lg">
              <div className="body-18-bold text-blue">Cậu muốn xoá dự án này không?</div>
              <div className="flex gap-4 justify-center mt-6">
                <Button color="blue" onClick={deleteProject}>
                  Có
                </Button>
                <Button type="outlined" color="blue" onClick={() => setDel(false)}>
                  Không
                </Button>
              </div>
            </div>
          </ModalView>
          <ModalView open={update} toggle={() => setUpdate(false)}>
            <UploadProject data={data} close={() => setUpdate(false)} />
          </ModalView>
        </>
      )}
    </div>
  );
});

export default Project;
