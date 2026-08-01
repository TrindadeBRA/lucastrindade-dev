"use client"

import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

type ContentGridProps = {
    certificateData: Certificate[],
    openModal: (certificate_file_sync: string) => void,
    setShowAllCertificates: (showAllCertificates: boolean) => void,
    showAllCertificates: boolean,
}
export default function ContentCarrosel({ certificateData, openModal, setShowAllCertificates, showAllCertificates }: ContentGridProps) {
    return (
        <div className='mt-16'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                navigation={true}
                centeredSlides={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 1,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                loop={true}
                pagination={{
                    dynamicBullets: true,
                    dynamicMainBullets: 5
                }}
                initialSlide={1}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 1500,
                }}
            >
                {Object.values(certificateData).map((certificate: Certificate) => (
                    <SwiperSlide key={certificate.certificate_id} onClick={() => openModal(certificate.certificate_file_sync)} className='my-12 cursor-pointer'>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple via-primary-pink to-primary-blue rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative">
                                <Image 
                                    width={1024} 
                                    height={720} 
                                    src={certificate.certificate_file_sync} 
                                    alt={certificate.certificate_name}
                                    priority={true}
                                    className='rounded-xl border border-white/10'
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <motion.button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                type='button'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='glass-effect px-8 py-3 rounded-full mx-auto block my-8 text-white font-semibold text-sm transition-all duration-300 border border-white/20 hover:border-primary-purple/50 glow-effect'
            >
                {!showAllCertificates ? `Mostrar todos (${Object.keys(certificateData).length})` : "Recolher"}
            </motion.button>
        </div>
    );
};
