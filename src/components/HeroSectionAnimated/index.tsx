"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/pages/api/sectionProfile";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function HeroSectionAnimated(profileData: Profile) {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.35);
  const ghostCtaRef = useMagnetic<HTMLAnchorElement>(0.28);

  const name = profileData?.user_name || "Lucas Trindade";
  const role = profileData?.user_role || "Desenvolvedor Full Stack";
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
      gsap.set(".hero-portrait", { clipPath: "inset(16% 16% 16% 16% round 2rem)", opacity: 0 });

      tl.from(".hero-meta", { y: 18, opacity: 0, duration: 0.5 })
        .to(
          ".hero-word > span",
          {
            yPercent: 0,
            duration: isMobile ? 0.7 : 0.95,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.1"
        )
        .from(".hero-line", { y: 24, opacity: 0, duration: 0.65 }, "-=0.3")
        .from(".hero-cta", { y: 18, opacity: 0, stagger: 0.07, duration: 0.5 }, "-=0.3")
        .to(
          ".hero-portrait",
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.8"
        );

      if (!isMobile) {
        gsap.to(".hero-portrait-media", {
          yPercent: 12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden bg-surface-base pt-10 sm:pt-14">
      <div className="site-container grid min-h-[calc(100svh-8rem)] items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div className="relative z-10 max-w-2xl">
          <p className="hero-meta font-display text-base font-semibold text-content-primary">{role}</p>

          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-content-primary sm:text-5xl lg:text-6xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="hero-word mr-[0.22em] last:mr-0">
                <span>{word}</span>
              </span>
            ))}
          </h1>

          {bio ? (
            <p className="hero-line mt-6 max-w-xl text-base text-content-secondary sm:text-xl">
              {bio}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={primaryCtaRef}
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta btn-primary"
            >
              <span>Fale comigo</span>
            </a>
            <Link ref={ghostCtaRef} href="/resume" target="_blank" className="hero-cta btn-outline">
              Ver currículo
            </Link>
            <div className="hero-cta ml-1 flex items-center gap-3 pl-1">
              <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="text-content-tertiary transition hover:text-content-primary" size={18} />
              </Link>
              <Link href="https://github.com/TrindadeBRA/" target="_blank" aria-label="GitHub">
                <FaGithub className="text-content-tertiary transition hover:text-content-primary" size={18} />
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=5511952498126"
                target="_blank"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-content-tertiary transition hover:text-content-primary" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-portrait relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-surface-muted lg:max-w-none">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              fill
              priority
              className="hero-portrait-media object-cover"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-content-muted">Foto</div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/50 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-display text-sm font-medium text-content-inverse">
              {profileData?.user_title || "Full Stack Developer"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
