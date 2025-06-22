"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full bg-yellow-400 py-4 px-6 fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-01.png"
            alt="GolGappaKing Logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center space-y-1"
          onClick={() => setIsOpen(true)}
        >
          <span className="w-6 h-0.5 bg-red-600"></span>
          <span className="w-6 h-0.5 bg-red-600"></span>
          <span className="w-6 h-0.5 bg-red-600"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10">
          <NavLinks />
        </div>
      </div>

      {/* AnimatePresence Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="fixed inset-0 bg-yellow-400 z-50 flex flex-col items-center justify-center space-y-8 text-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
            >
              ✕
            </button>

            {/* Nav Links */}
            <NavLinks mobile onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const NavLinks = ({
  mobile = false,
  onClick,
}: {
  mobile?: boolean
  onClick?: () => void
}) => {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/becomeapartner", label: "Become a Partner" },
    { href: "/vision", label: "Vision" },
    { href: "/mission", label: "Mission" },
    { href: "/gallery", label: "Gallery" },
  ]

  return (
    <>
      {links.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={`font-semibold hover:opacity-80 ${
              mobile ? "text-2xl" : ""
            } ${isActive ? "text-red-600" : "text-white"}`}
          >
            {label}
          </Link>
        )
      })}

      {/* Instagram External Link */}
      <a
        href="https://www.instagram.com/golgappakingprivatelimited" // Replace with your actual handle
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 font-semibold hover:opacity-80 ${
          mobile ? "text-2xl justify-center" : ""
        } text-white`}
      >
        {/* <Image
          src="/instagram.svg"
          alt="Instagram"
          width={20}
          height={20}
          className="inline-block filter invert"
        /> */}
        Instagram
      </a>
    </>
  )
}

export default Navbar
