import React, { Ref, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DropDownIcon } from "../icons/action";
import { animatParentOpacity, childrentSelect } from "@/lib/motion";
import useOnClickOutside from "@/hook/outside";

interface Option {
  key: string;
  value: string;
}

interface AuxProps {
  className?: string;
  placeholder?: string;
  options: Option[];
  onChange?: (key: string, index: number) => void;
  defaultValue?: any;
  disabled?: boolean;
  error?: string;
}

const Select = ({ disabled, placeholder, className, options = [], onChange = () => {}, defaultValue = null, error }: AuxProps) => {
  // setErrors((errors: any) => ({ ...errors, project_link: "Link không hợp lệ" }));
  const valueInit = options.find((element) => element.key === defaultValue)?.value;
  const [select, setSelect] = useState(false);
  const [value, setValue] = useState(valueInit);
  const ref = useRef<any>();
  useEffect(() => {
    const valueInit = options.find((element) => element.key == defaultValue)?.value;
    setValue(valueInit);
  }, [defaultValue]);
  const toggle = () => {
    if (disabled) return;
    setSelect((state) => !state);
  };
  const close = () => {
    setSelect(false);
  };
  useOnClickOutside(ref, close);

  const onClick = (key: string, value: string, index: number) => {
    return () => {
      onChange(key, index);
      setValue(value);
      close();
    };
  };
  const mapColor: any = {
    disabled: "bg-gray text-gray-400",
    error: "bg-white-10 text-gray-600 border-pink ",
  };

  const type = error ? "error" : disabled ? "disabled" : "";
  const clscolor = mapColor[type] || "bg-white-10 text-gray-600 border-gray-400";
  const clx = `w-auto md:min-w-[128px] cursor-pointer rounded-md relative border-[1px] ${className || ""} ${clscolor} `;

  return (
    <div className="w-full">
      <div className={clx} ref={ref}>
        <div className={"flex justify-between items-center  rounded-lg p-3 " + (select ? "outline" : "")} onClick={toggle}>
          <span className="mr-3 truncate body-15 " style={{ lineHeight: "20px" }}>
            {value || placeholder}
          </span>
          <DropDownIcon />
        </div>

        <AnimatePresence>
          {select && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={animatParentOpacity}
              className={"absolute z-[20] left-0 top-full py-2 rounded-md w-full "}
            >
              <div className="bg-white shadow rounded">
                {options.map((element, index: number) => (
                  <div
                    key={element.key}
                    // variants={childrentSelect}
                    onClick={onClick(element.key, element.value, index)}
                    className="h-10 min-w-full body-15 max-w-fit group px-2 duration-200 flex items-center paragraph-2 hover:text-blue  "
                  >
                    <span className=" duration-150 my-1 block w-full"> {element.value} </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="text-11 text-pink mt-0.5">{error}</div>
    </div>
  );
};

export default Select;
