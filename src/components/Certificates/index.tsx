"use client";

import Image from "next/image";
import { useState } from "react";
import { Certificate } from "@/pages/api/sectionCertificates";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import CertificateCard from "./CertificateCard";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export default function Certificates(
  certificateData: Certificate[] | Record<string, Certificate>
) {
  const sectionRef = useScrollReveal();
  const certificates = asList(certificateData);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? certificates : certificates.slice(0, 6);

  const openModal = (url: string) => {
    setImageUrl(url);
    setShowModal(true);
    document.body.classList.add("overflow-hidden");
    requestAnimationFrame(() => {
      registerGsap();
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".certificate-modal-image",
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" }
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
      opacity: 0,
      duration: 0.18,
      onComplete: finish,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="estudos"
      className="border-t border-white/5 bg-ink-soft py-24 sm:py-32"
    >
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Estudos
          </p>
          <h2 className="section-title mt-4" data-reveal="title">
            Certificados & formação
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((certificate) => (
            <CertificateCard
              key={certificate.certificate_id}
              certificate={certificate}
              onOpen={openModal}
            />
          ))}
        </div>

        {certificates.length > 6 ? (
          <div className="mt-10 flex justify-center" data-reveal="item">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="btn-ghost"
            >
              {expanded ? "Mostrar menos" : `Ver todos (${certificates.length})`}
            </button>
          </div>
        ) : null}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imageUrl}
              alt="Certificado"
              width={1200}
              height={850}
              className="certificate-modal-image h-auto w-full rounded-xl"
            />
            <button
              onClick={closeModal}
              className="absolute -top-3 right-0 rounded-full bg-chalk px-3 py-1 text-sm font-semibold text-ink"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
