"use client"

import React from 'react';
import { motion } from 'framer-motion';
import VisionHeader from '../components/visionHeader/AboutusHeader';

const page = () => {
  return (
    <div className="w-full px-4 py-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <VisionHeader title={["Mission", ""]} />

        <div className="mt-8">
          <motion.div
            className="p-6 bg-red-500 rounded-lg shadow-lg space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg leading-relaxed text-white">
              Our mission is to formalize and empower the unorganized street food sector by creating sustainable employment opportunities, 
              enabling aspiring entrepreneurs, and delivering hygienic food experiences to every household.
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
             We Aim To:
            </h2>
            <ul className="list-disc list-inside text-white text-base space-y-2">
              <li>Generate employment across urban and semi-urban areas</li>
              <li>Create independent business owners through our plug-and-play model</li>
              <li>Strengthen the grassroots consumer economy</li>
              <li>Contribute to nation-building through inclusive growth</li>
              <li>Promote hygiene and food safety for families across India</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
