// src/animations/about.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
