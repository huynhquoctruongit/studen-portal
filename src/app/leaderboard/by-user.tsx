"use client";
import { Fragment, useState, useEffect } from "react";
import { HeartIcon, FollowerIcon, ProjectIcon, EditIcon, StarIcon } from "../../../public/images/svg/index";
import { Button } from "@/ui/button";
import NavFilter from "@/ui/navfilter";
import { SearchIcon } from "../../../public/images/svg/index";
import Projects from "./modal/project";
import ModalView from "@/ui/modal";
import { useAuth } from "@/hook/auth";
import useSWR from "swr";
import { ImageCMS } from "@/ui/image";
import { fameCount } from "@/lib/helper";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import AxiosController, { fetcherController } from "@/lib/api/axios-controller";
import Pagination from "@/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { animatParent, childrent, variants } from "@/lib/motion";
import Link from "next/link";
import Loading from "./loading";

const rateIcon: { [key: string]: any } = {
  1: {
    image: "/images/rate1.png",
    color: "bg-[#FFFADF]",
    border: "border-[#E3B100]",
  },
  2: {
    image: "/images/rate2.png",
    color: "bg-[#EFEFEF]",
    border: "border-[#A1A1A1]",
  },
  3: {
    image: "/images/rate3.png",
    color: "bg-[#FFF2E7]",
    border: "border-[#FF7A00]",
  },
};

