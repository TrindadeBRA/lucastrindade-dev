"use client";

import Image from "next/image";
import Link from "next/link";
import { PersonalProject } from "@/pages/api/sectionsPersonalProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { asList } from "@/utils/asList";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function PersonalProjects(
  personalProjectsData: PersonalProject[] | Record<string, PersonalProject>
) {
  const sectionRef = useScrollReveal();
  const projects = asList(personalProjectsData).sort(
    (a, b) => (a.project_order ?? 0) - (b.project_order ?? 0)
  );

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion() || window.innerWidth < 768) return;

      gsap.utils.toArray<HTMLElement>(".project-media img", sectionRef.current).forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".project-row") || img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  return (
    <section ref={sectionRef} id="projetos" className="bg-gradient-to-b from-surface-muted to-surface-base py-20 sm:py-28">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="section-label" data-reveal="title">
            Portfolio
          </p>
          <h2 className="section-title mt-3 text-balance" data-reveal="title">
            Projetos que transformam ideias em resultados
          </h2>
          <p className="mt-5 text-base text-content-secondary sm:text-lg" data-reveal="fade-up">
            Casos e experimentos com foco em produto, performance e experiência.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {projects.map((project, index) => (
            <article
              key={project.project_name || index}
              className="project-row group grid gap-8 border-t border-content-primary/10 py-12 lg:grid-cols-12 lg:items-center"
              data-reveal="card"
            >
              <div className="lg:col-span-5">
                <p className="font-display text-5xl font-medium text-content-primary/10 transition group-hover:text-accent-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-content-primary sm:text-4xl">
                  {project.project_title || project.project_name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-content-tertiary">{project.project_name}</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-content-secondary sm:text-base">
                  {project.project_description}
                </p>
                {project.project_url ? (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline mt-7"
                  >
                    Ver projeto
                  </a>
                ) : null}
              </div>

              <div className="lg:col-span-7">
                {project.project_image_sync || project.project_image ? (
                  <Link
                    href={project.project_url || "#"}
                    target={project.project_url ? "_blank" : undefined}
                    className="project-media clip-frame relative block aspect-[16/10] overflow-hidden rounded-4xl bg-surface-subtle"
                    data-reveal="clip"
                  >
                    <Image
                      src={project.project_image_sync || project.project_image}
                      alt={project.project_title || project.project_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </Link>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-4xl bg-surface-subtle text-content-muted">
                    Sem imagem
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
