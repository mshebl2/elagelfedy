'use client';

import React, { useState } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { CertificationType } from '@/types';
import { INITIAL_ARTICLES } from '@/lib/initialData';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  Maximize2,
  Building2,
  CheckCircle2,
  FileText,
  BadgeCheck,
  Sparkles
} from 'lucide-react';

interface QualityCertificationsSectionProps {
  certifications?: CertificationType[];
}

export default function QualityCertificationsSection({ certifications = [] }: QualityCertificationsSectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const [activeTab, setActiveTab] = useState<'all' | 'iso' | 'credentials' | 'articles'>('all');

  const safeCerts = Array.isArray(certifications) ? certifications : [];
  const isoCerts = safeCerts.filter((c) => c.type === 'iso');
  const credentialCerts = safeCerts.filter((c) => c.type === 'credential');

  return (
    <section id="certifications" className="py-24 bg-gradient-to-b from-white via-[#fcfbf9] to-slate-50 dark:from-[#0c0e10] dark:via-[#0f1216] dark:to-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/80 transition-colors duration-300 relative overflow-hidden">
      {/* Background Subtle Tech Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f382a_1px,transparent_1px)] dark:bg-[radial-gradient(#c5a869_1px,transparent_1px)] opacity-[0.03] dark:opacity-[0.04] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200/80 dark:border-[#2a313a] gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/5 dark:bg-[#c5a869]/10 border border-emerald-800/15 dark:border-[#c5a869]/30 mb-3">
              <span className="w-2 h-2 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-full animate-pulse"></span>
              <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                {lang === 'ar' ? 'الجودة والسلامة والاعتمادات الرسمية' : 'QHSE & OFFICIAL ACCREDITATIONS'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {lang === 'ar' ? 'منظومة الجودة والاعتمادات الحكومية' : 'Quality Management & Verified Credentials'}
            </h2>
            <p className="text-sm font-technical text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {lang === 'ar'
                ? 'شهادات الآيزو الثلاثية المعتمدة دولياً، والتراخيص التجارية والسجلات الرسمية الصادرة من الجهات الحكومية بالمملكة.'
                : 'Triple ISO certifications, statutory governance, commercial registrations, and high-compliance governmental authorizations.'}
            </p>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-end">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical transition-all ${
                activeTab === 'all'
                  ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#222830]'
              }`}
            >
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setActiveTab('iso')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical transition-all ${
                activeTab === 'iso'
                  ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#222830]'
              }`}
            >
              {lang === 'ar' ? 'شهادات ISO والسلامة' : 'ISO & QHSE'}
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical transition-all ${
                activeTab === 'credentials'
                  ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#222830]'
              }`}
            >
              {lang === 'ar' ? 'السجلات والتراخيص الحكومية' : 'Official Registries'}
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical transition-all ${
                activeTab === 'articles'
                  ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#222830]'
              }`}
            >
              {lang === 'ar' ? 'عقد التأسيس والقرارات' : 'Articles of Association'}
            </button>
          </div>
        </div>

        {/* 1. Triple ISO Certifications (Quality, Environment, Safety) */}
        {(activeTab === 'all' || activeTab === 'iso') && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 dark:border-[#2a313a] pb-2">
              <ShieldCheck className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide font-heading">
                {lang === 'ar' ? 'شهادات الآيزو الدولية المعتمدة' : 'Triple ISO Certifications (Quality, Eco, OHS)'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isoCerts.map((cert, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] p-5 rounded-2xl shadow-sm hover:border-[#937338] dark:hover:border-[#c5a869] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => openLightbox(cert.image, `${lang === 'ar' ? cert.titleAr : cert.titleEn} (${cert.certNumber})`)}
                >
                  <div className="space-y-4">
                    {/* Image / Certificate Preview Container */}
                    <div className="bg-slate-50 dark:bg-[#0c0e10] p-3 border border-slate-100 dark:border-[#2a313a] rounded-xl relative overflow-hidden flex items-center justify-center h-64">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.image}
                        alt={lang === 'ar' ? cert.titleAr : cert.titleEn}
                        className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs rounded-xl">
                        <span className="px-3 py-1.5 bg-white text-slate-900 dark:bg-[#0c0e10] dark:text-white rounded-lg text-xs font-technical font-bold flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'تكبير الشهادة' : 'Zoom Certificate'}</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-technical text-[#937338] dark:text-[#c5a869] font-extrabold uppercase">
                          {cert.certNumber}
                        </span>
                        <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                          {lang === 'ar' ? cert.badgeAr || 'معتمد' : cert.badgeEn || 'Certified'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors leading-snug">
                        {lang === 'ar' ? cert.titleAr : cert.titleEn}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed">
                        {lang === 'ar' ? cert.descriptionAr : cert.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2a313a] flex items-center justify-between text-xs font-technical text-slate-500 dark:text-zinc-400">
                    <span>{lang === 'ar' ? cert.issuerAr : cert.issuerEn}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'ساري المفعول' : 'Active'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Official Registry & Governance Cards (Commerce, ZATCA, SPL, GOSI) */}
        {(activeTab === 'all' || activeTab === 'credentials') && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 dark:border-[#2a313a] pb-2">
              <Building2 className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide font-heading">
                {lang === 'ar' ? 'السجلات الرسمية والتراخيص الحكومية المعتمدة' : 'Official Government Registrations & Statutory Licenses'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentialCerts.map((cred, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] p-5 rounded-2xl shadow-sm hover:border-[#937338] dark:hover:border-[#c5a869] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => openLightbox(cred.image, lang === 'ar' ? cred.titleAr : cred.titleEn)}
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-technical text-[#0f382a] dark:text-[#c5a869] uppercase font-extrabold block">
                      {lang === 'ar' ? cred.issuerAr : cred.issuerEn}
                    </span>

                    <div className="bg-slate-50 dark:bg-[#0c0e10] p-2 border border-slate-100 dark:border-[#2a313a] rounded-xl relative overflow-hidden flex items-center justify-center h-44">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cred.image}
                        alt={lang === 'ar' ? cred.titleAr : cred.titleEn}
                        className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs rounded-xl">
                        <span className="px-2.5 py-1 bg-white text-slate-900 dark:bg-[#0c0e10] dark:text-white rounded-md text-[10px] font-technical font-bold flex items-center gap-1 shadow-md">
                          <Maximize2 className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'تكبير' : 'Zoom'}</span>
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors leading-snug">
                      {lang === 'ar' ? cred.titleAr : cred.titleEn}
                    </h4>
                  </div>

                  {cred.detailsAr && cred.detailsAr.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#2a313a] space-y-1 text-[11px] font-technical text-slate-600 dark:text-zinc-400">
                      {(lang === 'ar' ? cred.detailsAr : cred.detailsEn || cred.detailsAr).map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center justify-between">
                          <span className="text-slate-500 dark:text-zinc-400">{detail.label}:</span>
                          <strong className="text-slate-900 dark:text-white font-semibold">
                            {detail.value}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Official Articles of Association Pages & Qualifications */}
        {(activeTab === 'all' || activeTab === 'articles') && (
          <div className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 dark:border-[#2a313a] pb-4 mb-6 gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase font-heading">
                  {lang === 'ar' ? 'عقد التأسيس والقرارات الرسمية المعتمدة' : 'Official Articles of Association & Qualification Deeds'}
                </h3>
              </div>
              <span className="text-xs font-technical text-[#937338] dark:text-[#c5a869] font-bold px-2.5 py-1 bg-[#937338]/10 dark:bg-[#c5a869]/10 rounded-md border border-[#937338]/20">
                {lang === 'ar' ? '6 وثائق رسمية معتمدة' : '6 Verified Deeds'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {INITIAL_ARTICLES.map((art, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-[#2a313a] p-2 bg-slate-50 dark:bg-[#0c0e10] rounded-xl text-center cursor-pointer hover:border-[#937338] dark:hover:border-[#c5a869] transition-all hover:scale-105 group"
                  onClick={() => openLightbox(art.image, lang === 'ar' ? art.titleAr : art.titleEn)}
                >
                  <div className="h-32 w-full bg-white dark:bg-[#13171b] rounded-lg p-1.5 mb-2 flex items-center justify-center overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.image}
                      alt={lang === 'ar' ? art.titleAr : art.titleEn}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-technical text-slate-800 dark:text-zinc-200 font-semibold block truncate">
                    {lang === 'ar' ? art.titleAr : art.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
