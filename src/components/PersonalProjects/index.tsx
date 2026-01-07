import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
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
      <section aria-labelledby="features-heading" className="mx-auto max-w-7xl py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="max-w-3xl">
            <p className="text-base font-semibold leading-7 text-indigo-600" data-aos="fade-right">Projetos Pessoais</p>
            <h2 id="features-heading" className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl" data-aos="fade-right">
              Meus Projetos Online
            </h2>
            <p className="mt-4 text-gray-400" data-aos="fade-right">
              Explore meus projetos pessoais desenvolvidos com tecnologias modernas.
              Cada projeto demonstra diferentes aspectos do desenvolvimento fullstack,
              desde interfaces responsivas até integrações com APIs e sistemas de deploy automatizado.
            </p>
          </div>

          <Tab.Group as="div">
            <div className="flex overflow-x-auto sm:mx-0" data-aos="fade-in">
              <div className="flex-auto border-b border-gray-700">
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
                        )}
                        data-aos="fade-in">
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
                    <div key={feature.name} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8" data-aos="fade-in">
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
                        <Link
                          href={feature.blogPostUrl}
                          target='_blank'
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Image
                            alt={feature.name}
                            src={feature.imageSrc}
                            className="w-full rounded-lg bg-gray-800 object-cover cursor-pointer"
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
  )
}
