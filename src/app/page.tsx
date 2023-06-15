"use client";
import OrderProject from "./home/orther";
import TopTen from "./home/top-ten";
import Banner from "./home/banner";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import { useEffect, useState } from "react";
import HeadMeta from "@/components/head";
import { domain } from "@/lib/helper";
const Home = () => {
  const [data, setData]: any = useState();
  const filter: any = { project_state: { _eq: "POPULAR" } };
  useEffect(() => {
    const bannerPromise = AxiosClient.get(`/items/banners?sort=-date_created&limit=10`);
    const projectsPromise = AxiosClient.get(
      `/items/projects?limit=10&fields=*,user_created.user_meta_id.*,user_created.*,subject_id.*,project_statistic_id.*&meta=filter_count&filter=${JSON.stringify(
        filter,
      )}`,
    );
    const ortherPromise = AxiosClient.get(
      `/items/projects?limit=30&fields=*,subject_id.*,user_created.user_meta_id.*,user_created.*,project_statistic_id.*&sort=-date_created&filter[status][_eq]=PUBLISHED&meta=filter_count`,
    );
    const subjectsPromise = AxiosClient.get(`/items/subjects?sort=order`);
    Promise.all([projectsPromise, ortherPromise, subjectsPromise, bannerPromise])
      .catch((err) => {
        // console.log(err);
      })
      .then((res) => {
        const [projects, orther, subjects, banners]: any = res;
        setData({
          projects: projects,
          orther: orther,
          subjects: subjects,
          banners: banners,
        });
      });
  }, []);

  const meta = {
    title: "ICANTECH CLUB | Dạy học lập trình cho trẻ",
    description:
      "Sân chơi dành cho các bạn lập trình viên nhí, giúp học viên rèn luyện vững chắc kĩ năng lập trình thông qua việc thực hành tạo ra sản phẩm & thi đấu cọ sát với bạn bè.",
    content: "lập trình, trẻ em, học, code, web, game, app, scratch, python, roblox, code combat, minecraft, học lập trình online, online, trực tuyến",
    url: "/",
    image: domain + "/images/meta-image.png",
  };
  return (
    <main className="animate-page">
      <HeadMeta data={meta} />
      <Banner banners={data?.banners?.data} />
      <TopTen
        projects={data?.projects?.data}
        title={<div className="xl:w-[1146px] mx-auto title-small-bold md:title text-pink">Top 10 dự án nổi bật</div>}
        className="mt-6"
      />
      <OrderProject />
    </main>
  );
};
export default Home;
export const dynamic = "force-static";
