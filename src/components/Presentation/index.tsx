"use client";

import { Profile } from "@/pages/api/sectionProfile";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Presentation = (profileData: Profile) => {
  const sectionRef = useScrollReveal();
  const paragraphs =
    profileData?.user_presentation?.[0]?.plain_text
      ?.split("\n")
      .map((p: string) => p.trim())
      .filter(Boolean) || [];

  return (
    <section ref={sectionRef} id="sobre" className="bg-surface-base py-20 sm:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-label" data-reveal="title">
            Quem sou eu
          </p>
          <h2 className="section-title mt-3" data-reveal="title">
            Um pouco sobre mim
          </h2>
        </div>

        <div className="space-y-7">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="max-w-2xl text-base leading-8 text-content-secondary sm:text-xl sm:leading-9"
                data-reveal="fade-up"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-content-secondary" data-reveal="fade-up">
              Conteúdo de apresentação em breve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Presentation;
