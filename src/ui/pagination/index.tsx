"use client";
import { useEffect, useState } from "react";
import { Left, Right } from "../icons/action";

const Pagination = ({ total, page, setPage = () => {}, itemPerPage = 9, className }: any) => {
  const [totalCurrent, setTotal] = useState(total || 0);
  const totalPage = totalCurrent / itemPerPage;
  const pages = new Array(Math.ceil(totalPage));
  pages.fill("page");
  const onNext = () => {
    if (page >= totalPage) return;
    setPage(page + 1);
  };
  const onPrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  useEffect(() => {
    if (total >= 0) setTotal(total);
  }, [total]);
  if (!totalPage) return <div className="w-full h-[105px]"></div>;

  return (
    <div className={"py-4 " + className}>
      <div className="flex items-center gap-[22px] ">
        <div className="">
          <Left
            onClick={onPrev}
            className={`rounded-full w-[25px] h-[25px] cursor-pointer hover:opacity-90 ${
              page === 1 && "opacity-40 hover:opacity-40 cursor-not-allowed"
            }`}
          />
        </div>
        <div className="flex md:gap-[22px] gap-[15px]">
          {pages.map((element, index: number) => {
            const cls = index + 1 === page ? " text-blue active " : " text-gray-400 ";
            return (
              <div
                key={"pagi-" + index}
                onClick={() => setPage(index + 1)}
                className={"rounded-full hover:text-blue cursor-pointer text-stroke body-15-bold text-blue " + cls}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="">
          <Right
            onClick={onNext}
            className={`rounded-full w-[25px] h-[25px] cursor-pointer hover:opacity-90 ${
              page >= totalPage && "opacity-40 hover:opacity-40 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
export default Pagination;
