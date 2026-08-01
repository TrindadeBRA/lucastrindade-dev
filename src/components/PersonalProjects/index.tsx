"use client"

import { Fragment, useRef } from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { PersonalProject } from '@/pages/api/sectionsPersonalProjects'
import { motion, useInView } from 'framer-motion'

export default function PersonalProjects(personalProjectsData: PersonalProject[]) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <div className="relative py-20 sm:py-32 overflow-hidden" id="projetos">
      <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/10 via-transparent to-transparent"></div>
      
      <section aria-labelledby="features-heading" className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-base font-semibold leading-7 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
              Projetos Pessoais
            </p>
            <h2 id="features-heading" className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Meus <span className="gradient-text">Projetos</span> Online
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Explore meus projetos pessoais desenvolvidos com tecnologias modernas.
              Cada projeto demonstra diferentes aspectos do desenvolvimento fullstack,
              desde interfaces responsivas até integrações com APIs e sistemas de deploy automatizado.
            </p>
          </motion.div>

          <Tab.Group as="div" className="mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex overflow-x-auto sm:mx-0"
            >
              <div className="flex-auto border-b border-white/10">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }: { selected: boolean }) =>
                        twMerge(
                          'border-b-2 py-6 text-sm font-medium whitespace-nowrap focus:outline-none transition-all duration-300',
                          selected
                            ? 'border-primary-purple text-white'
                            : 'border-transparent text-gray-400 hover:border-white/20 hover:text-white'
                        )
                      }
                    >
                      {({ selected }: { selected: boolean }) => (
                        <span className={twMerge(
                          'transition-colors duration-200',
                          selected ? 'text-white' : 'text-gray-400'
                        )}>
                          {tab.name}
                        </span>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </motion.div>

            <Tab.Panels as={Fragment}>
              {tabs.map((tab) => (
                <Tab.Panel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                  {tab.features.map((feature) => (
                    <motion.div 
                      key={feature.name}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <h3 className="text-2xl font-semibold text-white mb-4">{feature.name}</h3>
                          <p className="text-base text-gray-400 leading-7">{feature.description}</p>
                          <div className='flex gap-4 items-center mt-8'>
                            <motion.a
                              href={feature.blogPostUrl}
                              target='_blank'
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center glass-effect rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg border border-white/10 hover:border-primary-purple/50 glow-effect transition-all"
                            >
                              Ler mais sobre o projeto
                              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </motion.a>
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link
                          href={feature.blogPostUrl}
                          target='_blank'
                          rel="noopener noreferrer"
                          className="block relative group"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple via-primary-pink to-primary-blue rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                          <div className="relative">
                            <Image
                              alt={feature.name}
                              src={feature.imageSrc}
                              className="w-full rounded-xl glass-effect object-cover cursor-pointer border border-white/10 group-hover:border-primary-purple/50 transition-all"
                              width={633}
                              height={230}
                              priority
                            />
                          </div>
                        </Link>
                      </motion.div>
                    </motion.div>
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
