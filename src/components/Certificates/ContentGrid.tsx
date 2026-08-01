"use client";

import { Certificate } from "@/pages/api/sectionCertificates";
import Image from "next/image";
import React, { useRef } from "react";
import { getBadgeConfig } from "./getBadgeConfig";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type ContentGridProps = {
  certificateData: Certificate[];
  openModal: (certificate_file_sync: string) => void;
};

export default function ContentGrid({ certificateData, openModal }: ContentGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!gridRef.current || prefersReducedMotion()) return;

      gsap.from(".certificate-grid-card", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
    >
      {Object.values(certificateData).map((certificate: Certificate) => {
        const badgeConfig = getBadgeConfig(certificate.certificate_category);

        return (
          <article
            key={certificate.certificate_id}
            className="certificate-grid-card flex cursor-pointer flex-col items-start justify-between rounded-3xl bg-gray-800 px-5 py-5 shadow-md shadow-gray-600 transition-colors hover:bg-gray-700"
            onClick={() => openModal(certificate.certificate_file_sync)}
          >
            <div className="relative mb-5 w-full cursor-pointer">
              <Image
                width={1024}
                height={720}
                src={certificate.certificate_file_sync}
                alt=""
                className="w-full cursor-pointer rounded-2xl bg-gray-100 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              <div className="absolute right-2 top-2 z-10">
                <span
                  className={`${badgeConfig.bgColor} ${badgeConfig.textColor} rounded-full px-3 py-1 text-xs font-semibold shadow-lg`}
                >
                  {badgeConfig.text}
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="group relative">
                <h3 className="mt-2 line-clamp-2 cursor-pointer text-center text-base font-semibold leading-6 text-white group-hover:text-gray-300">
                  {certificate.certificate_name}
                </h3>
                <p className="mt-2 cursor-pointer text-center text-sm font-light italic leading-6 text-white group-hover:text-gray-300">
                  {certificate.certificate_instructors}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-around gap-x-4 pb-2 text-xs">
                <time dateTime={certificate.certificate_date} className="text-gray-300">
                  {new Date(`${certificate.certificate_date}T00:00:00`).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
