"use client";
import { useAuth } from "@/hook/auth";
import { useRef, useState } from "react";
import { Button } from "@/ui/button";
import useSWR from "swr";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import { getValidation } from "./validate";
import { checkValid } from "@/lib/form";
import Input from "../form/input";
import Select from "../form/select";
import Editable from "../form/editable";
import { UploadThumbnail } from "../form/upload";
import Loading from "../loading";
import ModalView from "../modal";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { variantsHidden } from "@/lib/motion";
import InputLink from "./link-input";
import AxiosController from "@/lib/api/axios-controller";
import { useToast } from "@/hook/use-toast";
import { UploadFileMinecraft } from "../form/minecraft";
import { updateOrtherProfile } from "@/app/profile/orther";
import { checkBannedText } from "@/lib/helper";
import axios from "axios";
const EnumTypeEmbed = {
  LINK: "LINK",
  FILE: "FILE",
};

const validateName = (value: string) => {
  if (value.length > 38) {
    return false;
  }
  return true;
};

const UploadProject = ({ data, close = () => {} }: any) => {
  const stuck = useRef(false);
  const { openToast, setLoading }: any = useToast();
  const { profile } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState<any>(data);
  const [subjectSelect, setSubject] = useState<any>();
  const [select, setSelect] = useState<any>(-1);
  const [errors, setErrors]: any = useState({});
  const [prevent, setPrevent]: any = useState(false);
  const disabled = select < 0 && !value.subject_id?.id;
  const [step, setStep] = useState("upload");
  const uploadThumbnail: any = useRef(() => {});
  const uploadFile: any = useRef(() => {});
  const statusLink = useRef("");
  const { data: subject } = useSWR("/items/subjects", fetcherClient);
  const optionsSubject =
    subject?.data.map((element: any) => ({ key: element.id, value: element.subject_name, subject_type: element.subject_type })) || [];
  if (!subject) return null;

  const setStatusLink = (status: string) => {
    statusLink.current = status;
  };

  const nick_name = profile.user_meta_id?.nick_name || "Bạn";
  const cls = data.project_link ? " text-gray-500 " : "  ";
  const onSelect = (key: string, index: number) => {
    const filter = optionsSubject.find((item: any) => item.key == key);
    setSubject(filter);
    setSelect(index);
    setErrors({});
    setValue({ ...value, subject_id: key, subject_type: filter.subject_type, project_link: "" });
  };
  const type_embed = subject.data[select]?.type_embed || data.subject_id?.type_embed;
  const validation: any = getValidation(type_embed, profile.user_meta_id.nick_name);
  const change = (name: string) => {
    return (e: any) => {
      const text = e.target.value;
      if (name === "project_title" && text.length > 38 && value.project_title.length < text.length) return;
      if (errors[name]) {
        const { required, validate } = validation[name] || {};
        if (required && text) setErrors((error: any) => ({ ...error, [name]: null }));
        if (validate && validate(text)) setErrors((error: any) => ({ ...error, [name]: null }));
      }
      setValue({ ...value, [name]: text });
    };
  };

  const titleUpload =
    subjectSelect?.value === "Minecraft"
      ? `Hướng dẫn lấy file dự án ${subjectSelect?.value}`
      : `Hướng dẫn lấy link dự án ${subjectSelect?.value}`;
  const action = () => {
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      openToast(data.id ? "Bạn đã cập nhật dự án thành công" : "Bạn đã upload dự án thành công");
      close();
    }, 1000);
  };
  const error_project_link = errors?.project_link;
  // create function sleep
  const createProject = async () => {
    if (statusLink.current === "invalid" || statusLink.current === "checking") return;
    stuck.current = true;
    if (value.project_title?.length > 38) {
      return setErrors({ project_title: "Tên dự án không được quá 38 ký tự" });
    }
    setLoading(true);
    const thumbnail: any = (await uploadThumbnail.current()) || value.project_thumbnail;
    const params: any = {
      ...value,
      project_thumbnail: thumbnail || value.project_thumbnail,
      status: value?.status || "PUBLISHED",
      upload_type: "COMMUNITY",
      project_state: "LINK_VALID",
    };

    if (type_embed === "FILE") params.project_source = await uploadFile.current();

    const errors: any = checkValid(validation, params, setErrors);
    if (error_project_link) errors.project_link = error_project_link;

    if (value.project_title?.length > 38) {
      errors.project_title = "Tên dự án không được quá 38 ký tự";
    }

    const invalid = Object.keys(errors).length >= 1;
    if (invalid) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let validateUpload = null;
    try {
      if (type_embed === "LINK" && params.project_link)
        validateUpload = params.id
          ? true
          : await AxiosController.post("/api/v1/link/validate", {
              link: params.project_link,
              type: value?.subject_type,
            });
    } catch (error) {}
    if (!validateUpload && type_embed === "LINK") errors.project_link = "Link không hợp lệ";

    const temps = { ...params, user_created: null };
    if (temps.project_thumbnail?.id) temps.project_thumbnail = temps.project_thumbnail?.id;
    if (temps.project_source?.id) temps.project_source = temps.project_source?.id;
    if (temps.subject_id?.id) temps.subject_id = temps.subject_id?.id;
    delete temps.user_created;
    delete temps.project_statistic_id;
    delete temps.user_updated;

    if (data.id) {
      await AxiosClient.patch("/items/projects/" + data.id, temps)
        .then(async (res: any) => {
          if (location.href.includes("detail")) {
            await axios
              .get(
                location.origin +
                  `/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}&pathname=${location.href.replace(location.origin, "")}`,
              )
              .catch((res) => {});
            router.refresh();
          } else updateOrtherProfile();
          action();
        })
        .catch((err: any) => {
          setLoading(false);
          setStep("false");
          close();
          openToast(data.id ? "Cập nhật dự án không thành công" : "Upload dự án không thành công", "fail");
        });
    } else
      await AxiosClient.post("/items/projects", params)
        .then((res: any) => {
          router.push(`/detail/${res?.data?.id}`);
          action();
        })
        .catch((err: any) => {
          openToast(data.id ? "Cập nhật dự án không thành công" : "Upload dự án không thành công", "fail");
        });
  };
  const linkGuide: any = {
    SCRATCH: "https://drive.google.com/file/d/1_Sk-IBenlURg9OWdt9URkDIywNhQ_4AS/view",
    PYTHON_CODE_COMBAT: "https://drive.google.com/file/d/16EezhbSkYKiy1MT5lHMYUSreNyQUZ1ij/view",
    PYTHON_PRO: "https://drive.google.com/file/d/1tsB-Ci9zXsVD24ONOKR2SNJRaY8Ks3jz/view",
    MINECRAFT: "https://drive.google.com/file/d/1ptphKn-4tlU0uQbusnVYfHNyjxULJImK/view",
  };

  return (
    <>
      {step === "upload" && (
        <motion.div
          key={step}
          variants={variantsHidden}
          animate="visible"
          initial="hidden"
          exit="hidden"
          className="bg-white p-6 rounded-lg w-[calc(100vw-24px)] lg:w-[855px] relative mb-24 md:mb-0"
        >
          <div className="">
            <div className="body-24-bold text-blue">
              {!data.name && nick_name + " ơi, hãy chia sẻ dự án để chúng mình cùng khám phá nha!"}
              {data.name && "Chỉnh sửa dự án"}
            </div>
            <div className="mt-3">
              <div className="mt-1 flex items-center justify-between">
                <Select
                  // setErrors={setErrors}
                  error={errors["subject_id"]}
                  onChange={onSelect}
                  options={optionsSubject}
                  defaultValue={data.subject_id?.id || value.subject_id}
                  className="w-[276px]"
                  disabled={data.subject_id?.id}
                  placeholder="Vui lòng chọn môn"
                />
                {linkGuide[subjectSelect?.subject_type] && (
                  <div className="ml-10">
                    <a
                      className="hover:opacity-[0.8] text-pink font-bold cursor-pointer text-right"
                      target="_blank"
                      rel="noreferrer"
                      href={linkGuide[subjectSelect?.subject_type]}
                    >
                      {titleUpload}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {type_embed === EnumTypeEmbed.LINK && (
              <div className="mt-3">
                <label className={"block " + cls} htmlFor="">
                  Link dự án
                </label>
                <InputLink
                  subjectType={value?.subject_type}
                  value={value?.project_link}
                  setPrevent={setPrevent}
                  prevent={prevent}
                  error={errors["project_link"]}
                  onChange={change("project_link")}
                  disabled={disabled || data?.project_link}
                  setErrors={setErrors}
                  setStatusLink={setStatusLink}
                />
              </div>
            )}
            {type_embed === EnumTypeEmbed.FILE && (
              <div className="mt-3">
                <label className="block body-15 text-blue" htmlFor="">
                  File code
                </label>
                <UploadFileMinecraft
                  onUpload={uploadFile}
                  error={errors.project_source}
                  disabled={value.project_source}
                  value={value.project_source}
                  setErrors={setErrors}
                />
              </div>
            )}

            <div className="mt-3">
              <label className="block body-15 text-blue" htmlFor="">
                Tên dự án
              </label>
              <div className="relative flex items-center">
                <Input
                  disabled={disabled}
                  onChange={change("project_title")}
                  value={checkBannedText(value.project_title) || ""}
                  type="text"
                  className="py-2.5 px-3 bg-[#DEF8FF]  rounded-[5px] mt-1 w-full"
                  error={errors["project_title"]}
                />
                <div className="absolute text-[13px] leading-5 font-bold mt-1 text-[#818181] top-full md:top-[14px] right-0 md:pr-3">
                  <span className={"animate " + (value.project_title?.length >= 38 ? "text-pink " : "")}>
                    {value.project_title?.length || 0}/38 ký tự{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="block body-15 text-blue" htmlFor="">
                Mô tả dự án
              </label>
              <Editable
                disabled={disabled}
                error={errors["project_description"]}
                value={value.project_description}
                onChange={change("project_description")}
              />
            </div>
            <UploadThumbnail
              onUpload={uploadThumbnail}
              error={errors.project_thumbnail}
              className="mt-3"
              disabled={disabled}
              value={value.project_thumbnail}
              setErrors={setErrors}
            />
            <div className="flex gap-4 mt-6">
              <Button type="outlined" className="hover" disabled={disabled} onClick={close}>
                Huỷ
              </Button>
              <Button
                className={prevent ? "opacity-60" : "hover"}
                disabled={disabled}
                onClick={prevent || disabled ? () => {} : createProject}
              >
                Lưu
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default UploadProject;
