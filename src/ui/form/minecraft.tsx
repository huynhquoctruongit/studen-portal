import AxiosClient from "@/lib/api/axios-client";
import { useEffect, useState } from "react";
import { SuccessIcon, UploadIcon } from "../icons/action";
import { AnimatePresence, motion } from "framer-motion";
import { variantsComment } from "@/lib/motion";
import { folderSource } from "@/lib/helper";

export const UploadFileMinecraft = ({ disabled, onUpload, value }: any) => {
  const [file, setFile]: any = useState([]);
  const [error, setError]: any = useState([]);
  const enumFile = [
    {
      type: "mkcd",
      name: "Tải file code",
    },
    {
      type: "mcworld",
      name: "Tải file world",
    },
  ];

  useEffect(() => {
    if (value) {
      const filter = { id: { _in: value.split(",") } };
      AxiosClient.get("/files?filter=" + JSON.stringify(filter)).then((res) => {
        const data = res.data?.map((item: any) => {
          item.name = item.filename_download;
          return item;
        });
        setFile(data);
      });
    }
  }, []);

  const uploadImage = async () => {
    if (!file[0] || !file[1]) {
      const error: any = [];
      if (!file[0]) error[0] = "Vui lòng tải file code";
      if (!file[1]) error[1] = "Vui lòng tải file world";
      setError(error);
      return;
    }

    if (disabled) return value;

    const result: any = await AxiosClient.post(
      "/files",
      { folder: folderSource, file: file },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    const multibleFile = (result.data?.length ? result.data : [result.data])?.map((element: any) => element.id).join(",");
    return multibleFile;
  };
  onUpload.current = uploadImage;

  // create a function to set error by index
  const setMgError = (index: number, message: string) => {
    setError((error: any) => {
      const newError = [...error];
      newError[index] = message;
      return newError;
    });
  };
  // create a function to set name by index

  const onSelectFile = (index: number) => {
    return (e: any) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const typeFile = enumFile[index];
      const fileSelect = e.target.files[0];

      const partial = fileSelect.name?.split(".");
      const isTypeFile = partial[partial.length - 1]?.includes(typeFile.type);

      if (!isTypeFile) {
        setMgError(index, "Vui lòng upload file ." + typeFile.type);
        return;
      }

      setFile((file: any) => {
        const newFile = [...file];
        newFile[index] = fileSelect;
        return newFile;
      });
      setMgError(index, "");
    };
  };

  return (
    <div className="">
      <div className="flex gap-[42px]">
        {enumFile.map((item: any, index: any) => {
          const filename = file[index]?.name;
          return (
            <div key={item.type}>
              <div className=" mt-1.5 flex items-center ">
                <div>
                  <label
                    className={
                      "flex w-fit items-center rounded-[5px] border-[1px] px-2 cursor-pointer " +
                      (disabled ? "border-gray-400 bg-gray text-gray-400" : "border-pink")
                    }
                    htmlFor={"upload-code" + index}
                  >
                    <UploadIcon className={disabled ? "stroke-gray-400" : "stroke-pink"} />
                    <div className="body-13">{item.name}</div>
                  </label>
                  <input disabled={disabled} onChange={onSelectFile(index)} type="file" id={"upload-code" + index} className="hidden" />
                </div>
                <div className="flex gap-4 ml-4">
                  {file[index] && (
                    <div className="flex items-center">
                      <div className="ml-3 max-w-[100px] text-right truncate"> {file[index].name}</div>
                      <div className="ml-3">
                        <SuccessIcon className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {error[index] && (
                  <motion.div
                    variants={variantsComment}
                    animate={"enter"}
                    initial="hidden"
                    exit={"hidden"}
                    key={index + "error"}
                    className="text-11 text-pink mt-0.5"
                  >
                    {error[index]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
