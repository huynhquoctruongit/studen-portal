"use client";
import { useEffect, useState } from "react";
import { Button, ButtonPink } from "@/ui/button";
import { HeartIcon, FollowerIcon, ProjectIcon, EditIcon, StarIcon, UploadProjectIcon } from "../../../public/images/svg/index";
import OrtherProject from "./orther";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";
import { useAuth } from "@/hook/auth";
import { ImageCMS } from "@/ui/image";
import { useSearchParams } from "next/navigation";
import ModalView from "@/ui/modal";
import Followers from "../../components/modal/followers";
import UnFollow from "../../components/modal/unFollow";
import Share from "../../components/modal/share";
import Edit from "../../components/modal/edit";
import dayjs from "dayjs";
import Link from "next/link";
import { Comment, Love, SavedIcon, View } from "@/ui/icons/action";
import { checkBannedText, domain, renderImageById } from "@/lib/helper";
import { useFollow } from "@/hook/use-follow";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { animatParent, childrent, variants } from "@/lib/motion";
import NotFound from "@/ui/notfound";
import HeadMeta from "@/components/head";

const action: any = {
  notification_comment_project: <Comment className="w-[18px] h-[18px] mr-[10px]" />,
  notification_reply_comment: <Comment className="w-[18px] h-[18px] mr-[10px]" />,
  notification_like_comment: <Love className="w-[18px] h-[18px] mr-[10px]" />,
  notification_like_project: <Love className="w-[18px] h-[18px] mr-[10px]" />,
  notification_follow: <FollowerIcon className="w-[18px] h-[18px] mr-[10px]" />,
  notification_create_project: <UploadProjectIcon className="w-[18px] h-[18px] mr-[10px]" />,
  default: <Comment className="w-[18px] h-[18px] mr-[10px]" />,
};
export default function ProfilePage({ dataFetched }: any) {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isUnfollow, setUnfollow] = useState(false);
  const [share, openShare] = useState(false);
  const [edit, openEdit] = useState(false);
  const userId = searchParams.get("id");

  const { isLogin, profile: myprofile, getProfile } = useAuth();
  const { listByUser, activityLog, list, behaByUser, followers, profileById } = dataFetched;

  const { follow, updateFolow } = useFollow();
  const profile = userId === myprofile?.id ? myprofile : profileById?.data?.[0];
  const projects = list?.data;
  const meta = list ? list?.meta : {};
  const { data: followedList, mutate: uploadFolowedList } = useSWR(
    `/items/followers?fields=*,follower_id.*&filter[followed_id][id][_eq]=${userId}`,
    fetcherClient,
  );

  const fameTotal = listByUser?.data?.[0]?.user_statistic_id?.num_fame_total;
  const publicProjects: any = meta?.filter_count;
  const followed = follow[userId || ""];

  const likeList = listByUser?.data?.[0]?.user_statistic_id?.num_like_total;
  const listProjectType: any = [];
  behaByUser?.data.map((item: any) => {
    listProjectType.push(item?.subject_id?.subject_type);
  });
  const followProfile = async () => {
    const params = {
      follower_id: myprofile?.id,
      followed_id: userId,
    };
    await AxiosClient.post("/items/followers", params);
    updateFolow();
    uploadFolowedList();
  };
  const updateProfile = () => {
    getProfile();
  };
  const unFollow = async (status: any) => {
    if (status) {
      await AxiosClient.delete(`/items/followers/${followed.id}`);
      updateFolow();
      uploadFolowedList();
      setUnfollow(false);
    } else {
      setUnfollow(false);
    }
  };
  const sortFunc = (a: any, b: any) => {
    const first: any = dayjs(a?.date_created).unix();
    const last: any = dayjs(b?.date_created).unix();
    return last - first;
  };

  const image = profile?.avatar;
  const metaSEO = {
    title: profile?.user_meta_id?.nick_name + " | Profile",
    description: profile?.user_meta_id?.introduction,
    content: "",
    url: "/profile?id=" + profile?.id,
    image: image ? renderImageById(image) : domain + "/images/default-icantech.png",
  };

  return (
    <div className="bg-[#F0FBFF] animate-show">
      <HeadMeta data={metaSEO} />
      <ModalView open={modal} toggle={() => setModal(false)}>
        <Followers isLogin={isLogin} toggle={() => setModal(false)} followedList={followedList} followers={followers} profile={profile} />
      </ModalView>
      <ModalView open={isUnfollow} toggle={() => unFollow(false)}>
        <UnFollow unFollow={unFollow} profile={profile}></UnFollow>
      </ModalView>
      <ModalView open={share} toggle={() => openShare(false)}>
        <Share />
      </ModalView>
      <ModalView open={edit} toggle={() => openEdit(false)}>
        <Edit
          isLogin={isLogin}
          toggle={() => openEdit(false)}
          updateProfile={updateProfile}
          followedList={followedList}
          followers={followers}
          profile={profile}
        />
      </ModalView>
      <div className="w-full h-full lg:h-[300px] object-cover overflow-hidden">
        {profile?.user_meta_id?.cover_image && (
          <ImageCMS
            classn="w-full h-full object-cover"
            width="1146"
            height="300"
            src={profile?.user_meta_id?.cover_image}
            className="object-cover h-full w-full"
          />
        )}
        {!profile?.user_meta_id?.cover_image && <div className="object-cover w-full pt-[34%] bg-blue-lighter"></div>}
      </div>
      <div className="bg-white mb-[48px]">
        <div className="md:flex justify-between xl:w-[1146px] mx-auto bg-white pb-[25px] flex-wrap px-5 xl:px-0">
          <div className="md:flex xl:w-[68%]">
            <div className="flex">
              <div className="h-[50px] md:h-auto">
                <div
                  style={{ filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))" }}
                  className=" border-[3px] border-[#FFFFFF] block overflow-hidden rounded-full translate-y-[-50px] md:w-[214px] md:h-[214px] w-[100px] h-[100px]"
                >
                  <ImageCMS src={profile?.avatar} width={300} height={300} className="w-full h-full" />
                </div>
              </div>
              {profile && <p className="title-small-40 py-2 text-blue md:hidden ml-3">{profile?.user_meta_id?.nick_name}</p>}
            </div>
            <div className="md:mt-[19px] md:ml-[32px] w-full">
              <div className="md:flex mb-[19px]">
                {profile && <p className="text-30-bold text-blue leading-[35px] hidden md:block">{profile?.user_meta_id?.nick_name}</p>}
                {(isLogin === true && userId === myprofile?.id && (
                  <div className="flex ml-auto md:pl-2">
                    <Button className="mr-[12px] flex items-center" onClick={() => openEdit(true)}>
                      <EditIcon className="mr-[8px]" />
                      Chỉnh sửa
                    </Button>
                    <Button type="outlined" onClick={() => openShare(true)}>
                      Chia sẻ
                    </Button>
                  </div>
                )) || (
                  <div className="flex ml-auto md:pl-2">
                    {isLogin === true && followed ? (
                      <ButtonPink className="mr-[12px]" type="default" color="pink" onClick={() => setUnfollow(true)}>
                        Đang theo dõi
                      </ButtonPink>
                    ) : (
                      isLogin === true && (
                        <Button className="mr-[12px]" onClick={followProfile}>
                          Theo dõi
                        </Button>
                      )
                    )}
                    <Button type="outlined" onClick={() => openShare(true)}>
                      Chia sẻ
                    </Button>
                  </div>
                )}
              </div>
              <p>{profile?.user_meta_id?.introduction}</p>
              <div className="flex mt-[20px] items-center">
                <div className="mr-[20px]">
                  <div className="text-center flex items-center mb-[16px]">
                    <StarIcon className="" />
                    <p className="body-15-bold ml-2">{fameTotal || 0} Danh vọng</p>
                  </div>
                  <div className="text-center flex items-center">
                    <HeartIcon className="" />
                    <p className="body-15-bold ml-2">{likeList || 0} Tim</p>
                  </div>
                </div>
                <div>
                  <div
                    className={`text-center flex items-center mb-[16px] ${followers?.data?.length > 0 ? "cursor-pointer" : "cursor-auto"}`}
                    onClick={() => setModal(followers?.data?.length > 0 ? true : false)}
                  >
                    <FollowerIcon className={` ${followers?.data?.length > 0 ? "cursor-pointer" : "cursor-auto"}`} />
                    <p className="body-15-bold ml-2">{followedList?.data?.length} Người theo dõi</p>
                  </div>
                  <div className="text-center flex items-center">
                    <ProjectIcon className="" />
                    <p className="body-15-bold ml-2">{publicProjects || 0} Dự án</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activityLog?.data?.length > 0 ? activityLog?.data?.length : "empty"}
              variants={animatParent}
              initial={"closed"}
              animate={"open"}
              exit={"closed"}
              className="md:w-full xl:w-fit md:bg-[#E9F5FF] xl:bg-[transparent] md:mt-[12px] rounded-[4px]"

            >
              <div className="md:p-0 py-3 md:mt-[18px] mt-[10px] relative xl:h-full md:h-[230px] h-fit w-full xl:w-fit md:ml-[20px] ">
                <img src="/images/wrap-noti.png" className="md:hidden xl:block md:w-[330px] h-[220px]" />
                <p className="absolute md:top-0 top-[18px] md:left-[15px] left-[35px] mt-[5px] body-13-bold text-blue">Hoạt động gần đây</p>
                <div className="overflow-y-auto overflow-x-hidden absolute md:top-[35px] top-[50px] md:left-[15px] left-[20px] md:w-[91%] w-[90%] md:h-[71%] h-[160px]">
                  {activityLog?.data?.length > 0 ? (
                    activityLog?.data
                      ?.sort(sortFunc)
                      .slice(0, 10)
                      ?.map((item: any, index: any) => (
                        <motion.div variants={childrent} key={index} transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}>
                          <Link href={item?.activity_ref_to || "#"} key={index}>
                            <div className="flex items-center">
                              <div>{action[item.type]}</div>
                              <div className="">
                                <div
                                  className="text-[14px] hover:underline underline-offset-2"
                                  dangerouslySetInnerHTML={{ __html: checkBannedText(item.activity_display_text) as string }}
                                ></div>
                                <p className="text-[13px] text-blue">{dayjs(item.date_created).fromNow()}</p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                  ) : (
                    <div className="mt-[10px]">
                      <div className="flex justify-center items-center h-full">
                        <img width={100} height="50" src="/images/not-found.png" alt="" />
                      </div>
                      <p className="text-center text-[13px] text-blue">Không có hoạt động nào gần đây</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div>
        <OrtherProject listProjectType={listProjectType} auth={projects?.id} profileId={userId} projects={projects} profile={profile} />
      </div>
    </div>
  );
}
