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
      scrollTo: { y: target, offsetY: 88 },
      ease: "power3.inOut",
    });
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-chrome py-4">
      <nav className="site-container flex items-center justify-between" aria-label="Global">
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="nav-anim">
          <span className="font-display text-lg font-medium tracking-tight text-content-inverse">
            Lucas Trindade
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-anim text-sm text-content-inverse-muted transition hover:text-content-inverse"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://api.whatsapp.com/send?phone=5511952498126"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-anim btn-invert"
          >
            <span>Contato</span>
          </a>
        </div>

        <button
          type="button"
          className="nav-anim rounded-full p-2 text-content-inverse lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Abrir menu</span>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-chrome/80" />
        <Dialog.Panel className="fixed inset-0 z-50 flex flex-col bg-chrome">
          <div className="flex items-center justify-between bg-brand-dark px-6 py-4">
            <span className="font-display text-lg font-medium text-content-inverse">
              Lucas Trindade
            </span>
            <button
              type="button"
              className="rounded-full p-2 text-content-inverse"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="grid flex-1 grid-cols-1 content-start gap-1 bg-brand-soft p-4 sm:grid-cols-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-2xl px-4 py-6 font-display text-4xl font-medium tracking-tight text-content-inverse transition hover:bg-brand-strong"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="border-t border-white/10 p-6">
            <Link
              href="https://api.whatsapp.com/send?phone=5511952498126"
              target="_blank"
              className="btn-invert"
            >
              <span>Contato</span>
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
