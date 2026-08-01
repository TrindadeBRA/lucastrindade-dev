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
    <section ref={sectionRef} id="skills" className="overflow-hidden bg-brand-dark py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="font-display text-base font-semibold text-content-inverse" data-reveal="title">
            Stacks e ferramentas
          </p>
          <h2
            className="mt-3 font-display text-3xl font-medium tracking-tight text-content-inverse sm:text-5xl"
            data-reveal="title"
          >
            Tecnologias que dominamos no dia a dia
          </h2>
          <p className="mt-5 text-content-inverse-muted" data-reveal="fade-up">
            Um mix prático de ferramentas para produto, front, back e entrega.
          </p>
        </div>
      </div>

      <div className="mask-fade-x mt-14 hidden space-y-4 md:block" data-reveal="fade-up">
        <div className="overflow-hidden">
          <ul className="marquee-track">
            {loop.map((skill, index) => (
              <li
                key={`a-${skill.skill_name}-${index}`}
                className="whitespace-nowrap rounded-full border border-white/15 bg-brand-soft px-5 py-2.5 text-sm text-content-inverse"
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
                className="whitespace-nowrap rounded-full bg-accent-yellow px-5 py-2.5 text-sm font-semibold text-brand-dark"
              >
                {skill.skill_name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-container mt-10 md:hidden">
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li
              key={`${skill.skill_name}-${index}`}
              data-reveal="item"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-content-inverse"
            >
              {skill.skill_name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
