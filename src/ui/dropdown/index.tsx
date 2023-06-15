import { variantsHidden } from "@/lib/motion";
import { motion } from "framer-motion";
const Dropdown = ({ children, className }: any) => {
  return (
    <motion.div
      variants={variantsHidden}
      initial="hidden"
      exit="hidden"
      animate="visible"
      transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default Dropdown;
