'use client';

import React from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { Phone, Mail } from 'lucide-react';

export default function CorporateTopBar() {
  const { lang } = useApp();
  const dict = getDictionary(lang);

  return (
    <div className="w-full bg-[#0c0e10] text-slate-300 dark:text-zinc-300 text-xs sm:text-[13px] py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-[#2a313a]/80 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-3 sm:gap-x-4">
        {/* Right side in RTL / Left in LTR: Official Registrations */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3.5">
          <span className="inline-flex items-center gap-1.5 text-white font-bold whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-[#c5a869] animate-pulse shrink-0"></span>
            {dict.topBar.country}
          </span>
          <span className="text-slate-600 dark:text-zinc-700 hidden xs:inline">|</span>
          <span className="text-slate-300 dark:text-zinc-300 whitespace-nowrap text-xs">
            {dict.topBar.crLabel} <strong className="text-white dark:text-[#c5a869] font-bold">1009156401</strong>
          </span>
          <span className="text-slate-600 dark:text-zinc-700 hidden md:inline">|</span>
          <span className="text-slate-300 dark:text-zinc-300 whitespace-nowrap text-xs hidden md:inline">
            {dict.topBar.unifiedLabel} <strong className="text-white dark:text-[#c5a869] font-bold">7043006183</strong>
          </span>
        </div>

        {/* Left side in RTL / Right in LTR: Direct Phone & Email */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold">
          <a
            href="tel:+966509424820"
            className="flex items-center gap-1.5 text-slate-200 hover:text-white dark:text-zinc-200 dark:hover:text-[#c5a869] transition-colors whitespace-nowrap group"
          >
            <Phone className="w-3.5 h-3.5 text-[#b89758] dark:text-[#c5a869] group-hover:scale-110 transition-transform shrink-0" />
            <span dir="ltr" className="font-bold tracking-wide">+966 509424820</span>
          </a>
          <span className="text-slate-600 dark:text-zinc-700 hidden sm:inline">|</span>
          <a
            href="mailto:mo.hdd@hotmail.com"
            className="hidden sm:flex items-center gap-1.5 text-slate-200 hover:text-white dark:text-zinc-200 dark:hover:text-[#c5a869] transition-colors whitespace-nowrap group"
          >
            <Mail className="w-3.5 h-3.5 text-[#b89758] dark:text-[#c5a869] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-bold">mo.hdd@hotmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
