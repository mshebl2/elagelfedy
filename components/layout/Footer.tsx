'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Building2,
  ShieldCheck,
  Globe2
} from 'lucide-react';

export default function Footer() {
  const { lang } = useApp();
  const dict = getDictionary(lang);

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/aacc-ksa',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      color: 'bg-[#0A66C2] border-[#2980b9] shadow-[#0A66C2]/40 hover:bg-[#084e96] hover:shadow-lg hover:shadow-[#0A66C2]/60',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/aacc_ksa',
      icon: (
        <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'bg-black border-slate-600 shadow-black/50 hover:bg-zinc-900 hover:border-white/50 hover:shadow-lg',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/966509424820',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.632.062-1.923-.469-1.517-.624-2.482-2.167-2.557-2.268-.075-.101-.618-.823-.618-1.569 0-.746.391-1.113.53-1.265.139-.152.304-.19.405-.19.101 0 .203.002.292.006.094.004.221-.036.345.263.129.313.44 1.074.478 1.153.038.079.063.172.012.274-.051.101-.077.164-.152.253-.076.088-.16.197-.228.265-.077.076-.157.158-.068.311.089.152.396.654.85 1.059.584.521 1.077.683 1.229.759.152.076.241.063.33-.038.089-.101.38-.443.481-.595.101-.152.203-.127.34-.076.137.051.874.412 1.025.488.152.076.253.114.291.177.038.063.038.368-.106.773z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.309A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.487-4.453-1.325l-.319-.208-2.955.775.789-2.88-.228-.363A8.208 8.208 0 0 1 3.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z" />
        </svg>
      ),
      color: 'bg-[#25D366] border-[#2ecc71] shadow-[#25D366]/40 hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25D366]/60',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/aacc_ksa',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] border-pink-400/50 shadow-pink-600/40 hover:opacity-90 hover:shadow-lg hover:shadow-pink-600/60',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@aacc_ksa',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: 'bg-[#FF0000] border-red-500 shadow-red-600/40 hover:bg-[#d90000] hover:shadow-lg hover:shadow-red-600/60',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a261c] via-[#071d15] to-[#04130e] text-slate-300 dark:text-emerald-100/80 py-14 border-t border-emerald-900/70 text-xs select-none overflow-hidden">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c5a869]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 pb-10 border-b border-emerald-900/60">
          
          {/* 1. Company Brief (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-black/35 border border-emerald-600/50 flex items-center justify-center shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo/aacc_logo_gold.png"
                  alt="شركة العاج الفضي للمقاولات - AACC"
                  className="h-11 max-h-11 w-auto max-w-[150px] object-contain drop-shadow-[0_0_10px_rgba(197,168,105,0.35)]"
                  style={{ maxHeight: '44px', width: 'auto' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tight text-base sm:text-lg leading-tight">
                  {dict.brand.name}
                </span>
                <span className="text-xs text-[#c5a869] font-bold tracking-wide">
                  AACC HDD-MT Enterprise
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-[13.5px] leading-relaxed text-emerald-100/85 font-normal">
              {dict.footer.aboutSummary}
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-emerald-700/70 text-xs font-bold text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Aramco Approved</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-emerald-700/70 text-xs font-bold text-emerald-200">
                <span>SEC Qualified</span>
              </span>
            </div>
          </div>

          {/* 2. Core Activities (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-white uppercase font-black text-sm mb-3.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a869]"></span>
              <span>{dict.footer.coreActivities}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-emerald-100/90 font-medium">
              <li>
                <Link href="/services" className="hover:text-white dark:hover:text-[#c5a869] transition-colors block">
                  01 HDD Rock Boring
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white dark:hover:text-[#c5a869] transition-colors block">
                  02 Microtunneling
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white dark:hover:text-[#c5a869] transition-colors block">
                  03 Water Networks
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white dark:hover:text-[#c5a869] transition-colors block">
                  04 Sewage & Drainage
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white dark:hover:text-[#c5a869] transition-colors block">
                  05 Industrial Power
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-white uppercase font-black text-sm mb-3.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a869]"></span>
              <span>{dict.footer.navigation}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-emerald-100/90 font-medium">
              <li>
                <Link href="/about" className="hover:text-white dark:hover:text-[#c5a869] transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white dark:hover:text-[#c5a869] transition-colors">
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-white dark:hover:text-[#c5a869] transition-colors">
                  {dict.nav.equipment}
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-white dark:hover:text-[#c5a869] transition-colors">
                  {dict.nav.certifications}
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white dark:hover:text-[#c5a869] transition-colors">
                  {dict.nav.clients}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#c5a869] text-emerald-300 font-bold transition-colors">
                  {lang === 'ar' ? 'لوحة التحكم (Admin)' : 'Admin Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. EXECUTIVE DIRECTORY CARD: Head Office & Official Desk (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-gradient-to-b from-[#0e2c22] via-[#091f17] to-[#061812] border border-emerald-500/40 p-5 shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-[#c5a869]/70 transition-all duration-300">
              {/* Top Golden Luminous Strip */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#c5a869] via-amber-400 to-emerald-500" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-emerald-800/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#c5a869]/20 border border-[#c5a869]/50 flex items-center justify-center text-[#fde047] shadow-xs">
                    <Building2 className="w-4.5 h-4.5 text-[#c5a869]" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm sm:text-base tracking-tight leading-tight">
                      {dict.footer.headOffice}
                    </h4>
                    <span className="text-xs text-[#c5a869] font-medium block">
                      {lang === 'ar' ? 'المقر الرئيسي والإدارة الهندسية' : 'Headquarters & Executive Desk'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                  {lang === 'ar' ? 'الرياض' : 'Riyadh HQ'}
                </span>
              </div>

              {/* Directory Items List */}
              <div className="space-y-3.5">
                {/* 1. Address Row */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=3315+Hafsa+Bint+Umar+St,+Al+Andalus,+Riyadh+13212,+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group/link hover:bg-emerald-950/40 p-2.5 rounded-xl border border-transparent hover:border-emerald-700/50 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-600/70 flex items-center justify-center text-[#c5a869] group-hover/link:text-[#fde047] group-hover/link:scale-110 transition-all shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-emerald-300/80 block font-medium">
                      {lang === 'ar' ? 'العنوان والموقع' : 'Location'}
                    </span>
                    <span className="text-white font-bold text-xs sm:text-sm block group-hover/link:text-[#c5a869] transition-colors leading-snug">
                      {lang === 'ar' ? 'مبنى 3315، شارع حفصة بنت عمر، حي الأندلس، الرياض 13212' : 'Bldg 3315, Hafsa Bint Umar St., Al Andalus, Riyadh 13212'}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-400/60 group-hover/link:text-[#c5a869] transition-colors shrink-0 mt-1" />
                </a>

                {/* 2. Direct Call Row */}
                <a
                  href="tel:+966509424820"
                  className="flex items-center gap-3 group/link hover:bg-emerald-950/40 p-2.5 rounded-xl border border-transparent hover:border-emerald-700/50 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-600/70 flex items-center justify-center text-[#c5a869] group-hover/link:text-[#fde047] group-hover/link:scale-110 transition-all shrink-0 shadow-xs">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs text-emerald-300/80 font-medium">
                      {lang === 'ar' ? 'الاتصال المباشر:' : 'Direct Line:'}
                    </span>
                    <span dir="ltr" className="text-white font-black text-sm sm:text-base group-hover/link:text-[#c5a869] transition-colors tracking-wide">
                      +966 509424820
                    </span>
                  </div>
                </a>

                {/* 3. Official Email Row */}
                <a
                  href="mailto:mo.hdd@hotmail.com"
                  className="flex items-center gap-3 group/link hover:bg-emerald-950/40 p-2.5 rounded-xl border border-transparent hover:border-emerald-700/50 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-600/70 flex items-center justify-center text-[#c5a869] group-hover/link:text-[#fde047] group-hover/link:scale-110 transition-all shrink-0 shadow-xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs text-emerald-300/80 font-medium">
                      {lang === 'ar' ? 'البريد الرسمي:' : 'Official Email:'}
                    </span>
                    <span className="text-white font-bold text-xs sm:text-sm group-hover/link:text-[#c5a869] transition-colors">
                      mo.hdd@hotmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Bottom Sovereign Numbers Row */}
              <div className="mt-3.5 pt-3 border-t border-emerald-800/70 flex items-center justify-between text-xs">
                <span className="text-emerald-200 font-medium">
                  {lang === 'ar' ? 'س.ت:' : 'CR:'} <strong className="text-white font-bold text-xs sm:text-sm">1009156401</strong>
                </span>
                <span className="text-emerald-600">|</span>
                <span className="text-emerald-200 font-medium">
                  {lang === 'ar' ? 'الرقم الموحد:' : 'Unified No:'} <strong className="text-white font-bold text-xs sm:text-sm">7043006183</strong>
                </span>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-1.5">
              <span className="text-xs sm:text-sm font-bold text-emerald-100 uppercase tracking-wider block mb-3">
                {lang === 'ar' ? 'قنوات التواصل الرسمي' : 'Official Social Channels'}
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    aria-label={item.name}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 shadow-md border ${item.color}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[13px] text-emerald-200/80 pt-3 border-t border-emerald-900/40">
          <span className="font-medium">{dict.footer.rights}</span>
          <span className="mt-2 sm:mt-0 font-bold text-emerald-300/90">{dict.footer.unifiedFoot}</span>
        </div>
      </div>
    </footer>
  );
}
