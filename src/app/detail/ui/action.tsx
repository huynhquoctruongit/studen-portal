"use client";
import AxiosClient from "@/lib/api/axios-client";
import AxiosController from "@/lib/api/axios-controller";
import Report from "../../../components/modal/report";
import Share from "../../../components/modal/share";
import ModalView from "@/ui/modal";
import { ShareIcon, Love, ReportIcon, ViewIcon } from "@/ui/icons/action";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hook/auth";
import { useBehaviours } from "@/hook/use-like";
dayjs.extend(relativeTime);
const ShareCom = ({ id, date_created, project, user_created }: any) => {
  const prevent = useRef(false);
  const [share, openShare] = useState(false);
  const [report, openReport] = useState(false);
  const { behaviours, fisrtLoad, updateBehaviours } = useBehaviours(id);
  const { profile } = useAuth();
  const [heart, setHeart] = useState(false);
  const like = async () => {
    if (prevent.current) return;
    if (!profile?.id) return;
    prevent.current = true;
    if (heart) {
      // await AxiosClient.delete("/items/behaviours/" + heart);
      await AxiosController.post(`/api/v1/projects/${id}/user-behaviours/${heart}/dislike`);
      setHeart(false);
    } else {
      const items = await AxiosController.post(`/api/v1/projects/${id}/like`);
      setHeart(items?.data?.id);
    }
    updateBehaviours();
    queueMicrotask(() => {
      prevent.current = false;
    });
  };
  useEffect(() => {
    const params = { _and: [{ project_id: { _eq: id } }, { type: { _eq: "LIKE" } }, { user_created: { _eq: "$CURRENT_USER" } }] };
    AxiosClient.get(`/items/behaviours?filter=` + JSON.stringify(params)).then((data: any) => {
      if (data.data.length > 0) setHeart(data.data[0].id);
    });
  }, []);
  const dayago = dayjs(date_created)
    .fromNow()
    .replace("ago", "trước")
    .replace("days", "ngày")
    .replace("minutes", "phút")
    .replace("hours", "giờ");
  const clsHeart = heart ? "fill-[#FF4949]" : "";
  if (fisrtLoad) return <div className="h-10 w-full bg-stone-50"></div>;
  return (
    <div>
      <ModalView open={share} toggle={() => openShare(false)}>
        <Share />
      </ModalView>
      <ModalView open={report} toggle={() => openReport(false)}>
        <Report project={project} toggle={() => openReport(false)} />
      </ModalView>
      <div className="border-[0.5px] border-t-[#DEDCDC my-4"></div>
      <div className="ml-auto body-15 md:hidden block">{dayago}</div>
      <div className="pt-4 flex flex-wrap xl:flex-nowrap  xl:justify-start gap-5">
        <div className="flex items-center">
          <div onClick={like} className="cursor-pointer">
            <Love className={"mr-[6px] " + clsHeart} />
          </div>
          <span className="body-13-bold">{behaviours.like || 0}</span>
        </div>
        <div className="flex items-center">
          <ViewIcon className="mr-[6px]" />
          <span className="body-13-bold">{behaviours?.view || 0}</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => openShare(true)}>
          <ShareIcon className="mr-[6px]" />
          <span className="body-13-bold">Chia sẻ</span>
        </div>
        {user_created?.id !== profile?.id && (
          <div className="flex items-center cursor-pointer" onClick={() => openReport(true)}>
            <ReportIcon className="mr-[6px]" />
            <span className="body-13-bold">Báo cáo</span>
          </div>
        )}
        <div className="xl:ml-auto body-15 hidden md:block">{dayago}</div>
      </div>
    </div>
  );
};

export default ShareCom;
