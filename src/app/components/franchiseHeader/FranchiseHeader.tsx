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
  strokeColor = "red", // Default to red
}) => {
  return (
    <section className="w-full text-white py-6 pt-10 flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex-1 flex flex-col gap-6 text-left items-start">
          <h2
            className="text-3xl lg:text-6xl font-extrabold text-transparent bg-clip-text text-left flicker-stroke"
          >
            <span className="block sm:inline">{title[0]}&nbsp;</span>
          </h2>
        </div>
      </div>
      <style jsx>{`
        .flicker-stroke {
          color: red;
          -webkit-text-stroke: 1.5px ${strokeColor};
          font-family: Helvetica, Arial, sans-serif;
        }
      `}</style>
    </section>
  )
}

export default FranchiseHeader
