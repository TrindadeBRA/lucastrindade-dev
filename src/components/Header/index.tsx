"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function Header() {
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
        clearProps: "opacity,transform",
      });
    },
    { scope: headerRef }
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
      duration: 0.95,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 h-[4.75rem] border-b border-white/5 bg-ink/80 backdrop-blur-xl"
    >
      <nav className="site-container flex h-full items-center justify-between gap-3" aria-label="Global">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="nav-anim group min-w-0 shrink"
        >
          <span className="block truncate font-display text-base font-semibold tracking-tight text-chalk transition group-hover:text-white sm:text-lg">
            Lucas Trindade
          </span>
        </a>

        <div className="nav-anim flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/resume"
            target="_blank"
            className="btn-ghost px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Currículo
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=5511952498126"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            aria-label="Contato no WhatsApp"
          >
            <FaWhatsapp size={15} />
            <span>Contato</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
