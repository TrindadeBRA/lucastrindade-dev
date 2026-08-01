"use client";

import { Profile } from "@/pages/api/sectionProfile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const Presentation = (profileData: Profile) => {
  const sectionRef = useScrollReveal();
  const paragraphs =
    profileData?.user_presentation?.[0]?.plain_text
      ?.split("\n")
      .map((p: string) => p.trim())
      .filter(Boolean) || [];

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion()) return;
      if (window.innerWidth < 1024) return;

      gsap.to(".about-sticky", {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=100",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="sobre" className="border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="about-sticky lg:sticky lg:top-32 lg:self-start">
          <p className="section-label" data-reveal="title">
            Sobre
          </p>
          <h2 className="section-title mt-4" data-reveal="title">
            Um pouco sobre mim
          </h2>
          <div className="mt-8 h-px w-16 origin-left bg-lime" data-reveal="from-left" />
        </div>

        <div className="space-y-8">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="max-w-2xl text-lg leading-8 text-chalk-muted sm:text-xl sm:leading-9"
                data-reveal="fade-up"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-chalk-muted" data-reveal="fade-up">
              Conteúdo de apresentação em breve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Presentation;
