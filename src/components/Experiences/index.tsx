"use client"

import Image from 'next/image';
import React, { useState } from 'react';

const Experiences = () => {
    const [showModal, setShowModal] = useState(false);
    const [showExperience, setShowExperience] = useState<any>({});

    interface Experience {
        id: number;
        company_name: string;
        company_website: string;
        imageUrl: string;
        role: string;
        admission_date: string;
        departure_date: string;
        contract_type: string;
        company_location: string;
        about: string;
        activities: string[];
    }
    
    const professionalExperiences: Experience[] = [
        {
            id: 1,
            company_name: "UDS Soluçôes",
            company_website: "https://uds.com.br",
            imageUrl: "/experiences/company-logo/uds-logo.webp",
            role: "Desenvolvedor Full-Stack Pleno",
            admission_date: "2022-03-16",
            departure_date: "Atual",
            contract_type: "Remoto",
            company_location: "Maringá / PR",
            about: "Em março de 2022, integrei a equipe da UDS em um projeto envolvendo WordPress e Vue.js, desenvolvendo uma plataforma de cursos odontológicos para uma renomada faculdade no Rio de Janeiro. A plataforma incluiu recursos como integração com Hotmart e foi completamente gerenciada pelo WordPress. Após a conclusão bem-sucedida deste projeto, em junho de 2023, participei de um novo desafio: um projeto significativo para um jornal de grande renome. Neste projeto, utilizamos WordPress como sistema de gerenciamento de conteúdo e Next.js como o frontend.",
            activities: [
                "Stacks: WordPress e React/Vue",
                "Metodologia ágil: SCRUM",
                "Desenvolvimento em (WP / PHP / Laravel / Vue.js)",
                "Desenvolvimento de layouts (Figma)",
                "Jira / Bitbucket",
                "Correção de bugs",
            ],
        },
        {
            id: 2,
            company_name: "Trinity Web",
            company_website: "https://thetrinityweb.com.br/",
            imageUrl: "/experiences/company-logo/tw-logo.webp",
            role: "Proprietário",
            admission_date: "2019-01-11",
            departure_date: "Atual",
            contract_type: "Remoto",
            company_location: "São Paulo / SP",
            about: "Criei a Trinity Web com o objetivo de aplicar todo o conhecimento que acumulei ao longo dos anos. Além disso, esse é o nome que utilizo em todos os meus trabalhos como freelancer. Através da Trinity Web, consigo colocar em prática as habilidades e a experiência que adquiri, oferecendo serviços de alta qualidade aos meus clientes. Essa iniciativa não apenas me permite expressar minha paixão pelo desenvolvimento web, mas também me dá a liberdade criativa e a autonomia para colaborar em uma variedade de projetos estimulantes.",
            activities: [
                "WebSites",
                "Blogs",
                "Softwares",
            ],
        },
        {
            id: 3,
            company_name: "8D Propaganda",
            company_website: "https://8dpro.com/",
            imageUrl: "/experiences/company-logo/8d-logo.webp",
            role: "Desenvolvedor Front-End",
            admission_date: "2021-01-01",
            departure_date: "2022-05-01",
            contract_type: "Remoto",
            company_location: "Belo Horizonte / MG",
            about: "Durante minha passagem pela 8DPRO como Desenvolvedor Front-End, estive profundamente envolvido em uma variedade de tarefas cruciais. Isso incluiu o desenvolvimento e manutenção contínua de websites, onde garanti que cada site fosse funcional e visualmente atraente. Além disso, fui responsável por criar temas personalizados no WordPress, adicionando uma dimensão de originalidade aos projetos. Minha atuação se estendeu ao âmbito do marketing digital, onde desenvolvi emaiil marketing altamente persuasivos. Garantindo um processo sem complicações e mínimo tempo de inatividade para nossos clientes.",
            activities: [
                "Desenvolvimento de WebSites (WP / HTML / PHP);",
                "Manutenção de WebSites (WP / HTML / PHP);",
                "Desenvolvimento de temas personalizados (WP);",
                "Desenvolvimento de email marketing;",
                "Transferência / Migrações de sites",
            ],
        },
        {
            id: 4,
            company_name: "Vollup Creative Agency",
            company_website: "https://vollup.com",
            imageUrl: "/experiences/company-logo/vollup-logo.webp",
            role: "Desenvolvedor Front-End",
            admission_date: "2019-07-01",
            departure_date: "2021-01-01",
            contract_type: "Híbrido",
            company_location: "São Paulo / SP",
            about: "Na Vollup, atuei como Desenvolvedor Front-End, criando e aprimorando websites usando WordPress, PHP e HTML/CSS. Fui responsável pela manutenção dos sites, desenvolvimento de temas personalizados para WordPress, Email marketings e transferência e backup de sites. Contribuí significativamente para o sucesso digital dos clientes, aplicando minhas habilidades técnicas e mantendo-me atualizado com as últimas tendências tecnológicas.",
            activities: [
                "Desenvolvimento de WebSites (WP / HTML / PHP);",
                "Manutenção de WebSites (WP / HTML / PHP);",
                "Desenvolvimento de temas personalizados (WP);",
                "Desenvolvimento de email marketing;",
                "Transferência / Migrações de sites",
            ],
        },
        {
            id: 5,
            company_name: "Adesse Marketing Digital",
            company_website: "https://adessemarketingdigital.com.br/",
            imageUrl: "/experiences/company-logo/adesse-logo.webp",
            role: "Estágiario",
            admission_date: "2017-07-01",
            departure_date: "2019-02-01",
            contract_type: "Presencial",
            company_location: "São Bernardo do Campo / SP",
            about: "Durante meu estágio, estive envolvido em diversas atividades essenciais para a empresa. Isso incluiu a criação e manutenção de websites usando WordPress, HTML e CSS, além de realizar backups regulares para garantir a segurança dos dados. Elaborei relatórios detalhados, gerenciei arquivos físicos, criei imagens para mídias sociais e cuidei da manutenção dos computadores da empresa. Minha contribuição foi fundamental para melhorar as operações da empresa e aprimorar minhas habilidades técnicas.",
            activities: [
                "Criação de WebSites (WordPress / HTML / PHP);",
                "Manutenção de WebSites (WordPress / HTML / PHP);",
                "Backup dos projetos (Via FTP / phpMyAdmin);",
                "Elaboração relatórios e planilhas de controle (Excel);",
                "Auxílio em arquivos de documentos;",
                "Distribuição de e-mails e correspondências;",
                "Solução de problemas para o cliente;",
                "Criação de Imagens para as Mídias Sociais;",
                "Manutenção nos Computadores"
            ],
        },
    ];

    const formatDate = (inputDate: any) => {
        const year = inputDate.slice(0, 4);
        const month = inputDate.slice(5, 7);
        
        return `${month}/${year}`;
    };

    const openModal = (experience: any) => {
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
                    {professionalExperiences.map((experience) => (
                        <article key={experience.id} className="flex flex-col items-start justify-between bg-gray-900 p-6 rounded-2xl border border-gray-600 cursor-pointer w-full hover:bg-gray-800" onClick={() => openModal(experience)}>
                            <div className="flex items-center gap-x-4 text-xs w-full">
                                {experience.departure_date === 'Atual' ? (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-500">{formatDate(experience.admission_date)} - {experience.departure_date}</p>
                                        <span className="flex items-center gap-x-1.5 rounded-md px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-700">
                                            <svg className="h-1.5 w-1.5 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                                                <circle cx="3" cy="3" r="3" />
                                            </svg>
                                            online
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center w-full justify-between">
                                        <p className="text-xs text-gray-500">{formatDate(experience.admission_date)} - {formatDate(experience.departure_date)}</p>
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
                                <Image width={40} height={40} src={experience.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-white">
                                        <span className="absolute inset-0" />
                                        {experience.company_name}
                                    </p>
                                    <p className="text-gray-400">{experience.role}</p>
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
                                    <Image width={50} height={50} src={showExperience.imageUrl} alt="" className="h-12 w-12 rounded-full bg-black" />
                                    <div className="px-4 sm:px-0 ">
                                        <h3 className="text-base font-semibold leading-4 text-white">{showExperience.company_name}</h3>
                                        <p className="mt-1 max-w-2xl text-sm leading-4 text-gray-400">{showExperience.company_location}</p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-white/10">
                                    <dl className="divide-y divide-white/10">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Nome da empresa:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience.company_name}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Site da empresa:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 underline sm:col-span-2 sm:mt-0">
                                                <a href={showExperience.company_website} target='_blank'>{showExperience.company_website}</a>
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Cargo:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience.role}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Modelo de Atuação:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{showExperience.contract_type}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Inicio:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                {formatDate(showExperience.admission_date)}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Saida:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                            {showExperience.departure_date !== "Atual" ? formatDate(showExperience.departure_date) : "-" }
                                            </dd>
                                        </div>

                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-white">Sobre:</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{ showExperience.about }</dd>
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
