"use client";

import { useState } from "react";
import { Certificate } from "@/pages/api/sectionCertificates";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import CertificateCard from "./CertificateCard";
import CertificateViewer from "./CertificateViewer";

export default function Certificates(
  certificateData: Certificate[] | Record<string, Certificate>
) {
  const sectionRef = useScrollReveal();
  const certificates = asList(certificateData);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? certificates : certificates.slice(0, 6);

  const openAt = (certificate: Certificate) => {
    const index = certificates.findIndex(
      (item) => item.certificate_id === certificate.certificate_id
    );
    setActiveIndex(index >= 0 ? index : 0);
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
              onOpen={() => openAt(certificate)}
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

      {activeIndex !== null ? (
        <CertificateViewer
          certificates={certificates}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </section>
  );
}
