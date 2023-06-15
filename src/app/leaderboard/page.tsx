"use client";
import { Fragment, useState, useEffect } from "react";
import { HeartIcon, FollowerIcon, ProjectIcon, EditIcon, StarIcon } from "../../../public/images/svg/index";
import { Button } from "@/ui/button";
import NavFilter from "@/ui/navfilter";
import { SearchIcon } from "../../../public/images/svg/index";
import Projects from "./modal/project";
import ModalView from "@/ui/modal";
import { useAuth } from "@/hook/auth";
import { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";
import { ImageCMS } from "@/ui/image";
import ByUser from "./by-user";
import ByProject from "./by-project";
import dayjs from "dayjs";
import Loading from "./loading";
import Select from "@/ui/form/select";

const Leaderboard = () => {
  const [toggle, setToggle] = useState({
    value: "week",
    label: `Tuần ${dayjs().week()}`,
    paramUser: "",
    param: "",
  });
  const [th, setTh] = useState("-user_statistic_id.num_fame_per_week");
  const [behaviorUser, setBehaviorUser] = useState("fame");
  const [behaviorProject, setBehaviorProject] = useState("fame");

  const { data: listByProject, mutate } = useSWR(
    `/items/projects?limit=100&fields=*,user_created.*,subject_id.*,user_created.user_meta_id.*,project_statistic_id.*&sort=${
      toggle?.param || "-project_statistic_id.num_fame_per_week"
    }&filter[status][_eq]=PUBLISHED&filter[project_statistic_id][_nnull]=true`,
    fetcherClient,
  );
  const [modal, setModal] = useState(false);

  const [filterTab, setFilterTab] = useState(0);
  const { profile } = useAuth();
  const changeToggle = async (data: any) => {
    let newData = { ...data };
    if (filterTab === 1) {
      newData["param"] = `-project_statistic_id.num_fame_per_${data.value}`;
      setToggle(newData);
    } else {
      newData["paramUser"] = `-user_statistic_id.num_${th || "fame"}_per_${data.value}`;
      setToggle(newData);
    }
  };
  useEffect(() => {
    if (th && toggle) {
      let newData = { ...toggle };
      newData["paramUser"] = `-user_statistic_id.num_${th || "fame"}_per_${toggle.value}`;
    }
  }, [th, toggle]);

  useEffect(() => {
    changeToggle(toggle);
  }, [filterTab]);

  const onSelectBehaviorUser = (e: any) => {
    setBehaviorUser(e);
  };
  const onSelectBehaviorProject = (e: any) => {
    setBehaviorProject(e);
  };

  const onSelectType = (e: any) => {
    if (e === "coder") setFilterTab(0);
    else setFilterTab(1);
  };

  const optionsBehaviorUser = [
    {
      key: "fame",
      value: "Tổng danh vọng",
    },
    {
      key: "project",
      value: "Số lượng dự án",
    },
    {
      key: "follower",
      value: "Tổng người theo dõi",
    },
    {
      key: "like",
      value: "Tim",
    },
  ];
  const optionsBehaviorProject = [
    {
      key: "fame",
      value: "Tổng danh vọng",
    },
    {
      key: "view",
      value: "Lượt xem",
    },
    {
      key: "like",
      value: "Tim",
    },
    {
      key: "comment",
      value: "Bình luận",
    },
  ];
  const optionsType = [
    {
      key: "coder",
      value: "Theo cao thủ",
    },
    {
      key: "project",
      value: "Theo dự án",
    },
  ];
  console.log(listByProject,'listByProject');
  
  return (
    <>
      <title>Bảng xếp hạng</title>
      <meta property="og:title" content="Bảng xếp hạng" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Sân chơi dành cho các bạn lập trình viên nhí, giúp học viên rèn luyện vững chắc kĩ năng lập trình thông qua việc thực hành tạo ra sản phẩm & thi đấu cọ sát với bạn bè"
      />
      <meta property="og:image" content="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
      <div
        className="bg-[#EEFBFE] pt-[144px] pb-[56px] bg-[url(/images/bg-home.png)]  bg-no-repeat bg-contain "
        style={{ backgroundPosition: "0px 210px" }}
      >
        <ModalView open={modal} toggle={() => setModal(false)}>
          <Projects toggle={() => setModal(false)} profile={profile} />
        </ModalView>
        <div className="relative bg-[#FFFFF8] border-[4px] border-[#FFC93F] rounded-[16px] md:px-[16px] px-[10px] pt-[66px] pb-[34px] xl:w-[1146px] m-auto">
          <div className="absolute top-[-123px] text-center m-auto w-full left-0">
            <img src="/images/letgo-login.png" className=" z-[2] w-[100px] m-auto md:translate-y-[10px]" />
            <p className="z-[3] bg-pink text-white w-fit text-center m-auto py-[7px] px-[33px] rounded-[104px] md:title-small-bold text-[25px] font-[700]">
              Bảng xếp hạng TOP 100
            </p>
          </div>
          <div className="md:flex justify-between items-center">
            <div className="items-center hidden md:flex">
              <Button
                type="default"
                color="blue"
                className={`rounded-[80px] ${filterTab ? "bg-[#DCEFFF] text-[#4F4F4F]" : "bg-blue text-white"}`}
                onClick={() => setFilterTab(0)}
              >
                Theo Creator
              </Button>
              <Button
                type="default"
                color="blue"
                className={`ml-[16px] rounded-[80px] ${filterTab ? "bg-blue text-white" : "bg-[#DCEFFF] text-[#4F4F4F]"}`}
                onClick={() => setFilterTab(1)}
              >
                Theo dự án
              </Button>
            </div>
            <div className="md:hidden flex mt-[20px] w-full">
              <Select onChange={onSelectType} options={optionsType} className="md:hidden block md:w-auto" placeholder="Theo cao thủ" />
              <Select
                onChange={filterTab === 1 ? onSelectBehaviorProject : onSelectBehaviorUser}
                options={filterTab === 1 ? optionsBehaviorProject : optionsBehaviorUser}
                className="ml-[7px] md:hidden block"
                placeholder="Tổng danh vọng"
              />
            </div>
            <NavFilter defaultValue={"week"} id="id-action-project" callback={changeToggle} />
          </div>
          {filterTab === 0 ? (
            <ByUser behivior={behaviorUser} valueToggle={toggle.value} labelToggle={toggle.label} />
          ) : listByProject?.data?.length > 0 ? (
            <ByProject behivior={behaviorProject} listData={listByProject} valueToggle={toggle.value} labelToggle={toggle.label} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};
export default Leaderboard;
