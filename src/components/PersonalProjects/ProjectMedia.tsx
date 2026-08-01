"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PersonalProject } from "@/pages/api/sectionsPersonalProjects";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type ProjectMediaProps = {
  project: PersonalProject;
  index: number;
};

export default function ProjectMedia({ project, index }: ProjectMediaProps) {
  const mediaRef = useRef<HTMLAnchorElement>(null);
  const idleOverlayRef = useRef<HTMLDivElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);

  const imageSrc = project.project_image_sync || project.project_image;
  const title = project.project_title || project.project_name;
  const href = project.project_url || "#";

  useGSAP(
    () => {
      registerGsap();
      const media = mediaRef.current;
      const idle = idleOverlayRef.current;
      const cta = ctaOverlayRef.current;
      if (!media || !idle || !cta) return;

      const img = media.querySelector<HTMLElement>("img");
      const idleContent = idle.querySelector<HTMLElement>(".project-idle-content");
      const ctaContent = cta.querySelector<HTMLElement>(".project-cta-content");

      gsap.set(idle, { opacity: 1 });
      gsap.set(cta, { opacity: 0 });
      gsap.set(ctaContent, { y: 14, scale: 0.96, opacity: 0 });

      const enter = () => {
        if (prefersReducedMotion()) {
          gsap.set(idle, { opacity: 0 });
          gsap.set(cta, { opacity: 1 });
          gsap.set(ctaContent, { y: 0, scale: 1, opacity: 1 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(idleContent, { y: 8, opacity: 0, duration: 0.22 }, 0)
          .to(idle, { opacity: 0, duration: 0.3 }, 0)
          .to(cta, { opacity: 1, duration: 0.35 }, 0.08)
          .to(ctaContent, { y: 0, scale: 1, opacity: 1, duration: 0.4 }, 0.1);

        if (img) {
          gsap.to(img, {
            scale: 1.04,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const leave = () => {
        if (prefersReducedMotion()) {
          gsap.set(idle, { opacity: 1 });
          gsap.set(cta, { opacity: 0 });
          gsap.set(ctaContent, { y: 14, x: 0, scale: 0.96, opacity: 0 });
          gsap.set(idleContent, { y: 0, opacity: 1 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.inOut" } })
          .to(ctaContent, { y: 10, x: 0, scale: 0.96, opacity: 0, duration: 0.22 }, 0)
          .to(cta, { opacity: 0, duration: 0.28 }, 0.05)
          .to(idle, { opacity: 1, duration: 0.35 }, 0.1)
          .fromTo(
            idleContent,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
            0.12
          );
      };

      const onMove = (event: PointerEvent) => {
        if (prefersReducedMotion()) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const rect = media.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(ctaContent, {
          x: x * 12,
          y: y * 8,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      media.addEventListener("mouseenter", enter);
      media.addEventListener("mouseleave", leave);
      media.addEventListener("focus", enter);
      media.addEventListener("blur", leave);
      media.addEventListener("pointermove", onMove);

      return () => {
        media.removeEventListener("mouseenter", enter);
        media.removeEventListener("mouseleave", leave);
        media.removeEventListener("focus", enter);
        media.removeEventListener("blur", leave);
        media.removeEventListener("pointermove", onMove);
      };
    },
    { scope: mediaRef, dependencies: [project.project_name, index] }
  );

  if (!imageSrc) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/10 bg-ink-muted text-chalk-dim lg:aspect-[21/9]">
        Sem imagem
      </div>
    );
  }

  return (
    <Link
      ref={mediaRef}
      href={href}
      target={project.project_url ? "_blank" : undefined}
      rel={project.project_url ? "noopener noreferrer" : undefined}
      className="project-media clip-frame relative block aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-ink-muted lg:aspect-[21/9]"
      data-reveal="clip"
      aria-label={`Abrir projeto ${title}`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover object-top will-change-[filter,transform]"
        sizes="(max-width: 1024px) 100vw, 55vw"
      />

      {/* Blur em degradê — topo no mobile (texto acima) / esquerda no desktop (texto ao lado) */}
      <div
        className="project-blur-edge inset-x-0 top-0 h-[50%] w-full lg:hidden"
        aria-hidden="true"
      >
        <span
          className="backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <span
          className="backdrop-blur-[8px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
          }}
        />
        <span
          className="backdrop-blur-[16px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 40%)",
          }}
        />
      </div>
      <div
        className="project-blur-edge inset-y-0 left-0 hidden h-full w-[46%] lg:block"
        aria-hidden="true"
      >
        <span
          className="backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black, transparent)",
            maskImage: "linear-gradient(to right, black, transparent)",
          }}
        />
        <span
          className="backdrop-blur-[8px]"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 70%)",
            maskImage: "linear-gradient(to right, black 0%, transparent 70%)",
          }}
        />
        <span
          className="backdrop-blur-[16px]"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 42%)",
            maskImage: "linear-gradient(to right, black 0%, transparent 42%)",
          }}
        />
      </div>

      {/* Overlay inicial */}
      <div
        ref={idleOverlayRef}
        className="pointer-events-none absolute inset-0 z-[5] flex items-end bg-gradient-to-t from-ink via-ink/45 to-transparent p-4 sm:p-5"
      >
        <div className="project-idle-content">
          <p className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
            Projeto {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-chalk sm:text-base">
            {title}
          </p>
          {project.project_name ? (
            <p className="mt-0.5 text-[11px] text-chalk-dim/90">{project.project_name}</p>
          ) : null}
        </div>
      </div>

      {/* Overlay hover — incentivo ao clique */}
      <div
        ref={ctaOverlayRef}
        className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]"
      >
        <div className="project-cta-content flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-chalk">
            <FaExternalLinkAlt size={13} />
          </span>
          <p className="mt-3 font-display text-sm font-semibold text-chalk">Ver projeto</p>
          <p className="mt-1 max-w-[14rem] text-[11px] leading-relaxed text-chalk-muted">
            Abrir em nova aba e conhecer o case
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-[7] rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[10px] text-chalk-muted backdrop-blur md:hidden">
        Toque para abrir
      </div>
    </Link>
  );
}
