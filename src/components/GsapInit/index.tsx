"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function GsapInit() {
  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth < 768;

    gsap.set(".scroll-progress", { scaleX: 0, transformOrigin: "left center" });

    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: isMobile ? true : 0.2,
      },
    });

    const header = document.querySelector("header");
    if (header) {
      let scrolled = false;
      ScrollTrigger.create({
        start: 12,
        onUpdate: (self) => {
          const next = self.scroll() > 24;
          if (next === scrolled) return;
          scrolled = next;
          header.classList.toggle("header-scrolled", next);
        },
      });
    }
  });

  useEffect(() => {
    registerGsap();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  return (
    <div
      className="scroll-progress fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-chalk"
      aria-hidden="true"
    />
  );
}
