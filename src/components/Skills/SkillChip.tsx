"use client";

import { useId, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Check } from "react-feather";
import { Skill } from "@/pages/api/sectionSkills";
import { resolveSkillMeta } from "@/utils/skillMeta";

type SkillChipProps = {
  skill: Skill;
  tone?: "solid" | "muted";
};

export default function SkillChip({ skill, tone = "solid" }: SkillChipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipId = useId();
  const meta = resolveSkillMeta(skill);

  const show = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.top - 10,
      left: rect.left + rect.width / 2,
    });
    setOpen(true);
  };

  const hide = () => setOpen(false);

  return (
    <span className="skill-chip relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className={[
          "group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-left transition",
          "hover:-translate-y-0.5 hover:border-white/35 hover:bg-ink-muted",
          tone === "solid"
            ? "border-white/12 bg-ink text-chalk"
            : "border-white/18 bg-ink/80 text-chalk-muted",
        ].join(" ")}
      >
        <span className="whitespace-nowrap text-sm font-medium">{skill.skill_name}</span>
        <Check className="h-3.5 w-3.5 text-chalk-dim opacity-70 transition group-hover:text-chalk group-hover:opacity-100" />
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              id={tooltipId}
              role="tooltip"
              className="pointer-events-none fixed z-[120] w-64 -translate-x-1/2 -translate-y-full rounded-2xl border border-white/10 bg-ink p-4 shadow-2xl shadow-black/60"
              style={{ top: coords.top, left: coords.left }}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-display text-sm font-semibold text-chalk">{skill.skill_name}</p>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-chalk-muted">
                  {meta.category}
                </span>
              </div>
              {skill.skill_level ? (
                <p className="mb-2 text-xs text-chalk-dim">Nível: {skill.skill_level}</p>
              ) : null}
              <p className="text-xs leading-relaxed text-chalk-muted">{meta.blurb}</p>
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-ink" />
            </div>,
            document.body
          )
        : null}
    </span>
  );
}
