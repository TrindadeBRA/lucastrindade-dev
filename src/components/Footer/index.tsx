"use client";

import { type MouseEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const Footer = () => {
  const sectionRef = useScrollReveal();

  const navigation = {
    main: [
      { name: "Apresentação", href: "#apresentacao" },
      { name: "Skills", href: "#skills" },
      { name: "Certificados", href: "#certificados" },
      { name: "Experiências Profissionais", href: "#experiencias" },
      { name: "Projetos Pessoais", href: "#projetos" },
    ],
  };

  const currentYear = new Date().getFullYear();

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    registerGsap();
    if (prefersReducedMotion()) {
      target.scrollIntoView();
      return;
    }

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 72 },
      ease: "power3.inOut",
    });
  };

  return (
    <footer ref={sectionRef} className="bg-gray-950">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-1 text-center sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
          data-reveal="item"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6" data-reveal="item">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm leading-6 text-gray-300 transition-colors hover:text-indigo-300"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-400" data-reveal="title">
          &copy; {currentYear} Lucas Trindade, Todos direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
