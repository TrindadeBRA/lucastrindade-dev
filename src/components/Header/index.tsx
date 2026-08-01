"use client";

import { useState, useRef, type MouseEvent } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const navigation = [
  { name: "Apresentação", href: "#apresentacao" },
  { name: "Skills", href: "#skills" },
  { name: "Certificados", href: "#certificados" },
  { name: "Experiências Profissionais", href: "#experiencias" },
  { name: "Projetos Pessoais", href: "#projetos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!headerRef.current || prefersReducedMotion()) return;

      gsap.from(".nav-link", {
        y: -12,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        delay: 0.15,
      });

      gsap.from(".nav-logo", {
        x: -20,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".nav-social a", {
        x: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        delay: 0.2,
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
      duration: 1,
      scrollTo: { y: target, offsetY: 72 },
      ease: "power3.inOut",
    });
  };

  return (
    <>
      <Head>
        <title>Lucas Trindade - Desenvolvedor Fullstack</title>
        <meta property="og:url" content="https://lucastrindade.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lucas Trindade - Desenvolvedor Full Stack" />
      </Head>

      <header ref={headerRef} className="sticky top-0 z-40 border-b border-white/5 bg-gray-900/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="nav-logo flex lg:flex-1">
            <span className="-m-1.5 max-w-[180px] p-1.5">
              <Image src="/images/logo/LucasTrindade.png" alt="Logo" width={200} height={100} />
            </span>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link group relative text-sm font-semibold leading-6 text-white transition-colors hover:text-indigo-300"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-indigo-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="nav-social hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank">
                <FaLinkedin className="text-white transition-colors hover:text-indigo-300" size={20} />
              </Link>
              <Link href="https://github.com/TrindadeBRA/" target="_blank">
                <FaGithub className="text-white transition-colors hover:text-indigo-300" size={20} />
              </Link>
              <Link href="https://api.whatsapp.com/send?phone=5511952498126" target="_blank">
                <FaWhatsapp className="text-white transition-colors hover:text-indigo-300" size={20} />
              </Link>
            </div>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <span className="-m-1.5 p-1.5">
                <Image src="/images/logo/LucasTrindade.png" alt="Logo" width={200} height={100} />
              </span>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex gap-4">
                    <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank">
                      <FaLinkedin className="text-white hover:text-indigo-300" size={24} />
                    </Link>
                    <Link href="https://github.com/TrindadeBRA/" target="_blank">
                      <FaGithub className="text-white hover:text-indigo-300" size={24} />
                    </Link>
                    <Link href="https://api.whatsapp.com/send?phone=5511952498126" target="_blank">
                      <FaWhatsapp className="text-white hover:text-indigo-300" size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
