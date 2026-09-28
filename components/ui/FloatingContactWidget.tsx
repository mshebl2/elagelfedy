'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowUp } from 'lucide-react';
import { useApp } from '@/components/providers/AppProviders';

export default function FloatingContactWidget() {
  const { lang } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage =
    lang === 'ar'
      ? encodeURIComponent(
          'السلام عليكم، أود الاستفسار وطلب دراسة فنية لمشروع حفر موجه وبنية تحتية من شركة العاج الفضي للمقاولات (AACC HDD-MT).'
        )
      : encodeURIComponent(
          'Hello, I would like to inquire and request a technical study for an HDD / infrastructure project with AACC HDD-MT.'
        );

  return (
    <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3.5 select-none print:hidden">
      {/* Back To Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title={lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
          aria-label="Back to top"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 dark:bg-[#13171b]/95 text-[#c5a869] border border-slate-700 dark:border-[#2a313a] shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer group"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Direct Phone Call Floating Button */}
      <a
        href="tel:+966509424820"
        title={lang === 'ar' ? 'اتصال مباشر بالإدارة الهندسية (+966509424820)' : 'Call Direct (+966509424820)'}
        aria-label="Direct Phone Call"
        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#0f382a] via-[#184e3b] to-[#937338] dark:from-[#937338] dark:via-[#b89758] dark:to-[#c5a869] text-white dark:text-[#0c0e10] shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 pulse-glow-gold hover-ring cursor-pointer"
      >
        <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />

        {/* Modern Glass Tooltip */}
        <span className="hidden sm:block absolute end-15 bg-slate-900/95 dark:bg-[#13171b]/95 text-white text-[11px] font-technical px-3.5 py-1.5 rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-700 dark:border-[#2a313a] backdrop-blur-md pointer-events-none translate-x-2 group-hover:translate-x-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            {lang === 'ar' ? 'اتصال هاتفي مباشر: 0509424820' : 'Call Direct: +966 509424820'}
          </span>
        </span>
      </a>

      {/* WhatsApp Modern Floating Button */}
      <a
        href={`https://wa.me/966509424820?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        title={lang === 'ar' ? 'تواصل فوري عبر واتساب' : 'Chat on WhatsApp'}
        aria-label="Chat on WhatsApp"
        className="relative group w-13 h-13 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 pulse-glow-green cursor-pointer"
      >
        {/* Live Status Online Radar Dot */}
        <span className="absolute top-0 end-0 flex h-3.5 w-3.5 -mt-0.5 -me-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white dark:border-[#0c0e10]"></span>
        </span>

        {/* Ultra-Clean Modern WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-white transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.632.062-1.923-.469-1.517-.624-2.482-2.167-2.557-2.268-.075-.101-.618-.823-.618-1.569 0-.746.391-1.113.53-1.265.139-.152.304-.19.405-.19.101 0 .203.002.292.006.094.004.221-.036.345.263.129.313.44 1.074.478 1.153.038.079.063.172.012.274-.051.101-.077.164-.152.253-.076.088-.16.197-.228.265-.077.076-.157.158-.068.311.089.152.396.654.85 1.059.584.521 1.077.683 1.229.759.152.076.241.063.33-.038.089-.101.38-.443.481-.595.101-.152.203-.127.34-.076.137.051.874.412 1.025.488.152.076.253.114.291.177.038.063.038.368-.106.773z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.309A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.487-4.453-1.325l-.319-.208-2.955.775.789-2.88-.228-.363A8.208 8.208 0 0 1 3.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z" />
        </svg>

        {/* Modern Glass Tooltip */}
        <span className="absolute end-16 bg-slate-900/95 dark:bg-[#13171b]/95 text-white text-[11px] font-technical px-3.5 py-1.5 rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-700 dark:border-[#2a313a] backdrop-blur-md pointer-events-none translate-x-2 group-hover:translate-x-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {lang === 'ar' ? 'محادثة فورية عبر واتساب (Live Desk)' : 'Chat on WhatsApp (Live Desk)'}
          </span>
        </span>
      </a>
    </div>
  );
}
