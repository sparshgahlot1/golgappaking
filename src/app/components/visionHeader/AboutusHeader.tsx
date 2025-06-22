"use client"

import React from "react";
import { motion } from "framer-motion";

interface WhatWeDoHeaderProps {
  title: [string, string];
  description?: string;
  imageSrc?: string;
  strokeColor?: string;
}

const WhatWeDoHeader: React.FC<WhatWeDoHeaderProps> = ({
  title,
}) => {
  return (
    <section className="w-full">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-red-500 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="block sm:inline">{title[0]}&nbsp;</span>
      </motion.h2>
    </section>
  );
};

export default WhatWeDoHeader;
