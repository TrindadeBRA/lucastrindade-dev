import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type UseTilt3DOptions = {
  maxTilt?: number;
  shineSelector?: string;
  mediaSelector?: string;
  layerSelector?: string;
  /** Escuta o mouse neste seletor (ex: #hero) em vez de só no card. */
  listenSelector?: string;
  /** Animação 3D suave enquanto não há interação. */
  idle?: boolean;
};

/** Perspective tilt reativo — mouse + idle + profundidade entre mídia e layer. */
export function useTilt3D<T extends HTMLElement = HTMLElement>(
  options: UseTilt3DOptions = {}
) {
  const {
    maxTilt = 16,
    shineSelector,
    mediaSelector = ".hero-portrait-media",
    layerSelector = "[data-tilt-layer]",
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
      const layer = stage.querySelector<HTMLElement>(layerSelector);
      const listenEl =
        (listenSelector && document.querySelector<HTMLElement>(listenSelector)) || stage;

      // Perspective mais curta = depth mais perceptível entre layers
      gsap.set(stage, { perspective: 900 });
      gsap.set(card, {
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        force3D: true,
      });

      const getMedia = () => stage.querySelector<HTMLElement>(mediaSelector);

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const canHover = finePointer && window.innerWidth >= 768;

      const mediaEl = getMedia();

      if (!canHover) {
        if (!idle) {
          if (mediaEl) gsap.set(mediaEl, { clearProps: "transform" });
          if (layer) gsap.set(layer, { clearProps: "transform" });
          gsap.set(card, { clearProps: "transform" });
          return;
        }

        gsap.set(card, {
          force3D: true,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        });
        if (mediaEl) gsap.set(mediaEl, { force3D: true });

        const mobileIdle = gsap.timeline({
          repeat: -1,
          paused: true,
          defaults: { ease: "sine.inOut" },
        });

        mobileIdle
          .to(card, { y: -4, rotationZ: 0.3, duration: 2.5 })
          .to(card, { y: 3, rotationZ: -0.22, duration: 2.7 })
          .to(card, { y: -2, rotationZ: 0.15, duration: 2.3 });

        const startIdle = gsap.delayedCall(1.05, () => {
          mobileIdle.play(0);
        });

        return () => {
          startIdle.kill();
          mobileIdle.kill();
        };
      }

      if (mediaEl) {
        gsap.set(mediaEl, { force3D: true, transformStyle: "preserve-3d", z: -20, scale: 1.06 });
      }
      if (layer) {
        gsap.set(layer, { force3D: true, transformStyle: "preserve-3d", z: 64 });
      }

      let idleTween: gsap.core.Timeline | null = null;
      let resetTween: gsap.core.Tween | null = null;
      let shineIdleTween: gsap.core.Tween | null = null;
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
        shineIdleTween?.kill();

        const media = getMedia();
        idleTween = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut" },
        });

        idleTween
          .to(card, {
            rotationY: 5.5,
            rotationX: -3,
            z: 12,
            scale: 1.015,
            duration: 2.8,
          })
          .to(card, {
            rotationY: -5,
            rotationX: 2.5,
            z: 6,
            scale: 1.008,
            duration: 3.1,
          })
          .to(card, {
            rotationY: 2.5,
            rotationX: -1.5,
            z: 10,
            scale: 1.012,
            duration: 2.6,
          });

        if (media) {
          // Fundo: move mais (parallax contrário à layer)
          idleTween.to(media, { x: 10, y: -8, z: -28, duration: 2.8, ease: "sine.inOut" }, 0);
          idleTween.to(media, { x: -12, y: 8, z: -18, duration: 3.1, ease: "sine.inOut" }, 2.8);
          idleTween.to(media, { x: 6, y: -4, z: -24, duration: 2.6, ease: "sine.inOut" }, 5.9);
        }

        if (layer) {
          // Frente: deslocamento oposto — sensação de volume
          idleTween.to(layer, { x: -6, y: 4, z: 72, duration: 2.8, ease: "sine.inOut" }, 0);
          idleTween.to(layer, { x: 7, y: -5, z: 58, duration: 3.1, ease: "sine.inOut" }, 2.8);
          idleTween.to(layer, { x: -4, y: 3, z: 68, duration: 2.6, ease: "sine.inOut" }, 5.9);
        }

        if (shine) {
          shineIdleTween = gsap.to(shine, {
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
        idleTween?.kill();
        idleTween = null;
        shineIdleTween?.kill();
        shineIdleTween = null;
        if (shine) gsap.killTweensOf(shine);
      };

      if (idle) startIdle();

      const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.18, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.18, ease: "power3.out" });
      const zTo = gsap.quickTo(card, "z", { duration: 0.22, ease: "power3.out" });
      const scaleTo = gsap.quickTo(card, "scale", { duration: 0.22, ease: "power3.out" });

      let mediaXTo: ((v: number) => void) | null = null;
      let mediaYTo: ((v: number) => void) | null = null;
      let mediaZTo: ((v: number) => void) | null = null;
      let mediaBound: HTMLElement | null = null;

      let layerXTo: ((v: number) => void) | null = null;
      let layerYTo: ((v: number) => void) | null = null;
      let layerZTo: ((v: number) => void) | null = null;

      if (layer) {
        layerXTo = gsap.quickTo(layer, "x", { duration: 0.22, ease: "power3.out" });
        layerYTo = gsap.quickTo(layer, "y", { duration: 0.22, ease: "power3.out" });
        layerZTo = gsap.quickTo(layer, "z", { duration: 0.22, ease: "power3.out" });
      }

      const bindMediaQuickTo = (media: HTMLElement | null) => {
        if (!media || media === mediaBound) return;
        mediaBound = media;
        gsap.set(media, { force3D: true, transformStyle: "preserve-3d" });
        mediaXTo = gsap.quickTo(media, "x", { duration: 0.22, ease: "power3.out" });
        mediaYTo = gsap.quickTo(media, "y", { duration: 0.22, ease: "power3.out" });
        mediaZTo = gsap.quickTo(media, "z", { duration: 0.22, ease: "power3.out" });
      };

      bindMediaQuickTo(getMedia());

      const applyTilt = () => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        const x = gsap.utils.clamp(-0.55, 0.55, (mx - (rect.left + rect.width / 2)) / rect.width);
        const y = gsap.utils.clamp(-0.55, 0.55, (my - (rect.top + rect.height / 2)) / rect.height);

        rotateYTo(x * maxTilt * 1.35);
        rotateXTo(-y * maxTilt * 1.2);
        zTo(16 + Math.abs(x) * 6 + Math.abs(y) * 4);
        scaleTo(1.02);

        bindMediaQuickTo(getMedia());
        // Imagem recua e desliza contra o mouse
        mediaXTo?.(x * -22);
        mediaYTo?.(y * -16);
        mediaZTo?.(-20 - Math.abs(x) * 18 - Math.abs(y) * 12);

        // Texto avança e desliza a favor do mouse (layer da frente)
        layerXTo?.(x * 14);
        layerYTo?.(y * 10);
        layerZTo?.(64 + Math.abs(x) * 20 + Math.abs(y) * 14);

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
            z: -20,
            duration: 0.85,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        if (layer) {
          gsap.to(layer, {
            x: 0,
            y: 0,
            z: 64,
            duration: 0.85,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
        if (shine) {
          gsap.to(shine, { opacity: 0, duration: 0.45, overwrite: "auto" });
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
        shineIdleTween?.kill();
        resetTween?.kill();
        if (shine) gsap.killTweensOf(shine);
        if (raf) window.cancelAnimationFrame(raf);
        if (leaveTimer) window.clearTimeout(leaveTimer);
        document.removeEventListener("pointermove", onPointerMove);
      };
    },
    {
      scope: stageRef,
      dependencies: [maxTilt, shineSelector, mediaSelector, layerSelector, listenSelector, idle],
    }
  );

  return stageRef;
}
