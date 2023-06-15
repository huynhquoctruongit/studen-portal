import { fetcherClient } from "@/lib/api/axios-client";
import { useState } from "react";
import useSWR from "swr";

const convertParamToQuery = (params: any) => {
  const payload = { _and: [{ status: { _eq: "PUBLISHED" } }] } as any;
  if (params.subject) payload._and.push({ subject_id: { _eq: params.subject } });
  if (params.home === "new") payload._and.push({ date_created: { _gte: "$NOW(-3 days)" } });
  if (params.user_created === "new") payload._and.push({ user_created: { _eq: params.user_created } });
  return payload;
};

export function useFilter(props: any) {
  const [params, setParams]: any = useState({});
  const [query, setQuery]: any = useState(props?.query || {});
  let payload = params ? JSON.stringify(convertParamToQuery(params)) : "";

  const updateFilter = (value: any) => {
    setParams(value);
    setQuery({ ...query, page: 0 });
  };
  const updateQuery = (value: any) => {
    setQuery(value);
  };

  const queryStr = "&" + new URLSearchParams(query).toString();
  const isFetch = Object.keys(params).length !== 0 || Object.keys(query).length !== 0;

  const { data, error } = useSWR(
    isFetch
      ? "/items/projects?fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&meta=filter_count&filter=" +
          payload +
          queryStr
      : "",
    fetcherClient,
  );

  const result = isFetch ? (error ? [] : data?.data) : null;
  const isLoading = isFetch && !data && !error;
  return { updateFilter, updateQuery, params, isLoading, result, query, meta: (data as any)?.meta || {} };
}
