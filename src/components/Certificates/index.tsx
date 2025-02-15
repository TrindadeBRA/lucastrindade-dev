import { Certificate } from '@/pages/api/sectionCertificates';
import Image from 'next/image';
import { useState } from 'react';
import ContentCarrosel from './ContentCarrosel';
import ContentGrid from './ContentGrid';

export default function Certificates(certificateData: Certificate[]) {

  const [showModal, setShowModal] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
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
    <div className="bg-gradient-to-b from-gray-800 to-gray-900  py-14 sm:py-20" id="certificados">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600" data-aos="fade-right">Estudos</h2>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" data-aos="fade-right">Certificados</h2>
        </div>

        <ContentCarrosel
          certificateData={certificateData}
          openModal={openModal}
          setShowAllCertificates={setShowAllCertificates}
          showAllCertificates={showAllCertificates}
        />
        {
          showAllCertificates && (
            <ContentGrid certificateData={certificateData} openModal={openModal} />
          )
        }
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div
            className="w-4/5 lg:w-3/5 2xl:w-2/6 relative"
            onClick={(e) => e.stopPropagation()}
          >
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
