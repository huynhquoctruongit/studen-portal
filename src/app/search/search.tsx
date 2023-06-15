"use client";
import { Avatar } from "@/ui/image";
import NotFound from "@/ui/notfound";
import Project from "@/ui/project";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon, FollowerIcon, ProjectIcon } from "../../../public/images/svg/index";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/lib/motion";

const Profile = ({ data }: any) => {
  const statistic = data.user_statistic_id || {};
  return (
    <div className="flex mb-10 items-center xl:pl-[150px]">
      <div className="min-w-[128px] h-[128px] overflow-hidden rounded-full mr-[32px]">
        <Link href={"/profile?id=" + data.id}>
          <Avatar src={data?.avatar} width={128} height={128} className="object-cover h-[128px] w-[128px]" />
        </Link>
      </div>
      <div>
        <Link href={"profile?id=" + data.id}>
          <p className="text-24-bold text-blue mb-[12px] hover:underline md:whitespace-nowrap md:truncate-1">
            {data?.user_meta_id?.nick_name || data?.first_name}
          </p>
        </Link>
        <div className="flex mb-[8px]">
          <HeartIcon className="mr-[8px] w-6 h-6 cursor-auto" />
          <p className="body-15">{statistic.num_like_per_year} Tim</p>
        </div>
        <div className="flex mb-[8px]">
          <FollowerIcon className="mr-[8px] w-6 h-6 cursor-auto mb-[4px]" />
          <p className="body-15">{statistic.num_follower_per_year} Người theo dõi</p>
        </div>
        <div className="flex mb-[8px]">
          <ProjectIcon className="mr-[8px] w-6 h-6 cursor-auto" />
          <p className="body-15">{statistic.num_project_per_year} Dự án</p>
        </div>
      </div>
    </div>
  );
};

export default function SearchResult({ projects, users, input }: any) {
  const [active, setActive] = useState(0);
  const tabs = [
    { title: "Sản phẩm", value: "product", total: projects.length },
    { title: "Trang cá nhân", value: "personal-page", total: users.length },
  ];
  useEffect(() => {
    if (projects.length === 0 && users.length !== 0) setActive(1);
  }, [projects, users]);

  return (
    <div className=" bg-white w-screen px-3 xl:px-0">
      <p className="text-24-bold text-blue">{`${active === 0 ? projects.length : users.length} kết quả tìm kiếm cho “${input}”`}</p>
      <div className="">
        <div className=" xl:w-[1146px]">
          <div className="flex flex-wrap mt-6 gap-8 border-b-[1px] border-[#D6D6D6]">
            {tabs.map((element: any, index: number) => {
              const cls = active === index ? "text-blue active" : "";
              if (!element) return null;
              return (
                <div
                  key={element.title}
                  onClick={() => {
                    setActive(index);
                  }}
                  className={
                    "text-stroke cursor-pointer pb-2.5 body-18 hover:text-blue relative transition-corlor duration-200 ease-in-out " + cls
                  }
                >
                  {element.title} <span className={active === index ? "text-blue" : "text-gray-400"}>({element.total})</span>
                  {active === index && <div className="absolute lef-0 z-10 bottom-[-1px] bg-blue h-0.5 w-full"></div>}
                </div>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {active === 0 ? (
              <motion.div key={active} initial={"hidden"} animate="visible" exit={"exit"} variants={opacity}>
                {projects.length === 0 && <NotFound className="w-full" />}
                {projects.length !== 0 && (
                  <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-x-[30px] md:gap-y-10 gap-y-3  pb-20 animate-page">
                    {projects.map((item: any, index: number) => {
                      return (
                        <Project
                          key={item.image + "project orther" + index}
                          data={item}
                          className="w-[clac(100vw-40px)] md:w-full border-[1.5px] border-[white] hover:border-blue animate"
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key={active} initial={"hidden"} animate="visible" exit={"exit"} variants={opacity}>
                {users.length === 0 && <NotFound />}
                {users.length !== 0 && (
                  <div className="grid md:grid-cols-2 gap-x-[30px] gap-y-10 animate-page mt-6">
                    {users.map((element: any) => {
                      return <Profile data={element} key={element.id + "profile"} />;
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
