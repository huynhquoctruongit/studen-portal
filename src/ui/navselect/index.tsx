"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ModalView from "../modal/index";
import { Button } from "@/ui/button";

const NavSelect = ({ callback, id, defaultValue, isPublic, setEditProject = () => {} }: any) => {
  const items = [
    { label: "Công khai", value: "published", message: "Bạn có muốn công khai dự án này không?" },
    { label: "Ẩn dự án", value: "draft", message: "Bạn có muốn ẩn dự án này không?" },
  ];
  const init = items.findIndex((item: any) => {
    return item.value.toUpperCase() === defaultValue;
  });

  const [select, setSelect] = useState(init);
  const [temp, setTemp] = useState(0);
  const [modal, setModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const onChange = (index: any) => {
    return () => {
      if (select === index) return;
      if (!isPublic && index === 0) {
        setWarning(true);
        return;
      }
      setModal(true);
      setTemp(index);
    };
  };
  const confirm = () => {
    setSelect(temp);
    setModal(false);
    if (callback) callback(items[temp]);
  };
  return (
    <div className="rounded-full p-1 inline-flex gap-1 bg-[#D4ECFF] shadow ">
      {items.map((element: any, index: number) => {
        return (
          <div
            key={index + "toggle"}
            className={`relative rounded-full flex items-center justify-center ${select !== index ? "cursor-pointer" : ""}`}
            onClick={onChange(index)}
          >
            {select === index && (
              <motion.div
                layoutId={id || "toggle"}
                className="shadow absolute rounded-full z-0 w-full h-full left-0 top-0 bg-white text-blue"
              ></motion.div>
            )}
            <div className={`relative py-1 whitespace-nowrap  body-15-bold px-3 md:px-4 z-10 ${select === index ? "text-blue  " : "text-gray-600"}`}>
              {element?.label}
            </div>
          </div>
        );
      })}
      <ModalView open={modal}>
        <div className="bg-white p-10 rounded-lg">
          <div className="body-18-bold text-blue">{items[temp].message}</div>
          <div className="flex justify-center mt-6">
            <Button className="mr-[16px]" onClick={confirm}>
              Có
            </Button>
            <Button type="outlined" onClick={() => setModal(false)}>
              Không
            </Button>
          </div>
        </div>
      </ModalView>
      <ModalView open={warning}>
        <div className="bg-white p-10 rounded-lg">
          <div className="body-18-bold text-pink text-center">
            Dự án chưa có đủ thông tin để có thể công khai <br />
            Vui lòng chỉnh sửa thông tin dự án
          </div>
          <div className="flex justify-center mt-6">
            <Button type="outlined" onClick={() => setWarning(false)}>
              Bỏ qua
            </Button>
            <Button
              className="ml-[16px]"
              onClick={() => {
                setWarning(false), setEditProject(true);
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </ModalView>
    </div>
  );
};

export default NavSelect;
