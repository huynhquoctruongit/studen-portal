import { SearchIcon } from "public/images/svg";
import { useEffect, useRef, useState } from "react";

const InputSearch = ({ onSearch = () => {} }: any) => {
  const [input, setInput] = useState("");
  const ref: any = useRef();
  const onKeyDown = (e: any) => {
    const keycode = e.keycode || e.which;
    if (keycode === 13) onSearch(e.target.value);
  };
  const onClickSearch = () => {
    onSearch(input);
  };
  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <div className="xl:w-[1146px] mx-auto px-[20px] xl:px-0 py-[40px]">
      <p className="title text-pink mb-[25px]">Tìm kiếm</p>
      <div className="flex items-center">
        <input
          ref={ref}
          onKeyDown={onKeyDown}
          onInput={(e: any) => setInput(e.target.value)}
          placeholder="Nhập nickname hoặc tên dự án"
          style={{ borderRadius: "5px 0px 0px 5px" }}
          className="focus-visible:outline-none w-full px-[24px] py-[9px] border-t-[1px] border-l-[1px] border-b-[1px] border-[#BCBBBB]"
        />
        <button style={{ borderRadius: "0px 5px 5px 0px" }} className="bg-blue p-[7px] " onClick={() => onClickSearch()}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default InputSearch;
