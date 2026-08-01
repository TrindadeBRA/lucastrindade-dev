import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type UseTilt3DOptions = {
  mediaSelector?: string;
  triggerSelector?: string;
};

export function useTilt3D<T extends HTMLElement = HTMLElement>(
  options: UseTilt3DOptions = {}
) {
  const {
    mediaSelector = ".hero-portrait-media",
    triggerSelector = "#hero",
  } = options;
  const stageRef = useRef<T>(null);

  useGSAP(
    () => {
      registerGsap();
      const stage = stageRef.current;
      if (!stage || prefersReducedMotion()) return;

      const card =
        stage.querySelector<HTMLElement>("[data-tilt-card]") ||
        (stage.firstElementChild as HTMLElement | null);
      if (!card) return;

      const media = stage.querySelector<HTMLElement>(mediaSelector);
      const isMobile = window.innerWidth < 768;

      gsap.set(card, {
        transformOrigin: "center center",
        force3D: true,
      });
      if (media) {
        gsap.set(media, { force3D: true, scale: isMobile ? 1.03 : 1.06 });
      }

      let idleTween: gsap.core.Timeline | null = null;
      let scrolling = false;

      const stopIdle = () => {
        idleTween?.kill();
        idleTween = null;
        gsap.set(card, { rotationX: 0, rotationY: 0, scale: 1 });
        if (media) gsap.set(media, { x: 0, y: 0 });
      };

      const startIdle = () => {
        if (idleTween || scrolling) return;

        idleTween = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut" },
        });

        const tilt = isMobile ? 3.5 : 7;

        idleTween
          .to(card, {
            rotationY: tilt,
            rotationX: -tilt * 0.45,
            scale: 1.012,
            duration: 2.8,
          })
          .to(card, {
            rotationY: -tilt * 0.85,
            rotationX: tilt * 0.35,
            scale: 1.006,
            duration: 3,
          })
          .to(card, {
            rotationY: tilt * 0.4,
            rotationX: -tilt * 0.22,
            scale: 1.01,
            duration: 2.5,
          });

        if (media) {
          const mx = isMobile ? 4 : 8;
          const my = isMobile ? 3 : 6;
          idleTween.to(media, { x: mx, y: -my, duration: 2.8 }, 0);
          idleTween.to(media, { x: -mx, y: my, duration: 3 }, 2.8);
          idleTween.to(media, { x: mx * 0.5, y: -my * 0.4, duration: 2.5 }, 5.8);
        }
      };

      const trigger =
        (triggerSelector && document.querySelector(triggerSelector)) || stage;

      startIdle();

      const visibilitySt = ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        onEnter: startIdle,
        onEnterBack: startIdle,
        onLeave: stopIdle,
        onLeaveBack: stopIdle,
      });

      const scrollSt = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const isScrolling = self.progress > 0.01 && self.progress < 0.99;
          if (isScrolling === scrolling) return;
          scrolling = isScrolling;
          if (scrolling) stopIdle();
          else startIdle();
        },
      });

      return () => {
        visibilitySt.kill();
        scrollSt.kill();
        stopIdle();
      };
    },
    {
      scope: stageRef,
      dependencies: [mediaSelector, triggerSelector],
    }
  );

  return stageRef;
}
