'use client';

import React from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { CertificationType } from '@/types';

interface QualitySafetySectionProps {
  certifications?: CertificationType[];
}

export default function QualitySafetySection({ certifications = [] }: QualitySafetySectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const safeCerts = Array.isArray(certifications) ? certifications : [];
  const isoCerts = safeCerts.filter((c) => c.type === 'iso');
  const awards = safeCerts.filter((c) => c.type === 'award');

  return (
    <section id="quality" className="py-20 bg-[#fbf9f6] dark:bg-[#13171b] border-b border-slate-200 dark:border-[#2a313a]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
            <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
              {dict.quality.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {dict.quality.title}
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
            {dict.quality.subtitle}
          </p>
        </div>

        {/* 1. ISO Triple Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isoCerts.map((cert, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#0c0e10] p-5 rounded-lg shadow-2xs space-y-3 flex flex-col justify-between group hover:border-[#937338] dark:hover:border-[#c5a869]/50 card-hover-effect transition-all"
            >
              <div className="bg-slate-50 dark:bg-[#13171b] p-2 border border-slate-200 dark:border-[#2a313a] h-56 rounded-md flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={lang === 'ar' ? cert.titleAr : cert.titleEn}
                  className="h-full w-auto object-contain img-zoom"
                  onClick={() =>
                    openLightbox(
                      cert.image,
                      `${lang === 'ar' ? cert.titleAr : cert.titleEn} (${cert.certNumber})`
                    )
                  }
                />
              </div>

              <div>
                <span className="text-[10px] font-technical text-[#937338] dark:text-[#c5a869] font-bold block">
                  {cert.certNumber}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors">
                  {lang === 'ar' ? cert.titleAr : cert.titleEn}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  {lang === 'ar' ? cert.descriptionAr : cert.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Kent & Aramco Awards and PTW Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#0c0e10] p-5 rounded-lg shadow-2xs flex flex-col sm:flex-row items-center gap-4 group hover:border-[#937338] dark:hover:border-[#c5a869]/50 card-hover-effect transition-all"
            >
              <div className="bg-slate-50 dark:bg-[#13171b] p-1.5 border border-slate-200 dark:border-[#2a313a] w-40 shrink-0 rounded flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={award.image}
                  alt={lang === 'ar' ? award.titleAr : award.titleEn}
                  className="w-full h-auto object-contain img-zoom"
                  onClick={() => openLightbox(award.image, lang === 'ar' ? award.titleAr : award.titleEn)}
                />
              </div>

              <div className="space-y-1 text-center sm:text-start flex-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-[#13171b] text-[#0f382a] dark:text-[#c5a869] text-[10px] font-technical font-bold uppercase rounded border border-slate-200 dark:border-[#2a313a] inline-block">
                  {lang === 'ar' ? award.badgeAr || 'اعتماد رسمي' : award.badgeEn || 'Verified Award'}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors">
                  {lang === 'ar' ? award.titleAr : award.titleEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {lang === 'ar' ? award.descriptionAr : award.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
