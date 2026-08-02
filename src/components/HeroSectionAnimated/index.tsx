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
  const portraitStageRef = useTilt3D<HTMLDivElement>();
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.4);
  const ghostCtaRef = useMagnetic<HTMLAnchorElement>(0.3);

  const name = profileData?.user_name || "Lucas Trindade";
  // Posicionamento para recrutamento (independente do texto cru do Notion)
  const role = "Desenvolvedor Fullstack Senior";
  const bio = profileData?.user_bio || "";
  const avatar = profileData?.user_avatar_sync || profileData?.user_avatar || "";
  const words = name.split(" ");

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion()) return;

      const isMobile = window.innerWidth < 768;

      gsap.set([".hero-portrait-scroll", ".hero-portrait-flip"], {
        transformPerspective: isMobile ? 900 : 1400,
        transformOrigin: "center center",
        force3D: true,
      });

      const section = sectionRef.current;
      const flipDistance = () => window.innerHeight * (isMobile ? 0.84 : 1);

      gsap.to(".hero-portrait-scroll", {
        rotateY: 180,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${flipDistance()}`,
          scrub: true,
          fastScrollEnd: true,
        },
      });

      gsap.to(".hero-portrait-scroll", {
        y: isMobile ? 48 : 80,
        scale: isMobile ? 0.92 : 0.86,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (!isMobile) {
        gsap.to(".hero-scroll-dot", {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.1,
          ease: "sine.inOut",
        });

        gsap.to(".hero-content", {
          y: 56,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-portrait-media-scroll", {
          yPercent: 18,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-glow", {
          opacity: 0.05,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-x-clip bg-ink"
    >
      <div className="hero-glow pointer-events-none absolute -right-24 top-10 z-[1] h-[28rem] w-[28rem] rounded-full bg-white/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
      {ENABLE_GITHUB_BG ? <HeroGithubBg /> : null}

      <div className="site-container relative z-10 grid flex-1 items-center gap-8 py-10 sm:gap-12 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
        <div className="hero-content relative max-w-2xl self-center">
          <div className="mb-3 flex items-center gap-3 sm:mb-4">
            <Link
              href="https://www.linkedin.com/in/trindadebra/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-chalk-muted transition hover:text-white"
            >
              <FaLinkedin size={16} />
            </Link>
            <Link
              href="https://github.com/TrindadeBRA/"
              target="_blank"
              aria-label="GitHub"
              className="text-chalk-muted transition hover:text-white"
            >
              <FaGithub size={16} />
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              aria-label="WhatsApp"
              className="text-chalk-muted transition hover:text-white"
            >
              <FaWhatsapp size={16} />
            </Link>
          </div>

          <p className="hero-meta mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-chalk-muted sm:mb-5 sm:text-xs sm:tracking-[0.28em]">
            {role}
          </p>

          <h1 className="font-display text-[clamp(2rem,8.5vw,6rem)] font-semibold leading-[0.9] tracking-tighter2 text-chalk sm:text-[clamp(2.35rem,9vw,6rem)]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-word mr-[0.22em] last:mr-0">
                <span>{word}</span>
              </span>
            ))}
          </h1>

          {bio ? (
            <p className="hero-line mt-3 max-w-lg text-sm leading-relaxed text-chalk-muted line-clamp-3 sm:mt-6 sm:line-clamp-none sm:text-base lg:text-lg">
              {bio}
            </p>
          ) : null}

          <div className="mt-4 flex w-full gap-2.5 sm:mt-8 sm:w-auto sm:gap-3">
            <a
              ref={primaryCtaRef}
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta btn-primary inline-flex flex-1 items-center justify-center gap-2 px-4 py-2 text-xs hover:bg-white hover:text-ink sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <FaWhatsapp size={15} />
              Fale comigo
            </a>
            <Link
              ref={ghostCtaRef}
              href="/resume"
              target="_blank"
              className="hero-cta btn-ghost inline-flex flex-1 items-center justify-center px-4 py-2 text-xs hover:border-white/40 hover:text-white sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Ver currículo
            </Link>
          </div>
        </div>

        <div
          ref={portraitStageRef}
          className="hero-portrait-stage relative mx-auto w-[300px] max-w-full self-center [perspective:1400px] sm:w-full sm:max-w-[20rem] md:max-w-[23rem] lg:max-w-none"
        >
          <div className="hero-portrait-scroll md:will-change-transform md:[transform-style:preserve-3d]">
            <div className="hero-portrait-flip md:will-change-transform md:[transform-style:preserve-3d]">
            <div
              data-tilt-card
              className="hero-portrait relative mx-auto aspect-square w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-muted sm:aspect-[4/5] sm:rounded-[2rem] md:will-change-transform lg:max-h-[min(68svh,34rem)] lg:w-full"
            >
              <div className="hero-portrait-media absolute inset-0">
                <div className="hero-portrait-media-scroll absolute inset-0 md:inset-[-6%]">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={name}
                      fill
                      priority
                      className="object-cover object-[center_22%] md:object-center"
                      sizes="(max-width: 768px) 60vw, 40vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-ink-muted text-chalk-dim">
                      Foto
                    </div>
                  )}
                </div>
              </div>
              <div
                data-tilt-shine
                className="pointer-events-none absolute inset-0 z-[1] rounded-[1.5rem] opacity-0 sm:rounded-[2rem]"
              />
              <div className="pointer-events-none absolute inset-0 z-[2] rounded-[1.5rem] bg-gradient-to-t from-ink via-ink/50 to-transparent sm:rounded-[2rem]" />
              <div className="absolute inset-x-0 bottom-0 z-[3] px-4 pb-5 pt-12 sm:px-6 sm:pb-6 sm:pt-16">
                <div className="max-w-[19rem]">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-chalk sm:text-sm">
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
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-snug text-chalk">
                    <span className="font-medium text-chalk">Fundador</span>
                    <span className="text-chalk-dim" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href="https://thetrinityweb.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      TrinityWeb
                    </a>
                    <span className="text-chalk-dim" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href="https://kronuz.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      Kronuz
                    </a>
                    <span className="text-chalk-dim" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href="https://protagonizei.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      Protagonizei
                    </a>
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        className="hero-scroll absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 max-lg:!hidden lg:flex"
        aria-hidden="true"
        tabIndex={-1}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-chalk-dim">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="hero-scroll-dot h-1.5 w-1.5 rounded-full bg-chalk" />
        </span>
      </a>
    </section>
  );
}
