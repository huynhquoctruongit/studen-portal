"use client";
import { useRef, useState } from "react";
import Slider from "react-slick";
import Loading from "./loading/banner";
import useSWR from "swr";

export default function Banner({}: any) {
  const [load, setLoad] = useState(true);
  const slider: any = useRef();
  const { data: bannersRes } = useSWR(`/items/banners?sort=-date_created&limit=10`, { revalidateIfStale: true });
  const banners = bannersRes?.data;

  const settings = {
    className: "rounded-xl overflow-hidden transiton duration-200 ease-in-out " + (load ? "opacity-0" : "opacity-100"),
    centerMode: false,
    speed: 1000,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    centerPadding: "100px",
    pauseOnHover: false,
    onInit: () => {
      setLoad(false);
    },
  };

  return (
    <div className="bg-background pt-[20px] md:pt-12 md:mb-8 lg:min-h-[544px]">
      <div className="w-full bg-background bg-contain bg-no-repeat"></div>
      <div className="relative group lg:w-[85%] md:w-[90vw] w-[90%] m-auto">
        {banners?.length > 0 ? (
          <Slider {...settings} ref={slider}>
            {banners?.map((element: any) => {
              return (
                <a href={element.link} rel="noreferrer" target="_blank">
                  <div
                    className="relative focus-visible:outline-[transparent] rounded-xl overflow-hidden w-full justify-center items-center banner-slider"
                    key={element.id}
                  >
                    <div className="w-fit relative">
                      <img
                        className="w-[1428px] rounded-[12px] md:rounded-[25px]"
                        width="1428px"
                        src={process.env.CMS + "/assets/" + element.image}
                      />
                      {/* {element.link && (
                      <div className="absolute bottom-0 right-0 z-10 md:w-fit w-[200px]">
                        <img src="/images/banner/shape.png" />
                        <a href={element.link} rel="noreferrer" target="_blank">
                          <p className="md:translate-y-[0px] translate-y-[22px] absolute bottom-[30px] right-0 z-10 w-full text-center text-pink md:text-[30px] text-[14px] font-[700] underline decoration-2">
                            Khám phá ngay
                          </p>
                        </a>
                      </div>
                    )} */}
                    </div>
                  </div>
                </a>
              );
            })}
          </Slider>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
}
