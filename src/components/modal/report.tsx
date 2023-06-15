"use client";
import { useState } from "react";
import { Button } from "@/ui/button";
import { FacebookShareButton } from "react-share";
import Select from "@/ui/form/select";
import { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";
import AxiosClient from "@/lib/api/axios-client";
import { SuccessIcon } from "@/ui/icons/action";
import { useToast } from "@/hook/use-toast";

const Report = ({ toggle, project }: any) => {
  const { toggleToast }: any = useToast();
  const { data: listReason } = useSWR("/items/reporting_reason?fields=*", fetcherClient);
  const [copy, setCopy] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("report");
  const [selected, setSelected] = useState({
    id: 1,
    reason_input: false,
  });
  let href = "";
  let url = "";
  if (typeof window !== "undefined") {
    href = window.location.href;
    url = window.location.pathname + window.location.search;
  }
  const sortFunc = (a: any, b: any) => {
    const first = a.order;
    const last = b.order;
    return first - last;
  };
  const optionsSubject = listReason?.data?.sort(sortFunc).map((item: any) => ({ key: item.id, value: item.reason, ...item })) || [];
  const copyButton = () => {
    if (href) {
      navigator.clipboard.writeText(href);
    }
    setCopy(true);
  };
  const onSelect = (item: any) => {
    const reason = listReason?.data?.find((elm: any) => elm.id == item);
    setSelected(reason);
  };
  const onInput = (e: any) => {
    setInput(e.target.value);
  };
  const onSend = () => {
    let params = null;
    if (selected?.reason_input === true && input !== "") {
      params = {
        content: input || "",
        project: project?.id,
        reason: selected?.id || optionsSubject?.[0]?.id,
      };
    } else {
      params = {
        project: project?.id,
        reason: selected?.id || optionsSubject?.[0]?.id,
      };
    }
    if (params) {
      toggle();
      AxiosClient.post("/items/report", params)
        .then((res) => {
          toggleToast({
            show: true,
            status: "success",
            message: "Cảm ơn bạn đã báo cáo dự án này",
            time: 5000,
          });
        })
        .catch((err) => {
          toggleToast({
            show: true,
            status: "fail",
            message: "Báo cáo lỗi, vui lòng thử lại sau",
            time: 5000,
          });
        });
    }
  };

  return (
    <div className="md:w-[500px] p-[24px] bg-white rounded-[8px]">
      <div>
        <p className="text-24-bold text-blue mb-[32px]">Báo cáo</p>
        <Select onChange={onSelect} options={optionsSubject} defaultValue={optionsSubject?.[0]?.key} className="w-full" />
        {selected?.reason_input && (
          <div>
            <p className="mt-[20px] text-blue">Lý do</p>
            <div className="relative mt-[10px] w-full">
              <textarea
                onInput={onInput}
                className="w-full min-h-[111px] text-ellipsis overflow-hidden input-copy-clipboard input-share focus-visible:outline-none bg-[#DEF8FF] pl-[12px] pr-[106px] py-[8px] rounded-[5px] text-blue"
                placeholder="Nhập lý do"
              />
            </div>
          </div>
        )}

        <div className="flex items-center mt-[20px]">
          <Button type="outlined" className="mr-[16px]" onClick={toggle}>
            Huỷ
          </Button>
          <Button disabled={selected.id === 3 && input === "" ? true : false} onClick={onSend}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Report;
