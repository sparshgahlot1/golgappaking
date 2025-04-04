"use client"

import React from "react"
import { motion } from "framer-motion"

interface MarqueeFooterProps {
  title: [string]
  strokeColor?: string
}

const MarqueeFooter: React.FC<MarqueeFooterProps> = ({
  title,
  strokeColor = "#E32227",
}) => {
  return (
    <footer className="w-full h-[80px] pt-8 overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 140,
          ease: "linear"
        }}
      >
        <h2 className="text-4xl lg:text-6xl font-extrabold uppercase flicker-stroke px-4">
          {Array(10).fill(`${title[0]} `)}
        </h2>
      </motion.div>

      <style jsx>{`
        .flicker-stroke {
          color: transparent;
          -webkit-text-stroke: 2.5px ${strokeColor};
          animation: flickerStroke 1.5s infinite ease-in-out;
        }

        @keyframes flickerStroke {
          0%, 100% { -webkit-text-stroke: 2.5px ${strokeColor}; }
          50%      { -webkit-text-stroke: 2.5px #E32227; }
        }
      `}</style>
    </footer>
  )
}

export default MarqueeFooter
