"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const H3 = React.forwardRef<HTMLDivElement, HTMLMotionProps<"h3">>(
  (props, ref) => <motion.div ref={ref} {...props} />
);

H3.displayName = "H3";

export default H3;
