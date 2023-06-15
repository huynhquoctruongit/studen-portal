"use client";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";
import Link from "next/link";
import dayjs from "dayjs";
import { checkBannedText } from "@/lib/helper";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animatParent, childrent, variants } from "@/lib/motion";

const Notify = ({ updateNoti, setModal, setActiveNoti, activeNoti, profile, isMobile }: any) => {
  const { data: notiListAll, mutate } = useSWR(`/items/notifications?filter[target_user_id]=${profile?.id}&sort=-id`, fetcherClient);
  const { data: notiListUnseen, mutate: mutateUnseen } = useSWR(
    `/items/notifications?filter[status]=unseen&filter[target_user_id]=${profile?.id}&sort=-id`,
    fetcherClient,
  );

  const filterAll = notiListAll?.data.filter((item: any) => item.source_user_id !== profile?.id);
  const filterUnseen = notiListUnseen?.data.filter((item: any) => item.source_user_id !== profile?.id);

  const allTab = [
    { tab_name: "Tất cả", id: 1 },
    { tab_name: "Chưa đọc", id: 2 },
  ];
  const action: any = {
    notification_comment_project: "/images/notify/comment.png",
    notification_reply_comment: "/images/notify/comment.png",
    notification_like_comment: "/images/notify/like.png",
    notification_like_project: "/images/notify/like.png",
    notification_follow: "/images/notify/follow.png",
    notification_project_hot: "/images/notify/hot-project.png",
    notification_top_10: "/images/notify/top-ten.png",
    notification_create_project: "/images/notify/upload.png",
    default: "/images/notify/hot-project.png",
  };

  const readed = async (item: any) => {
    if (item.status === "unseen") {
      await AxiosClient.patch(`/items/notifications/${item.id}`, {
        status: "seen",
      });
    }
    setModal(false);
    updateNoti();
    mutateUnseen();
  };
  useEffect(() => {
    mutateUnseen();
    mutate();
  }, []);
  const sortFunc = (a: any, b: any) => {
    const first: any = dayjs(a?.date_created).unix();
    const last: any = dayjs(b?.date_created).unix();
    return last - first;
  };

  return (
    <div className="w-full h-[calc(100vh-73px)] overflow-x-hidden overflow-y-auto bg-white md:w-[372px] md:h-[377px] absolute z-20 rounded-[4px] shodow-popup md:right-[-75px] md:top-[46px]">
      <div className="sticky z-[1111] top-0 bg-white flex border-b-[1px] border-[#EDEBEB] px-[16px] pt-[12px]">
        {allTab.map((element: any, index: number) => {
          const cls = activeNoti === index ? "body-15 text-blue" : "body-15";
          return (
            <div
              key={index + "toggleTab"}
              onClick={() => {
                setActiveNoti(index);
              }}
              className={"mr-[25px] cursor-pointer pb-[7px] hover:text-blue relative transition-corlor duration-200 ease-in-out " + cls}
            >
              {element.tab_name}
              {` (${index == 0 ? filterAll?.length || 0 : filterUnseen?.length || 0})`}

              {activeNoti === index && (
                <motion.div layoutId={"toggleTab"} className="absolute lef-0 z-10 bottom-[-1px] bg-blue h-0.5 w-full"></motion.div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-[12px] px-[16px] pb-[12px]">
        {activeNoti === 0
          ? filterAll?.sort(sortFunc)?.map((item: any, index: any) => (
              <Link
                onClick={() => {
                  readed(item);
                }}
                key={index}
                href={item?.ref_to || "#"}
              >
                <div className="text-14 leading-[150%] mb-[12px] flex items-center">
                  <div className="mr-[13px]">
                    <div className="w-[48px] h-[48px] block overflow-hidden rounded-full">
                      <img src={action[item.type]} className="w-full h-full block object-cover" />
                    </div>
                  </div>

                  <div>
                    <span className="font-bold">{item.user} </span>
                    <div className="body-15" dangerouslySetInnerHTML={{ __html: checkBannedText(item.display_text) as string }}></div>
                    <p className="text-blue">{dayjs(item.date_created).fromNow()}</p>
                  </div>
                </div>
              </Link>
            ))
          : filterUnseen?.sort(sortFunc)?.map((item: any, index: any) => (
              <Link
                onClick={() => {
                  readed(item);
                }}
                key={index}
                href={item?.ref_to || "#"}
              >
                <div className="text-14 leading-[150%] mb-[12px] flex items-center">
                  <div className="mr-[13px]">
                    <div className="w-[48px] h-[48px] block overflow-hidden rounded-full">
                      <img src={action[item.type]} className="w-full h-full block object-cover" />
                    </div>
                  </div>

                  <div>
                    <span className="font-bold">{item.user} </span>
                    <div className="body-15" dangerouslySetInnerHTML={{ __html: checkBannedText(item.display_text) as string }}></div>
                    <p className="text-blue">{dayjs(item.date_created).fromNow()}</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
export default Notify;
