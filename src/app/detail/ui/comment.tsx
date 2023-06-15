"use client";
import { useAuth } from "@/hook/auth";
import AxiosClient from "@/lib/api/axios-client";
import { Button } from "@/ui/button";
import { Comment, DeleteIcon } from "@/ui/icons/action";
import { ImageCMS } from "@/ui/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import groupBy from "lodash/groupBy";
import AxiosController, { fetcherController } from "@/lib/api/axios-controller";
import { timeAgo, checkBannedText } from "@/lib/helper";
import ModalView from "@/ui/modal";
import ConfirmDelete from "@/components/modal/confirmDeleteComment";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { variantsComment } from "../../../lib/motion";
import { useProfanityWords } from "@/hook/use-profanity-word";
import { v4 as uuidv4 } from "uuid";

const CommentInput = ({ id, comments: commentsInit }: any) => {
  const { convertProfanityWords } = useProfanityWords();
  const prevent = useRef(false);
  const [comment, setComment] = useState(commentsInit);
  const { profile } = useAuth();
  const [index, setIndex] = useState(1);
  const [value, setValue] = useState("");
  const input: any = useRef();

  const commentBehaviours = `/api/v1/projects/${id}/comment-like/count`;
  const { data: behaviours, mutate: mutateComment } = useSWR(commentBehaviours, fetcherController, { revalidateIfStale: true });

  const updateComment = (uuid: any, data?: any) => {
    if (!data)
      return setComment((cmts: any) => {
        const cmmts = cmts || [];
        return [uuid, ...cmmts];
      });
    const update = (comment: any) => {
      const newComment = comment.map((item: any) => {
        if (item.uuid === uuid) return { ...item, ...data, user_created: item.user_created, state: "success" };
        return item;
      });
      return newComment;
    };
    setComment(update);
  };

  const addComment = async () => {
    const value = input.current.innerText.trim();
    if (prevent.current || !value) return;
    prevent.current = true;
    const commentId = uuidv4();
    const params = {
      uuid: commentId,
      parent_id: null,
      user_created: profile,
      project_id: id,
      level: 0,
      content: convertProfanityWords(value),
      state: "loading",
    };
    input.current.innerText = "";
    setValue("");
    updateComment(params);
    const res = await AxiosController.post("/api/v1/profanity-word/validate", { content: value });
    if (res.data) {
      const result = await AxiosClient.post("/items/comments", { project_id: id, level: 0, content: res.data.trim() });
      delete result.data.content;
      updateComment(commentId, result.data);
    }
    prevent.current = false;
  };

  const removeComment = async () => {
    const result = await AxiosClient.get(
      "/items/comments?fields=*,quote.*,user_created.avatar,user_created.id,user_created.user_meta_id.*&sort=-date_created&filter[project_id][_eq]=" +
        id,
    );
    if (result?.data) setComment(result?.data);
  };

  const commentsFormat: any = comment || [];
  const commentGroup: any = groupBy(commentsFormat, (item: any) => item.parent_id);
  const comments = commentGroup["null"] || [];

  return (
    <div>
      <div className="md:title title-small-bold text-blue">Bình luận ({commentsFormat.length})</div>
      {profile?.id && (
        <div className="flex mt-6">
          <ImageCMS src={profile?.avatar} width={64} height={64} className="w-16 h-16 rounded-full border-[1.5px] border-white shadow" />
          <div className="pl-1.5 md:pl-[30px] flex-1 relative h-fit">
            <div
              onClick={() => input.current.focus()}
              className="min-h-[100px] w-full border-[1px] border-blue rounded-md p-2 max-w-[659px] whitespace-pre"
            >
              <div
                ref={input}
                style={{ whiteSpace: "pre-wrap" }}
                onInput={(e: any) => setValue(e.target.innerHTML.trim())}
                contentEditable={true}
                className="min-h-[40px] block outline-none bg-transparent w-full resize-none whitespace-break"
                placeholder="Nhập bình luận"
                onKeyDownCapture={(e: any) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
              ></div>
              <div className="flex justify-end">
                <Button type="solid" onClick={addComment} disabled={value.length === 0} color="blue">
                  GỬI
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {comments?.length > 0 && (
        <div className="md:ml-[38px] mt-[28px]">
          <AnimatePresence>
            {comments.slice(0, index * 4).map((element: any, index: number) => {
              const childrent = commentGroup[element.id] || [];
              const like = behaviours?.data[element.id];
              return (
                <div key={(element.uuid || element.id) + "parrent"}>
                  <CommentElement
                    mutate={() => {}}
                    mutateComment={mutateComment}
                    updateComment={updateComment}
                    removeComment={removeComment}
                    dataLike={like}
                    data={element}
                    projectId={id}
                    length={childrent.length}
                  />
                  <AnimatePresence>
                    {childrent &&
                      childrent.reverse().map((item: any, index: any) => {
                        const like = behaviours?.data[item.id];
                        return (
                          <CommentElement
                            dataLike={like}
                            updateComment={updateComment}
                            removeComment={removeComment}
                            mutateComment={mutateComment}
                            mutate={() => {}}
                            data={item}
                            key={(item.uuid || item.id) + "childrent"}
                            projectId={id}
                          />
                        );
                      })}
                  </AnimatePresence>
                </div>
              );
            })}
          </AnimatePresence>
          {index * 4 <= comments.length && (
            <div onClick={() => setIndex((state: number) => state + 1)} className="text-blue body-15-bold cursor-pointer text-center">
              Xem thêm ...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentInput;
const CommentElement = ({ updateComment, removeComment, data, mutate, projectId, length, dataLike, mutateComment }: any) => {
  const [isWrite, setIsWrite] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const { profile } = useAuth();
  const ref: any = useRef();
  const { user_created, parent_id, id } = data;
  const cls = parent_id ? "ml-[57px] " : "";
  const quote = data.quote;
  const like = async () => {
    if (!profile?.id) return;
    if (dataLike?.is_liked) await AxiosController.post("/api/v1/comments/" + data.id + "/dislike", { project_id: projectId });
    else await AxiosController.post("/api/v1/comments/" + data.id + "/like", { project_id: projectId });
    mutateComment();
  };
  const isOwner = user_created?.id === profile?.id;
  const actionDelete = async (status: any) => {
    if (status === true) {
      await AxiosController({
        method: "delete",
        url: "/api/v1/comments/" + data.id,
        data: {
          project_id: projectId,
        },
      });
      removeComment();
      setDelete(false);
    }
  };
  const deleteComment = () => {
    setDelete(true);
  };

  return (
    <motion.div
      variants={variantsComment}
      transition={{ duration: 0.2, type: "ease-in-out" }}
      animate={"enter"}
      initial="hidden"
      exit={"hidden"}
      className={""}
    >
      <ModalView open={isDelete} toggle={() => setDelete(false)}>
        <ConfirmDelete action={actionDelete} isDelete={isDelete} toggle={() => setDelete(false)}></ConfirmDelete>
      </ModalView>
      <div className={"flex " + cls}>
        <Link href={"profile?id=" + user_created?.id} className="min-[64px]">
          <ImageCMS
            src={user_created?.avatar}
            width={64}
            height={64}
            className="w-10 h-10 rounded-full border-[1.5px] border-white shadow"
          />
        </Link>
        <div className="ml-4 w-full flex-1">
          <div className="body-13-bold text-blue flex items-center">
            <Link href={"profile?id=" + user_created?.id} className="hover:underline underline-offset-2">
              <span>{user_created?.user_meta_id?.nick_name} </span>
            </Link>
            <span className="w-1 block h-1 rounded-full mx-1 bg-gray-400"></span>{" "}
            <span className="body-13 text-gray-400">{timeAgo(data.date_created)}</span>
          </div>
          {quote?.content && (
            <div className="w-full relative h-[25px] rounded-md px-2 bg-[#EDEDED] truncate">
              <pre className="body-13 absolute top-0 px-2 left-0 h-[25px] truncate w-full italic text-[#4F4F4F]">{quote?.content}</pre>
            </div>
          )}
          <pre
            className={"body-13 text-[#4F4F4F] whitespace-pre-wrap"}
            dangerouslySetInnerHTML={{ __html: checkBannedText(data.content) as string }}
          ></pre>
          {data.state === "loading" && (
            <div className="text-gray-600 text-[10px] h-10 mt-2.5 flex items-center">
              <span>Đang viết...</span>
            </div>
          )}
          {data.state !== "loading" && (
            <div className="flex gap-4 w-full mt-2.5 pb-4 animate-show">
              <div className="flex items-center">
                {!dataLike?.is_liked && (
                  <HeartIcon className="mr-[6px] w-5 h-5 stroke-[2px] stroke-[#FF4949] cursor-pointer" onClick={like} />
                )}
                {dataLike?.is_liked && (
                  <HeartIcon className="mr-[6px] w-5 h-5 stroke-[2px] fill-[#FF4949] cursor-pointer stroke-[#FF4949]" onClick={like} />
                )}
                <span className="body-13-bold text-gray-600">{dataLike?.count || 0}</span>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  if (profile?.id) setIsWrite((state) => !state);
                }}
              >
                <Comment className="mr-[6px]" />
                <span className="body-13-bold text-gray-600">Trả lời {length && length !== 0 && "(" + length + ")"}</span>
              </div>

              {isOwner && (
                <div className="flex items-center cursor-pointer" onClick={deleteComment}>
                  <DeleteIcon className="mr-[6px]" />
                  <span className="body-13-bold text-dangerous">Xóa</span>
                </div>
              )}
            </div>
          )}
          <AnimatePresence>
            {isWrite && (
              <motion.div variants={variantsComment} animate={"enter"} initial="hidden" exit={"hidden"}>
                <div className="pb-2.5">
                  <CommentTextarea
                    mutate={mutate}
                    updateComment={updateComment}
                    hidden={() => setIsWrite(false)}
                    innerRef={ref}
                    focus={isWrite}
                    quote={parent_id ? data : null} // nếu level thứ 2 thì không cần quote
                    parentId={parent_id || id} // nếu comment đó khong có parent_id thì là comment lever 1
                    projectId={projectId}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full border-b-[1px] mb-2.5 border-gray-200"></div>
        </div>
      </div>
    </motion.div>
  );
};

const CommentTextarea = ({ updateComment, hidden, innerRef, projectId, parentId, quote }: any) => {
  const { convertProfanityWords } = useProfanityWords();

  const input: any = useRef();
  const prevent = useRef(false);
  const { profile } = useAuth();
  const [value, setValue] = useState("");
  useEffect(() => {
    input.current.focus();
  }, []);
  const addComment = async () => {
    const value = input.current.innerText.trim();
    if (value === "" || prevent.current) return;
    hidden();
    prevent.current = true;
    const uuid = uuidv4();
    const params = {
      uuid: uuid,
      project_id: projectId,
      parent_id: parentId,
      content: convertProfanityWords(value),
      level: 0,
      quote: quote,
      user_created: profile,
      state: "loading",
    };
    updateComment(params);
    setValue("");
    const res = await AxiosController.post("/api/v1/profanity-word/validate", { content: value });
    if (res.data) {
      const result = await AxiosClient.post("/items/comments", {
        project_id: projectId,
        parent_id: parentId,
        content: res.data,
        level: 0,
        quote: quote?.id,
      });
      delete result.data.quote;
      updateComment(uuid, result.data);
    }
    prevent.current = true;
  };

  return (
    <div className="relative" ref={innerRef}>
      <div className="flex-1 relative h-fit">
        <div onClick={() => input.current.focus()} className="min-h-[100px] w-full border-[1px] border-blue rounded-md p-2 max-w-[659px] ">
          <div
            style={{ whiteSpace: "pre-wrap" }}
            ref={input}
            onInput={(e: any) => setValue(e.target.innerHTML.trim())}
            contentEditable={true}
            className="min-h-[40px] block outline-none bg-transparent w-full resize-none whitespace-pre"
            placeholder="Nhập bình luận"
            onKeyDownCapture={(e: any) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addComment();
              }
            }}
          ></div>
          <div className="flex justify-end">
            <Button type="solid" onClick={addComment} disabled={value.length === 0} color="blue">
              GỬI
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-[calc(100%+16px)]">
        <div className="w-10">
          <ImageCMS src={profile?.avatar} width={64} height={64} className="w-10 h-10 rounded-full border-[1.5px] border-white shadow" />
        </div>
      </div>
    </div>
  );
};
