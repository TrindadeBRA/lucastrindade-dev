import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealOptions = {
  once?: boolean;
};

/**
 * Scroll reveals scoped to a section.
 * data-reveal: title | item | card | from-left | from-right | clip | fade-up | line
 * No mobile: motion bem mais leve (sem blur / slides largos) para manter fluidez no touch.
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
      const isMobile = window.innerWidth < 768;
      const yTitle = isMobile ? 18 : 56;
      const yFade = isMobile ? 22 : 72;
      const yItem = isMobile ? 16 : 36;
      const yCard = isMobile ? 24 : 80;
      const xSlide = isMobile ? 18 : 64;
      const duration = isMobile ? 0.55 : 1;

      gsap.utils.toArray<HTMLElement>("[data-reveal='title']", root).forEach((el) => {
        gsap.from(el, {
          y: yTitle,
          opacity: 0,
          ...(isMobile ? {} : { filter: "blur(8px)" }),
          duration,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade-up']", root).forEach((el) => {
        gsap.from(el, {
          y: yFade,
          opacity: 0,
          duration: isMobile ? 0.6 : 1.05,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: toggle },
        });
      });

      ScrollTrigger.batch(root.querySelectorAll("[data-reveal='item']"), {
        start: "top 94%",
        once,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: yItem, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.45 : 0.7,
              stagger: isMobile ? 0.04 : 0.06,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform,opacity",
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
            { y: yCard, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.5 : 0.95,
              stagger: isMobile ? 0.08 : 0.14,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform,opacity",
            }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-left']", root).forEach((el) => {
        gsap.from(el, {
          x: -xSlide,
          opacity: 0,
          duration,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='from-right']", root).forEach((el) => {
        gsap.from(el, {
          x: xSlide,
          opacity: 0,
          duration,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: toggle },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='clip']", root).forEach((el) => {
        if (isMobile) {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: toggle },
          });
          return;
        }

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
            ease: isMobile ? "power2.out" : "none",
            duration: isMobile ? 0.8 : undefined,
            scrollTrigger: isMobile
              ? {
                  trigger: el.parentElement || el,
                  start: "top 80%",
                  toggleActions: "play none none none",
                }
              : {
                  trigger: el.parentElement || el,
                  start: "top 75%",
                  end: "bottom 30%",
                  scrub: 0.6,
                },
          }
        );
      });

      // Parallax scrub só no desktop — no mobile custa FPS e quebra fluidez
      if (!isMobile) {
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
      }
    },
    { scope: containerRef }
  );

  return containerRef;
}
