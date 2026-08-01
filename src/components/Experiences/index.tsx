"use client";

import Image from "next/image";
import { useState } from "react";
import { Experience } from "@/pages/api/sectionsExperiences";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

function formatMonthYear(date: string) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

const Experiences = (experienceData: Experience[] | Record<string, Experience>) => {
  const sectionRef = useScrollReveal();
  const experiences = asList(experienceData);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState<Experience | null>(null);

  const openModal = (experience: Experience) => {
    setActive(experience);
    setShowModal(true);
    document.body.classList.add("overflow-hidden");
    requestAnimationFrame(() => {
      registerGsap();
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".experience-modal-panel",
        { y: 36, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    });
  };

  const closeModal = () => {
    const finish = () => {
      setShowModal(false);
      setActive(null);
      document.body.classList.remove("overflow-hidden");
    };
    registerGsap();
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    gsap.to(".experience-modal-panel", {
      y: 18,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: finish,
    });
  };

  return (
    <section ref={sectionRef} id="experiencia" className="border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Trajetória
          </p>
          <h2 className="section-title mt-4" data-reveal="title">
            Experiência profissional
          </h2>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute bottom-4 left-[7px] top-4 hidden w-px bg-white/40 md:block"
            data-reveal="line"
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {experiences.map((experience) => {
              const current = !experience.experience_date_end;
              return (
                <li
                  key={experience.experience_id}
                  data-reveal="from-left"
                  className="group relative grid cursor-pointer gap-4 border-t border-white/10 py-8 transition hover:bg-white/[0.02] md:grid-cols-[200px_1fr_auto] md:items-center md:gap-8 md:pl-10"
                  onClick={() => openModal(experience)}
                >
                  <span className="absolute left-0 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white/50 bg-ink transition group-hover:scale-125 group-hover:bg-chalk md:block" />

                  <p className="text-sm text-chalk-dim">
                    {formatMonthYear(experience.experience_date_start)}
                    {" — "}
                    {current ? "Atual" : formatMonthYear(experience.experience_date_end)}
                  </p>

                  <div className="flex items-center gap-4">
                    {experience.experience_company_avatar_sync ? (
                      <Image
                        src={experience.experience_company_avatar_sync}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full border border-white/10 object-cover transition group-hover:border-white/40"
                      />
                    ) : null}
                    <div>
                      <h3 className="font-display text-xl font-semibold text-chalk transition group-hover:text-white sm:text-2xl">
                        {experience.experience_company_name}
                      </h3>
                      <p className="text-sm text-chalk-muted">{experience.experience_position}</p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      current ? "bg-white/10 text-chalk-muted" : "border border-white/10 text-chalk-dim"
                    }`}
                  >
                    {current ? "Online" : "Anterior"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {showModal && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="experience-modal-panel max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-soft p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {active.experience_company_avatar_sync ? (
                  <Image
                    src={active.experience_company_avatar_sync}
                    alt=""
                    width={52}
                    height={52}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-chalk">
                    {active.experience_company_name}
                  </h3>
                  <p className="text-sm text-chalk-muted">{active.experience_location}</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-sm text-chalk-muted hover:text-white">
                Fechar
              </button>
            </div>

            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-chalk-dim">Cargo</dt>
                <dd className="mt-1 text-chalk">{active.experience_position}</dd>
              </div>
              <div>
                <dt className="text-chalk-dim">Modelo</dt>
                <dd className="mt-1 text-chalk">{active.experience_operating_model}</dd>
              </div>
              {active.experience_company_website ? (
                <div>
                  <dt className="text-chalk-dim">Site</dt>
                  <dd className="mt-1">
                    <a
                      href={active.experience_company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chalk-muted underline-offset-2 hover:underline"
                    >
                      {active.experience_company_website}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-chalk-dim">Sobre</dt>
                <dd className="mt-1 leading-relaxed text-chalk-muted">{active.experience_about}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experiences;
