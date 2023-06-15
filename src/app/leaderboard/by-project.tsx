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
import { fameCount } from "@/lib/helper";
import { Comment, Love, View } from "@/ui/icons/action";
import Link from "next/link";
import Pagination from "@/ui/pagination";
import { checkBannedText } from "@/lib/helper";

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

const ItemsTd = ({ thead, toggle, onClick, item, index, behivior }: any) => {
  const sortBy = toggle;
  const {
    user_created,
    project_slug,
    id: idProject,
    project_title,
    project_thumbnail,
    fame,
    projects,
    followers,
    like,
    project_statistic_id,
  } = item;

  const id = user_created?.id || null;
  const meta_id = user_created?.user_meta_id || null;
  const rate = rateIcon[index + 1];
  let list: any = [];
  const returnTag = (tag: any) => {
    if (tag.indexOf("num_fame") > -1) {
      return "fame";
    }
    if (tag.indexOf("num_like") > -1) {
      return "like";
    }
    if (tag.indexOf("num_view") > -1) {
      return "view";
    }
    if (tag.indexOf("num_comment") > -1 && tag !== "num_all_comment_per_week") {
      return "comment";
    }
  };
  Object.keys(project_statistic_id || {}).forEach(function (key, index) {
    if (key && key.indexOf(sortBy) > -1) {
      let result = { [returnTag(key) as any]: project_statistic_id[key] };
      list.push({
        [sortBy]: result,
      });
    }
  });
  const Icon : any = {
    fame: <StarIcon className="w-[30px] cursor-auto" />,
    comment: <Comment className="ml-auto w-[25px] cursor-auto" />,
    like: <HeartIcon className="ml-auto w-[25px] cursor-auto" />,
    view: <View className="ml-auto w-[25px] cursor-auto" />,
  };
  return (
    <tr
      onClick={() => onClick(true)}
      key={index + project_title}
      className={`md:table-row table-header-group rounded-full mb-[8px] ${rate ? rate.color : ""}`}
    >
      <td
        className={`md:w-auto w-[20%] min-h-[80px] text-center border-y-[1px] ${
          rate ? rate.border : "border-[#BCBBBB]"
        } border-l-[1px] rounded-tl-[192px] rounded-bl-[192px]`}
      >
        <div className="flex items-center justify-center">
          {rate ? <img className="ml-[10px] md:w-[90px] w-[53px]" src={rate.image} /> : <p className="body-18-bold">{index + 1}</p>}
        </div>
      </td>
      <td
        className={`md:flex md:w-auto w-[50%] min-w-[250px] min-h-[80px] text-left flex items-center justify-start border-y-[1px] ${
          rate ? rate.border : "border-[#BCBBBB]"
        } p-[9px]`}
      >
        <div className="shrink-0">
          <ImageCMS
            src={project_thumbnail}
            width={100}
            height={100}
            className="w-[57px] h-[38px] md:w-[67px] md:h-[48px] overflow-hidden rounded-[8px] object-cover"
          />
        </div>
        <div className="md:max-w-[250px] max-w-[120px] truncate">
          <Link href={`/detail/${idProject}?slug=${project_slug}`}>
            <div
              className="truncate text-blue body-13-bold md:body-18-bold ml-[8px] hover:underline underline-offset-2"
              dangerouslySetInnerHTML={{ __html: checkBannedText(project_title) as string }}
            ></div>
          </Link>
          {meta_id?.nick_name && (
            <div className="flex ml-[8px] truncate overflow-hidden">
              <p className="text-[#4F4F4F] text-12">bởi</p>
              <Link href={`/profile?id=${id}`} className="truncate overflow-hidden">
                <p className="text-blue text-12 md:body-18 ml-[4px] hover:underline underline-offset-2 truncate overflow-hidden">
                  {meta_id?.nick_name}
                </p>
              </Link>
            </div>
          )}
        </div>
      </td>
      {thead.map((item: any, index: any) => {
        if (item.key == "rate" || item.key == "project") return;
        return (
          <td
            className={`${
              index === thead?.length - 1 ? "border-r-[1px] rounded-tr-[192px] rounded-br-[192px] pr-[10px] " : ""
            } hidden md:table-cell min-h-[80px] text-center border-y-[1px] ${rate ? rate.border : "border-[#BCBBBB]"}`}
          >
            <div className="flex items-center justify-end">
              <div className="md:ml-6 md:w-[20%]">{Icon[item.key]}</div>
              <div className="md:w-[50%] ml-[5px]">
                <p className="text-15-bold md:body-18-bold text-left">
                  {list?.map((value: any, key: any) => (
                    <p key={key}>{value?.[sortBy]?.[item.key]}</p>
                  ))}
                </p>
              </div>
            </div>
          </td>
        );
      })}
      {thead.map((item : any, index : any) => {
        if (item.key == "rate" || item.key == "project") return;
        else if (behivior == item.key) {
          return (
            <td
              className={`${
                behivior == item.key ? "md:hidden border-r-[1px] rounded-tr-[192px] rounded-br-[192px] pr-[10px] " : ""
              } min-h-[80px] text-center border-y-[1px] ${rate ? rate.border : "border-[#BCBBBB]"}`}
            >
              <div className="flex items-center">
                <div className={`md:ml-6 md:w-[20%] ${behivior === "fame" ? "ml-[47px]" : "ml-[65px]"}`}>{Icon[item.key]}</div>
                <div className="md:w-[50%] ml-[5px]">
                  <p className="text-15-bold md:body-18-bold text-left">
                    {list?.map((value: any, key: any) => (
                      <p key={key}>{value?.[sortBy]?.[item.key]}</p>
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
const ByUser = ({ listData, valueToggle, labelToggle, behivior }: any) => {
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState({ firstNumber: 1, lastNumber: 10 });
  const { profile } = useAuth();
  const [slugTh, setSelectTh] = useState(`num_fame_per_week`);
  const filterFame = listData?.data?.filter(
    (item: any) => item?.project_statistic_id !== null && item?.project_statistic_id?.[`num_fame_per_${valueToggle}`] !== 0,
  );

  const thead = [
    {
      title: "Hạng",
      id: 0,
      slug: "rate",
      key: "rate",
    },
    {
      title: "Dự án",
      id: 1,
      slug: "project",
      key: "project",
    },
    {
      title: "Tổng danh vọng",
      id: 2,
      slug: `num_fame_per_${valueToggle}`,
      key: `fame`,
    },

    {
      title: "Tim",
      id: 3,
      slug: `num_like_per_${valueToggle}`,
      key: `like`,
    },
    {
      title: "Bình luận",
      id: 4,
      slug: `num_comment_per_${valueToggle}`,
      key: `comment`,
    },
    {
      title: "Lượt xem",
      id: 5,
      slug: `num_view_per_${valueToggle}`,
      key: `view`,
    },
  ];

  const returnTag = (tag: any) => {
    if (tag.indexOf("fame") > -1) {
      return "fame";
    }
    if (tag.indexOf("like") > -1) {
      return "like";
    }
    if (tag.indexOf("view") > -1) {
      return "view";
    }
    if (tag.indexOf("comment") > -1) {
      return "comment";
    }
  };
  const selectTh = (slug: any, index: any) => {
    if (index === 0 || index === 1) return;
    setSelectTh(slug);
  };
  const funcSort = (a: any, b: any) => {
    const first: any = a.project_statistic_id?.[slugTh];
    const last: any = b.project_statistic_id?.[slugTh];
    return last - first;
  };
  useEffect(() => {
    setSelectTh(`num_${returnTag(slugTh)}_per_${valueToggle}`);
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
    if (labelToggle) {
      setPage(1);
    }
  }, [labelToggle]);
  useEffect(() => {
    if (behivior) {
      const getTH: any = thead?.find((item) => item.key === behivior);
      setSelectTh(getTH.slug);
    }
  }, [behivior]);
  return (
    <div>
      <p className="title text-pink text-center mb-[28px] mt-[32px]">{labelToggle}</p>
      <div>
        <table className="table-fixed w-full border-separate border-spacing-y-2">
          <tr className="hidden md:contents pb-[16px]">
            {thead.map((item: any, index: any) => {
              return (
                <th
                  onClick={() => selectTh(item.slug, index)}
                  className={`hidden md:table-cell ${
                    item.slug !== "rate" && item.slug !== "project" && "h-[40px] cursor-pointer bg-[#F8F8F8]"
                  } first:rounded-tl-[36px] first:rounded-bl-[36px] last:rounded-tr-[36px] last:rounded-br-[36px] text-[#ADACAC] whitespace-nowrap ${
                    slugTh === item.slug ? " text-[#fff] whitespace-nowrap " : " bg-[#F8F8F8]"
                  } ${item.slug === "project" && " w-[250px]"}`}
                  key={index}
                >
                  <div className={`${slugTh === item.slug ? "rounded-table bg-blue py-[8px] px-[0px]" : ""}`}>
                    <span className="whitespace-nowrap md:text-11 xl:body-15-bold">{item.title}</span>
                  </div>
                </th>
              );
            })}
          </tr>

          {filterFame?.sort(funcSort)?.map((item: any, index: any) => {
            if (index + 1 >= number.firstNumber && index + 1 <= number.lastNumber)
              return (
                <Fragment key={index}>
                  <ItemsTd thead={thead} behivior={behivior} toggle={valueToggle} index={index} item={item} />
                </Fragment>
              );
          })}
        </table>
        <Pagination total={filterFame?.length} itemPerPage={10} page={page || 1} setPage={changePage} className="flex justify-center" />
      </div>
    </div>
  );
};
export default ByUser;
