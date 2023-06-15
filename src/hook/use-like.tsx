import { fetcherClient } from "@/lib/api/axios-client";
import { directus } from "@/lib/directus";
import useSWR from "swr";

export function useBehaviours(id: string) {
  const params = { project_id: id };
  const url = "/items/behaviours?fields=*&groupBy=type&aggregate[count]=type&filter=" + JSON.stringify(params);
  const { data, error, mutate } = useSWR(url, fetcherClient, { revalidateOnMount: true });

  const behaviours: any = {};
  if (data?.data)
    data?.data.map((item: any) => {
      behaviours[item?.type?.toLowerCase()] = item?.count?.type;
    });
  const fisrtLoad = !error && !data;
  return { behaviours: behaviours, fisrtLoad, updateBehaviours: mutate };
}
