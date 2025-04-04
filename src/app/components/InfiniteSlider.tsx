"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/is1.jpeg",
  "/is2.jpeg",
  "/is3.jpeg",
  "/is4.jpeg",
  "/is5.jpeg",
  "/is6.jpeg",
  "/is7.jpeg",
]

const InfiniteSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-[600px] h-[400px] rounded-xl shadow-lg overflow-hidden">
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
