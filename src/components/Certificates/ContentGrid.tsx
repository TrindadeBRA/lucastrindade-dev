"use client"

import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import React from 'react';
import { getBadgeConfig } from './getBadgeConfig';
import { motion } from 'framer-motion';

type ContentGridProps = {
    certificateData: Certificate[],
    openModal: (certificate_file_sync: string) => void,
}

export default function ContentGrid({certificateData, openModal}: ContentGridProps) {
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
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    };
    
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
            {
                Object.values(certificateData).map((certificate: Certificate) => {
                    const badgeConfig = getBadgeConfig(certificate.certificate_category);
                    
                    return (
                        <motion.article 
                            key={certificate.certificate_id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="flex flex-col glass-effect rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-primary-purple/50 transition-all group"
                            onClick={() => openModal(certificate.certificate_file_sync)}
                        >
                            <div className="relative w-full mb-4">
                                <div className="relative overflow-hidden rounded-xl">
                                    <Image 
                                        width={1024} 
                                        height={720} 
                                        src={certificate.certificate_file_sync} 
                                        alt={certificate.certificate_name}
                                        className="w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                                <div className="absolute top-2 right-2 z-10">
                                    <span className={`${badgeConfig.bgColor} ${badgeConfig.textColor} px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}>
                                        {badgeConfig.text}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-base font-semibold leading-6 text-white group-hover:text-primary-purple transition-colors line-clamp-2">
                                    {certificate.certificate_name}
                                </h3>
                                <p className="mt-2 text-sm font-light italic text-gray-400 line-clamp-1">
                                    {certificate.certificate_instructors}
                                </p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <time dateTime={certificate.certificate_date} className="text-xs text-gray-400">
                                    {new Date(`${certificate.certificate_date}T00:00:00`).toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </motion.article>
                    );
                })
            }
        </motion.div>
    );
};
