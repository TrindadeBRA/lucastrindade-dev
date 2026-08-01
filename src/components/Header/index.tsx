"use client";

import { useState, useRef, type MouseEvent } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const navigation = [
  { name: "Projetos", href: "#projetos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Experiência", href: "#experiencia" },
  { name: "Skills", href: "#skills" },
  { name: "Estudos", href: "#estudos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!headerRef.current || prefersReducedMotion()) return;
      gsap.from(".nav-anim", {
        y: -16,
        opacity: 0,
        stagger: 0.05,
        duration: 0.55,
        delay: 0.1,
      });
    },
    { scope: headerRef }
  );

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    registerGsap();
    if (prefersReducedMotion()) {
      target.scrollIntoView();
      return;
    }
    gsap.to(window, {
      duration: 0.95,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-xl"
    >
      <nav className="site-container flex items-center justify-between py-4" aria-label="Global">
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="nav-anim group">
          <span className="font-display text-lg font-semibold tracking-tight text-chalk transition group-hover:text-lime">
            Lucas Trindade
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-anim text-sm text-chalk-muted transition hover:text-chalk"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://api.whatsapp.com/send?phone=5511952498126"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-anim btn-primary"
          >
            Contato
          </a>
        </div>

        <button
          type="button"
          className="nav-anim rounded-md p-2 text-chalk lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Abrir menu</span>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-ink/70" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-ink-soft p-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-chalk">Lucas Trindade</span>
            <button type="button" className="p-2 text-chalk-muted" onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-display text-2xl text-chalk"
              >
                {item.name}
              </a>
            ))}
            <Link
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              className="btn-primary mt-4 w-fit"
            >
              Contato
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
