"use client"

import { Profile } from '@/pages/api/sectionProfile';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Presentation = (profileData: Profile) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative py-20 sm:py-32 overflow-hidden" id="apresentacao">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue/20 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-pink/20 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-base font-semibold leading-7 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
              Um pouco sobre mim
            </p>
            <h1 className="mt-2 mb-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Apresentação
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="text-lg leading-8 text-gray-300 space-y-4">
              {profileData?.user_presentation?.[0]?.plain_text?.split('\n').map((paragraph:string, index:number) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="text-white/90"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
