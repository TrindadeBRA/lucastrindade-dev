"use client";

import Image from "next/image";
import { useRef } from "react";
import { Certificate } from "@/pages/api/sectionCertificates";
import { getBadgeConfig } from "./getBadgeConfig";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type CertificateCardProps = {
  certificate: Certificate;
  onOpen: (url: string) => void;
};

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function CertificateCard({ certificate, onOpen }: CertificateCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badge = getBadgeConfig(certificate.certificate_category);
  const dateLabel = formatDate(certificate.certificate_date);

  useGSAP(
    () => {
      registerGsap();
      const card = cardRef.current;
      const overlay = overlayRef.current;
      if (!card || !overlay) return;

      const dateEl = overlay.querySelector<HTMLElement>(".cert-date");
      const media = card.querySelector<HTMLElement>(".cert-media");

      gsap.set(overlay, { yPercent: 110, opacity: 0 });
      if (dateEl) gsap.set(dateEl, { y: 16, opacity: 0 });

      const enter = () => {
        if (prefersReducedMotion()) {
          gsap.set(overlay, { yPercent: 0, opacity: 1 });
          if (dateEl) gsap.set(dateEl, { y: 0, opacity: 1 });
          return;
        }
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(overlay, { yPercent: 0, opacity: 1, duration: 0.45 })
          .to(dateEl, { y: 0, opacity: 1, duration: 0.35 }, "-=0.2");
      };

      const leave = () => {
        if (prefersReducedMotion()) {
          gsap.set(overlay, { yPercent: 110, opacity: 0 });
          if (dateEl) gsap.set(dateEl, { y: 16, opacity: 0, x: 0 });
          if (media) gsap.set(media, { x: 0, y: 0, scale: 1 });
          return;
        }
        gsap
          .timeline({ defaults: { ease: "power3.inOut" } })
          .to(dateEl, { y: 12, opacity: 0, duration: 0.2 })
          .to(overlay, { yPercent: 110, opacity: 0, duration: 0.35 }, "-=0.05");
        if (media) {
          gsap.to(media, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        if (dateEl) gsap.set(dateEl, { x: 0 });
      };

      const onMove = (event: PointerEvent) => {
        if (prefersReducedMotion()) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        if (dateEl) {
          gsap.to(dateEl, {
            x: x * 18,
            y: y * 10,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        if (media) {
          gsap.to(media, {
            x: x * 8,
            y: y * 6,
            scale: 1.06,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
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
      onClick={() => {
        if (certificate.certificate_file_sync) onOpen(certificate.certificate_file_sync);
      }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-ink text-left transition hover:border-white/30"
      data-reveal="card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-muted" data-reveal="clip">
        {certificate.certificate_file_sync ? (
          <Image
            src={certificate.certificate_file_sync}
            alt={certificate.certificate_name}
            fill
            className="cert-media object-cover will-change-transform"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}

        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold ${badge.bgColor}`}
        >
          {badge.text}
        </span>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-[5] flex items-end bg-gradient-to-t from-ink via-ink/70 to-transparent p-4"
        >
          <div className="cert-date">
            <p className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">Conclusão</p>
            <p className="mt-1 font-display text-sm font-semibold text-chalk">
              {dateLabel || "Data indisponível"}
            </p>
          </div>
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
