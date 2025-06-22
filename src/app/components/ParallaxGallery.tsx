"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";


interface ParallaxGalleryProps {
  images: string[];
}

export default function ParallaxGallery({ images }: ParallaxGalleryProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Parallax effect for each image
  const parallaxSpeeds = [
    useTransform(scrollYProgress, [0, 1], [0, -60]),  // Bottom left image
    useTransform(scrollYProgress, [0, 1], [0, -180]), // Center back image
    useTransform(scrollYProgress, [0, 1], [0, -120]), // Right image
  ];

  // Absolute positions and z-indices for overlapping
  const imagePositions = [
    // Bottom left (smallest, highest z)
    "absolute left-0 bottom-15 z-20 w-36 h-36 md:w-52 md:h-52",
    // Center (largest, back)
    "absolute left-1/2 top-0 -translate-x-1/2 z-10 w-64 h-64 md:w-96 md:h-96",
    // Right (middle size)
    "absolute right-0 -top-20 z-30 w-40 h-40 md:w-72 md:h-72",
  ];

  return (
    <section
      ref={container}
      className="relative px-4 md:px-10 min-h-[70vh] overflow-hidden"
    >
     
      {/* Overlapping, layered images */}
      <div className="relative w-full mt-50 max-w-3xl h-[350px] md:h-[430px] mx-auto">
        {images.map((src, i) => (
          <motion.div
            key={src}
            style={{ y: parallaxSpeeds[i % parallaxSpeeds.length] }}
            className={imagePositions[i % imagePositions.length] + " rounded-lg overflow-hidden shadow-xl bg-white"}
          >
            <Image
              src={src}
              alt={`Gallery Image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 30vw"
              priority={i === 0}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
