"use client";
import AxiosClient from "@/lib/api/axios-client";
import { checkBannedText } from "@/lib/helper";
import PlayProject from "@/ui/embed";
import { ImageCMS } from "@/ui/image";
import Loading from "./loading";
import NotFound from "@/ui/notfound";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShareCom from "../ui/action";
import CommentInput from "../ui/comment";
import AuthorAction from "../ui/edit";
import Tutorial from "../ui/tutorial";
import TrackingPage from "./tracking";

const Retry = ({ id }: any) => {
  const [data, setData]: any = useState(null);
  useEffect(() => {
    AxiosClient.get("/items/projects/" + id + "?fields=*,user_created.*,subject_id.*,user_created.user_meta_id.*")
      .then((res) => {
        setData(res.data);
      })
      .catch((erorr) => setData(undefined));
  }, []);
  if (data === null) return <Loading />;
  if (data === undefined)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFound content="Không tìm thấy dự án" />{" "}
      </div>
    );
  return (
    <div>
      <title>{data?.project_title}</title>
      <meta name="description" content={data?.project_description} />
      <meta property="og:image" content={process.env.CMS + `/assets/${data?.project_thumbnail}`} />
      <main className="bg-background py-5 md:py-10 animate-page">
        <TrackingPage projectId={data.id} />
        <div className="max-w-[1144px] min-h-32  mx-auto">
          <div className="flex items-center px-3 xl:px-0">
            <div className="w-10 h-10">
              <ImageCMS src={data?.user_created?.avatar} width={40} height={40} className="rounded-full overflow-hidden w-full h-full" />
            </div>
            <div className="body-15 ml-2 flex">
              <span className="body-15">tác giả</span>
              <Link href={`/profile?id=${data?.user_created?.id || data?.subject_id?.user_created}`}>
                <div className="ml-1 body-15-bold cursor-pointer text-blue hover:underline underline-offset-2">
                  {data?.user_created?.user_meta_id?.nick_name || "ICANTECH Club-er"}
                </div>
              </Link>
            </div>
          </div>
          <div className="xl:flex items-end my-6 px-3 xl:px-0">
            <div
              className="title-small-40 md:title text-pink pr-3 break-all"
              id="text-title-detail"
              dangerouslySetInnerHTML={{ __html: checkBannedText(data?.project_title) as string }}
            ></div>
            <div className="mb-1.5 ml-auto md:min-w-[400px] flex mt-3 xl:mt-0">
              <AuthorAction data={data} />
            </div>
          </div>
          <div className="bg-white px-3 md:p-5 pt-6 rounded-lg">
            <div className="md:flex">
              <div className="w-full md:w-6/12">
                <div className="w-full xl:w-[546px] xl:h-[366px] overflow-hidden rounded-lg" style={{ aspectRatio: 546 / 366 }}>
                  <PlayProject data={data} />
                </div>
              </div>
              <div className="w-full md:w-6/12 md:pl-6 flex flex-col mt-3 md:mt-0">
                <div className="body-18-bold text-blue">#{data?.subject_id?.subject_name}</div>
                <div className="xl:h-[268px] overflow-x-hidden overflow-y-scroll">
                  <pre
                    className={" whitespace-pre-line body-15"}
                    dangerouslySetInnerHTML={{ __html: checkBannedText(data?.project_description) as string }}
                  ></pre>
                </div>
                {data.subject_id.subject_name === "Minecraft" && <Tutorial />}
                <ShareCom
                  id={id}
                  project={data}
                  statistic={data.project_statistic_id}
                  date_created={data.date_created}
                  user_created={data.user_created}
                />
              </div>
            </div>
          </div>
          <div className="md:mt-[54px] max-w-[754px] mx-auto px-3 mt-8 mb-1 md:mb-0">
            <div className="">
              <CommentInput id={data.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Retry;
