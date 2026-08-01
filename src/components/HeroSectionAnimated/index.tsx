"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Profile } from "@/pages/api/sectionProfile";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import Link from "next/link";
import Waves from "../Waves";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function HeroSectionAnimated(profileData: Profile) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion()) return;

      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isMobile) {
        tl.from(".hero-bg-layer", { opacity: 0, duration: 0.8 })
          .from(".hero-avatar", { y: 28, opacity: 0, duration: 0.65 }, "-=0.4")
          .from(
            ".hero-social a, .hero-role, .hero-name, .hero-bio, .hero-scroll-hint",
            { y: 18, opacity: 0, stagger: 0.06, duration: 0.5 },
            "-=0.3"
          );
      } else {
        tl.from(".hero-bg-layer", {
          scale: 1.12,
          opacity: 0,
          duration: 1.6,
          ease: "power2.out",
        })
          .from(".hero-avatar", { x: -56, opacity: 0, duration: 1 }, "-=1.1")
          .from(
            ".hero-social a",
            { y: -16, opacity: 0, stagger: 0.08, duration: 0.5 },
            "-=0.6"
          )
          .from(".hero-role", { y: 28, opacity: 0, duration: 0.7 }, "-=0.45")
          .from(".hero-name", { y: 40, opacity: 0, duration: 0.85 }, "-=0.5")
          .from(".hero-bio", { y: 28, opacity: 0, duration: 0.75 }, "-=0.55")
          .from(".hero-scroll-hint", { y: 12, opacity: 0, duration: 0.6 }, "-=0.35");

        gsap.to(".hero-bg-layer", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-content", {
          y: 40,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.to(".hero-scroll-hint", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1.2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
      id="hero"
    >
      <div
        className="hero-bg-layer absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/bg-profile.webp")' }}
      />

      <div className="absolute inset-0 z-0 opacity-20">
        <Waves
          lineColor="#7782e5"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={350}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="hero-content relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
          aria-hidden="true"
        >
          <div
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center md:flex-row">
          <Image
            className="hero-avatar gsap-will-change mb-6 aspect-[4/5] w-52 flex-none rounded-2xl object-cover md:mb-0 md:mr-12"
            src={profileData.user_avatar_sync}
            alt={profileData.user_name}
            width={800}
            height={800}
            priority
          />

          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <div className="hero-social flex justify-center gap-4 md:justify-start">
              <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank">
                <FaLinkedin className="mb-1 text-white transition-colors hover:text-indigo-300" size={18} />
              </Link>
              <Link href="https://github.com/TrindadeBRA/" target="_blank">
                <FaGithub className="mb-1 text-white transition-colors hover:text-indigo-300" size={18} />
              </Link>
              <Link href="https://api.whatsapp.com/send?phone=5511952498126" target="_blank">
                <FaWhatsapp className="mb-1 text-white transition-colors hover:text-indigo-300" size={18} />
              </Link>
            </div>
            <h2 className="hero-role mt-2 text-center text-base font-semibold leading-8 text-indigo-400 md:text-left">
              {profileData.user_role}
            </h2>
            <p className="hero-name mt-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-left">
              {profileData.user_name}
            </p>
            <p className="hero-bio mt-6 text-center text-base leading-6 text-gray-300 md:text-left">
              {profileData.user_bio}
            </p>
          </div>
        </div>

        <a
          href="#apresentacao"
          className="hero-scroll-hint mx-auto mt-16 flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-indigo-300"
        >
          <span>Scroll</span>
          <span aria-hidden="true" className="text-lg leading-none">
            ↓
          </span>
        </a>
      </div>
    </div>
  );
}
