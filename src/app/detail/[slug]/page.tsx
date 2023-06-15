import TopTen from "../ui/top-ten";
import ShareCom from "../ui/action";
import Tutorial from "../ui/tutorial";
import AuthorAction from "../ui/edit";
import { axiosServer } from "@/lib/api/axios-server";
import Link from "next/link";
import { Nunito } from "@next/font/google";
import TrackingPage from "./tracking";
import PlayProject from "@/ui/embed";
import { checkBannedText, domain, renderImageById } from "@/lib/helper";
import Retry from "./retry";
import CommentWrapper from "./comments";
import { Suspense } from "react";
import HeadMeta from "@/components/head";
import { ProjectOrther, ProjectUser } from "../ui/order-user";

const nuntio = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export async function generateStaticParams() {
  const projects = await axiosServer("/items/projects?limit=10&sort=-date_created").catch((error: any) => console.log(error));
  return projects.data.map((project: any) => ({
    slug: project.project_slug,
  }));
}

export default async function DetailPage(props: any) {
  if (!props.params.slug) return null;
  const id = props.params.slug;
  const promiseProject = axiosServer
    .get(`/items/projects/${id}?fields=*,user_created.*,subject_id.*,user_created.user_meta_id.*`)
    .catch(() => {});
  const [projectsDetail] = await Promise.all([promiseProject]);
  const data = projectsDetail?.data;

  if (!data) return <Retry id={id} />;
  if (!data) return null;

  const image = renderImageById(data?.user_created?.avatar);
  const meta = {
    title: checkBannedText(data?.project_title),
    description: checkBannedText(data?.project_description),
    content: "",
    url: "/detail/" + data.id + "?slug=" + data?.project_slug,
    image: renderImageById(data.project_thumbnail),
  };

  return (
    <div>
      <HeadMeta data={meta} />
      <main className="bg-background md:py-10 py-[20px] animate-show overflow-hidden">
        <TrackingPage projectId={data?.id} />
        <div className="max-w-[1144px] min-h-32 md:mx-auto px-3 md:px-5 xl:px-0">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <img
                src={image || "/images/default-project.png"}
                width={40}
                height={40}
                className="rounded-full overflow-hidden w-full h-full object-cover"
              />
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
          <div className="flex flex-col md:flex-row items-center mt-[12px] md:mt-6">
            <div
              className="md:title w-full 2xl:w-auto title-small-40 md:title-small-bold text-pink"
              id="text-title-detail"
              dangerouslySetInnerHTML={{ __html: checkBannedText(data?.project_title || "") as string }}
            ></div>
            <AuthorAction data={data} />
          </div>
          <div className="md:bg-white md:p-5 mt-3 rounded-lg">
            <div className="md:flex">
              <div className="md:w-6/12">
                <div className="w-full h-full lg:w-[546px] ld:h-[366px] overflow-hidden rounded-lg">
                  <PlayProject data={data} />
                </div>
              </div>
              <div className="md:w-6/12 md:pl-6 md:pt-0 pt-[12px] flex flex-col">
                <div className="body-18-bold text-blue">#{data?.subject_id?.subject_name}</div>
                <div className="md:h-[268px] overflow-y-auto overflow-x-hidden">
                  <pre
                    className={nuntio.className + " whitespace-pre-line body-15"}
                    dangerouslySetInnerHTML={{ __html: checkBannedText(data?.project_description) as string }}
                  ></pre>
                </div>
                <div className="mt-auto">
                  {data?.subject_id?.subject_name === "Minecraft" && <Tutorial subject="Minecraft" />}
                  {data?.subject_id?.subject_name === "Roblox" && <Tutorial subject="Roblox" />}
                  <ShareCom
                    id={id}
                    project={data}
                    statistic={data?.project_statistic_id}
                    user_created={data?.user_created}
                    date_created={data?.date_created}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-[54px] xl:max-w-[754px] xl:mx-auto">
            <Suspense fallback={<div className="w-10 h-20 bg-pink-50">loading.......</div>}>
              <CommentWrapper id={data.id} />
            </Suspense>
          </div>
        </div>
        <div className="py-10">
          <h2 className="px-3 md:px-5 xl:px-0 xl:title title-small-40  text-pink mb-8 xl:w-[1146px] mx-auto">Những dự án xịn xò khác</h2>
          {/* <TopTen projects={userProject?.data} title={<TitleUser />} /> */}
          <ProjectUser user_created={data?.user_created} />
          <ProjectOrther />
        </div>
      </main>
    </div>
  );
}

export const revalidate = 2000;
export const dynamic = "force-static";