const ItemsTd = ({ filterList, thead, toggle, onClick, item, index, myRank, profile, behivior }: any) => {
  const sortBy = toggle;
  const { id, avatar, fame, projects, followers, like, user_statistic_id, user_meta_id } = item;
  const isMyProfile = profile?.id === id;
  const isLargeNumber = (element : any) => element.id === profile?.id;
  const isRank = filterList.findIndex(isLargeNumber) + 1;
  const checkRankOut = isRank || myRank;

  const orderRank = rateIcon[index + 1] || index + 1;
  const rate = myRank ? checkRankOut : orderRank;

  let list: any = [];
  const returnTag = (tag: any) => {
    if (tag.indexOf("num_fame") > -1) {
      return "fame";
    }
    if (tag.indexOf("num_like") > -1) {
      return "like";
    }
    if (tag.indexOf("num_follower") > -1) {
      return "follower";
    }
    if (tag.indexOf("num_project") > -1) {
      return "project";
    }
  };
  const Icon: any = {
    fame: <StarIcon className="w-[30px] cursor-auto" />,
    follower: <FollowerIcon className="ml-auto w-[25px] cursor-auto" />,
    like: <HeartIcon className="ml-auto w-[25px] cursor-auto" />,
    project: <ProjectIcon className="ml-auto w-[22px] cursor-auto" />,
  };
  item?.user_statistic_id &&
    Object.keys(user_statistic_id).forEach(function (key, index) {
      if (key.indexOf(sortBy) > -1) {
        let result = { [returnTag(key) as any]: user_statistic_id[key] };
        list.push({
          [sortBy]: result,
        });
      }
    });
  return (
    <tr
      onClick={() => onClick(true)}
      key={index + id}
      className={`md:table-row table-header-group rounded-full mb-[8px] ${isMyProfile ? "bg-[#DEF8FF]" : rate ? rate.color : ""}`}
    >
      <td
        className={`max-w-[100px] min-h-[80px] text-center border-y-[1px] md:w-auto w-[20%] ${
          rate.border ? rate.border : (isMyProfile && "border-[#0159A0]") || "border-[#BCBBBB]"
        } border-l-[1px] rounded-tl-[192px] rounded-bl-[192px] w-[100px]`}
      >
        <div className="flex items-center justify-center">
          {rate?.image ? <img className="ml-[10px] md:w-[90px] w-[53px]" src={rate.image} /> : <p className="body-18-bold">{rate}</p>}
        </div>
      </td>
      <td
        className={`md:flex table-cell min-h-[80px] text-left border-y-[1px] md:w-auto w-[50%] ${
          rate.border ? rate.border : (isMyProfile && "border-[#0159A0]") || "border-[#BCBBBB]"
        } p-[9px]`}
      >
        <div className="flex items-center justify-start">
          <ImageCMS src={avatar} width={100} height={100} className="w-[48px] h-[48px] rounded-full object-cover" />
          <Link href={`/profile?id=${id}`} className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[250px]">
            <p className="text-blue text-15-bold md:body-18-bold ml-[8px] hover:underline underline-offset-2 text-ellipsis overflow-hidden">
              {user_meta_id?.nick_name || "ICANTECH Club-er"}
              {isMyProfile && !myRank && " (Tôi)"}
            </p>
          </Link>
        </div>
      </td>
      {thead.map((item: any, index: any) => {
        if (item.key == "rate" || item.key == "coder") return;
        return (
          <td
            className={`${
              index === thead?.length - 1 ? "border-r-[1px] rounded-tr-[192px] rounded-br-[192px] pr-[10px] " : ""
            } min-h-[80px] text-center border-y-[1px] hidden md:table-cell min-w-[30%] ${
              rate.border ? rate.border : (isMyProfile && "border-[#0159A0]") || "border-[#BCBBBB]"
            }`}
          >
            <div className="flex items-center">
              <div className={`md:ml-6 ${item.key === "fame" ? "w-[17%]" : "w-[50%]"}`}>{Icon?.[item.key]}</div>
              <div className="w-[50%] ml-[10px]">
                <p className="body-18-bold text-left">
                  {list?.map((value: any, key: any) => (
                    <p key={key}>{value?.[sortBy]?.[item.key]}</p>
                  ))}
                </p>
              </div>
            </div>
          </td>
        );
      })}
      {thead?.map((item: any, index: any) => {
        if (item.key == "rate" || item.key == "coder") return;
        else if (behivior == item.key) {
          return (
            <td
              className={`${
                behivior == item.key ? "md:hidden border-r-[1px] rounded-tr-[192px] rounded-br-[192px] pr-[10px] " : ""
              } min-h-[80px] text-center border-y-[1px] md:hidden ${
                rate.border ? rate.border : (isMyProfile && "border-[#0159A0]") || "border-[#BCBBBB]"
              }`}
            >
              <div className="flex items-center">
                <div className={`md:ml-6 w-[20%] ${behivior === "fame" ? "ml-[10px]" : "ml-[30px]"}`}>{Icon?.[behivior]}</div>
                <div className="md:w-[50%] ml-[13px]">
                  <p className="text-15-bold md:body-18-bold text-left">
                    {list?.map((value: any, key: any) => (
                      <p key={key}>{value?.[sortBy]?.[behivior]}</p>
                    ))}
                  </p>
                </div>
              </div>
            </td>
          );
        }
      })}
    </tr>
  );
};
const ByUser = ({ valueToggle, labelToggle, behivior }: any) => {
  const { profile } = useAuth();
  const [page, setPage] = useState(1);
  const [slugTh, setSelectTh] = useState(`num_fame_per_week`);
  const [number, setNumber] = useState({ firstNumber: 1, lastNumber: 10 });
  const [rank, setRank] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const sortList100 = (left: any, right: any) => {
    return right?.user_statistic_id?.[`${slugTh}`] - left?.user_statistic_id?.[`${slugTh}`];
  };
  const { data: listByUser, mutate: mutateUser } = useSWR(
    `/users?limit=200&fields=*,user_statistic_id.*,user_meta_id.*&sort=-user_statistic_id.${slugTh}&filter[user_statistic_id][_nnull]=true&filter[user_meta_id][_nnull]=true`,
    fetcherClient,
  );
  const thead = [
    {
      title: "Hạng",
      id: 0,
      key: "rate",
      slug: "rate",
    },
    {
      title: "Cao thủ Creator",
      id: 1,
      key: "coder",
      slug: "coder",
    },
    {
      title: "Tổng danh vọng",
      id: 2,
      key: "fame",
      slug: `num_fame_per_${valueToggle}`,
    },
    {
      title: "Số lượng dự án",
      id: 3,
      key: "project",
      slug: `num_project_per_${valueToggle}`,
    },
    {
      title: "Tổng người theo dõi",
      id: 4,
      key: "follower",
      slug: `num_follower_per_${valueToggle}`,
    },
    {
      title: "Tim",
      id: 5,
      key: "like",
      slug: `num_like_per_${valueToggle}`,
    },
  ];
  useEffect(() => {
    const filterFame = listByUser?.data.filter(
      (item: any) => item?.user_statistic_id !== null && item?.user_statistic_id?.[`num_fame_per_${valueToggle}`] !== 0,
    );
    const list = filterFame?.sort(sortList100);
    const sliceList100 = list?.slice(0, 100);
    setFilterList(sliceList100);
  }, [listByUser]);
 
  const returnTag = (tag: any) => {
    if (tag.indexOf("num_fame") > -1) {
      return "fame";
    }
    if (tag.indexOf("num_like") > -1) {
      return "like";
    }
    if (tag.indexOf("num_follower") > -1) {
      return "follower";
    }
    if (tag.indexOf("num_project") > -1) {
      return "project";
    }
  };
  const selectTh = (item: any, index: any) => {
    if (index === 0 || index === 1) return;
    setSelectTh(item.slug);
    setTimeout(() => {
      mutateUser();
    }, 10);
  };
  useEffect(() => {
    if (slugTh) {
      const type = returnTag(slugTh);
      AxiosController.get(`/api/v1/me/rank?statistic=${type}&duration=${valueToggle}`).then((res) => {
        if (res) {
          setRank(res.data);
        }
      });
    }
  }, [slugTh]);
  const funcSort = (a: any, b: any) => {
    const first: any = a?.user_statistic_id?.[slugTh];
    const last: any = b?.user_statistic_id?.[slugTh];

    if (first == last) {
      const dateA = a?.user_statistic_id[`${returnTag(slugTh)}${valueToggle === "week" ? "" : "_" + valueToggle}_latest_date`];
      const dateB = b?.user_statistic_id[`${returnTag(slugTh)}${valueToggle === "week" ? "" : "_" + valueToggle}_latest_date`];

      if (dateA == undefined && dateB == undefined) {
        const createA = a.user_meta_id?.date_created;
        const createB = b.user_meta_id?.date_created;

        if (createA < createB) return -1;
        if (createA > createB) return 1;
        return 0;
      } else {
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      }
    } else {
      return last - first;
    }
  };
  useEffect(() => {
    setSelectTh(`num_${returnTag(slugTh)}_per_${valueToggle}`);
    setTimeout(() => {
      mutateUser();
    }, 10);
  }, [valueToggle]);

  const changePage = (e: any) => {
    if (typeof e === "function") {
      setPage(e);
    } else {
      setPage(e * 1);
    }
  };
  const limit = 10;
  useEffect(() => {
    if (page) {
      const value = page * 1;
      setNumber({
        firstNumber: limit * value - (limit - 1),
        lastNumber: limit * value,
      });
    }
  }, [page]);
  useEffect(() => {
    if (labelToggle && slugTh) {
      setPage(1);
    }
  }, [labelToggle, slugTh]);
  useEffect(() => {
    if (behivior) {
      const getTH: any = thead.find((item) => item.key === behivior);
      setSelectTh(getTH.slug);
    }
  }, [behivior]);
  return filterList?.length > 0 ? (
    <div>
      <p className="title text-pink text-center mb-[28px] mt-[32px]">{labelToggle}</p>
      <div>
        <table className="table-fixed w-full border-separate border-spacing-y-2">
          <tr className="hidden md:contents pb-[16px] bg-[#F8F8F8]">
            {thead.map((item: any, index: any) => {
              return (
                <th
                  key={index + "user"}
                  onClick={() => selectTh(item, index)}
                  className={`hidden md:table-cell ${item.slug !== "coder" && item.slug !== "rate" && "h-[40px] cursor-pointer"} ${
                    item.id === 0 && " rounded-tl-[36px] rounded-bl-[36px] rounded-tr-[0px] rounded-br-[0px]"
                  } ${item.id === 5 && " rounded-tr-[36px] rounded-br-[36px] "} text-[#ADACAC]  ${
                    slugTh === item.slug ? " md:text-[#fff] whitespace-nowrap" : " bg-[#F8F8F8]"
                  } ${item.slug === "coder" && "w-[100px] md:w-[250px]"}`}
                >
                  <div className={` ${slugTh === item.slug ? "rounded-table md:bg-blue py-[8px] px-[0px]" : ""}`}>
                    <span className="md:text-11 xl:body-15-bold">{item.title}</span>
                  </div>
                </th>
              );
            })}
          </tr>

          {filterList?.sort(funcSort)?.map((item: any, index: any) => {
            const checkList: any = filterList?.length <= number?.lastNumber ? filterList?.length : number.lastNumber;
            if (index + 1 >= number.firstNumber && index + 1 <= number.lastNumber)
              return (
                <Fragment key={index}>
                  <ItemsTd
                    filterList={filterList}
                    behivior={behivior}
                    thead={thead}
                    profile={profile}
                    toggle={valueToggle}
                    index={index}
                    item={item}
                  />
                  {index == checkList - 1 && profile && rank !== -1 && rank !== null && (
                    <Fragment>
                      <p className="body-18-bold text-blue mt-[14px] whitespace-nowrap">Xếp hạng của tôi</p>
                      <ItemsTd
                        filterList={filterList}
                        behivior={behivior}
                        thead={thead}
                        profile={profile}
                        toggle={valueToggle}
                        index={index}
                        item={profile}
                        myRank={rank}
                      />
                    </Fragment>
                  )}
                </Fragment>
              );
          })}
        </table>
        <Pagination total={filterList?.length} itemPerPage={10} page={page || 1} setPage={changePage} className="flex justify-center" />
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default ByUser;
