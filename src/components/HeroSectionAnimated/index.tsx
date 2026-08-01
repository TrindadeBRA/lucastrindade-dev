"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/pages/api/sectionProfile";
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useTilt3D } from "@/hooks/useTilt3D";
import HeroGithubBg from "@/components/HeroGithubBg";

/** Liga o grid de contribuições do GitHub como bg do hero. */
const ENABLE_GITHUB_BG = false;

export default function HeroSectionAnimated(profileData: Profile) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitStageRef = useTilt3D<HTMLDivElement>({
    maxTilt: 16,
    idle: true,
    listenSelector: "#hero",
    mediaSelector: ".hero-portrait-media",
  });
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.4);
  const ghostCtaRef = useMagnetic<HTMLAnchorElement>(0.3);

  const name = profileData?.user_name || "Lucas Trindade";
  // Posicionamento para recrutamento (independente do texto cru do Notion)
  const role = "Full Stack Tech Lead";
  const bio = profileData?.user_bio || "";
  const avatar = profileData?.user_avatar_sync || profileData?.user_avatar || "";
  const words = name.split(" ");

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion()) return;

      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".hero-word > span", { yPercent: 110 });
      gsap.set(".hero-portrait", { clipPath: "inset(18% 18% 18% 18% round 2rem)", opacity: 0 });

      tl.from(".hero-meta", { y: 20, opacity: 0, duration: 0.55 })
        .to(
          ".hero-word > span",
          {
            yPercent: 0,
            duration: isMobile ? 0.7 : 0.95,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.15"
        )
        .from(".hero-line", { y: 28, opacity: 0, duration: 0.7 }, "-=0.35")
        .from(".hero-cta", { y: 22, opacity: 0, stagger: 0.08, duration: 0.55 }, "-=0.35")
        .to(
          ".hero-portrait",
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.85"
        )
        .from(".hero-scroll", { opacity: 0, y: 10, duration: 0.5 }, "-=0.4");

      gsap.to(".hero-scroll-dot", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
      });

      gsap.to(".hero-content", {
        y: isMobile ? 24 : 56,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll em wrapper separado — não disputa o tilt do mouse no card
      gsap.to(".hero-portrait-scroll", {
        y: isMobile ? 36 : 72,
        rotateX: isMobile ? 4 : 10,
        rotateY: isMobile ? -2 : -6,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-portrait-media", {
        yPercent: isMobile ? 12 : 22,
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-glow", {
        opacity: 0.05,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden bg-ink"
    >
      <div className="hero-glow pointer-events-none absolute -right-24 top-10 z-[1] h-[28rem] w-[28rem] rounded-full bg-white/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
      {ENABLE_GITHUB_BG ? <HeroGithubBg /> : null}

      <div className="site-container relative z-10 grid flex-1 items-center gap-10 py-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-12 lg:pb-24">
        <div className="hero-content relative max-w-2xl">
          <p className="hero-meta mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-chalk-muted">
            {role}
          </p>

          <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.9] tracking-tighter2 text-chalk">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-word mr-[0.22em] last:mr-0">
                <span>{word}</span>
              </span>
            ))}
          </h1>

          {bio ? (
            <p className="hero-line mt-6 max-w-lg text-base leading-relaxed text-chalk-muted sm:text-lg">
              {bio}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={primaryCtaRef}
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta btn-primary inline-flex items-center gap-2 hover:bg-white hover:text-ink"
            >
              <FaWhatsapp size={16} />
              Fale comigo
            </a>
            <Link
              ref={ghostCtaRef}
              href="/resume"
              target="_blank"
              className="hero-cta btn-ghost hover:border-white/40 hover:text-white"
            >
              Ver currículo
            </Link>
            <div className="hero-cta ml-1 flex items-center gap-3 pl-2">
              <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="text-chalk-muted transition hover:text-white" size={18} />
              </Link>
              <Link href="https://github.com/TrindadeBRA/" target="_blank" aria-label="GitHub">
                <FaGithub className="text-chalk-muted transition hover:text-white" size={18} />
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=5511952498126"
                target="_blank"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-chalk-muted transition hover:text-white" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={portraitStageRef}
          className="hero-portrait-stage relative mx-auto w-full max-w-sm lg:max-w-none"
          style={{ perspective: 1400 }}
        >
          <div
            className="hero-portrait-scroll will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              data-tilt-card
              className="hero-portrait relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-ink-muted will-change-transform lg:max-h-[min(68svh,34rem)] lg:w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  priority
                  className="hero-portrait-media object-cover grayscale will-change-transform"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ink-muted text-chalk-dim">
                  Foto
                </div>
              )}
              <div
                data-tilt-shine
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-soft-light"
              />
              <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-95" />
              <div
                className="absolute inset-x-0 bottom-0 z-[3] px-5 pb-5 pt-16 sm:px-6 sm:pb-6"
                style={{ transform: "translateZ(36px)" }}
              >
                <div className="max-w-[19rem]">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-chalk-muted sm:text-sm">
                    <a
                      href="https://www.google.com/maps/place/Mogi+Mirim,+SP"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver localização no Google Maps"
                      title="Localização"
                      className="inline-flex items-center gap-1.5 transition hover:text-white"
                    >
                      <FaMapMarkerAlt size={12} className="opacity-80" />
                      <span>SP, Brasil</span>
                    </a>
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-snug text-chalk-dim">
                    <span>Fundador</span>
                    <span aria-hidden="true">·</span>
                    <a
                      href="https://thetrinityweb.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chalk-muted underline decoration-white/20 underline-offset-2 transition hover:text-white hover:decoration-white/50"
                    >
                      TrinityWeb
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href="https://kronuz.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chalk-muted underline decoration-white/20 underline-offset-2 transition hover:text-white hover:decoration-white/50"
                    >
                      Kronuz
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href="https://protagonizei.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chalk-muted underline decoration-white/20 underline-offset-2 transition hover:text-white hover:decoration-white/50"
                    >
                      Protagonizei
                    </a>
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {["Next.js", "React", "Node"].map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-chalk"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        className="hero-scroll absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-chalk-dim">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="hero-scroll-dot h-1.5 w-1.5 rounded-full bg-chalk" />
        </span>
      </a>
    </section>
  );
}
