import { optionsFetch } from "@/lib/api/axios-client";
import { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";

const filter = { status: { _eq: "PUBLISHED" } };
export function useHotProject() {
  const url =
    "/items/projects?limit=50&fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&meta=filter_count&filter=" +
    JSON.stringify(filter) +
    "&sort=-project_statistic_id.num_fame_per_week";
  const { data, error, mutate } = useSWR(url, fetcherClient, optionsFetch);
  const hots: any = {};
  const dataHot = data?.data?.filter((item: any) => item?.project_statistic_id?.num_fame_per_week > 0);
  if (data?.data)
    dataHot.map((item: any) => {
      hots[item?.id] = true;
    });
  const checkIsHot = (id: any) => {
    return hots[id];
  };
  const isFisrtLoad = !data && !error;
  return { hots: dataHot || [], checkIsHot, isFisrtLoad };
}

export function useNewProject() {
  const query: any = {
    limit: 1000,
    fields: "*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*",
    sort: "-date_created",
    page: 0,
  };
  const filter = { _and: [{ date_created: { _gte: "$NOW(-3 days)" } }, { status: { _eq: "PUBLISHED" } }] };
  const queryStr = new URLSearchParams(query).toString();
  const url = "/items/projects?" + queryStr + "&filter=" + JSON.stringify(filter);
  const { data, error, mutate } = useSWR(url, fetcherClient, optionsFetch);
  const news: any = {};
  if (data?.data)
    data?.data.map((item: any) => {
      news[item?.id] = true;
    });
  const checkIsNew = (id: any) => {
    return news[id];
  };
  const isFisrtLoad = !data && !error;
  return { news: data?.data, checkIsNew, isFisrtLoad };
}

export function useSaved() {
  const query: any = {
    limit: 1000,
    fields: "*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*",
    sort: "-date_created",
    page: 0,
  };
  const filter = { _and: [{ date_created: { _gte: "$NOW(-3 days)" } }] };
  const queryStr = new URLSearchParams(query).toString();
  const url = "/items/projects?" + queryStr + "&filter=" + JSON.stringify(filter);
  const { data, error, mutate } = useSWR(url, fetcherClient, optionsFetch);
  const news: any = {};
  if (data?.data)
    data?.data.map((item: any) => {
      news[item?.id] = true;
    });
  const checkIsNew = (id: any) => {
    return news[id];
  };
  const isFisrtLoad = !data && !error;
  return { news: data?.data, checkIsNew, isFisrtLoad };
}
