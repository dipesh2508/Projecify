"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const H2 = React.forwardRef<HTMLDivElement, HTMLMotionProps<"h2">>(
  (props, ref) => <motion.div ref={ref} {...props} />
);

H2.displayName = "H2";

export default H2;
