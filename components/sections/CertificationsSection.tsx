'use client';

import React from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { CertificationType } from '@/types';
import { INITIAL_ARTICLES } from '@/lib/initialData';

interface CertificationsSectionProps {
  certifications?: CertificationType[];
}

export default function CertificationsSection({ certifications = [] }: CertificationsSectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const safeCerts = Array.isArray(certifications) ? certifications : [];
  const credentialCerts = safeCerts.filter((c) => c.type === 'credential');

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
            <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
              {dict.certifications.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {dict.certifications.title}
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
            {dict.certifications.subtitle}
          </p>
        </div>

        {/* 1. Official Registry Cards (Ministry of Commerce, ZATCA, SPL, GOSI) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {credentialCerts.map((cred, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-4 rounded-lg shadow-2xs space-y-2 flex flex-col justify-between group hover:border-[#937338] dark:hover:border-[#c5a869]/50 card-hover-effect transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-technical text-[#0f382a] dark:text-[#c5a869] uppercase font-bold block">
                  {lang === 'ar' ? cred.issuerAr : cred.issuerEn}
                </span>
                <div className="bg-slate-50 dark:bg-[#0c0e10] p-1 border border-slate-200 dark:border-[#2a313a] rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cred.image}
                    alt={lang === 'ar' ? cred.titleAr : cred.titleEn}
                    className="w-full h-24 object-contain img-zoom"
                    onClick={() =>
                      openLightbox(cred.image, lang === 'ar' ? cred.titleAr : cred.titleEn)
                    }
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors">
                  {lang === 'ar' ? cred.titleAr : cred.titleEn}
                </h4>
              </div>

              {cred.detailsAr && cred.detailsAr.length > 0 && (
                <div className="text-[10px] font-technical text-slate-600 dark:text-zinc-400 space-y-0.5 border-t border-slate-200 dark:border-[#2a313a] pt-1.5">
                  {(lang === 'ar' ? cred.detailsAr : cred.detailsEn || cred.detailsAr).map(
                    (detail, dIdx) => (
                      <p key={dIdx}>
                        {detail.label}:{' '}
                        <strong
                          className={
                            detail.value.includes('Active') ||
                            detail.value.includes('نشط') ||
                            detail.value.includes('أخضر') ||
                            detail.value.includes('Green')
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-900 dark:text-white'
                          }
                        >
                          {detail.value}
                        </strong>
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. Official Articles of Association Pages & Qualifications */}
        <div className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-5 rounded-lg shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2a313a] pb-2 mb-4">
            <span className="text-xs font-technical uppercase text-slate-900 dark:text-white font-bold">
              {dict.certifications.articlesTitle}
            </span>
            <span className="text-[10px] font-technical text-[#0f382a] dark:text-[#c5a869] font-bold">
              {dict.certifications.articlesBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {INITIAL_ARTICLES.map((art, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-[#2a313a] p-1.5 bg-slate-50 dark:bg-[#0c0e10] rounded-md text-center cursor-pointer hover:border-[#937338] dark:hover:border-[#c5a869]/50 transition-all hover:scale-105"
                onClick={() => openLightbox(art.image, lang === 'ar' ? art.titleAr : art.titleEn)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.image}
                  alt={lang === 'ar' ? art.titleAr : art.titleEn}
                  className="w-full h-20 object-contain bg-white dark:bg-[#13171b] rounded mb-1 img-zoom"
                />
                <span className="text-[9px] font-technical text-slate-700 dark:text-zinc-300 block truncate">
                  {lang === 'ar' ? art.titleAr : art.titleEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
