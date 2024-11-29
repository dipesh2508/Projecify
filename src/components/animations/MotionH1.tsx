"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const H1 = React.forwardRef<HTMLDivElement, HTMLMotionProps<"h1">>(
  (props, ref) => <motion.div ref={ref} {...props} />
);

H1.displayName = "H1";

export default H1;
