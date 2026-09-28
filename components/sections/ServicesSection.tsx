'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { ServiceType } from '@/types';
import {
  ArrowUpRight,
  Maximize2,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  Grid,
  ListFilter,
  ShieldCheck,
  ChevronRight,
  Compass
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceType[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const { lang, setSelectedServiceForRfq, openLightbox } = useApp();
  const dict = getDictionary(lang);
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const categories = [
    { id: 'all', labelAr: 'كافة الأنشطة (8 مجالات)', labelEn: 'All Disciplines (8)' },
    { id: 'trenchless', labelAr: 'الحفر والأنفاق الموجهة', labelEn: 'HDD & Microtunneling', codes: ['HDD-BORING', 'MICROTUNNELING', 'ROADS-HIGHWAYS'] },
    { id: 'utilities', labelAr: 'شبكات المياه والمرافق الحضرية', labelEn: 'Water & Urban Utilities', codes: ['WATER-NETWORKS', 'SEWAGE-STORMWATER', 'REALESTATE-UTILITIES'] },
    { id: 'energy', labelAr: 'الطاقة والجهد الفائق والمتجددة', labelEn: 'High-Voltage & Solar PV', codes: ['INDUSTRIAL-SUBSTATIONS', 'SOLAR-RENEWABLES'] }
  ];

  const filteredServices = services.filter((srv) => {
    if (activeCategory === 'all') return true;
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.codes?.includes(srv.code);
  });

  const handleServiceRfq = (service: ServiceType) => {
    const serviceName = `${service.number} ${lang === 'ar' ? service.titleAr : service.titleEn}`;
    setSelectedServiceForRfq(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/contact');
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-[#fcfbf9] to-slate-50 dark:from-[#0c0e10] dark:via-[#0f1216] dark:to-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/80 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f382a_1px,transparent_1px)] dark:bg-[radial-gradient(#c5a869_1px,transparent_1px)] opacity-[0.03] dark:opacity-[0.04] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200/80 dark:border-[#2a313a] gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/5 dark:bg-[#c5a869]/10 border border-emerald-800/15 dark:border-[#c5a869]/30 mb-3">
              <span className="w-2 h-2 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-full animate-pulse"></span>
              <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                {dict.services.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {dict.services.title}
            </h2>
            <p className="text-sm font-technical text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {dict.services.subtitle}
            </p>
          </div>

          {/* View Mode & Count */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-[#181d22] p-1 rounded-lg border border-slate-200 dark:border-[#2a313a]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-technical flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#0c0e10] text-[#0f382a] dark:text-[#c5a869] shadow-xs font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={lang === 'ar' ? 'عرض البطاقات' : 'Grid View'}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'شبكة' : 'Grid'}</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-md text-xs font-technical flex items-center gap-1.5 transition-all ${
                  viewMode === 'compact'
                    ? 'bg-white dark:bg-[#0c0e10] text-[#0f382a] dark:text-[#c5a869] shadow-xs font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={lang === 'ar' ? 'عرض مدمج' : 'Compact List'}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'قائمة' : 'List'}</span>
              </button>
            </div>

            <span className="px-3 py-1.5 bg-gradient-to-r from-[#0f382a] to-[#164e3b] dark:from-[#937338] dark:to-[#c5a869] text-white dark:text-[#0c0e10] font-technical text-xs font-bold rounded-lg shadow-xs tracking-wider">
              {services.length} {lang === 'ar' ? 'أنشطة معتمدة' : 'Approved Disciplines'}
            </span>
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-technical transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-md shadow-[#0f382a]/10 dark:shadow-[#c5a869]/20'
                  : 'bg-white dark:bg-[#13171b] text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-[#1a2026] border border-slate-200 dark:border-[#2a313a]'
              }`}
            >
              <span>{lang === 'ar' ? cat.labelAr : cat.labelEn}</span>
            </button>
          ))}
        </div>

        {/* 8 Core Services Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredServices.map((service, idx) => (
              <div
                key={service.number || idx}
                className="group bg-white dark:bg-[#12161a] border border-slate-200 dark:border-[#2a313a] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#937338]/60 dark:hover:border-[#c5a869]/60 transition-all duration-300 flex flex-col justify-between relative"
              >
                <div>
                  {/* Service Image Showcase Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image || '/images/services/service_01_hdd.jpg'}
                      alt={lang === 'ar' ? service.titleAr : service.titleEn}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] group-hover:brightness-100"
                    />

                    {/* Gradient Overlay for Depth & High Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                    {/* Top Badges (Number & Code) */}
                    <div className="absolute top-4 start-4 end-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#937338] to-[#c5a869] text-white flex items-center justify-center font-technical font-extrabold text-sm shadow-lg shadow-black/40 border border-white/20">
                          {service.number}
                        </span>
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-zinc-200 font-technical text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                          {service.code}
                        </span>
                      </div>

                      {/* Lightbox Zoom Button */}
                      {service.image && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(service.image!, `${service.number} - ${lang === 'ar' ? service.titleAr : service.titleEn}`);
                          }}
                          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/90 flex items-center justify-center transition-all border border-white/10 shadow-xs"
                          title={lang === 'ar' ? 'تكبير صورة الخدمة' : 'Zoom Image'}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Bottom Image Overlay Title Banner */}
                    <div className="absolute bottom-4 start-4 end-4 z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-heading leading-tight drop-shadow-md group-hover:text-[#c5a869] transition-colors">
                        {lang === 'ar' ? service.titleAr : service.titleEn}
                      </h3>
                      <p className="text-xs font-technical text-[#c5a869] mt-1 line-clamp-1 font-semibold">
                        {lang === 'ar' ? service.subtitleAr : service.subtitleEn}
                      </p>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                      {lang === 'ar' ? service.descriptionAr : service.descriptionEn}
                    </p>

                    {/* Key Technical Tags */}
                    {((lang === 'ar' ? service.tagsAr : service.tagsEn) || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-[#2a313a]/60">
                        {(lang === 'ar' ? service.tagsAr : service.tagsEn)?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-technical font-semibold bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-[#2a313a]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#937338] dark:bg-[#c5a869]"></span>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features Checklist */}
                    {((lang === 'ar' ? service.featuresAr : service.featuresEn) || []).length > 0 && (
                      <div className="mt-4 space-y-2 bg-slate-50/80 dark:bg-[#0c0e10]/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-[#2a313a]/50">
                        <span className="text-[10px] font-technical uppercase text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                          {lang === 'ar' ? 'القدرات والمواصفات التنفيذية' : 'Core Engineering Capabilities'}
                        </span>
                        {(lang === 'ar' ? service.featuresAr : service.featuresEn)?.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0f382a] dark:text-[#c5a869] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 px-6 bg-slate-50/90 dark:bg-[#161a1f] border-t border-slate-100 dark:border-[#2a313a] flex items-center justify-between">
                  <span className="text-[11px] font-technical text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{lang === 'ar' ? 'معتمد للمشاريع الكبرى' : 'Megaproject Approved'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleServiceRfq(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0f382a] hover:bg-[#164e3b] dark:bg-[#c5a869] dark:hover:bg-[#d4b97a] text-white dark:text-[#0c0e10] rounded-lg text-xs font-technical font-bold transition-all transform hover:scale-102 shadow-xs"
                  >
                    <span>{lang === 'ar' ? 'طلب عرض سعر للخدمة' : 'Request Service RFQ'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Compact Detailed List View */
          <div className="divide-y divide-slate-200 dark:divide-[#2a313a] border border-slate-200 dark:border-[#2a313a] rounded-2xl bg-white dark:bg-[#12161a] overflow-hidden shadow-xs">
            {filteredServices.map((service, idx) => (
              <div
                key={service.number || idx}
                className="p-6 group hover:bg-slate-50 dark:hover:bg-[#161b20] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={() => handleServiceRfq(service)}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 dark:border-[#2a313a] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image || '/images/services/service_01_hdd.jpg'}
                      alt={lang === 'ar' ? service.titleAr : service.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1 end-1 px-1.5 py-0.5 rounded bg-black/70 text-white font-technical text-[9px] font-bold">
                      {service.number}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-technical uppercase font-bold text-[#937338] dark:text-[#c5a869]">
                        {service.code}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors">
                      {lang === 'ar' ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      {lang === 'ar' ? service.subtitleAr : service.subtitleEn}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? service.descriptionAr : service.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceRfq(service);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-[#0c0e10] rounded-lg text-xs font-technical font-bold transition-all group-hover:shadow-sm"
                  >
                    <span>{lang === 'ar' ? 'طلب تسعير' : 'Inquire'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Service Inquiries Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#0f382a] to-[#144232] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#c5a869]/30">
          <div className="max-w-2xl">
            <span className="text-xs font-technical uppercase tracking-widest text-[#c5a869] font-bold block mb-1">
              {lang === 'ar' ? 'استشارات هندسية متخصصة' : 'Turnkey Subterranean EPC'}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-heading">
              {lang === 'ar'
                ? 'هل لديك مشروع بنية تحتية أو معبر حفر معقد يتطلب دراسة فنية مخصصة؟'
                : 'Do you have a complex HDD crossing or deep utility tunnel requiring custom engineering?'}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
              {lang === 'ar'
                ? 'فريقنا الهندسي مستعد لمعاينة الموقع، وتحليل التربة، وتقديم دراسة المسار والملف الفني المعتمد خلال 24 ساعة.'
                : 'Our technical team delivers bore path geometry, soil geotechnical review, and certified method statements within 24 hours.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedServiceForRfq('Custom Specialized Engineering');
              const contactElem = document.getElementById('contact');
              if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
              else router.push('/contact');
            }}
            className="shrink-0 px-6 py-3.5 bg-[#c5a869] hover:bg-[#d4b97a] text-[#0c0e10] font-technical font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <span>{lang === 'ar' ? 'طلب دراسة فنية وتسعير فوري' : 'Request Technical Assessment'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
