"use client";

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CallSlider() {
  const [showForm, setShowForm] = useState(false)
  const sliderRef = useRef(null)

  const handleDragEnd = (_, info) => {
    const sliderWidth = sliderRef.current?.offsetWidth || 0
    if (info.point.x >= sliderWidth - 80) {
      setShowForm(true)
    }
  }

  return (
    <div className="relative w-full flex items-end justify-center px-4 pb-6 pt-6">
      {/* CTA Image Slider */}
      {!showForm && (
        <div ref={sliderRef} className="w-full max-w-xs h-16 bg-yellow-400 rounded-full flex items-center px-2 relative overflow-hidden">
          <motion.img
            src="/logo-01.png"
            alt="Slide to Answer"
            className="w-20 h-20 object-contain z-10"
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            onDragEnd={handleDragEnd}
          />
          <motion.span
            className="absolute right-50 text-red-600 text-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
             -->
          </motion.span>
        </div>
      )}

      {/* Drawer Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 sm:p-6 shadow-2xl z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Fill Your Details</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl">
                ✖️
              </button>
            </div>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring text-sm"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring text-sm"
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring text-sm"
              />
              <input
                type="text"
                placeholder="PIN Code"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring text-sm"
              />
              <button type="submit" className="rounded-xl text-white bg-yellow-400 hover:bg-yellow-500 py-2 text-sm">
                Submit
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
