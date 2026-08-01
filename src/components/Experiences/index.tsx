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
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
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
      y: 16,
      opacity: 0,
      duration: 0.2,
      onComplete: finish,
    });
  };

  return (
    <section ref={sectionRef} id="experiencia" className="bg-surface-subtle py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Trajetória
          </p>
          <h2 className="section-title mt-3" data-reveal="title">
            Experiência profissional
          </h2>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute bottom-4 left-[7px] top-4 hidden w-px bg-brand-dark md:block"
            data-reveal="line"
            aria-hidden="true"
          />

          <ol>
            {experiences.map((experience) => {
              const current = !experience.experience_date_end;
              return (
                <li
                  key={experience.experience_id}
                  data-reveal="from-left"
                  className="group relative grid cursor-pointer gap-4 border-t border-content-primary/10 py-8 transition hover:bg-surface-base md:grid-cols-[200px_1fr_auto] md:items-center md:gap-8 md:pl-10"
                  onClick={() => openModal(experience)}
                >
                  <span className="absolute left-0 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-brand-dark bg-surface-subtle transition group-hover:bg-accent-yellow md:block" />

                  <p className="text-sm text-content-tertiary">
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
                        className="h-11 w-11 rounded-full border border-border-subtle object-cover"
                      />
                    ) : null}
                    <div>
                      <h3 className="font-display text-xl font-medium text-content-primary sm:text-2xl">
                        {experience.experience_company_name}
                      </h3>
                      <p className="text-sm text-content-secondary">{experience.experience_position}</p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      current
                        ? "bg-brand-dark text-content-inverse"
                        : "border border-border-default text-content-tertiary"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="experience-modal-panel max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-4xl bg-surface-base p-8"
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
                  <h3 className="font-display text-2xl font-medium text-content-primary">
                    {active.experience_company_name}
                  </h3>
                  <p className="text-sm text-content-secondary">{active.experience_location}</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-sm text-content-tertiary hover:text-content-primary">
                Fechar
              </button>
            </div>

            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-content-muted">Cargo</dt>
                <dd className="mt-1 text-content-primary">{active.experience_position}</dd>
              </div>
              <div>
                <dt className="text-content-muted">Modelo</dt>
                <dd className="mt-1 text-content-primary">{active.experience_operating_model}</dd>
              </div>
              {active.experience_company_website ? (
                <div>
                  <dt className="text-content-muted">Site</dt>
                  <dd className="mt-1">
                    <a
                      href={active.experience_company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-link hover:underline"
                    >
                      {active.experience_company_website}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-content-muted">Sobre</dt>
                <dd className="mt-1 leading-relaxed text-content-secondary">{active.experience_about}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experiences;
