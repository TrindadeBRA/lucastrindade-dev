"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Profile } from "@/pages/api/sectionProfile";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function Presentation(profileData: Profile) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const paragraphs =
    profileData?.user_presentation?.[0]?.plain_text
      ?.split("\n")
      .map((p: string) => p.trim())
      .filter(Boolean) || [];

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || prefersReducedMotion()) return;

      const isMobile = window.innerWidth < 768;

      gsap.from(".about-heading > *", {
        y: isMobile ? 18 : 36,
        opacity: 0,
        stagger: 0.08,
        duration: isMobile ? 0.55 : 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
        },
      });

      if (isMobile) {
        gsap.from(".about-mobile p", {
          y: 22,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        });
        return;
      }

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        ".about-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
            scrub: true,
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [paragraphs.join("|")],
    }
  );

  const paragraphClassName =
    "max-w-2xl text-lg leading-8 text-chalk-muted sm:text-xl sm:leading-9";

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden border-t border-white/5 bg-ink"
    >
      <div className="relative flex min-h-[100svh] flex-col justify-center py-24 sm:py-32">
        <div className="site-container">
          <div className="about-heading max-w-xl">
            <p className="section-label">Sobre</p>
            <h2 className="section-title mt-4">Um pouco sobre mim</h2>
            <div className="mt-8 h-px w-16 origin-left bg-chalk" />
            <div className="mt-8 flex w-full gap-2.5 sm:w-auto sm:gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=5511952498126"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex flex-1 items-center justify-center gap-2 px-4 py-2 text-xs hover:bg-white hover:text-ink sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <FaWhatsapp size={15} />
                Fale comigo
              </a>
              <Link
                href="/resume"
                target="_blank"
                className="btn-ghost inline-flex flex-1 items-center justify-center px-4 py-2 text-xs hover:border-white/40 hover:text-white sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Ver currículo
              </Link>
            </div>
          </div>
          <div className="mt-10 hidden h-px w-full overflow-hidden bg-white/10 md:block">
            <div className="about-progress h-px origin-left scale-x-0 bg-chalk" />
          </div>
        </div>

        <div className="about-mobile site-container mt-12 space-y-8 md:hidden">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className={paragraphClassName}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-chalk-muted">Conteúdo de apresentação em breve.</p>
          )}
        </div>

        <div
          ref={trackRef}
          className="about-track mt-16 hidden w-max will-change-transform md:flex md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className={`${paragraphClassName} w-[min(52vw,36rem)] shrink-0 pr-20`}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className={`${paragraphClassName} pr-20`}>
              Conteúdo de apresentação em breve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
