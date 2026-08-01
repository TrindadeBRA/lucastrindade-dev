"use client";

import { Certificate } from "@/pages/api/sectionCertificates";
import Image from "next/image";
import { useState } from "react";
import ContentCarrosel from "./ContentCarrosel";
import ContentGrid from "./ContentGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";

export default function Certificates(certificateData: Certificate[]) {
  const sectionRef = useScrollReveal();
  const [showModal, setShowModal] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState("");

  const openModal = (imageUrl: string) => {
    setShowImageUrl(imageUrl);
    setShowModal(true);
    document.body.classList.add("overflow-hidden");

    requestAnimationFrame(() => {
      registerGsap();
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".certificate-modal-image",
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    });
  };

  const closeModal = () => {
    const finish = () => {
      setShowModal(false);
      document.body.classList.remove("overflow-hidden");
    };

    registerGsap();
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    gsap.to(".certificate-modal-image", {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: finish,
    });
  };

  const toggleAll = (value: boolean) => {
    setShowAllCertificates(value);
    requestAnimationFrame(() => {
      registerGsap();
      ScrollTrigger.refresh();
    });
  };

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-800 to-gray-900 py-14 sm:py-20"
      id="certificados"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400" data-reveal="title">
            Estudos
          </h2>
          <h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            data-reveal="title"
          >
            Certificados
          </h2>
        </div>

        <div data-reveal="from-right">
          <ContentCarrosel
            certificateData={certificateData}
            openModal={openModal}
            setShowAllCertificates={toggleAll}
            showAllCertificates={showAllCertificates}
          />
        </div>
        {showAllCertificates && (
          <ContentGrid certificateData={certificateData} openModal={openModal} />
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative w-4/5 lg:w-3/5 2xl:w-2/6" onClick={(e) => e.stopPropagation()}>
            <Image
              src={showImageUrl}
              alt="Imagem"
              className="certificate-modal-image max-w-full"
              width={1024}
              height={720}
            />
            <button
              onClick={closeModal}
              className="absolute -right-8 -top-8 m-4 rounded-full bg-white p-2 text-gray-800 shadow-md"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
