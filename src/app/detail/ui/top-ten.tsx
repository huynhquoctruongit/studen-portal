"use client";
import { Left, Right } from "@/ui/icons/action";
import Project from "@/ui/project";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";

export default function TopTen({ projects, title }: any) {
  const [load, setLoad] = useState(true);
  const slider: any = useRef();
  const settings = {
    dots: false,
    className: " slick-top-ten transition duration-200 ease-in-out " + (load ? "opacity-0" : "opacity-100"),
    centerMode: true,
    speed: 1000,
    autoplaySpeed: 5000,
    variableWidth: true,
    infinite: true,
    onInit: () => {
      setLoad(false);
    },
    afterChange: (current: number) => {
      indexSlide.current = current;
    },
    responsive: [
      {
        breakpoint: 480,
        settings: {
          speed: 300,
        },
      },
    ],
  };
  const projectRender = projects;
  const indexSlide: any = useRef(0);
  const step = isMobile ? 1 : 3;
  if (!projects || projects?.length === 0) return null;

  return (
    <div className="">
      <div className="w-full px-3 md:px-5 xl:px-0">
        <h3 className="body-24-bold text-blue flex items-center xl:w-[1146px] mx-auto mb-4">{title}</h3>
      </div>
      <div className="relative group translate-y-[-10px]">
        {projectRender?.length > step ? (
          <div>
            <Slider {...settings} ref={slider}>
              {projectRender?.map((item: any, index: number) => {
                return (
                  <div className="px-2 md:px-[15px] py-5 md:py-7" key={item.image + index}>
                    <Project
                      data={item}
                      className="w-[82.4vw] md:w-[362px] border-[1.5px] border-[#ECFAFE] md:hover:border-blue animate group"
                    />
                  </div>
                );
              })}
            </Slider>
            <div
              className="hidden md:block absolute left-0 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div
                onClick={() => {
                  slider.current.slickGoTo(indexSlide.current - step);
                }}
                className="p-3 md:px-5 md:py-8 rounded-r-3xl hover:translate-x-[-6px] duration-200 transiton ease-in-out cursor-pointer "
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="w-[72px] h-[72px] bg-white shadow p-1.5 rounded-full cursor-pointer ">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Left className=" w-[88vw] fill-blue h-full" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hidden md:block absolute right-0 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div
                onClick={() => {
                  slider.current.slickGoTo(indexSlide.current + step);
                }}
                className="p-3 md:px-5 md:py-8 rounded-l-3xl  hover:translate-x-[6px] duration-200 transiton ease-in-out cursor-pointer "
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="w-[72px] h-[72px] bg-white shadow p-1.5 rounded-full ">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Right className=" w-full fill-blue h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center md:justify-start xl:w-[1146px] mx-auto md:translate-x-[-15px]">
            {projectRender?.map((item: any, index: number) => {
              return (
                <div className="px-3 md:px-[15px] py-5 md:py-7" key={item.image + index}>
                  <Project
                    data={item}
                    className="w-[82.4vw] md:w-[362px] border-[1.5px] border-[#ECFAFE] hover:border-blue animate group"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
