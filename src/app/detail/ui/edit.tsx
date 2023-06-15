"use client";
import { Button } from "@/ui/button";
import { EditIcon } from "@/ui/icons/action";
import ModalView from "@/ui/modal";
import NavSelect from "@/ui/navselect";
import { useRef, useState } from "react";
import { useAuth } from "@/hook/auth";
import UploadProject from "@/ui/upload-project";
import AxiosClient from "@/lib/api/axios-client";
import axios from "axios";
import { usePin } from "@/hook/use-pin";
const AuthorAction = ({ data }: any) => {
  const { profile } = useAuth();
  const [modal, setModal] = useState(false);
  const [del, setDel] = useState(false);
  const { foreUpdate } : any = usePin();

  const isMyProject = (data?.user_created?.id || data?.subject_id?.user_created) === profile?.id;
  if (!isMyProject) return null;
  const changeToggle = async (payload: any) => {
    await AxiosClient.patch("/items/projects/" + data.id, { status: payload.value.toUpperCase() }).catch();
    foreUpdate();
    await axios
      .get(location.origin + `/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}&pathname=${location.href.replace(location.origin, "")}`)
      .catch((res) => {});
  };

  const isPublic = data?.project_thumbnail && data?.project_title && data?.project_description;

  return (
    <div className="mb-1.5 md:ml-auto w-full md:min-w-[400px] mt-3 md:mt-0 flex">
      <div className="md:ml-auto w-full md:w-fit">
        <div className="md:mt-auto flex flex-wrap items-center w-full gap-2 justify-between">
          <Button icon={EditIcon} onClick={() => setModal(true)} className="px-2">
            Chỉnh sửa
          </Button>
          <div className="">
            <NavSelect
              isPublic={isPublic}
              defaultValue={data.status}
              setEditProject={setModal}
              id="id-action-project"
              callback={changeToggle}
            />
          </div>
        </div>
        <ModalView open={modal} toggle={() => setModal(false)}>
          <UploadProject data={data} close={() => setModal(false)} />
          <ModalView open={del} toggle={() => setDel(false)}>
            <div className="bg-white p-10 rounded-lg">
              <div className="body-18-bold text-blue">Cậu muốn xoá dự án này không?</div>
              <div className="flex gap-10 justify-center mt-6">
                <Button type="outlined" onClick={() => setDel(false)}>
                  Có
                </Button>
                <Button onClick={() => setDel(false)}>Không</Button>
              </div>
            </div>
          </ModalView>
        </ModalView>
      </div>
    </div>
  );
};
export default AuthorAction;
