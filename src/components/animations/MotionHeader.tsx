"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const MotionHeader = React.forwardRef<HTMLDivElement, HTMLMotionProps<"header">>(
  (props, ref) => <motion.div ref={ref} {...props} />
);

MotionHeader.displayName = "MotionHeader";

export default MotionHeader;
