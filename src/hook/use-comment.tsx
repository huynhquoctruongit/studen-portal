import { fetcherClient } from "@/lib/api/axios-client";
import { directus } from "@/lib/directus";
import useSWR from "swr";

export function useComment(id: string) {
  const commentUrl =
    "/items/comments?fields=*,quote.*,user_created.avatar,user_created.id,user_created.user_meta_id.*&sort=-date_created&filter[project_id][_eq]=" + id;
  const { data: comments, error, mutate } = useSWR(commentUrl, fetcherClient);

  return { comments: comments?.data, mutateComment: mutate };
}
