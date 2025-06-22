"use client"

import React from 'react';
import { motion } from 'framer-motion';
import VisionHeader from '../components/visionHeader/AboutusHeader';

const page = () => {
  return (
    <div className="w-full px-4 py-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <VisionHeader title={["Vision", ""]} />

        <div className="mt-8">
          <motion.div
            className="p-6 bg-red-500 rounded-lg shadow-lg space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg leading-relaxed text-white">
              Our vision is to build India&rsquo;s first indigenous street food brand serving Indian chaat that is
              healthier, hygienic, and supreme in taste and quality — redefining the way street chaat is
              experienced and served in India.
            </p>

            <p className="text-lg leading-relaxed text-white">
              We aspire to establish 200+ Quick Service Restaurants (QSRs) serving authentic Indian chaat in
              Northern India within the next 3 years, empowering micro-entrepreneurs to operate and grow
              alongside us.
            </p>
          </motion.div>
        </div>

        <div className="mt-10">
          <motion.div
            className="p-6 bg-red-500 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">
              Key Highlights
            </h2>
            <ul className="list-disc list-inside text-white text-base space-y-2">
              <li>Hygienic and high-quality street food</li>
              <li>Supreme taste & standardized recipes</li>
              <li>Empowering micro-entrepreneurs</li>
              <li>200+ outlets target within 3 years</li>
              <li>Focus on Northern India market</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
