"use client"

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Experience } from "@/pages/api/sectionsExperiences";
import { motion, useInView } from 'framer-motion';

const Experiences = (experienceData: Experience[]) => {
    const [showModal, setShowModal] = useState(false);
    const [showExperience, setShowExperience] = useState<any>();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    function formatarData(date: string) {
        const dataObjeto = new Date(date);
        const dia = String(dataObjeto.getDate()).padStart(2, '0');
        const mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${mes}/${ano}`;
    }

    const openModal = (experience: Experience) => {
        setShowExperience(experience);
        setShowModal(true);
        document.body.classList.add('overflow-hidden');
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove('overflow-hidden');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className="relative py-20 sm:py-32 overflow-hidden" id="experiencias">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/10 via-transparent to-transparent"></div>
            
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-base font-semibold leading-7 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
                        Minha jornada
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Experiências <span className="gradient-text">Profissionais</span>
                    </p>
                </motion.div>
                
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3"
                >
                    {Object.values(experienceData).map((experience: Experience) => (
                        <motion.article 
                            key={experience.experience_id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            onClick={() => openModal(experience)}
                            className="flex flex-col glass-effect rounded-2xl p-6 border border-white/10 cursor-pointer group hover:border-primary-purple/50 transition-all"
                        >
                            <div className="flex items-center gap-x-4 text-xs w-full">
                                {experience.experience_date_end === null ? (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-400">
                                            {formatarData(experience.experience_date_start)} - Atual
                                        </p>
                                        <span className="flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium text-white bg-green-500/20 ring-1 ring-inset ring-green-500/30">
                                            <svg className="h-1.5 w-1.5 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                            online
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-400">
                                            {formatarData(experience.experience_date_start)} - {formatarData(experience.experience_date_end)}
                                        </p>
                                        <span className="flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium text-white bg-red-500/20 ring-1 ring-inset ring-red-500/30">
                                            <svg className="h-1.5 w-1.5 fill-red-400" viewBox="0 0 6 6" aria-hidden="true">
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                            offline
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="relative mt-6 flex items-center gap-x-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-primary-purple/50 transition-all">
                                    <Image 
                                        width={48} 
                                        height={48} 
                                        src={experience.experience_company_avatar_sync} 
                                        alt={experience.experience_company_name}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-white group-hover:text-primary-purple transition-colors">
                                        {experience.experience_company_name}
                                    </p>
                                    <p className="text-gray-400">{experience.experience_position}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm" 
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full sm:w-4/5 2xl:w-2/6 relative p-8 rounded-2xl border border-white/20 glass-effect max-h-[90vh] overflow-auto m-4" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div>
                                <div className="flex gap-x-4 items-center">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-purple/50">
                                        <Image 
                                            width={64} 
                                            height={64} 
                                            src={showExperience.experience_company_avatar_sync} 
                                            alt={showExperience?.experience_company_name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-xl font-semibold leading-6 text-white">{showExperience?.experience_company_name}</h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-400">{showExperience?.experience_location}</p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-white/10">
                                    <dl className="divide-y divide-white/10">
                                        {[
                                            { label: "Nome da empresa:", value: showExperience?.experience_company_name },
                                            { 
                                                label: "Site da empresa:", 
                                                value: (
                                                    <a href={showExperience?.experience_company_website} target='_blank' className="text-primary-purple hover:text-primary-pink transition-colors underline">
                                                        {showExperience?.experience_company_website}
                                                    </a>
                                                )
                                            },
                                            { label: "Cargo:", value: showExperience?.experience_position },
                                            { label: "Modelo de Atuação:", value: showExperience?.experience_operating_model },
                                            {
                                                label: "Inicio:",
                                                value: new Date(`${showExperience?.experience_date_start}T00:00:00`).toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                            },
                                            {
                                                label: "Saida:",
                                                value: showExperience.experience_date_end !== null
                                                    ? new Date(`${showExperience?.experience_date_end}T00:00:00`).toLocaleDateString('pt-BR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })
                                                    : "-"
                                            },
                                            { label: "Sobre:", value: showExperience?.experience_about },
                                        ].map((item, index) => (
                                            <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-white">{item.label}</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                    {item.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>

                                    <motion.button 
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={closeModal} 
                                        className="absolute top-4 right-4 p-2 rounded-full glass-effect text-white shadow-md border border-white/10 hover:border-primary-purple/50 transition-all"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Experiences;
