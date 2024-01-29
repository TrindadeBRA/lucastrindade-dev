import Image from 'next/image';
import React, { useState } from 'react';
import { Experience } from "@/pages/api/sectionsExperiences";


const Experiences = (experienceData: Experience[]) => {

    const [showModal, setShowModal] = useState(false);
    const [showExperience, setShowExperience] = useState<any>();

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

    return (
        <div className="bg-gradient-to-t from-gray-950 to-gray-900 py-14 sm:py-20" id="experiencias">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Minha jornada</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Experiencias Profissionais</p>
                </div>
                <div className="mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 dark:border-gray-700 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 justify-items-center">
                    {Object.values(experienceData).map((experience: Experience) => (
                        <article key={experience.experience_id} className="flex flex-col items-start justify-between bg-gray-900 p-6 rounded-2xl border border-gray-600 cursor-pointer w-full hover:bg-gray-800" onClick={() => openModal(experience)}>
                            <div className="flex items-center gap-x-4 text-xs w-full">
                                {experience.experience_date_end === null ? (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-500">{formatarData(experience.experience_date_start)} - {experience.experience_date_end ? formatarData(experience.experience_date_end) : "Atual"}</p>
                                        <span className="flex items-center gap-x-1.5 rounded-md px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-700">
                                            <svg className="h-1.5 w-1.5 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                            online
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-500">{formatarData(experience.experience_date_start)} - {formatarData(experience.experience_date_end)}</p>
                                        <span className="flex items-center gap-x-1.5 rounded-md px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-700">
                                            <svg className="h-1.5 w-1.5 fill-red-800" viewBox="0 0 6 6" aria-hidden="true">
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                            offline
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="relative mt-4 flex items-center gap-x-4">
                                <Image width={40} height={40} src={experience.experience_company_avatar_url} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-white">
                                        <span className="absolute inset-0" />
                                        {experience.experience_company_name}
                                    </p>
                                    <p className="text-gray-400">{experience.experience_position}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                        <div className="w-full sm:w-4/5 2xl:w-2/6 relative p-8 rounded-2xl border border-gray-600 opacity-100 bg-gray-900 max-h-full overflow-scroll">
                            <div>
                                <div className="flex gap-x-4 items-center">
                                    <Image width={50} height={50} src={showExperience.experience_company_avatar_url} alt="" className="h-12 w-12 rounded-full bg-black" />
                                    <div className="px-4 sm:px-0 ">
                                        <h3 className="text-base font-semibold leading-4 text-white">{showExperience?.experience_company_name}</h3>
                                        <p className="mt-1 max-w-2xl text-sm leading-4 text-gray-400">{showExperience?.experience_location}</p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-white/10">
                                    <dl className="divide-y divide-white/10">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Nome da empresa:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience?.experience_company_name}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Site da empresa:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 underline sm:col-span-2 sm:mt-0">
                                                <a href={showExperience?.experience_company_website} target='_blank'>{showExperience?.experience_company_website}</a>
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Cargo:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience?.experience_position}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Modelo de Atuação:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience?.experience_operating_model}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Inicio:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                {new Date(`${showExperience?.experience_date_start}T00:00:00`).toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Saida:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                {showExperience.experience_date_end !== null ?
                                                    new Date(`${showExperience?.experience_date_end}T00:00:00`).toLocaleDateString('pt-BR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })
                                                    : "-"
                                                }
                                            </dd>
                                        </div>

                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Sobre:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience?.experience_about}</dd>
                                        </div>
                                    </dl>
                                    {/* Botão Desktop */}
                                    <button onClick={closeModal} className="absolute top-0 right-0 m-4 p-2 rounded-full bg-white text-gray-800 shadow-md hidden sm:block">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Botao Mobile */}
                        <button onClick={closeModal} className="absolute top-0 right-0 m-4 p-2 rounded-full bg-white text-gray-800 shadow-md sm:hidden">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Experiences;
