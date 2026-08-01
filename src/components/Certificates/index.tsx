"use client"

import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import { useState, useRef } from 'react';
import ContentCarrosel from './ContentCarrosel';
import ContentGrid from './ContentGrid';
import { motion, useInView } from 'framer-motion';

export default function Certificates(certificateData: Certificate[]) {
  const [showModal, setShowModal] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openModal = (imageUrl: any) => {
    setShowImageUrl(imageUrl);
    setShowModal(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className="relative py-20 sm:py-32 overflow-hidden" id="certificados">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-pink/5 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
            Estudos
          </h2>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Meus <span className="gradient-text">Certificados</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Certificações e cursos que aprimoraram minhas habilidades técnicas.
          </p>
        </motion.div>

        <ContentCarrosel
          certificateData={certificateData}
          openModal={openModal}
          setShowAllCertificates={setShowAllCertificates}
          showAllCertificates={showAllCertificates}
        />
        
        {showAllCertificates && (
          <ContentGrid certificateData={certificateData} openModal={openModal} />
        )}
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-4/5 lg:w-3/5 2xl:w-2/6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative glass-effect rounded-2xl border border-white/20 p-4">
              <Image 
                src={showImageUrl} 
                alt="Certificate" 
                className="w-full rounded-xl" 
                width={1024} 
                height={720} 
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal} 
              className="absolute -top-4 -right-4 p-3 rounded-full glass-effect text-white shadow-lg border border-white/20 hover:border-primary-purple/50 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
