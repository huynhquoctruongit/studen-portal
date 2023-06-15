import { fetcherClient } from "@/lib/api/axios-client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const convertParamToQuery = (params: any) => {
  const payload = { _and: [] } as any;
  if (params.subject) payload._and.push({ subject_id: { _eq: params.subject } });
  if (params.user_created) payload._and.push({ user_created: { _eq: params.user_created } });
  if (params.status) payload._and.push({ status: { _eq: params.status } });
  return payload;
};

export function useFilterProfile(props: any) {
  const param: any = useSearchParams();
  const id = param.get("id");

  const [params, setParams] = useState(props.params);
  const [query, setQuery]: any = useState(props?.query || {});
  const payload = JSON.stringify(convertParamToQuery(params));
  const updateFilter = (value: any) => {
    setParams(value);
    setQuery({ ...query, page: 0 });
  };
  const updateQuery = (value: any) => {
    setQuery(value);
  };

  useEffect(() => {
    setParams({ ...props.params, user_created: id });
  }, [id]);

  const queryStr = "&" + new URLSearchParams(query).toString();
  const isFetch = Object.keys(params).length !== 0 || Object.keys(query).length !== 0;
  const { data, error, mutate } = useSWR(
    isFetch
      ? "/items/projects?limit=1000&fields=*,user_created.*,user_created.user_meta_id.*,subject_id.*,project_statistic_id.*&meta=filter_count&filter=" +
          payload +
          queryStr
      : "",
    { fetcher: fetcherClient, revalidateOnMount: true },
  );
  const result = isFetch ? (error ? [] : data?.data) : null;
  const isLoading = isFetch && !data && !error;

  return { updateFilter, forUpdate: mutate, updateQuery, params, isLoading, result, query, meta: (data as any)?.meta || {} };
}
