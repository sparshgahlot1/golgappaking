"use client"

import React from "react"
import ImageCarousel from "./ImageCarousel"

const Header = () => {
  return (
    <section className="w-full min-h-screen text-red-500 px-6 pt-10 pb-10 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
        {/* 🖼️ Auto-switching Carousel */}
        <ImageCarousel />

        {/* 📝 Text */}
        <h1 className="text-2xl sm:text-4xl font-black leading-tight">
          Satisfying Cravings With<br />
           {/* <br /> */}
          Great Food & Tech
        </h1>
      </div>
    </section>
  )
}

export default Header
