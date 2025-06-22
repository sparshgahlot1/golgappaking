"use client"

import React from "react"

interface WhatWeDoHeaderProps {
  title: [string]
  description?: string
  imageSrc?: string
  strokeColor?: string
}

const FranchiseHeader: React.FC<WhatWeDoHeaderProps> = ({
  title,
  strokeColor = "#E32227",
}) => {
  return (
    <section className="w-full text-white py-6 pt-10 flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-6 text-left items-start">
          {/* Flickering Heading */}
          <h2
            className="text-4xl uppercase lg:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text text-left flicker-stroke"
          >
            <span className="block sm:inline">{title[0]}&nbsp;</span>
          </h2>
        </div>
      </div>
      {/* ⛓️ Flicker Animation */}
      <style jsx>{`
        .flicker-stroke {
          color: transparent;
          -webkit-text-stroke: 2.5px ${strokeColor};
          animation: flickerStroke 1.5s infinite ease-in-out;
        }

        @keyframes flickerStroke {
          0%   { -webkit-text-stroke: 2.5px ${strokeColor}; }
          50%  { -webkit-text-stroke: 2.5px #E32227; }
          100% { -webkit-text-stroke: 2.5px ${strokeColor}; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseHeader
