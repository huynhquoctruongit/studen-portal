"use client";
import { useEffect, useState } from "react";
import Tooltip from "../tooltip";
import Input from "../form/input";
import debounce from "lodash/debounce";
import AxiosController from "@/lib/api/axios-controller";
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

let old = "";
const InputLink = ({
  subjectType,
  value,
  disabled,
  error,
  setErrors,
  prevent,
  setPrevent,
  onChange = () => {},
  setStatusLink = () => {},
}: any) => {
  const [valid, setValid] = useState(false);
  useEffect(() => {
    old = "";
  }, []);
  useEffect(() => {
    if (!value) {
      old = "";
      setValid(false);
    }
  }, [value]);
  const checkProjectLink = async (e: any) => {
    const text = e.target.value || e.target.textContent;
    if (!text.trim() || text === old) {
      return;
    }
    setPrevent(true);
    setValid(false);
    setErrors((errors: any) => ({ ...errors, project_link: "" }));

    old = text;
    setStatusLink("checking");
    await AxiosController.post("/api/v1/link/validate", {
      link: text,
      type: subjectType || "SCRATCH",
    })
      .then((element) => {
        setStatusLink("valid");
        setValid(true);
        setPrevent(false);
      })
      .catch((error) => {
        setStatusLink("invalid");
        setErrors((errors: any) => ({ ...errors, project_link: "Link không hợp lệ" }));
        setPrevent(false);
      });
  };
  const func = debounce(checkProjectLink, 500);
  const onChangeLink = (e: any) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <Tooltip position={{ x: 16, y: 40 }} content={disabled ? "Link dự án không thể chỉnh sửa" : ""}>
        <Input
          className={disabled ? "w-full bg-gray" : "w-full bg-[#DEF8FF]"}
          type="text"
          disabled={disabled || value?.id || prevent}
          value={value}
          error={error}
          onChange={onChangeLink}
          onBlur={func}
        />
        <div className="h-[46px] mt-1 absolute w-10 top-0 right-0">
          <div className="absolute top-[50%] translate-y-[-50%] right-2">
            {prevent && <img src="/images/icons/loading.gif" className="w-4 h-4" alt="" />}
            {!prevent && error && <ExclamationCircleIcon className="w-4 h-4 stroke-pink" />}
            {valid && !error && <CheckBadgeIcon className="w-4 h-4 stroke-green-400" />}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default InputLink;
