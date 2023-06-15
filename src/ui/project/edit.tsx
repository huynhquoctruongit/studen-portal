"use client";

import { useRef, useState } from "react";
import { MenuIcon, WarningIcon } from "../icons/action";
import useOnClickOutside from "@/hook/outside";
import Dropdown from "../dropdown";
import { usePin } from "@/hook/use-pin";
import ModalView from "../modal";
import { Button } from "../button";
import { usePopup } from "@/components/popup";
import WarningModal from "@/components/modal/warning";
import { useToast } from "@/hook/use-toast";

const ActionProject = ({ data, setDel, setUpdate, id, isPin }: any) => {
  const ref: any = useRef();
  const { pin, unPin, length } = usePin();
  const [show, setShow] = useState(false);
  const { openToast }: any = useToast();
  const { setPopup } = usePopup();

  useOnClickOutside(ref, () => {
    setShow(false);
  });

  const handlePin = (id: any) => {
    if (length >= 3) {
      setPopup(<WarningModal message={"Bạn đã ghim tối đa 3 dự án"} />);
      return;
    }
    pin(id);
  };

  const clickDelete = () => {
    if (data.upload_type === "LMS") {
      openToast("Dự án được đồng bộ từ LMS nên không thể xoá", "fail");
    } else setDel(true);
  };
  return (
    <div className="absolute top-2.5 right-2.5 bg-red" ref={ref}>
      <div
        onClick={() => setShow((state: boolean) => !state)}
        className="w-8 h-8 rounded-lg bg-[#3094E5] opacity-80 hover:opacity-100 flex items-center justify-center"
      >
        <MenuIcon className="fill-white" />
      </div>
      {show && (
        <Dropdown className="absolute w-fit whitespace-nowrap top-full right-0 mt-2">
          <div className="bg-white rounded-lg shadow-1 px-8 py-3" onClick={() => setShow(false)}>
            <div onClick={() => setUpdate(true)} className="mb-6 body-15-bold hover:text-blue">
              Chỉnh sửa
            </div>
            <div onClick={() => (isPin ? unPin(id) : handlePin(id))} className="mb-6 body-15-bold hover:text-blue">
              {isPin ? "Bỏ ghim" : "Ghim"}
            </div>
            <div className="body-15-bold text-[#FF0000] hover:text-[#b90000]" onClick={clickDelete}>
              Xoá dự án
            </div>
          </div>
        </Dropdown>
      )}
    </div>
  );
};
export default ActionProject;
