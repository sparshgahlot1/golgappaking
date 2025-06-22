"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/aboutus1.jpeg",
  "/aboutus2.jpeg",
  "/aboutus3.jpeg",
]

const InfiniteSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 2100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex items-center justify-center px-4 pt-4">
      <div className="w-[600px] h-[300px] rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={images[currentIndex]}
            alt={`Carousel image ${currentIndex + 1}`}
            layout="fill"
            className="object-cover transition-opacity duration-700 ease-in-out rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default InfiniteSlider
