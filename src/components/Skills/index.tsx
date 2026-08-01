"use client";

import { Skill } from "@/pages/api/sectionSkills";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import SkillChip from "./SkillChip";

export default function Skills(skillsData: Skill[] | Record<string, Skill>) {
  const sectionRef = useScrollReveal();
  const skills = asList(skillsData);
  const loop = [...skills, ...skills];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="overflow-hidden border-t border-white/5 bg-ink-soft py-24 sm:py-32"
    >
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Conhecimentos gerais
          </p>
          <h2 className="section-title mt-4" data-reveal="title">
            Algumas Skills
          </h2>
          <p className="mt-5 text-chalk-muted" data-reveal="fade-up">
            Tecnologias, ferramentas e frameworks com os quais possuo experiência profissional ou
            conhecimento através de estudos e projetos.
          </p>
        </div>
      </div>

      <div className="mask-fade-x mt-14 hidden space-y-5 md:block" data-reveal="fade-up">
        <div className="overflow-hidden">
          <ul className="marquee-track animate-marquee hover:[animation-play-state:paused]">
            {loop.map((skill, index) => (
              <li key={`a-${skill.skill_name}-${index}`}>
                <SkillChip skill={skill} tone="solid" />
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden">
          <ul className="marquee-track animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...loop].reverse().map((skill, index) => (
              <li key={`b-${skill.skill_name}-${index}`}>
                <SkillChip skill={skill} tone="muted" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-container mt-12 md:hidden">
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li key={`${skill.skill_name}-${index}`} data-reveal="item">
              <SkillChip skill={skill} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
