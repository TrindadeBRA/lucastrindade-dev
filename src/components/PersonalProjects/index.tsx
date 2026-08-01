"use client";

import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { PersonalProject } from "@/pages/api/sectionsPersonalProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export default function PersonalProjects(personalProjectsData: PersonalProject[]) {
  const sectionRef = useScrollReveal();

  const tabs = Object.values(personalProjectsData).map((project: PersonalProject) => ({
    name: project.project_name,
    features: [
      {
        name: project.project_title,
        description: project.project_description,
        imageSrc: project.project_image_sync,
        blogPostUrl: project.project_url,
      },
    ],
  }));

  const animatePanel = () => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    registerGsap();
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".project-panel-anim"),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" }
    );
  };

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
      id="projetos"
    >
      <section aria-labelledby="features-heading" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="max-w-3xl">
            <p className="text-base font-semibold leading-7 text-indigo-400" data-reveal="title">
              Projetos Pessoais
            </p>
            <h2
              id="features-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              data-reveal="title"
            >
              Meus Projetos Online
            </h2>
            <p className="mt-4 text-gray-400" data-reveal="from-left">
              Explore meus projetos pessoais desenvolvidos com tecnologias modernas. Cada projeto
              demonstra diferentes aspectos do desenvolvimento fullstack, desde interfaces
              responsivas até integrações com APIs e sistemas de deploy automatizado.
            </p>
          </div>

          <Tab.Group as="div" onChange={animatePanel}>
            <div className="flex overflow-x-auto sm:mx-0" data-reveal="item">
              <div className="flex-auto border-b border-gray-700">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }: { selected: boolean }) =>
                        selected
                          ? "whitespace-nowrap border-b-2 border-indigo-500 py-6 text-sm font-medium text-indigo-400 focus:outline-none"
                          : "whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-400 hover:border-gray-600 hover:text-gray-300 focus:outline-none"
                      }
                    >
                      {({ selected }: { selected: boolean }) => (
                        <span
                          className={twMerge(
                            "transition-colors duration-200",
                            selected ? "text-indigo-400" : "text-gray-400"
                          )}
                        >
                          {tab.name}
                        </span>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels as={Fragment}>
              {tabs.map((tab) => (
                <Tab.Panel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                  {tab.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                      <div className="project-panel-anim mt-6 lg:col-span-5 lg:mt-0">
                        <h3 className="text-lg font-medium text-white">{feature.name}</h3>
                        <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                        <div className="mt-6 flex items-center gap-4">
                          <a
                            href={feature.blogPostUrl}
                            target="_blank"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Ler mais sobre o projeto
                          </a>
                        </div>
                      </div>
                      <div className="project-panel-anim lg:col-span-7">
                        <Link
                          href={feature.blogPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-lg"
                        >
                          <Image
                            alt={feature.name}
                            src={feature.imageSrc}
                            className="w-full cursor-pointer rounded-lg bg-gray-800 object-cover transition-transform duration-500 hover:scale-[1.02]"
                            width={633}
                            height={230}
                            priority
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
}
