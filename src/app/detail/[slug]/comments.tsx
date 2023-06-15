"use client";
import CommentInput from "../ui/comment";
import useSWR from "swr";

const CommentWrapper = ({ id }: any) => {
  const { data: comments } = useSWR(
    "/items/comments?fields=*,quote.*,user_created.avatar,user_created.id,user_created.user_meta_id.*&sort=-date_created&filter[project_id][_eq]=" +
      id,
    { revalidateIfStale: true },
  );
  if (!comments) return <div className="min-h-[100px] w-full"></div>;
  return (
    <div className="">
      <CommentInput comments={comments?.data || []} id={id} />
    </div>
  );
};

export default CommentWrapper;
