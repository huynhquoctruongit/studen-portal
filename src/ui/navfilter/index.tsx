"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ModalView from "../modal/index";
import { Button } from "@/ui/button";
import AxiosClient from "@/lib/api/axios-client";
import dayjs from "dayjs";

const NavFilter = ({ callback, id, defaultValue }: any) => {
  const items = [
    { label: `Tuần ${dayjs().week()}`, value: "week" },
    { label: `Tháng ${dayjs().month() + 1}`, value: "month" },
    { label: `Năm ${dayjs().year()}`, value: "year" },
  ];
  const init = items.findIndex((item: any) => {
    return item.value.toLowerCase() === defaultValue;
  });

  const [select, setSelect] = useState(init);
  const onChange = (index: any) => {
    setSelect(index);
    if (callback) callback(items[index],'fame');
  };

  return (
    <div className="md:w-fit w-full rounded-[8px] inline-flex gap-1 bg-white border-[1px] border-blue overflow-hidden mt-[24px] md:mt-0">
      {items.map((element: any, index: number) => {
        return (
          <div
            key={index + "toggle"}
            className="md:w-inherit w-[calc(100%/3)] relative rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => onChange(index)}
          >
            {select === index && (
              <motion.div
                layoutId={id || "toggle"}
                className="shadow absolute z-0 w-full h-full left-0 top-0 bg-blue text-white"
              ></motion.div>
            )}
            <div className={`relative py-1 whitespace-nowrap body-15-bold px-4 z-10 ${select === index ? "text-white  " : "text-gray-600"}`}>
              {element?.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavFilter;
