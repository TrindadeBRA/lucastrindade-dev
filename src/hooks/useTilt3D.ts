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

      gsap.set(stage, { perspective: isMobile ? 900 : 1200 });
      gsap.set(card, {
        transformOrigin: "center center",
        force3D: !isMobile,
      });
      if (media) {
        gsap.set(media, { force3D: !isMobile, scale: isMobile ? 1.04 : 1.08 });
      }

      let idleTween: gsap.core.Timeline | null = null;

      const stopIdle = () => {
        idleTween?.kill();
        idleTween = null;
        gsap.set(card, { rotationX: 0, rotationY: 0, z: 0, scale: 1 });
        if (media) gsap.set(media, { x: 0, y: 0 });
      };

      const startIdle = () => {
        if (idleTween) return;
        idleTween = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut" },
        });

        const tilt = isMobile ? 4.5 : 9;
        const lift = isMobile ? 8 : 20;

        idleTween
          .to(card, {
            rotationY: tilt,
            rotationX: -tilt * 0.55,
            z: lift,
            scale: 1.015,
            duration: 2.6,
          })
          .to(card, {
            rotationY: -tilt * 0.9,
            rotationX: tilt * 0.45,
            z: lift * 0.5,
            scale: 1.008,
            duration: 2.9,
          })
          .to(card, {
            rotationY: tilt * 0.45,
            rotationX: -tilt * 0.28,
            z: lift * 0.8,
            scale: 1.02,
            duration: 2.4,
          });

        if (media) {
          const mx = isMobile ? 5 : 10;
          const my = isMobile ? 4 : 8;
          idleTween.to(media, { x: mx, y: -my, duration: 2.6 }, 0);
          idleTween.to(media, { x: -mx * 1.2, y: my, duration: 2.9 }, 2.6);
          idleTween.to(media, { x: mx * 0.6, y: -my * 0.5, duration: 2.4 }, 5.5);
        }
      };

      const trigger =
        (triggerSelector && document.querySelector(triggerSelector)) || stage;

      startIdle();

      const st = ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        onEnter: startIdle,
        onEnterBack: startIdle,
        onLeave: stopIdle,
        onLeaveBack: stopIdle,
      });

      return () => {
        st.kill();
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
