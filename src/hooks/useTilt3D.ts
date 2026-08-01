import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type UseTilt3DOptions = {
  maxTilt?: number;
  shineSelector?: string;
  mediaSelector?: string;
  /** Escuta o mouse neste seletor (ex: #hero) em vez de só no card. */
  listenSelector?: string;
  /** Animação 3D suave enquanto não há interação. */
  idle?: boolean;
};

/** Perspective tilt reativo — mouse + idle + profundidade na mídia. */
export function useTilt3D<T extends HTMLElement = HTMLElement>(
  options: UseTilt3DOptions = {}
) {
  const {
    maxTilt = 16,
    shineSelector,
    mediaSelector = ".hero-portrait-media",
    listenSelector = "#hero",
    idle = true,
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
      const shine = shineSelector
        ? stage.querySelector<HTMLElement>(shineSelector)
        : stage.querySelector<HTMLElement>("[data-tilt-shine]");
      const listenEl =
        (listenSelector && document.querySelector<HTMLElement>(listenSelector)) || stage;

      gsap.set(stage, { perspective: 1400 });
      gsap.set(card, {
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        force3D: true,
      });
      if (media) gsap.set(media, { force3D: true, scale: 1.08 });

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const canHover = finePointer && window.innerWidth >= 768;

      let idleTween: gsap.core.Timeline | null = null;
      let interacting = false;
      let raf = 0;
      let mx = 0;
      let my = 0;

      const startIdle = () => {
        if (!idle || interacting) return;
        idleTween?.kill();
        idleTween = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut" },
        });

        idleTween
          .to(card, {
            rotationY: 9,
            rotationX: -5,
            z: 20,
            scale: 1.02,
            duration: 2.6,
          })
          .to(card, {
            rotationY: -8,
            rotationX: 4,
            z: 10,
            scale: 1.01,
            duration: 2.9,
          })
          .to(card, {
            rotationY: 4,
            rotationX: -2.5,
            z: 16,
            scale: 1.025,
            duration: 2.4,
          });

        if (media) {
          // x/y em px — não disputa yPercent/scale do scroll
          idleTween.to(media, { x: 10, y: -8, duration: 2.6, ease: "sine.inOut" }, 0);
          idleTween.to(media, { x: -12, y: 8, duration: 2.9, ease: "sine.inOut" }, 2.6);
          idleTween.to(media, { x: 6, y: -4, duration: 2.4, ease: "sine.inOut" }, 5.5);
        }

        if (shine) {
          gsap.to(shine, {
            opacity: 0.35,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          shine.style.background =
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.22), transparent 45%)";
        }
      };

      const stopIdle = () => {
        idleTween?.pause();
        if (shine) gsap.killTweensOf(shine);
      };

      if (idle) startIdle();

      if (!canHover) {
        return () => {
          idleTween?.kill();
          if (shine) gsap.killTweensOf(shine);
        };
      }

      const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.18, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.18, ease: "power3.out" });
      const zTo = gsap.quickTo(card, "z", { duration: 0.22, ease: "power3.out" });
      const scaleTo = gsap.quickTo(card, "scale", { duration: 0.22, ease: "power3.out" });
      const mediaXTo = media
        ? gsap.quickTo(media, "x", { duration: 0.22, ease: "power3.out" })
        : null;
      const mediaYTo = media
        ? gsap.quickTo(media, "y", { duration: 0.22, ease: "power3.out" })
        : null;

      const applyTilt = () => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        // Normaliza pelo hero inteiro, mas ancora no centro do stage
        const x = gsap.utils.clamp(-0.55, 0.55, (mx - (rect.left + rect.width / 2)) / rect.width);
        const y = gsap.utils.clamp(-0.55, 0.55, (my - (rect.top + rect.height / 2)) / rect.height);

        rotateYTo(x * maxTilt * 2.2);
        rotateXTo(-y * maxTilt * 1.9);
        zTo(28 + Math.abs(x) * 12 + Math.abs(y) * 8);
        scaleTo(1.035);

        mediaXTo?.(x * -28);
        mediaYTo?.(y * -22);

        if (shine) {
          const px = (x + 0.5) * 100;
          const py = (y + 0.5) * 100;
          shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.4), rgba(255,255,255,0.08) 28%, transparent 55%)`;
          gsap.to(shine, { opacity: 0.85, duration: 0.15, overwrite: "auto" });
        }
      };

      const onMove = (event: PointerEvent) => {
        mx = event.clientX;
        my = event.clientY;

        if (!interacting) {
          interacting = true;
          stopIdle();
        }

        if (!raf) raf = window.requestAnimationFrame(applyTilt);
      };

      const onLeave = () => {
        interacting = false;
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => startIdle(),
        });
        if (media) {
          gsap.to(media, {
            x: 0,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        if (shine) {
          gsap.to(shine, { opacity: 0, duration: 0.45, overwrite: "auto" });
        }
      };

      listenEl.addEventListener("pointermove", onMove);
      listenEl.addEventListener("pointerleave", onLeave);

      return () => {
        idleTween?.kill();
        if (shine) gsap.killTweensOf(shine);
        if (raf) window.cancelAnimationFrame(raf);
        listenEl.removeEventListener("pointermove", onMove);
        listenEl.removeEventListener("pointerleave", onLeave);
      };
    },
    {
      scope: stageRef,
      dependencies: [maxTilt, shineSelector, mediaSelector, listenSelector, idle],
    }
  );

  return stageRef;
}
