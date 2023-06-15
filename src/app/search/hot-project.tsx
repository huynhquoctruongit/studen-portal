"use client";
import { useEffect, useState } from "react";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import Project from "@/ui/project";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/lib/motion";
import Pagination from "@/ui/pagination";
import { useHotProject } from "@/hook/status-project";
import NotFound from "@/ui/notfound";
import InfiniteScroll from "react-infinite-scroller";
import ProjectSketon from "@/ui/sketon/project";

const HotProject = ({ allSubject, active }: any) => {
  const limit = 6;
  const [page, setPage] = useState(0);
  const { hots = [] } = useHotProject();
  const subject = allSubject[active];

  useEffect(() => {
    setPage(0);
  }, [active]);

  const dataFilter = active === 0 ? hots : hots.filter((item: any) => item.subject_id?.id === subject?.id);
  const totalPage = Math.ceil(dataFilter?.length / limit);
  const dataRender = dataFilter?.slice(0, page * limit);
  const loadFunc = (page: number) => {
    setPage((page) => page + 1);
  };

  return (
    <div className="min-h-[548px]">
      <AnimatePresence mode="wait">
        {hots && hots?.length === 0 && <NotFound content="Oops…không có kết quả nào rồi, cậu thử tìm với các danh mục khác nhé!" />}
        <motion.div className="pb-10" initial={"hidden"} animate="visible" exit={"exit"} key={active} variants={opacity}>
          <InfiniteScroll
            initialLoad={true}
            threshold={500}
            loadMore={loadFunc}
            hasMore={totalPage > page}
            pageStart={0}
            useWindow={true}
            loader={<ProjectSketon key="0" />}
          >
            <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-x-[30px] md:gap-y-10 gap-y-3 ">
              {dataRender.map((item: any, index: number) => {
                return (
                  <Project
                    key={item.id + "project orther" + index}
                    data={item}
                    className="w-full border-[1.5px] border-[white] hover:border-blue animate"
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default HotProject;
