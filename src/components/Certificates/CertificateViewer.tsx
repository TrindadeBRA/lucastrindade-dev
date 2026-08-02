"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Certificate } from "@/pages/api/sectionCertificates";
import { getBadgeConfig } from "./getBadgeConfig";
import { formatCertificateDate, formatDaysAgo } from "./formatCertificateDate";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

type CertificateViewerProps = {
  certificates: Certificate[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export default function CertificateViewer({
  certificates,
  index,
  onIndexChange,
  onClose,
}: CertificateViewerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const current = certificates[index];
  const total = certificates.length;
  const badge = current ? getBadgeConfig(current.certificate_category) : null;
  const dateLabel = formatCertificateDate(current?.certificate_date);
  const daysAgoLabel = formatDaysAgo(current?.certificate_date);

  const goTo = useCallback(
    (next: number) => {
      if (!total) return;
      onIndexChange((next + total) % total);
    },
    [onIndexChange, total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    registerGsap();
    document.body.classList.add("overflow-hidden");
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { opacity: 1 });
      return () => document.body.classList.remove("overflow-hidden");
    }

    gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(
      ".cert-viewer-panel",
      { y: 24, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.05 }
    );

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (!current || prefersReducedMotion()) return;
    registerGsap();
    const media = mediaRef.current;
    const info = infoRef.current;
    if (!media || !info) return;

    gsap.fromTo(
      media,
      { opacity: 0, scale: 0.98, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: "power3.out" }
    );
    gsap.fromTo(
      info,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.32, ease: "power3.out", delay: 0.04 }
    );

    const activeThumb = thumbsRef.current?.querySelector<HTMLElement>("[data-active='true']");
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index, current]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose]);

  const handleClose = () => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(root, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!current || typeof document === "undefined") return null;

  const imageSrc = current.certificate_file_sync || current.certificate_file;

  return createPortal(
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/92 sm:items-center sm:p-4 md:p-6"
      style={{
        paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(0.5rem, env(safe-area-inset-left))",
        paddingRight: "max(0.5rem, env(safe-area-inset-right))",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificado: ${current.certificate_name}`}
      onClick={handleClose}
    >
      <div
        className="cert-viewer-panel relative flex h-[min(94svh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-soft shadow-2xl shadow-black/50 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-chalk-dim">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-chalk transition hover:border-white/35 hover:text-white"
            aria-label="Fechar"
          >
            <FaTimes size={12} />
            <span className="sm:inline">Fechar</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="grid lg:grid-cols-[1.35fr_0.65fr] lg:min-h-full">
            <div
              className="relative flex items-center justify-center bg-ink p-3 sm:p-5 lg:p-6"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                ref={mediaRef}
                className="relative aspect-[4/3] w-full max-h-[min(42svh,360px)] overflow-hidden rounded-2xl border border-white/10 bg-ink-muted sm:max-h-[min(52svh,480px)] lg:max-h-[min(62svh,560px)]"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={current.certificate_name}
                    fill
                    className="object-contain bg-ink"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-chalk-dim">
                    Sem imagem
                  </div>
                )}
              </div>

              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/85 text-chalk backdrop-blur transition hover:border-white/40 hover:text-white sm:left-4 sm:h-11 sm:w-11"
                    aria-label="Certificado anterior"
                  >
                    <FaChevronLeft size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/85 text-chalk backdrop-blur transition hover:border-white/40 hover:text-white sm:right-4 sm:h-11 sm:w-11"
                    aria-label="Próximo certificado"
                  >
                    <FaChevronRight size={13} />
                  </button>
                </>
              ) : null}
            </div>

            <aside
              ref={infoRef}
              className="flex flex-col justify-between border-t border-white/10 p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-7"
            >
              <div>
                {badge ? (
                  <span
                    className={badge.bgColor}
                  >
                    {badge.text}
                  </span>
                ) : null}

                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-chalk sm:mt-4 sm:text-2xl lg:text-3xl">
                  {current.certificate_name}
                </h3>

                <dl className="mt-5 grid gap-4 text-sm sm:mt-6 sm:gap-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                      Instrutor / instituição
                    </dt>
                    <dd className="mt-1 break-words text-chalk-muted">
                      {current.certificate_instructors || "—"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                        Conclusão
                      </dt>
                      <dd className="mt-1 font-medium text-chalk">
                        {dateLabel || "—"}
                        {daysAgoLabel ? (
                          <span className="mt-0.5 block text-xs font-normal text-chalk-dim">
                            {daysAgoLabel}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                        Categoria
                      </dt>
                      <dd className="mt-1 text-chalk-muted">
                        {current.certificate_category || "—"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <p className="mt-6 text-xs text-chalk-dim lg:mt-8">
                <span className="sm:hidden">Deslize a imagem ou use as setas · </span>
                <span className="hidden sm:inline">Use ← → para navegar · </span>
                Esc para fechar
              </p>
            </aside>
          </div>
        </div>

        {total > 1 ? (
          <div className="shrink-0 border-t border-white/10 px-3 py-2.5 sm:px-5 sm:py-3">
            <div
              ref={thumbsRef}
              className="flex gap-2 overflow-x-auto overscroll-x-contain pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {certificates.map((cert, i) => {
                const src = cert.certificate_file_sync || cert.certificate_file;
                const active = i === index;
                return (
                  <button
                    key={cert.certificate_id || i}
                    type="button"
                    data-active={active ? "true" : "false"}
                    onClick={() => onIndexChange(i)}
                    className={[
                      "relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border transition sm:h-20 sm:w-28",
                      active
                        ? "border-white/60 ring-1 ring-white/30"
                        : "border-white/10 opacity-55 hover:opacity-90",
                    ].join(" ")}
                    aria-label={`Ver ${cert.certificate_name}`}
                    aria-current={active ? "true" : undefined}
                  >
                    {src ? (
                      <Image 
                        src={src} 
                        alt={`Miniatura do certificado ${cert.certificate_name}`} 
                        fill 
                        className="object-cover" 
                        sizes="112px" 
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center bg-ink-muted text-[10px] text-chalk-dim">
                        —
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
