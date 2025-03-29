"use client"

import React from "react"
import ImageCarousel from "./ImageCarousel"

const Header = () => {
  return (
    <section className="w-full min-h-screen text-white px-6 pt-10 pb-10 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
        {/* 🖼️ Auto-switching Carousel */}
        <ImageCarousel />

        {/* 📝 Text */}
        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
          Excellent<br />
          Food Meets<br />
          Great Tech
        </h1>

        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
          The world’s largest chain of internet restaurants powered by an operating system for building and scaling brands globally.
        </p>

        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
          We believe in finding the right balance between exquisite culinary craftsmanship and technological infrastructure.
        </p>
      </div>
    </section>
  )
}

export default Header
