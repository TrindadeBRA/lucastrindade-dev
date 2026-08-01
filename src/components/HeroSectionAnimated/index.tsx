"use client"

import React from 'react';
import Image from 'next/image';
import { Profile } from '@/pages/api/sectionProfile';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Waves from '../Waves';

export default function HeroSectionAnimated(profileData: Profile) {
  return (
    <>
      <div className="relative isolate overflow-hidden min-h-screen flex items-center pt-20" id="hero">
        <div className="absolute inset-0 z-0 opacity-20">
          <Waves
            lineColor="#8b5cf6"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.90}
            tension={0.01}
            maxCursorMove={350}
            xGap={12}
            yGap={36}
          />
        </div>

        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-primary-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10 w-full">
          <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple via-primary-pink to-primary-blue rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <Image 
                  className="aspect-[4/5] w-64 flex-none rounded-2xl object-cover border-2 border-white/10"
                  src={profileData.user_avatar_sync}
                  alt={profileData.user_name}
                  width={800}
                  height={800}
                  priority
                />
              </div>
            </motion.div>

            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center md:justify-start gap-6 mb-6"
              >
                {[
                  { href: "https://www.linkedin.com/in/trindadebra/", icon: FaLinkedin, color: "hover:text-blue-400" },
                  { href: "https://github.com/TrindadeBRA/", icon: FaGithub, color: "hover:text-primary-purple" },
                  { href: "https://api.whatsapp.com/send?phone=5511952498126", icon: FaWhatsapp, color: "hover:text-green-400" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href={social.href} target='_blank'>
                      <social.icon className={`text-white ${social.color} transition-all duration-300`} size={24} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-lg text-center md:text-left font-semibold leading-8 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
                  {profileData.user_role}
                </h2>
                <h1 className="mt-2 text-4xl text-center md:text-left font-bold tracking-tight text-white sm:text-6xl gradient-text">
                  {profileData.user_name}
                </h1>
                <p className="mt-6 text-lg text-center md:text-left leading-8 text-gray-300">
                  {profileData.user_bio}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex items-center justify-center md:justify-start gap-6"
              >
                <motion.a
                  href="#apresentacao"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect rounded-full px-8 py-3 text-sm font-semibold text-white shadow-sm glow-effect hover:bg-white/10 transition-all"
                >
                  Saiba mais
                </motion.a>
                <motion.a
                  href="#projetos"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-semibold leading-6 text-white hover:text-primary-purple transition-colors"
                >
                  Ver projetos <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}