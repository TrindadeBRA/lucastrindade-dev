"use client";

import { type MouseEvent } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";

const links = [
  { name: "Projetos", href: "#projetos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Experiência", href: "#experiencia" },
  { name: "Skills", href: "#skills" },
  { name: "Estudos", href: "#estudos" },
];

const Footer = () => {
  const sectionRef = useScrollReveal();
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || prefersReducedMotion()) return;

      gsap.from(".footer-word", {
        yPercent: 120,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-headline",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

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
      scrollTo: { y: target, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <footer ref={sectionRef} className="relative overflow-hidden border-t border-white/5 bg-ink">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-[90px]" />
      <div className="site-container py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="footer-headline font-display text-4xl font-semibold tracking-tighter2 text-chalk sm:text-6xl">
              <span className="inline-block overflow-hidden pb-1">
                <span className="footer-word inline-block">Vamos</span>
              </span>{" "}
              <span className="inline-block overflow-hidden pb-1">
                <span className="footer-word inline-block">construir</span>
              </span>
              <br />
              <span className="inline-block overflow-hidden pb-1">
                <span className="footer-word inline-block text-chalk-muted">algo</span>
              </span>{" "}
              <span className="inline-block overflow-hidden pb-1">
                <span className="footer-word inline-block text-chalk-muted">juntos?</span>
              </span>
            </p>
            <a
              ref={ctaRef}
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-10 hover:bg-white hover:text-ink"
            >
              Fale comigo
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2" data-reveal="item">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-chalk-dim">Navegação</p>
              <ul className="mt-4 space-y-3">
                {links.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-sm text-chalk-muted transition hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-chalk-dim">Links</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/resume" target="_blank" className="text-chalk-muted transition hover:text-white">
                    Currículo
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/TrindadeBRA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chalk-muted transition hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/trindadebra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chalk-muted transition hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-xs text-chalk-dim sm:flex-row"
          data-reveal="item"
        >
          <p>© {year} Lucas Trindade. Todos os direitos reservados.</p>
          <p>Full Stack · Mogi-Mirim, SP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
