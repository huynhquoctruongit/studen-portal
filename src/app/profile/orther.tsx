"use client";
import Project from "@/ui/project";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/lib/motion";
import Pagination from "@/ui/pagination";
import NotFound from "@/ui/notfound";
import useSWR from "swr";
import { optionsFetch } from "@/lib/api/axios-client";
import { useFilterProfile } from "@/hook/use-filter-profile";
import { useAuth } from "@/hook/auth";
import ProjectDraft from "@/ui/project/daft";
import { usePin } from "@/hook/use-pin";
import dayjs from "dayjs";

export let updateOrtherProfile: any = () => {};
export default function OrderProject({ listProjectType, meta: defaultMeta, profileId, profile: infoUser }: any) {
  const { profile } = useAuth();
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(0);
  const { projectPinned } = usePin();
  const [page, setPage] = useState(1);
  const itemPerPage = 12;

  const { data: subject } = useSWR("/items/subjects", optionsFetch);
  const { updateFilter, updateQuery, params, result, isLoading, query, meta, forUpdate } = useFilterProfile({
    query: { ...defaultMeta, sort: "-date_created" },
    params: { user_created: profileId, status: "PUBLISHED" },
  });
  updateOrtherProfile = forUpdate;
  const subjects = subject?.data || [];
  const changePage = (value: number) => {
    setPage(value);
  };
  const tabsFilter =
    profileId === profile?.id
      ? [
          { title: "Công khai", value: "PUBLISHED" },
          { title: "Dự án ẩn", value: "DRAFT" },
        ]
      : [];
  const allSubject = [{ subject_name: "Tất cả", id: "", subject_type: "TAT_CA" }, ...subjects];
  const addAllTab = ["TAT_CA", ...listProjectType];
  const data = (result || []).sort((a: any, b: any) => {
    const aPined = projectPinned[a.id];
    const bPined = projectPinned[b.id];
    if (bPined && aPined) return dayjs(aPined.date_created).unix() > dayjs(bPined.date_created).unix() ? -1 : 1;
    if (aPined || bPined) return aPined ? -1 : 1;
    return dayjs(a.date_created).unix() > dayjs(b.date_created).unix() ? -1 : 1;
  });
  const projects = [...data].slice((page - 1) * itemPerPage, page * itemPerPage);

  return (
    <div className=" bg-white">
      <div className="">
        <div className="xl:w-[1146px] mx-auto px-[20px] xl:px-0 pb-2 md:pb-2">
          <h2 className="md:title title-small-40 text-pink flex items-center md:pt-[53px] pt-[24px]">
            Khám phá các dự án khác của {infoUser?.user_meta_id?.nick_name}
          </h2>
          <div className="w-[calc(100vw-40px)] md:w-full flex snap snap-x xl:flex-wrap overflow-x-auto mt-6 md:gap-8 gap-x-3 scroll-none">
            {allSubject.map((element: any, index: number) => {
              const cls = active === index ? " text-blue active" : " ";
              const isType = addAllTab?.filter((item) => item === element?.subject_type);
              return (
                isType?.[0] && (
                  <div
                    key={element.subject_name}
                    onClick={() => {
                      setPage(1);
                      setActive(index);
                      updateFilter({ ...params, subject: element.id });
                    }}
                    className={
                      "cursor-pointer whitespace-nowrap pb-2.5 body-18 text-stroke hover:text-blue relative transition-corlor duration-200 ease-in-out " +
                      cls
                    }
                  >
                    {element.subject_name}
                    {active === index && <div className={"absolute  lef-0 z-10 bottom-[0px] bg-blue h-[2px] w-full " }></div>}
                  </div>
                )
              );
            })}
          </div>
          {tabsFilter.length > 0 && (
            <div className="flex mt-6 gap-4">
              {tabsFilter.map((element: any, index: number) => {
                const cls =
                  filter === index
                    ? "text-white bg-blue active-white"
                    : "bg-[#DCEFFF] hover:text-blue transition-corlor duration-200 ease-in-out";
                return (
                  <div
                    key={element.title}
                    onClick={() => {
                      setFilter(index);
                      setPage(1);
                      updateFilter({ ...params, status: element.value });
                    }}
                    className={"cursor-pointer body-18 text-stroke py-2 px-4 rounded-full  " + cls}
                  >
                    {element.title}
                  </div>
                );
              })}
            </div>
          )}
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
            {result && projects && projects?.length === 0 && <NotFound content="Oops…không có kết quả nào rồi!" />}
            {!isLoading && projects?.length !== 0 && (
              <motion.div
                className="grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-8 gap-x-[30px] md:gap-y-10 gap-y-3  pb-2 md:pb-20"
                initial={"hidden"}
                animate="visible"
                exit={"exit"}
                key={JSON.stringify(query) + JSON.stringify(params)}
                variants={opacity}
              >
                {projects.map((item: any, index: number) => {
                  return filter === 0 ? (
                    <Project
                      updateUI={forUpdate}
                      key={item.id + "project orther" + index}
                      data={item}
                      className="w-full border-[1.5px] border-[white] hover:border-blue animate"
                    />
                  ) : (
                    <ProjectDraft
                      updateUI={forUpdate}
                      key={item.id + "project orther" + index}
                      data={item}
                      className="w-full border-[1.5px] border-[white] hover:border-blue animate"
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <Pagination
            total={meta.filter_count}
            itemPerPage={itemPerPage}
            page={page || 1}
            setPage={changePage}
            className="flex justify-center"
          />
        </div>
      </div>
    </div>
  );
}
