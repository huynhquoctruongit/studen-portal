"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variantsHidden } from "@/lib/motion";

interface PropsAux {
  open?: any;
  toggle?: any;
  children: any;
  disableClose?: any;
  preventHideClickOverlay?: any;
}
const ModalView = React.memo(({ open, toggle = () => {}, children, disableClose, preventHideClickOverlay }: PropsAux) => {
  useEffect(() => {
    const handleClose = (event: any) => {
      const code = event.keyCode || event.which;
      if (code === 27) toggle();
    };
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={variantsHidden}
          initial="hidden"
          exit="hidden"
          animate="visible"
          transition={{ duration: 0.05 }}
          className="fixed flex items-center md:justify-center z-[10000] top-0 left-0 w-screen h-screen"
        >
          <div
            onClick={disableClose || preventHideClickOverlay ? () => {} : toggle}
            className="absolute z-50 inset-0 top-0 left-0 w-screen h-screen md:h-auto bg-dark-50"
          ></div>
          <div className="relative z-50 md:mx-0 mx-3 w-full md:w-auto overflow-y-auto md:h-auto py-2 md:py-0 scroll-none">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
export default ModalView;
