import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

type ContentGridProps = {
    certificateData: Certificate[],
    openModal: (certificate_file: string) => void,
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
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
                autoplay={true}
            >

                {Object.values(certificateData).map((certificate: Certificate) => (
                    <SwiperSlide key={certificate.certificate_id} onClick={() => openModal(certificate.certificate_file)} className='my-12 '>
                        <Image width={1024} height={720} src={certificate.certificate_file_url} alt={''} priority={true} className='' />
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                type='button'
                className='bg-gray-900 px-4 py-3 rounded-2xl border border-gray-600 mx-auto block my-4 text-white font-bold text-sm transition-all duration-300 ease-in hover:bg-gray-800 hover:shadow-lg'
            >
                {!showAllCertificates ? "Mostrar todos" : "Recolher"}
            </button>
        </div>

    );
};
