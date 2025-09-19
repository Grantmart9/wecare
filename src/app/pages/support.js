// ../animations/index.js
export const variants = {
  header: {
    hidden: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  section: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: 20, scale: 0.95 },
  },
};

export const transitions = {
  duration: 0.6,
  ease: [0.25, 0.8, 0.25, 1], // cubic-bezier ease
};
