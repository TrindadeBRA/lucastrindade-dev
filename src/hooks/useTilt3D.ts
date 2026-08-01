import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type UseTilt3DOptions = {
  maxTilt?: number;
  shineSelector?: string;
  mediaSelector?: string;
  listenSelector?: string;
  idle?: boolean;
};

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

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const canHover = finePointer && window.innerWidth >= 768;
      if (!canHover) return;

      const card =
        stage.querySelector<HTMLElement>("[data-tilt-card]") ||
        (stage.firstElementChild as HTMLElement | null);
      if (!card) return;

      const shine = shineSelector
        ? stage.querySelector<HTMLElement>(shineSelector)
        : stage.querySelector<HTMLElement>("[data-tilt-shine]");
      const listenEl =
        (listenSelector && document.querySelector<HTMLElement>(listenSelector)) || stage;
      const getMedia = () => stage.querySelector<HTMLElement>(mediaSelector);

      gsap.set(stage, { perspective: 1200 });
      gsap.set(card, {
        transformOrigin: "center center",
        force3D: true,
      });

      const mediaEl = getMedia();
      if (mediaEl) gsap.set(mediaEl, { force3D: true, scale: 1.08 });
      if (shine) gsap.set(shine, { opacity: 0 });

      let idleTween: gsap.core.Timeline | null = null;
      let resetTween: gsap.core.Tween | null = null;
      let interacting = false;
      let raf = 0;
      let leaveTimer = 0;
      let mx = 0;
      let my = 0;
      let session = 0;

      const isInsideListen = (x: number, y: number) => {
        const rect = listenEl.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      };

      const startIdle = () => {
        if (!idle || interacting) return;
        idleTween?.kill();
        if (shine) {
          gsap.killTweensOf(shine);
          gsap.set(shine, { opacity: 0 });
          shine.style.background = "none";
        }

        const media = getMedia();
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
          idleTween.to(media, { x: 10, y: -8, duration: 2.6, ease: "sine.inOut" }, 0);
          idleTween.to(media, { x: -12, y: 8, duration: 2.9, ease: "sine.inOut" }, 2.6);
          idleTween.to(media, { x: 6, y: -4, duration: 2.4, ease: "sine.inOut" }, 5.5);
        }
      };

      const stopIdle = () => {
        idleTween?.kill();
        idleTween = null;
      };

      if (idle) startIdle();

      const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.18, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.18, ease: "power3.out" });
      const zTo = gsap.quickTo(card, "z", { duration: 0.22, ease: "power3.out" });
      const scaleTo = gsap.quickTo(card, "scale", { duration: 0.22, ease: "power3.out" });

      let mediaXTo: ((v: number) => void) | null = null;
      let mediaYTo: ((v: number) => void) | null = null;
      let mediaBound: HTMLElement | null = null;

      const bindMediaQuickTo = (media: HTMLElement | null) => {
        if (!media || media === mediaBound) return;
        mediaBound = media;
        gsap.set(media, { force3D: true });
        mediaXTo = gsap.quickTo(media, "x", { duration: 0.22, ease: "power3.out" });
        mediaYTo = gsap.quickTo(media, "y", { duration: 0.22, ease: "power3.out" });
      };

      bindMediaQuickTo(getMedia());

      const applyTilt = () => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        const x = gsap.utils.clamp(-0.55, 0.55, (mx - (rect.left + rect.width / 2)) / rect.width);
        const y = gsap.utils.clamp(-0.55, 0.55, (my - (rect.top + rect.height / 2)) / rect.height);

        rotateYTo(x * maxTilt * 2.2);
        rotateXTo(-y * maxTilt * 1.9);
        zTo(28 + Math.abs(x) * 12 + Math.abs(y) * 8);
        scaleTo(1.035);

        bindMediaQuickTo(getMedia());
        mediaXTo?.(x * -28);
        mediaYTo?.(y * -22);

        if (shine) {
          const px = (x + 0.5) * 100;
          const py = (y + 0.5) * 100;
          shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.4), rgba(255,255,255,0.08) 28%, transparent 55%)`;
          gsap.to(shine, { opacity: 0.85, duration: 0.15, overwrite: "auto" });
        }
      };

      const beginInteraction = () => {
        if (leaveTimer) {
          window.clearTimeout(leaveTimer);
          leaveTimer = 0;
        }
        resetTween?.kill();
        resetTween = null;
        if (!interacting) {
          interacting = true;
          stopIdle();
        }
      };

      const endInteraction = () => {
        if (!interacting) return;
        interacting = false;
        const leaveSession = ++session;

        resetTween?.kill();
        resetTween = gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            if (leaveSession !== session || interacting) return;
            startIdle();
          },
        });

        const media = getMedia();
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
          gsap.to(shine, {
            opacity: 0,
            duration: 0.45,
            overwrite: "auto",
            onComplete: () => {
              shine.style.background = "none";
            },
          });
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        mx = event.clientX;
        my = event.clientY;

        if (!isInsideListen(mx, my)) {
          if (interacting && !leaveTimer) {
            leaveTimer = window.setTimeout(() => {
              leaveTimer = 0;
              if (!isInsideListen(mx, my)) endInteraction();
            }, 80);
          }
          return;
        }

        beginInteraction();
        if (!raf) raf = window.requestAnimationFrame(applyTilt);
      };

      document.addEventListener("pointermove", onPointerMove, { passive: true });

      return () => {
        session += 1;
        idleTween?.kill();
        resetTween?.kill();
        if (shine) {
          gsap.killTweensOf(shine);
          gsap.set(shine, { opacity: 0 });
          shine.style.background = "none";
        }
        if (raf) window.cancelAnimationFrame(raf);
        if (leaveTimer) window.clearTimeout(leaveTimer);
        document.removeEventListener("pointermove", onPointerMove);
      };
    },
    {
      scope: stageRef,
      dependencies: [maxTilt, shineSelector, mediaSelector, listenSelector, idle],
    }
  );

  return stageRef;
}
