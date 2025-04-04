"use client"

import React from "react"
import Image from "next/image"

interface WhatWeDoHeaderProps {
  title: [string, string, string, string]
  description: string
  imageSrc: string
  strokeColor?: string
}

const WhatWeDoHeader: React.FC<WhatWeDoHeaderProps> = ({
  title,
  description,
  imageSrc,
  strokeColor = "#E32227",
}) => {
  return (
    <section className="min-h-screen text-white px-6 pt-10 pb-16 sm:px-10 flex items-start justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-6 text-left items-start">
          {/* Flickering Heading */}
          <h2
            className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text text-left flicker-stroke"
          >
            <span className="block sm:inline">{title[0]}&nbsp;</span>
            <span className="block sm:inline">{title[1]}</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">{title[2]}&nbsp;</span>
            <span className="block sm:inline">{title[3]}</span>
          </h2>

          {/* Description */}
          <p className="text-base lg:text-lg text-yellow-400 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-40 lg:w-72">
            <Image
              src={imageSrc}
              alt="Section visual"
              width={288}
              height={288}
              className="w-full h-auto object-contain"
            />
          </div>
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

export default WhatWeDoHeader
