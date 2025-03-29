"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/header1.jpeg",
  "/header2.jpeg",
  "/header3.jpeg",
  "/header4.jpeg"
]

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 4000) // 4s auto switch

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-auto rounded-xl overflow-hidden relative">
      <Image
        src={images[currentIndex]}
        alt={`Carousel image ${currentIndex + 1}`}
        width={600}
        height={400}
        className="w-full h-auto object-cover transition-opacity duration-700 ease-in-out"
        priority
      />
    </div>
  )
}

export default ImageCarousel
