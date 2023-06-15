"use client";
import { opacity } from "@/lib/motion";
import { motion } from "framer-motion";

const NotFound = ({ className, content }: any) => {
  return (
    <motion.div
      initial={"hidden"}
      animate="visible"
      variants={opacity}
      exit={"exit"}
      className={"min-h-[50vh] title-small-bold md:title-small py-20  flex flex-col md:flex-row items-center justify-center " + className}
    >
      <img className="w-[200px] block md:hidden md:w-[341px]" width={341} height="388" src="/images/not-found.png" alt="" />
      <div className="md:w-[469px] text-center text-blue"> {content || "Oops…không có kết quả nào rồi, cậu thử tìm từ khóa khác nhé!"}</div>
      <img className="w-[200px] hidden md:block md:w-[341px]" width={341} height="388" src="/images/not-found.png" alt="" />
    </motion.div>
  );
};
export default NotFound;
