"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaExpand } from "react-icons/fa";
import { Certificate } from "@/pages/api/sectionCertificates";
import { getBadgeConfig } from "./getBadgeConfig";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type CertificateCardProps = {
  certificate: Certificate;
  onOpen: () => void;
};

export default function CertificateCard({ certificate, onOpen }: CertificateCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);
  const badge = getBadgeConfig(certificate.certificate_category);

  useGSAP(
    () => {
      registerGsap();
      const card = cardRef.current;
      const cta = ctaOverlayRef.current;
      if (!card || !cta) return;

      const media = card.querySelector<HTMLElement>(".cert-media");
      const ctaContent = cta.querySelector<HTMLElement>(".cert-cta-content");

      gsap.set(cta, { opacity: 0 });
      gsap.set(ctaContent, { y: 14, scale: 0.96, opacity: 0 });
      if (media) gsap.set(media, { filter: "grayscale(1)" });

      const enter = () => {
        if (prefersReducedMotion()) {
          gsap.set(cta, { opacity: 1 });
          gsap.set(ctaContent, { y: 0, scale: 1, opacity: 1 });
          if (media) gsap.set(media, { filter: "grayscale(0)", scale: 1 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(cta, { opacity: 1, duration: 0.35 }, 0)
          .to(ctaContent, { y: 0, scale: 1, opacity: 1, duration: 0.4 }, 0.05);

        if (media) {
          gsap.to(media, {
            filter: "grayscale(0)",
            scale: 1.06,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const leave = () => {
        if (prefersReducedMotion()) {
          gsap.set(cta, { opacity: 0 });
          gsap.set(ctaContent, { y: 14, scale: 0.96, opacity: 0 });
          if (media) gsap.set(media, { x: 0, y: 0, scale: 1, filter: "grayscale(1)" });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.inOut" } })
          .to(ctaContent, { y: 10, x: 0, scale: 0.96, opacity: 0, duration: 0.22 }, 0)
          .to(cta, { opacity: 0, duration: 0.28 }, 0.05);

        if (media) {
          gsap.to(media, {
            x: 0,
            y: 0,
            scale: 1,
            filter: "grayscale(1)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const onMove = (event: PointerEvent) => {
        if (prefersReducedMotion()) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        if (!media) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(media, {
          x: x * 8,
          y: y * 6,
          scale: 1.07,
          filter: "grayscale(0)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(ctaContent, {
          x: x * 10,
          y: y * 8,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      card.addEventListener("focus", enter);
      card.addEventListener("blur", leave);
      card.addEventListener("pointermove", onMove);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
        card.removeEventListener("focus", enter);
        card.removeEventListener("blur", leave);
        card.removeEventListener("pointermove", onMove);
      };
    },
    { scope: cardRef, dependencies: [certificate.certificate_id] }
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-ink text-left transition hover:border-white/30"
      data-reveal="card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-muted">
        {certificate.certificate_file_sync ? (
          <Image
            src={certificate.certificate_file_sync}
            alt={certificate.certificate_name}
            fill
            className="cert-media object-cover grayscale md:will-change-[filter,transform]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}

        <span className={`absolute left-3 top-3 z-20 ${badge.bgColor}`}>{badge.text}</span>

        <div
          ref={ctaOverlayRef}
          className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-[2px]"
        >
          <div className="cert-cta-content flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-chalk">
              <FaExpand size={14} />
            </span>
            <p className="mt-3 font-display text-sm font-semibold text-chalk">Ver certificado</p>
            <p className="mt-1 max-w-[12rem] text-[11px] leading-relaxed text-chalk-muted">
              Abrir visualização com detalhes e navegação
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 right-3 z-[7] rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[10px] text-chalk-muted backdrop-blur md:hidden">
          Toque para abrir
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-chalk">
          {certificate.certificate_name}
        </h3>
        <p className="mt-2 line-clamp-1 text-sm text-chalk-muted">
          {certificate.certificate_instructors}
        </p>
      </div>
    </button>
  );
}
