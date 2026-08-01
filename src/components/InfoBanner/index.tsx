"use client";

import { useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export default function InfoBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!bannerRef.current || prefersReducedMotion()) return;

      gsap.from(bannerRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: bannerRef }
  );

  const dismiss = () => {
    if (!bannerRef.current || prefersReducedMotion()) {
      setVisible(false);
      return;
    }

    gsap.to(bannerRef.current, {
      height: 0,
      opacity: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="relative isolate flex items-center gap-x-6 overflow-hidden border-y border-gray-800 bg-gradient-to-r from-gray-950 to-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
    >
      <p className="text-center text-sm/6 text-white">
        Prefere uma versão para impressão do meu currículo?{" "}
        <Link
          href="/resume"
          target="_blank"
          className="ml-4 whitespace-nowrap font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Baixar versão PDF&nbsp;<span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={dismiss}
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Fechar</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
}
