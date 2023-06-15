"use client";
import AxiosClient from "@/lib/api/axios-client";
import { folderSource } from "@/lib/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SuccessIcon, UploadIcon } from "../icons/action";
import { ImageCMS } from "../image";
export const UploadThumbnail = ({ className, onUpload, error, setErrors, value, disabled }: any) => {
  const [prev, setPreview] = useState("");
  const [file, setFile]: any = useState();
  const [isChange, setChange] = useState(true);
  const [id, setId] = useState(false);
  const uploadImage = async () => {
    if (!file) return;
    if (isChange === false) return id;
    const result: any = await AxiosClient.post(
      "/files",
      { folder: folderSource, file },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    setChange(false);
    setId(result.data.id);
    return result.data.id;
  };
  onUpload.current = uploadImage;
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl: string = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    const image = e.target.files[0];
    const accept = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const limit = 5 * 1024 * 1000;
    if (!accept.includes(image.type)) {
      setFile();
      setErrors((error: any) => ({ ...error, project_thumbnail: "File hình ành không hợp lệ" }));
      return;
    }
    if (image.size > limit) {
      setFile();
      setErrors((error: any) => ({ ...error, project_thumbnail: "Kích thước hình quá lớn, tối đa 5MB" }));
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setFile(image);
    setErrors((error: any) => ({ ...error, project_thumbnail: "" }));
  };
  const clDisabled = "bg-gray border-[1px] border-[#BCBBBB]";

  const cls = error && !file ? "border-[1px] border-pink " : " ";
  return (
    <div className={className}>
      <label className="block body-15 text-blue" htmlFor="">
        Hình ảnh thu nhỏ
      </label>
      <div className="flex items-center">
        <div className={"w-[170px] h-[122px] rounded-lg " + cls}>
          {!prev && value && <ImageCMS src={value} width={170} height={122} className="rounded-lg w-full h-full object-cover" />}
          {(prev || (!prev && !value)) && (
            <img
              alt="not found"
              src={prev || "/images/default.png"}
              loading="lazy"
              width={170}
              height={122}
              className="rounded-lg object-cover h-[122px] w-[170px]"
            />
          )}
        </div>
        <label
          className={
            "flex items-center rounded-[5px] border-[1px] px-3 ml-[18px] cursor-pointer hover whitespace-nowrap " + (disabled ? clDisabled : "border-pink")
          }
          htmlFor="upload"
        >
          <UploadIcon className={disabled ? "stroke-gray-500" : "stroke-pink"} />
          <div className={(disabled ? "text-gray-500" : "") + " body-13 "}>Tải lên</div>
        </label>
        {(file || value) && (
          <div className="ml-3">
            <SuccessIcon className="w-5" />
          </div>
        )}

        <input
          disabled={disabled}
          type="file"
          id="upload"
          onChange={onSelectFile}
          accept="image/jpeg, image/png, image/jpg, image/webp"
          className="hidden"
        />
      </div>
      {error && <div className="text-11 text-pink mt-0.5">{error}</div>}
    </div>
  );
};

export const UploadFile = ({ subject_type, className, disabled, onUpload, error, value, setErrors }: any) => {
  const [file, setFile]: any = useState();
  const [isChange, setChange] = useState(true);
  const [name, setName] = useState([]);
  const [myEr, setMyEr] = useState("");

  useEffect(() => {
    if (value) {
      const filter = { id: { _in: value.split(",") } };
      AxiosClient.get("/files?filter=" + JSON.stringify(filter)).then((res) => {
        setName(res.data);
      });
    }
  }, []);

  const [id, setId] = useState(false);

  const uploadImage = async () => {
    if (!file) {
      return value;
    }
    if (isChange === false) return id;
    const result: any = await AxiosClient.post("/files", { headers: { "Content-Type": "multipart/form-data" } });
    setChange(false);
    const multibleFile = (result.data?.length ? result.data : [result.data])?.map((element: any) => element.id).join(",");
    return multibleFile;
  };
  onUpload.current = uploadImage;
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    let message = "";
    setChange(true);
    setFile(e.target.files);
    const name: any = e.target.files ? Array.from(e.target.files)?.map((element: any) => ({ filename_download: element.name })) : [];
    setName(name);
    if (subject_type === "MINECRAFT") {
      const listFile = Array.from(e.target.files);

      const mcworld = listFile.find((item: any) => {
        const partial = item.name.split(".");
        return partial[partial.length - 1]?.includes("mcworld");
      });
      const mkcd = listFile.find((item: any) => {
        const partial = item.name.split(".");
        return partial[partial.length - 1]?.includes("mkcd");
      });
      if (!mcworld || !mkcd) {
        message = "Vui lòng upload đủ 2 file .mkcd và .mcworld";
      }
    }
    setMyEr(message);
    setErrors((error: any) => ({ ...error, project_source: message }));
  };
  return (
    <div>
      <div className=" mt-1.5 flex items-center">
        <div>
          <label className="flex w-fit items-center rounded-[5px] border-[1px] border-pink px-2 cursor-pointer" htmlFor="upload-code">
            <UploadIcon className="stroke-pink" />
            <div className="body-13">Tải file code</div>
          </label>
          <input multiple disabled={disabled} onChange={onSelectFile} type="file" id="upload-code" className="hidden" />
        </div>

        <div className="flex gap-4 ml-4">
          {name.length > 0 &&
            name.map((item: any, index) => {
              return (
                <div key={"items" + index} className="flex items-center">
                  <div className="ml-3">
                    <SuccessIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-3 max-w-[250px] truncate"> {item.filename_download}</div>
                </div>
              );
            })}
        </div>
      </div>
      {((error && !file) || myEr) && <div className="text-11 text-pink mt-0.5">{error || myEr}</div>}
    </div>
  );
};
