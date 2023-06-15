"use client";
import Lottie from "lottie-react";
import gameIcon from "@/lib/lottie/games-icon.json";
import { motion } from "framer-motion";
import { variantsOpacity } from "@/lib/motion";

const Loading = ({ className }: any) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variantsOpacity}
      transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
      className={"flex items-center justify-center " + className}
    >
      <Lottie animationData={gameIcon} style={{ width: 300 }} />
    </motion.div>
  );
};

// create a loading component use react icon loading
export const LoadingIcon = ({ className }: any) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variantsOpacity}
      transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
      className={"flex items-center justify-center " + className}
    >
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 bg-blue rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue rounded-full animate-bounce"></div>
      </div>
    </motion.div>
  );
};

// create a loading component use tailwindcss loading

export default Loading;
