import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import React from 'react';
import { getBadgeConfig } from './getBadgeConfig';

type ContentGridProps = {
    certificateData: Certificate[],
    openModal: (certificate_file_sync: string) => void,
}

export default function ContentGrid({certificateData, openModal}: ContentGridProps) {
    
    return (
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {
                Object.values(certificateData).map((certificate: Certificate) => {
                    const badgeConfig = getBadgeConfig(certificate.certificate_category);
                    
                    return (
                        <article key={certificate.certificate_id} className="flex flex-col items-start justify-between cursor-pointer bg-gray-800 hover:bg-gray-700 py-5 px-5 rounded-3xl shadow-md shadow-gray-600" onClick={() => openModal(certificate.certificate_file_sync)}
                            data-aos="fade-in"
                        >
                            <div className="relative w-full cursor-pointer mb-5">
                                <Image width={1024} height={720} src={certificate.certificate_file_sync} alt="" className="w-full rounded-2xl bg-gray-100 object-cover cursor-pointer" />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                                <div className="absolute top-2 right-2 z-10">
                                    <span className={`${badgeConfig.bgColor} ${badgeConfig.textColor} px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                                        {badgeConfig.text}
                                    </span>
                                </div>
                            </div>
                        <div className="w-full">
                            <div className="group relative">
                                <h3 className="mt-2 text-base font-semibold leading-6 text-white group-hover:text-gray-300 text-center cursor-pointer line-clamp-2">
                                    {certificate.certificate_name}
                                </h3>
                                <p className="mt-2 text-sm font-light italic leading-6 text-white group-hover:text-gray-300 text-center cursor-pointer">
                                    {certificate.certificate_instructors}
                                </p>
                            </div>
                            <div className="mt-2 flex items-center gap-x-4 text-xs justify-around pb-2">
                                <time dateTime={certificate.certificate_date} className="text-gray-300">
                                    {new Date(`${certificate.certificate_date}T00:00:00`).toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </article>
                    );
                })
            }
        </div>
    );
};
