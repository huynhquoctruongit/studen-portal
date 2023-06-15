import { fetcherClient } from "@/lib/api/axios-client";
import useSWR from "swr";

export function useFollow() {
  const params = { follower_id: { _eq: "$CURRENT_USER" } };
  const url = "/items/followers?fields=*,follower_id.*&filter=" + JSON.stringify(params);
  const { data, error, mutate } = useSWR(url);

  const follow: any = {};
  if (data?.data)
    data?.data.map((item: any) => {
      follow[item?.followed_id] = item;
    });
  const fisrtLoad = !error && !data;
  return { follow: follow, fisrtLoad, updateFolow: mutate };
}
