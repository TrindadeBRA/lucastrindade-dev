import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealOptions = {
  once?: boolean;
};

/**
 * Scroll reveals scoped to a section.
 * data-reveal: title | item | card | from-left | from-right | clip | fade-up | line
 */
export function useScrollReveal(options: RevealOptions = {}) {
  const { once = true } = options;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!containerRef.current || prefersReducedMotion()) return;

      const root = containerRef.current;
      const toggle = once ? "play none none none" : "play none none reverse";

      gsap.utils.toArray<HTMLElement>("[data-reveal='title']", root).forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade-up']", root).forEach((el) => {
        gsap.from(el, {
          y: 72,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: toggle },
        });
      });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal='item']"), {
        start: "top 92%",
        once,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
      });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal='card']"), {
        start: "top 90%",
        once,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              stagger: 0.14,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-left']", root).forEach((el) => {
        gsap.from(el, {
          x: -64,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-right']", root).forEach((el) => {
        gsap.from(el, {
          x: 64,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='clip']", root).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 12% 12% 12% round 1.5rem)", scale: 1.08, opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            scale: 1,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: toggle },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='line']", root).forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top 75%",
              end: "bottom 30%",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub='parallax']", root).forEach((el) => {
        const speed = Number(el.dataset.speed || 0.15);
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
