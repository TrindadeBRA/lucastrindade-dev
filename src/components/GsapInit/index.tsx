"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function GsapInit() {
  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    gsap.set(".scroll-progress", { scaleX: 0, transformOrigin: "left center" });

    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
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
      className="scroll-progress fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-indigo-500 via-indigo-400 to-[#776fff]"
      aria-hidden="true"
    />
  );
}
