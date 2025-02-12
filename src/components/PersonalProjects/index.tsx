import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { PersonalProject } from '@/pages/api/sectionsPersonalProjects'


export default function PersonalProjects(personalProjectsData: PersonalProject[]) {

  const tabs = Object.values(personalProjectsData).map((project: PersonalProject) => ({
    name: project.project_name,
    features: [
      {
        name: project.project_title,
        description: project.project_description,
        imageSrc: project.project_image_sync,
        blogPostUrl: project.project_url
      }
    ]
  }));


  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" id="projetos">
      <section aria-labelledby="features-heading" className="mx-auto max-w-7xl py-20 sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div className="max-w-3xl">
            <p className="text-base font-semibold leading-7 text-indigo-600">Projetos Pessoais</p>
            <h2 id="features-heading" className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Especificações Técnicas
            </h2>
            <p className="mt-4 text-gray-400">
              Explore meus projetos pessoais desenvolvidos com tecnologias modernas.
              Cada projeto demonstra diferentes aspectos do desenvolvimento fullstack,
              desde interfaces responsivas até integrações com APIs e sistemas de deploy automatizado.
            </p>
          </div>

          <Tab.Group as="div">
            <div className="-mx-4 flex overflow-x-auto sm:mx-0">
              <div className="flex-auto border-b border-gray-700 px-4 sm:px-0">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        selected
                          ? 'border-b-2 py-6 text-sm font-medium whitespace-nowrap focus:outline-none border-indigo-500 text-indigo-400'
                          : 'border-b-2 py-6 text-sm font-medium whitespace-nowrap focus:outline-none border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300'
                      }
                    >
                      {({ selected }) => (
                        <span className={twMerge(
                          'transition-colors duration-200',
                          selected ? 'text-indigo-400' : 'text-gray-400'
                        )}>
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
                    <div key={feature.name} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8">
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <h3 className="text-lg font-medium text-white">{feature.name}</h3>
                        <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                        <div className='flex gap-4 items-center mt-6'>
                          <a
                            href={feature.blogPostUrl}
                            target='_blank'
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Ler mais sobre o projeto
                          </a>
                        </div>
                      </div>
                      <div className="lg:col-span-7">
                        <Image
                          alt={feature.name}
                          src={feature.imageSrc}
                          className="aspect-2/1 w-full rounded-lg bg-gray-800 object-cover sm:aspect-5/2"
                          width={1000}
                          height={1000}
                        />
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
  )
}
