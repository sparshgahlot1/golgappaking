"use client"

import React from "react"
import Image from "next/image"

const WhatWeDoHeader = () => {
  return (
    <section className="bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#2a2a2a] min-h-screen text-white px-6 py-16 sm:px-10 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-6 text-left items-start">
          {/* 🟥 Outlined Heading (2 lines on desktop, 4 on mobile) */}
          {/* 🟥 Outlined Heading (4 lines mobile, 2 desktop) */}
          <h2
  className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text text-left"
  style={{
    WebkitTextStroke: "2.5px #E32227",
    color: "transparent",
  }}
>
  <span className="block sm:inline">One&nbsp;</span>
  <span className="block sm:inline">Kitchen</span>
  <br className="hidden sm:block" />
  <span className="block sm:inline">Multiple&nbsp;</span>
  <span className="block sm:inline">Outlets</span>
          </h2>
          {/* 📄 Description */}
          <p className="text-base lg:text-lg text-yellow-400 leading-relaxed max-w-xl">
            Address city, talk about DPITT recognized startup etc, based in. About GGK from pitchdeck.
          </p>
        </div>

        {/* Right: Icon */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-40 lg:w-72">
            <Image
              src="/image.png"
              alt="Cloud tech icon"
              width={288}
              height={288}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoHeader
