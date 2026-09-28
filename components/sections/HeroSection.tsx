'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { SiteContentType, HeroSlideType } from '@/types';
import { INITIAL_HERO_SLIDES } from '@/lib/initialData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Eye,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  content?: SiteContentType['hero'];
  slides?: HeroSlideType[];
}

export default function HeroSection({ content, slides }: HeroSectionProps) {
  const { lang } = useApp();
  const dict = getDictionary(lang);

  const badge = lang === 'ar' ? content?.badgeAr || dict.hero.badge : content?.badgeEn || dict.hero.badge;
  const title = lang === 'ar' ? content?.titleAr || dict.hero.title : content?.titleEn || dict.hero.title;
  const highlight = lang === 'ar' ? content?.highlightAr || dict.hero.highlight : content?.highlightEn || dict.hero.highlight;
  const subtitle = lang === 'ar'
    ? content?.subtitleAr ||
      'شركة العاج الفضي للمقاولات (AACC) — المقاول المتخصص في تنفيذ معابر الحفر الأفقي الموجه (HDD) حتى 1,500 ملم، وحفر الأنفاق الدقيقة (Microtunneling)، وتمديد شبكات الطاقة والمياه والغاز الإستراتيجية بالمملكة وفق معايير أرامكو وISO.'
    : content?.subtitleEn ||
      'Alaaj Alfedhi Contracting Co. (AACC HDD-MT) provides specialized trenchless drilling (up to 1,500 mm), microtunneling, and regional utility lifelines across the Kingdom of Saudi Arabia under certified Aramco and ISO quality standards.';

  const metrics = content?.metrics || [
    { labelAr: 'أقصى قوة سحب', labelEn: 'Max Pullback', value: '100,000 lbs', highlight: true },
    { labelAr: 'أقصى قطر حفر', labelEn: 'Max Bore Dia', value: '1,500 mm (60")' },
    { labelAr: 'مسافة دفع أحادية', labelEn: 'Single Reach', value: '1,200+ m' },
    { labelAr: 'سجل السلامة المهنية', labelEn: 'Safety Record', value: '100% Zero LTI', highlight: true },
  ];

  // Dynamic Background Slides from CMS or Default
  const heroSlides = (slides && slides.length > 0 ? slides.filter((s) => s.active !== false) : INITIAL_HERO_SLIDES).map((s, i) => ({
    id: (s as any).id || (s as any)._id || i + 1,
    image: s.image,
    titleAr: s.titleAr,
    titleEn: s.titleEn,
    tagAr: s.subtitleAr,
    tagEn: s.subtitleEn,
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Auto-play timer (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-[#2a313a]/60 bg-slate-900 transition-colors duration-300"
    >
      {/* Dynamic 4-Slide Background Carousel */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={lang === 'ar' ? slide.titleAr : slide.titleEn}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105 filter brightness-90 contrast-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* High-Clarity Contrast Overlays (Preserves Photo Vibrancy while ensuring text readability) */}
        {/* Light Mode Overlay */}
        <div className="absolute inset-0 block dark:hidden bg-gradient-to-r from-[#fbf9f6]/95 via-[#fbf9f6]/85 to-[#fbf9f6]/35" />
        <div className="absolute inset-0 block dark:hidden bg-gradient-to-t from-[#fbf9f6] via-transparent to-transparent opacity-80" />

        {/* Dark Mode Overlay */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-r from-[#0c0e10]/95 via-[#0c0e10]/80 to-[#0c0e10]/40" />
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-[#0c0e10] via-transparent to-transparent opacity-90" />

        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full animate-fade-in">
        <div className="max-w-4xl space-y-6">
          {/* Single Clean Accreditation Badge */}
          <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-[#13171b]/95 backdrop-blur-md px-3.5 py-1.5 border border-slate-200 dark:border-[#c5a869]/40 shadow-xs rounded-full">
            <span className="h-2 w-2 bg-[#0f382a] dark:bg-[#c5a869] rounded-full animate-pulse"></span>
            <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
              {badge}
            </span>
          </div>

          {/* Main SEO Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            {title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f382a] via-[#184e3b] to-[#937338] dark:from-[#c5a869] dark:via-amber-300 dark:to-white">
              {highlight}
            </span>
          </h1>

          {/* SEO Subtitle Description */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 max-w-3xl leading-relaxed font-normal bg-white/60 dark:bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-white/10 shadow-xs">
            {subtitle}
          </p>

          {/* 4 Technical Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-2 font-technical">
            {metrics.map((metric, idx) => {
              const isZeroLti = metric.value.includes('Zero') || metric.value.includes('100%');
              let parsedEnd = 0;
              let prefix = '';
              let suffix = '';

              if (metric.value.includes('100,000')) {
                parsedEnd = 100000;
                suffix = ' lbs';
              } else if (metric.value.includes('1,500')) {
                parsedEnd = 1500;
                suffix = ' mm (60")';
              } else if (metric.value.includes('1,200')) {
                parsedEnd = 1200;
                suffix = '+ m';
              } else if (metric.value.includes('100%')) {
                parsedEnd = 100;
                suffix = '% Zero LTI';
              } else {
                const match = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
                if (match) {
                  prefix = match[1];
                  parsedEnd = parseFloat(match[2].replace(/,/g, '')) || 0;
                  suffix = match[3];
                }
              }

              return (
                <div
                  key={idx}
                  className="bg-white/95 dark:bg-[#13171b]/95 backdrop-blur-md border border-slate-200/90 dark:border-[#2a313a] p-3.5 rounded-xl shadow-xs hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all transform hover:-translate-y-0.5"
                >
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase block font-semibold mb-1">
                    {lang === 'ar' ? metric.labelAr : metric.labelEn}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-extrabold flex items-baseline gap-1 ${
                      isZeroLti
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : metric.highlight
                        ? 'text-[#0f382a] dark:text-[#c5a869]'
                        : 'text-slate-900 dark:text-white'
                    }`}
                    dir="ltr"
                  >
                    {parsedEnd > 0 ? (
                      <AnimatedCounter
                        end={parsedEnd}
                        prefix={prefix}
                        suffix={suffix}
                        duration={2000}
                      />
                    ) : (
                      metric.value
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTAs and Slide Navigator Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/projects"
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-[#0f382a] hover:bg-[#184e3b] dark:bg-gradient-to-r dark:from-[#c5a869] dark:via-amber-400 dark:to-[#b89758] text-white dark:text-[#0c0e10] font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>{dict.hero.ctaProjects}</span>
                <Eye className="w-4 h-4 text-[#b89758] dark:text-[#0c0e10]" />
              </Link>

              <Link
                href="/services"
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white/90 dark:bg-[#13171b]/90 backdrop-blur-md border border-slate-300 dark:border-[#2a313a] hover:border-[#0f382a] dark:hover:border-[#c5a869] text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all rounded-xl shadow-2xs hover:scale-105 active:scale-95"
              >
                <span>{dict.hero.ctaServices}</span>
                <ArrowIcon className="w-4 h-4 text-[#0f382a] dark:text-[#c5a869]" />
              </Link>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-center gap-2 bg-white/90 dark:bg-[#13171b]/90 backdrop-blur-md border border-slate-200 dark:border-[#2a313a] p-1.5 rounded-xl shadow-xs self-center sm:self-auto">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rtl:hidden" />
                <ChevronLeft className="w-4 h-4 ltr:hidden" />
              </button>

              {/* 4 Slide Pills */}
              <div className="flex items-center gap-1.5 px-1">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-6 bg-[#0f382a] dark:bg-[#c5a869]'
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 rtl:hidden" />
                <ChevronRight className="w-4 h-4 ltr:hidden" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
