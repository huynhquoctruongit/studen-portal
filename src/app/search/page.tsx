"use client";
import { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "../../../public/images/svg/index";
import OrtherProject from "../home/orther";
import SearchResult from "./search";
import AxiosClient, { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";
import InputSearch from "./input-search";
import { removeVietnameseTones } from "@/lib/helper";
export default function Search() {
  const [input, setInput] = useState("");
  const [result, setResult]: any = useState(null);
  const { data: list } = useSWR("/items/projects?limit=10&fields=*,user_created.*,subject_id.*,user_created.user_meta_id.*", fetcherClient);
  const { data: subjects } = useSWR("/items/subjects", fetcherClient);
  const projects = list?.data;

  const { data: profanityWords } = useSWR("/items/profanity_words");
  const profanity = useMemo(() => {
    return profanityWords?.data.map((item: any) => item.swear_word?.normalize("NFD")).join("|");
  }, [profanityWords?.data?.length]);

  // create a function to remove item object double in array
  const removeDuplicate = (arr: any) => {
    const result = arr.reduce((unique: any, o: any) => {
      if (!unique.some((obj: any) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);
    return result;
  };
  const regex = new RegExp(profanity, "g");
  const onSearch = async (text: string) => {
    const value = text.trim();
    const searchText = removeVietnameseTones(value).toLowerCase();
    setInput(text);
    if (value === "") {
      setResult(null);
      return;
    }
    const metaData = await AxiosClient.get("/items/user_meta_data?search=" + searchText);
    const metaDataId = metaData.data?.map((item: any) => {
      return item.id;
    });

    const filter = { user_meta_id: { _in: metaDataId.length > 0 ? metaDataId : [-1] } };
    const promiseProject = AxiosClient.get(
      "/items/projects?fields=*,user_created.*,subject_id.*,project_statistic_id.*,user_created.user_meta_id.*&filter[status][_eq]=PUBLISHED&search=" +
        searchText,
    );
    const promiseProfile = AxiosClient.get("/users?fields=*,user_meta_id.*,user_statistic_id.*&search=" + searchText);
    const promiseUserMeta = AxiosClient.get("/users?fields=*,user_meta_id.*,user_statistic_id.*&filter=" + JSON.stringify(filter));
    const [projects, users, meta] = await Promise.all([promiseProject, promiseProfile, promiseUserMeta]);
    const result = { projects: projects.data, users: removeDuplicate([...users.data, ...meta.data]) };
    setResult(result);
  };

  if (!projects) return <div className="w-full h-screen bg-background"></div>;
  return (
    <>
      <title>Tìm kiếm</title>
      <meta property="og:title" content="Tìm kiếm" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Sân chơi dành cho các bạn lập trình viên nhí, giúp học viên rèn luyện vững chắc kĩ năng lập trình thông qua việc thực hành tạo ra sản phẩm & thi đấu cọ sát với bạn bè"
      />
      <meta property="og:image" content="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
      <div className="bg-[#F0FBFF] animate-page">
        <InputSearch onSearch={onSearch} />
        <div className="bg-white pt-[40px]">
          {result ? (
            <div className="w-screen xl:w-[1146px] xl:mx-auto">
              <SearchResult projects={result.projects} users={result.users} input={input} />
            </div>
          ) : (
            <OrtherProject />
          )}
        </div>
      </div>
    </>
  );
}
