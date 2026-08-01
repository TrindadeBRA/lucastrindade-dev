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
      if (!sectionRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".project-row", sectionRef.current);

      rows.forEach((row) => {
        const img = row.querySelector<HTMLElement>(".project-media img");
        if (!img) return;

        if (prefersReducedMotion()) {
          gsap.set(img, { filter: "grayscale(0%)" });
          return;
        }

        // Item atual em tela → tira o P&B
        gsap.fromTo(
          img,
          { filter: "grayscale(100%)" },
          {
            filter: "grayscale(0%)",
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        if (window.innerWidth < 768) return;

        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: row,
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
    <section
      ref={sectionRef}
      id="projetos"
      className="relative border-t border-white/5 bg-ink py-24 sm:py-32"
    >
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 md:sticky md:top-24 md:z-10 md:mb-10 md:flex-row md:items-end md:bg-ink/80 md:py-4 md:backdrop-blur-md">
          <div className="max-w-2xl">
            <p className="section-label" data-reveal="title">
              Portfolio
            </p>
            <h2 className="section-title mt-4 text-balance" data-reveal="title">
              Projetos que transformam ideias em produto
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-chalk-muted" data-reveal="from-right">
            Seleção de projetos pessoais com foco em produto, performance e experiência.
          </p>
        </div>

        <div className="mt-10 space-y-4 md:mt-6">
          {projects.map((project, index) => (
            <article
              key={project.project_name || index}
              className="project-row group grid gap-8 border-t border-white/10 py-12 lg:grid-cols-12 lg:items-center"
              data-reveal="card"
            >
              <div className="lg:col-span-5">
                <p className="font-display text-5xl font-semibold text-white/10 transition group-hover:text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-chalk sm:text-4xl">
                  {project.project_title || project.project_name}
                </h3>
                <p className="mt-2 text-sm text-chalk-muted">{project.project_name}</p>
                <p className="mt-5 max-w-md line-clamp-3 text-sm leading-relaxed text-chalk-muted sm:text-base">
                  {project.project_description}
                </p>
                {project.project_url ? (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-chalk transition group-hover:gap-3 group-hover:text-white"
                  >
                    Ver projeto
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>

              <div className="lg:col-span-7">
                {project.project_image_sync || project.project_image ? (
                  <Link
                    href={project.project_url || "#"}
                    target={project.project_url ? "_blank" : undefined}
                    className="project-media clip-frame relative block aspect-[21/9] overflow-hidden rounded-2xl border border-white/10 bg-ink-muted"
                    data-reveal="clip"
                  >
                    <Image
                      src={project.project_image_sync || project.project_image}
                      alt={project.project_title || project.project_name}
                      fill
                      className="object-cover object-top will-change-[filter,transform]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-white/5" />
                  </Link>
                ) : (
                  <div className="flex aspect-[21/9] items-center justify-center rounded-2xl border border-white/10 bg-ink-muted text-chalk-dim">
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
