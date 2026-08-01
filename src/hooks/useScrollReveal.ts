import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealOptions = {
  once?: boolean;
};

/**
 * Scroll reveals scoped to a section container.
 * Markers: data-reveal="title" | "item" | "card" | "from-left" | "from-right"
 */
export function useScrollReveal(options: RevealOptions = {}) {
  const { once = true } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!containerRef.current || prefersReducedMotion()) return;

      const root = containerRef.current;

      gsap.utils.toArray<HTMLElement>("[data-reveal='title']", root).forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal='item']"), {
        start: "top 90%",
        once,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
      });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal='card']"), {
        start: "top 92%",
        once,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 60, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-left']", root).forEach((el) => {
        gsap.from(el, {
          x: -48,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-right']", root).forEach((el) => {
        gsap.from(el, {
          x: 48,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
