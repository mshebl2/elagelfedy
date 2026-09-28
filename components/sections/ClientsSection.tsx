'use client';

import React, { useState } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { INITIAL_CLIENTS, CLIENTS_LIST } from '@/lib/initialData';
import { ClientType } from '@/types';
import { Building2, Sparkles, ShieldCheck, Grid, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';

interface ClientsSectionProps {
  clientsList?: ClientType[];
}

export default function ClientsSection({ clientsList }: ClientsSectionProps) {
  const { lang } = useApp();
  const dict = getDictionary(lang);
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

  const sourceClients = (clientsList && clientsList.length > 0 ? clientsList.filter(c => c.active !== false) : INITIAL_CLIENTS).map(c => ({
    name: c.name,
    nameAr: c.nameAr,
    categoryAr: c.categoryAr,
    categoryEn: c.categoryEn,
    logo: c.logo,
  }));

  const allClients = sourceClients;

  return (
    <section
      id="clients"
      className="py-20 bg-gradient-to-b from-[#fcfbf9] via-white to-[#fbf9f6] dark:from-[#0c0e10] dark:via-[#0f1216] dark:to-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/80 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f382a_1px,transparent_1px)] dark:bg-[radial-gradient(#c5a869_1px,transparent_1px)] opacity-[0.03] dark:opacity-[0.04] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/5 via-[#c5a869]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200/80 dark:border-[#2a313a] gap-6 text-center md:text-start">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/5 dark:bg-[#c5a869]/10 border border-emerald-800/15 dark:border-[#c5a869]/30 mb-3">
              <span className="w-2 h-2 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-full animate-pulse" />
              <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                {dict.clients.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {dict.clients.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-2">
              {lang === 'ar'
                ? 'شراكات تنفيذية موثوقة مع كبرى الهيئات والمؤسسات الحكومية وشركات التطوير العملاقة بالمملكة'
                : `Trusted by Saudi Arabia's Tier-1 government authorities, utility giants, and giga-project developers`}
            </p>
          </div>

          {/* Controls: Marquee vs Grid Mode */}
          <div className="flex items-center justify-center md:justify-end gap-3 self-center md:self-end">
            <div className="flex items-center bg-slate-100 dark:bg-[#181d22] p-1 rounded-xl border border-slate-200 dark:border-[#2a313a]">
              <button
                type="button"
                onClick={() => setViewMode('marquee')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-technical flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'marquee'
                    ? 'bg-white dark:bg-[#0c0e10] text-[#0f382a] dark:text-[#c5a869] shadow-xs font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'شريط مستمر' : 'Infinite Marquee'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-technical flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#0c0e10] text-[#0f382a] dark:text-[#c5a869] shadow-xs font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'عرض شبكي' : 'Grid View'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: Single Seamless Infinite Continuous Marquee (Zero Gaps) */}
      {viewMode === 'marquee' ? (
        <div className="relative overflow-hidden py-4">
          {/* Gradient Edge Masks for Smooth Optical Fade Out */}
          <div className="absolute inset-y-0 start-0 w-16 sm:w-36 bg-gradient-to-r from-[#fcfbf9] dark:from-[#0c0e10] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 end-0 w-16 sm:w-36 bg-gradient-to-l from-[#fcfbf9] dark:from-[#0c0e10] to-transparent z-20 pointer-events-none" />

          {/* Single Continuous Track (Track A + Track B clone for seamless loop) */}
          <div className="flex overflow-hidden select-none pause-on-hover" dir="ltr">
            <div className="animate-marquee-track flex items-center">
              {allClients.map((client, idx) => (
                <div key={`a-${idx}`} className="px-2 shrink-0">
                  <ClientLogoCard client={client} lang={lang} />
                </div>
              ))}
            </div>
            <div className="animate-marquee-track flex items-center" aria-hidden="true">
              {allClients.map((client, idx) => (
                <div key={`b-${idx}`} className="px-2 shrink-0">
                  <ClientLogoCard client={client} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: Static Grid View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
            {CLIENTS_LIST.map((client, idx) => (
              <ClientLogoCard key={`grid-${idx}`} client={client} lang={lang} isGrid={true} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sub-tag */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-10">
        <span className="text-xs sm:text-[13px] font-medium text-slate-600 dark:text-zinc-300 inline-flex items-center gap-2 bg-slate-100 dark:bg-[#13171b] px-5 py-2 rounded-full border border-slate-200 dark:border-[#2a313a] shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'مؤهلون رسمياً ومعتمدون لتنفيذ عقود البنية التحتية والأنفاق في كافة مناطق المملكة'
              : 'Officially qualified for infrastructure & tunneling contracts throughout Saudi Arabia'}
          </span>
        </span>
      </div>
    </section>
  );
}

interface ClientLogoCardProps {
  client: (typeof CLIENTS_LIST)[0];
  lang: string;
  isGrid?: boolean;
}

function ClientLogoCard({ client, lang, isGrid = false }: ClientLogoCardProps) {
  return (
    <div
      className={`group relative rounded-2xl bg-white dark:bg-[#12161a] border border-slate-200/90 dark:border-[#2a313a] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#0f382a]/50 dark:hover:border-[#c5a869]/60 hover:-translate-y-1 select-none ${
        isGrid ? 'w-full' : 'w-[260px] sm:w-[290px] shrink-0'
      }`}
    >
      {/* Ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

      {/* Top Category Tag */}
      <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
        <span className="text-[10px] font-technical uppercase text-slate-500 dark:text-zinc-400 font-bold line-clamp-1">
          {lang === 'ar' ? client.categoryAr : client.categoryEn}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
      </div>

      {/* Logo Graphic Container */}
      <div className="h-16 w-full flex items-center justify-center p-1 bg-slate-50/70 dark:bg-[#0c0e10]/80 rounded-xl border border-slate-100 dark:border-[#1e242b] group-hover:border-[#0f382a]/20 dark:group-hover:border-[#c5a869]/30 transition-colors relative z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logo}
          alt={lang === 'ar' ? client.nameAr : client.name}
          className="max-h-12 max-w-[85%] object-contain filter transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Client Name Label */}
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#1e242b] flex items-center justify-between text-xs relative z-10">
        <span className="font-bold text-slate-800 dark:text-zinc-200 group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors line-clamp-1">
          {lang === 'ar' ? client.nameAr : client.name}
        </span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-technical font-extrabold shrink-0">
          ✓ {lang === 'ar' ? 'معتمد' : 'Tier-1'}
        </span>
      </div>

      {/* Bottom Accent Glow Line */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0f382a] dark:via-[#c5a869] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
    </div>
  );
}
