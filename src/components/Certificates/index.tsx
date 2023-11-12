import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Certificates(certificateData: Certificate[]) {

  const [showModal, setShowModal] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState('');

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
    <div className="bg-gray-900 py-14 sm:py-20" id="certificados">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Estudos</h2>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Certificados</h2>
          <p className="mt-2 text-lg leading-8 text-gray-300 hidden">Learn how to grow your business with our expert advice.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {Object.values(certificateData).map((certificate: Certificate) => (
            <article key={certificate.certificate_id} className="flex flex-col items-start justify-between cursor-pointer bg-gray-800 hover:bg-gray-700 py-5 px-5 rounded-3xl shadow-md shadow-gray-600" onClick={() => openModal(certificate.certificate_file)}>
              <div className="relative w-full cursor-pointer mb-5">
                <Image width={1024} height={720} src={certificate.certificate_file} alt="" className="w-full rounded-2xl bg-gray-100 object-cover cursor-pointer" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
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
                    {new Date(certificate.certificate_date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="w-4/5 lg:w-3/5 2xl:w-2/6 relative">
            <Image src={showImageUrl} alt="Imagem" className="max-w-full" width={1024} height={720} />
            <button onClick={closeModal} className="absolute -top-8 -right-8 m-4 p-2 rounded-full bg-white text-gray-800 shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};