"use client";
import { IdeaIcon } from "@/ui/icons/action";
import ModalView from "@/ui/modal";
import Pagination from "@/ui/pagination";
import { useRef, useState } from "react";
import Slider from "react-slick";

const minecraft = [
  {
    src: "/images/step/minecraft2.jpg",
    title: (
      <span>
        Click vào nút “Tải file code” để tải dự án về máy <br /> (file thế giới .mcworld và file code .mkcd)
      </span>
    ),
  },
  {
    src: "/images/step/minecraft3.jpg",
    title: (
      <span className="text-black">
        Nếu bạn chưa tải ứng dụng Minecraft Education về máy, vui lòng bấm{" "}
        <a
          rel="noreferrer"
          className="font-bold text-blue "
          target="_blank"
          href="https://education.minecraft.net/en-us/get-started/download"
        >
          TẠI ĐÂY
        </a>{" "}
        và làm theo hướng dẫn để cài đặt
      </span>
    ),
  },
  {
    src: "/images/step/minecraft4.jpg",
    title: "Sau khi tải ứng dụng thành công, mở ứng dụng và đăng nhập bằng tài khoản của bạn",
  },

  {
    src: "/images/step/minecraft5.jpg",
    title: "Chọn “Play” để bắt đầu",
  },
  {
    src: "/images/step/minecraft6.jpg",
    title: "Chọn “Import” và tải file thế giới (.mcworld) vào ứng dụng",
  },
  {
    src: "/images/step/minecraft7.jpg",
    title: "Sau khi tải thành công, chọn Block bạn vừa tải lên",
  },
  {
    src: "/images/step/minecraft8.jpg",
    title: "Ấn phím C để tải file code (đuôi .mckd)",
  },
  {
    src: "/images/step/minecraft9.jpg",
    title: "Hoàn thành. Chúc bạn trải nghiệm dự án thật vui. Đừng quên thả tim để ủng hộ chúng tớ nha",
  },
];

const rolbox = [
  {
    src: "/images/step/rolbox-1.png",
    title: "Bấm nút “Chạy dự án” ở hình ảnh thu nhỏ",
  },
  {
    src: "/images/step/rolbox-2.png",
    title: (
      <span className="text-black">
        Nếu bạn chưa cài đặt ứng dụng Roblox, bấm{" "}
        <a
          rel="noreferrer"
          className="font-bold text-blue "
          target="_blank"
          href="https://setup.rbxcdn.com/mac/version-d7b11ea3a6594e46-Roblox.dmg"
        >
          TẠI ĐÂY
        </a>{" "}
        và làm theo hướng dẫn để cài đặt
      </span>
    ),
  },
  {
    src: "/images/step/rolbox-3.png",
    title: (
      <span>
        Nếu bạn đã cài đặt ứng dụng, chọn <span className="font-bold text-blue">Open Roblox</span> để chạy dự án
      </span>
    ),
  },

  {
    src: "/images/step/rolbox-4.png",
    title: "Hoàn thành. Chúc bạn trải nghiệm dự án thật vui. Đừng quên thả tim để ủng hộ chúng tớ nha",
  },
];

const Tutorial = ({ subject }: any) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const sliderRef: any = useRef();

  const beforeChange = (oldIndex: any, newIndex: any) => {
    setActive(newIndex);
  };
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: beforeChange,
  };

  const steps = subject === "Minecraft" ? minecraft : rolbox;
  const ItemActive = steps[active];

  return (
    <>
      <div className="mt-auto text-blue items-center cursor-pointer  hidden xl:flex" onClick={() => setOpen(true)}>
        <IdeaIcon />{" "}
        <span className="ml-1.5 text-15-bold relative">
          Hướng dẫn cách chạy dự án
          <div className="absolute h-[1px] left-0 bg-blue bottom-[-1px] w-full"></div>
        </span>
      </div>
      <ModalView open={open} toggle={() => setOpen(false)}>
        <div
          className="w-fit p-1 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, #F380B8 0%, #FE6DB4 35%, #DC3B8A 100%)",
          }}
        >
          <div className="bg-white px-[92px] rounded-xl w-[791px] overflow-hidden">
            <div className=" justify-center items-center mb-6 my-6 hidden md:flex">
              <IdeaIcon className="w-10 h-10" /> <span className="body-24-bold ml-2 text-blue">Hướng dẫn cách chạy dự án</span>
            </div>
            <div className="">
              <div className="border-[1px] rounded-2xl overflow-hidden">
                <Slider ref={(ref) => (sliderRef.current = ref)} {...settings} className="">
                  {steps.map((element: any, index) => {
                    return (
                      <div key={index} className="h-full">
                        <img src={element.src} alt="" />
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div className="mt-4 body-15 text-dark text-center h-12">
                <div className="font-bold text-pink mr-[3px]">
                  Bước {active + 1}: <span className="text-[#4F4F4F] body-15-bold font-semibold">{ItemActive.title}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Pagination
                  total={steps.length}
                  page={active + 1}
                  itemPerPage={1}
                  setPage={(page: any) => {
                    sliderRef.current.slickGoTo(page - 1);
                    setActive(page - 1);
                  }}
                  className="my-8 py-0"
                />
              </div>
            </div>
          </div>
        </div>
      </ModalView>
    </>
  );
};

export default Tutorial;
