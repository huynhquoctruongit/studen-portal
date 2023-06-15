export const variantsHidden = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
export const variantsOpacity = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const variants = {
  hidden: { opacity: 0, height: 0 },
  enter: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};
export const variantsComment = {
  hidden: { opacity: 0, height: 0 },
  enter: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

export const variantsScale = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.96 },
  exit: { opacity: 0, scale: 0.99 },
};

export const popup = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 30 },
  exit: { opacity: 0, y: 30 },
};

export const opacity = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.05,
      // type: "spring",
      // stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      // type: "spring",
      // stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.05,
      // type: "spring",
      // stiffness: 100,
    },
  },
};

export const variantsToast = {
  visible: {
    opacity: 1,
    y: -70,
  },
  hidden: {
    opacity: 0,
    y: -0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const animatParent = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
export const childrent = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 70,
    opacity: 0,
    transition: {
      y: { stiffness: 800, velocity: -200 },
    },
  },
};
export const childrentSelect = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.02,
      // y: { stiffness: 10, velocity: -10 },
    },
  },
  closed: {
    y: 10,
    opacity: 0,
    transition: {
      duration: 0.1,
      y: { stiffness: 1000 },
    },
  },
};

export const animatParentOpacity = {
  open: {
    opacity: 1,
    transition: { duration: 0.2, staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.2, staggerChildren: 0.05, staggerDirection: -1 },
  },
};
export const timeCache = 60 * 3;
