"use client";
import { useFilter } from "@/hook/use-filter";
import Project from "@/ui/project";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/lib/motion";
import NotFound from "@/ui/notfound";
import HotProject from "./hot-project";
import InfiniteScroll from "react-infinite-scroller";
import ProjectSketon from "@/ui/sketon/project";
import AxiosClient from "@/lib/api/axios-client";

const convertParamToQuery = (params: any) => {
  const payload = { _and: [{ status: { _eq: "PUBLISHED" } }] } as any;
  if (params.subject) payload._and.push({ subject_id: { _eq: params.subject } });
  if (params.home === "new") payload._and.push({ date_created: { _gte: "$NOW(-3 days)" } });
  return payload;
};

export default function OrderProject({ subjects }: any) {
  const [subject, setSubject] = useState(0);
  const [tab, setTab] = useState(0);

  const [query, setQuery]: any = useState({ page: 1, limit: 6, sort: "-date_created" });
  const [data, setData]: any = useState([]);
  const status: any = useRef("init");

  const tabsFilter = [
    { title: "Tất cả", value: "" },
    { title: "Mới nhất", value: "new" },
    { title: "Hot nhất", value: "hot" },
  ];
  const allSubject = [{ subject_name: "Tất cả", id: "" }, ...subjects];

  const fetchData = async (page: number) => {
    const queryStr = "&" + new URLSearchParams({ ...query, page: page }).toString();
    const filter = { subject: allSubject[subject].id, home: tabsFilter[tab].value };
    const filterStr = JSON.stringify(convertParamToQuery(filter));
    const result = await AxiosClient.get(
      "/items/projects?fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&meta=filter_count&filter=" +
        filterStr +
        queryStr,
    );

    if (result.data?.length < query.limit) status.current = "notHasMore";
    if (page === 1 && result.data?.length === 0) status.current = "notFound";
    setData((oldData: []) => [...oldData, ...result.data]);
  };

  const loadFunc = (page: number) => {
    fetchData(page);
  };

  const changeSubject = (index: number) => {
    if (index === subject) return;
    setSubject(index);
    setData([]);
    status.current = "init";
  };

  const changeTab = (index: number) => {
    if (index === tab) return;
    setTab(index);
    setData([]);
    status.current = "init";
  };

  const isLoading = false;
  return (
    <div className=" bg-white">
      <div className="bg-[url(/images/bg-home.png)] bg-fixed bg-no-repeat md:bg-repeat-y bg-contain " style={{ backgroundPosition: "0px 0" }}>
        <div className="w-[1146px] mx-auto ">
          <h2 className="md:title title-small-40 text-pink flex items-center pt-[53px]">Khám phá các dự án khác</h2>
          <div className="flex flex-wrap mt-6 gap-8 border-b-[1px] border-[#D6D6D6]">
            {allSubject.map((element: any, index: number) => {
              const cls = subject === index ? " text-blue active" : " ";
              return (
                <div
                  key={element.subject_name}
                  onClick={() => {
                    changeSubject(index);
                  }}
                  className={
                    "cursor-pointer pb-2.5 body-18 text-stroke hover:text-blue relative transition-corlor duration-200 ease-in-out " + cls
                  }
                >
                  {element.subject_name}
                  {subject === index && <div className="absolute lef-0 z-10 bottom-[-1px] bg-blue h-0.5 w-full"></div>}
                </div>
              );
            })}
          </div>
          <div className="flex mt-6 gap-4">
            {tabsFilter.map((element: any, index: number) => {
              const cls =
                tab === index
                  ? "text-white bg-blue active-white"
                  : "bg-[#DCEFFF] hover:text-blue transition-corlor duration-200 ease-in-out";
              return (
                <div
                  key={element.title}
                  onClick={() => changeTab(index)}
                  className={"cursor-pointer body-18 text-stroke py-2 px-4 rounded-full  " + cls}
                >
                  {element.title}
                </div>
              );
            })}
          </div>
          <div className="min-h-[700px]">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={"hidden"}
                  animate="visible"
                  exit={"exit"}
                  variants={opacity}
                  className="w-full h-[500px]"
                  key={"loading"}
                ></motion.div>
              )}
              {status.current === "notfound" && (
                <NotFound content="Oops…không có kết quả nào rồi, cậu thử tìm với các danh mục khác nhé!" />
              )}
              {tab === 2 ? (
                <HotProject allSubject={allSubject} active={subject} />
              ) : (
                status.current !== "notfound" && (
                  <motion.div
                    initial={"hidden"}
                    className="pb-10"
                    animate="visible"
                    exit={"exit"}
                    key={subject + "subject" + tab}
                    variants={opacity}
                  >
                    <InfiniteScroll
                      initialLoad={true}
                      threshold={500}
                      loadMore={loadFunc}
                      hasMore={status.current !== "notHasMore"}
                      pageStart={0}
                      useWindow={true}
                      loader={<ProjectSketon key="0" />}
                    >
                      {data.length > 0 && (
                        <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-x-[30px] md:gap-y-10 gap-y-3 ">
                          {data.map((item: any, index: number) => {
                            return (
                              <Project
                                key={item.id + "project orther" + index}
                                data={item}
                                className="w-full border-[1.5px] border-[white] hover:border-blue animate"
                              />
                            );
                          })}
                        </div>
                      )}
                    </InfiniteScroll>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
