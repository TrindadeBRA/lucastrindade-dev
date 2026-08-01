"use client";

import { Profile } from "@/pages/api/sectionProfile";
import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Presentation = (profileData: Profile) => {
  const sectionRef = useScrollReveal();

  return (
    <div ref={sectionRef} className="bg-gray-900 py-14 sm:py-20" id="apresentacao">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="text-base font-semibold leading-7 text-indigo-400" data-reveal="title">
            Um pouco sobre mim
          </p>
          <h1
            className="mb-10 mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            data-reveal="title"
          >
            Apresentação
          </h1>
          <div className="space-y-4">
            {profileData?.user_presentation?.[0]?.plain_text
              ?.split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="text-white/90 leading-7" data-reveal="from-left">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
