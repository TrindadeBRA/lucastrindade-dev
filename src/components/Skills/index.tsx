"use client"

import { Skill } from '@/pages/api/sectionSkills';
import React from 'react';
import { Check } from 'react-feather';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Skills(skillsData: Skill){
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative py-20 sm:py-32 overflow-hidden" id="skills">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-purple/5 to-transparent"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <div>
            <h2 className="text-base font-semibold leading-7 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
              Conhecimentos gerais
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Minhas <span className="gradient-text">Skills</span>
            </p>
            <p className="mt-4 text-gray-400">
              Tecnologias e ferramentas que domino para criar soluções completas e eficientes.
            </p>
          </div>
          
          <motion.dl 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-2 grid grid-cols-2 gap-4 text-base leading-7 text-gray-300 sm:grid-cols-3"
          >
            {Object.values(skillsData).map((skill:any, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 5 }}
                className="relative pl-9 glass-effect rounded-lg p-4 group cursor-pointer hover:border-primary-purple border border-transparent transition-all"
              >
                <dt className="font-semibold text-white flex items-center">
                  <Check className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-purple group-hover:text-primary-pink transition-colors" />
                  {skill.skill_name}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </div>
  );
};
