"use client";

import { Skill } from "@/pages/api/sectionSkills";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function Skills(skillsData: Skill[] | Record<string, Skill>) {
  const sectionRef = useScrollReveal();
  const skills = asList(skillsData);
  const loop = [...skills, ...skills];

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion() || skills.length === 0) return;

      const tracks = sectionRef.current.querySelectorAll<HTMLElement>(".marquee-track");
      tracks.forEach((track, index) => {
        const distance = track.scrollWidth / 2;
        gsap.fromTo(
          track,
          { x: index % 2 === 0 ? 0 : -distance },
          {
            x: index % 2 === 0 ? -distance : 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [skills.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="overflow-hidden border-t border-white/5 bg-ink-soft py-24 sm:py-32"
    >
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Stack
          </p>
          <h2 className="section-title mt-4" data-reveal="title">
            Skills & ferramentas
          </h2>
          <p className="mt-5 text-chalk-muted" data-reveal="fade-up">
            Tecnologias e práticas que uso no dia a dia para construir produtos digitais.
          </p>
        </div>
      </div>

      <div className="mask-fade-x mt-14 hidden space-y-4 md:block" data-reveal="fade-up">
        <div className="overflow-hidden">
          <ul className="marquee-track">
            {loop.map((skill, index) => (
              <li
                key={`a-${skill.skill_name}-${index}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-ink px-5 py-2.5 text-sm text-chalk"
              >
                {skill.skill_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden">
          <ul className="marquee-track">
            {[...loop].reverse().map((skill, index) => (
              <li
                key={`b-${skill.skill_name}-${index}`}
                className="whitespace-nowrap rounded-full border border-lime/20 bg-ink px-5 py-2.5 text-sm text-lime"
              >
                {skill.skill_name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-container mt-12">
        <ul className="flex flex-wrap gap-3 md:hidden">
          {skills.map((skill, index) => (
            <li
              key={`${skill.skill_name}-${index}`}
              data-reveal="item"
              className="rounded-full border border-white/10 bg-ink px-4 py-2 text-sm text-chalk"
            >
              {skill.skill_name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
