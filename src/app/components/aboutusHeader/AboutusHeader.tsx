"use client"

import React from "react"

interface WhatWeDoHeaderProps {
  title: [string, string]
  description?: string
  imageSrc?: string
  strokeColor?: string
}

const WhatWeDoHeader: React.FC<WhatWeDoHeaderProps> = ({
  title,
}) => {
  return (
    <section className="w-full">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-red-500 text-left">
        <span className="block sm:inline">{title[0]}&nbsp;</span>
        <span className="block sm:inline">{title[1]}</span>
      </h2>
    </section>
  )
}

export default WhatWeDoHeader
