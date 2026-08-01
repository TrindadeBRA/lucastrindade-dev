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

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const canHover = finePointer && window.innerWidth >= 768;
      const mediaEl = getMedia();

      if (!canHover) {
        if (mediaEl) gsap.set(mediaEl, { clearProps: "transform" });
        gsap.set(card, { clearProps: "transform" });
        gsap.set(stage, { clearProps: "perspective" });
        return;
      }

      gsap.set(stage, { perspective: 900 });
      gsap.set(card, {
        transformOrigin: "center center",
        force3D: true,
      });

      if (mediaEl) {
        gsap.set(mediaEl, { force3D: true, scale: 1.06 });
      }
      if (shine) {
        gsap.set(shine, { opacity: 0 });
      }

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
            rotationY: 5.5,
            rotationX: -3,
            scale: 1.015,
            duration: 2.8,
          })
          .to(card, {
            rotationY: -5,
            rotationX: 2.5,
            scale: 1.008,
            duration: 3.1,
          })
          .to(card, {
            rotationY: 2.5,
            rotationX: -1.5,
            scale: 1.012,
            duration: 2.6,
          });

        if (media) {
          idleTween.to(media, { x: 8, y: -6, duration: 2.8, ease: "sine.inOut" }, 0);
          idleTween.to(media, { x: -9, y: 6, duration: 3.1, ease: "sine.inOut" }, 2.8);
          idleTween.to(media, { x: 5, y: -3, duration: 2.6, ease: "sine.inOut" }, 5.9);
        }
      };

      const stopIdle = () => {
        idleTween?.kill();
        idleTween = null;
      };

      if (idle) startIdle();

      const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.18, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.18, ease: "power3.out" });
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

        rotateYTo(x * maxTilt * 1.35);
        rotateXTo(-y * maxTilt * 1.2);
        scaleTo(1.02);

        bindMediaQuickTo(getMedia());
        mediaXTo?.(x * -18);
        mediaYTo?.(y * -12);

        if (shine) {
          const px = (x + 0.5) * 100;
          const py = (y + 0.5) * 100;
          shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 30%, transparent 55%)`;
          gsap.to(shine, { opacity: 0.55, duration: 0.2, overwrite: "auto" });
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
            duration: 0.35,
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
