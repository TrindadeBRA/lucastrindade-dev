"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const USERNAME = "TrindadeBRA";
const LEVEL_OPACITY = [0.008, 0.02, 0.035, 0.055, 0.08] as const;
const ROWS = 7;
const GAP = 4; // px — alinhado ao gap-1

function chunkWeeks(days: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function baseOpacity(level: number) {
  return LEVEL_OPACITY[Math.min(4, Math.max(0, level)) as 0 | 1 | 2 | 3 | 4];
}

async function fetchContributions(signal: AbortSignal): Promise<Contribution[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    { signal }
  );
  if (!res.ok) throw new Error("Failed to load GitHub contributions");
  const json = await res.json();
  return (json.contributions || []) as Contribution[];
}

export default function HeroGithubBg() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState<Contribution[][]>([]);
  const [cellSize, setCellSize] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchContributions(controller.signal)
      .then((days) => setWeeks(chunkWeeks(days)))
      .catch(() => {
        /* silencioso: bg é só efeito */
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !weeks.length) return;

    const cols = weeks.length;
    const update = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      // cover: o maior tamanho de célula quadrada que ainda preenche o hero
      const byWidth = (width - GAP * (cols - 1)) / cols;
      const byHeight = (height - GAP * (ROWS - 1)) / ROWS;
      setCellSize(Math.ceil(Math.max(byWidth, byHeight)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, [weeks]);

  useGSAP(
    () => {
      registerGsap();
      if (!rootRef.current || weeks.length === 0) return;

      const root = rootRef.current;
      const hero = document.querySelector<HTMLElement>("#hero");
      const cells = gsap.utils.toArray<HTMLElement>(".hero-gh-cell", root);
      if (!cells.length || !hero) return;

      const reduced = prefersReducedMotion();

      cells.forEach((el) => {
        gsap.set(el, {
          opacity: baseOpacity(Number(el.dataset.level) || 0),
          scale: 1,
          force3D: true,
        });
      });

      if (reduced) return;

      gsap.from(cells, {
        scale: 0.55,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        stagger: { each: 0.0025, from: "center" },
        force3D: true,
        onComplete: () => {
          cells.forEach((el) => {
            gsap.set(el, { opacity: baseOpacity(Number(el.dataset.level) || 0) });
          });
        },
      });

      gsap.to(root.querySelector(".hero-github-grid"), {
        yPercent: -8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(root, {
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const active = cells.filter((el) => Number(el.dataset.level) >= 2);
      if (!active.length) return;

      const pulse = () => {
        const sample = gsap.utils.shuffle(active.slice()).slice(0, 18);
        gsap.to(sample, {
          opacity: (_i, el) =>
            Math.min(0.16, baseOpacity(Number((el as HTMLElement).dataset.level) || 0) * 1.8),
          duration: 0.55,
          yoyo: true,
          repeat: 1,
          stagger: 0.03,
          ease: "sine.inOut",
          overwrite: "auto",
          onComplete: () => {
            sample.forEach((el) => {
              gsap.set(el, { opacity: baseOpacity(Number(el.dataset.level) || 0) });
            });
          },
        });
      };

      const pulseId = window.setInterval(pulse, 2800);
      return () => window.clearInterval(pulseId);
    },
    { scope: rootRef, dependencies: [weeks] }
  );

  if (!weeks.length) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="hero-github-grid absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2"
        style={{ gap: GAP }}
      >
        {weeks.map((week, wi) => (
          <div key={`w-${wi}`} className="flex flex-col" style={{ gap: GAP }}>
            {week.map((day) => (
              <span
                key={day.date}
                className="hero-gh-cell block shrink-0 rounded-[2px] bg-white will-change-transform"
                data-level={day.level}
                style={{
                  width: cellSize || 8,
                  height: cellSize || 8,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(10,10,10,0.2),rgba(10,10,10,0.55)_75%)]" />
    </div>
  );
}
