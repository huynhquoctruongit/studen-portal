"use client";
import { useState } from "react";
import { Comment, Love, View } from "@/ui/icons/action";
import Link from "next/link";
import { Avatar, ImageCMS } from "../image";
import ActionProject from "./edit";
import ModalView from "../modal";
import { Button } from "../button";
import AxiosClient from "@/lib/api/axios-client";
import UploadProject from "../upload-project";
interface propsAux {
  data: any;
  className?: string;
  type?: "topten" | "hot";
  edit?: boolean;
  updateUI?: () => void;
}
const ProjectDraft = ({ data, className, type, edit, updateUI = () => {} }: propsAux) => {
  const [isEdit, setEdit] = useState(false);
  const [del, setDel]: any = useState(false);
  const [update, setUpdate]: any = useState(false);
  const editProject = () => {
    setEdit(!isEdit);
  };
  const deleteProject = async () => {
    await AxiosClient.delete("/items/projects/" + data.id);
    await updateUI();
    setDel(false);
  };
  const statistic = data.project_statistic_id;

  return (
    <div>
      <div className="relative block hover:translate-y-[-24px] transition duration-300 ease-in-out cursor-pointer">
        <div className={"relative z-1 bg-white group/project overflow-hidden hover:shadow-project animate rounded-2xl " + className}>
          <Link href={"/detail/" + data.id + "?slug=" + data.project_slug}>
            <div className="w-full md:h-[261px] relative opacity-50">
              <ImageCMS
                src={data?.project_thumbnail}
                width={362}
                height={261}
                className={`h-full object-cover w-full ${isEdit ? "opacity-[0.3]" : "opacity-[1]"}`}
              />
            </div>
          </Link>
          <div
            className={
              type === "topten" ? "shadow-inset" : "border-[1px] border-[#DEDCDC] border-t-[0px] rounded-b-2xl	group-hover/project:border-0"
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
                    {data?.project_title}
                  </Link>
                  <div className="flex items-center">
                    <span className="body-13">bởi</span>{" "}
                    <Link
                      href={"profile?id=" + data?.user_created?.id}
                      className="hover:underline underline-offset-2 text-blue body-13-bold ml-1"
                    >
                      {data?.user_created?.user_meta_id?.nick_name || data?.user_created?.first_name}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-[1px] w-full bg-[#DEDCDC]"></div>
              <div className="p-4 flex gap-5">
                <div className="flex items-center">
                  <View className="mr-[6px]" />
                  <span className="body-13-bold text-[#4F4F4F]">{statistic?.num_view_total || 0}</span>
                </div>
                <div className="flex items-center">
                  <Comment className="mr-[6px]" />
                  <span className="body-13-bold text-[#4F4F4F]">{statistic?.num_comment_total || 0}</span>
                </div>
                <div className="flex items-center">
                  <Love className="mr-[6px]" />
                  <span className="body-13-bold text-[#4F4F4F]">{data?.num_like_total || 0}</span>
                </div>
              </div>
              {(type === "topten" || type === "hot") && (
                <div className="absolute top-0 right-0">
                  <img src="/images/icons/top-ten.png" width={68} alt="" />
                </div>
              )}
              {data?.subject_id?.subject_name && (
                <div className="absolute top-0 left-0">
                  <div className="rounded-full text-blue text-11 px-[18px] py-[3px] border-[1px] border-blue bg-white m-4">
                    {data?.subject_id?.subject_name}
                  </div>
                </div>
              )}
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
        <ActionProject setDel={setDel} setUpdate={setUpdate} />
      </div>
      <ModalView open={del} toggle={() => setDel(false)}>
        <div className="bg-white p-10 rounded-lg">
          <div className="body-18-bold text-blue">Cậu muốn xoá dự án này không?</div>
          <div className="flex gap-4 justify-center mt-6">
            <Button type="solid" onClick={deleteProject}>
              Có
            </Button>
            <Button type="outlined" onClick={() => setDel(false)}>
              Không
            </Button>
          </div>
        </div>
      </ModalView>
      <ModalView open={update} toggle={() => setUpdate(false)}>
        <UploadProject data={data} close={() => setUpdate(false)} />
      </ModalView>
    </div>
  );
};

export default ProjectDraft;
