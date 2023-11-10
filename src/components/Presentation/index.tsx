import React from 'react';
import { format } from 'date-fns';
import { myAge } from './data';

const Presentation = () => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20" id="apresentacao">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="text-base font-semibold leading-7 text-indigo-600">Um pouco sobre mim</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Apresentação</h1>
          <div className="mt-10 flex flex-col gap-4 text-base leading-7 text-white lg:max-w-none lg:grid-cols-2">
            <p>Olá, meu nome é <b>Lucas Trindade</b> e sou um <b>desenvolvedor full-stack</b> apaixonado por tecnologia. Com <b>{myAge} anos</b> de idade, atualmente moro em <b>Santo André - SP</b> e sou <b>graduado</b> em <b>Análise e Desenvolvimento de Sistemas</b> pela <b>Universidade Paulista</b>.</p>
            <p>Minha <b>trajetória como desenvolvedor iniciou em 2016</b>, em agências de marketing, onde trabalhei por quase 6 anos. <b>Em 2022</b>, tive a oportunidade de ingressar em <b>uma tech-house especializada no desenvolvimento de softwares de alto nível</b>, e foi nesse ambiente que minha paixão pela programação <b>realmente floresceu!</b></p>
            <p>Atualmente, estou <b>buscando novos desafios profissionais</b> e tenho interesse em atuar em projetos envolvendo <b>PHP ou Javascript</b>, embora esteja <b>aberto a outras oportunidades</b> que possam ampliar minha experiência.</p>
          </div>
          {/* <div className="mt-10 flex">
            <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Presentation;
