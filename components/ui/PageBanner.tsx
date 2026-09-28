'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProviders';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  HardHat,
  Cpu
} from 'lucide-react';

interface PageBannerProps {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr?: string;
  badgeEn?: string;
  backgroundImage?: string;
  equipmentImage?: string;
  equipmentNameAr?: string;
  equipmentNameEn?: string;
  equipmentSpecsAr?: string;
  equipmentSpecsEn?: string;
  code?: string;
}

export default function PageBanner({
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  backgroundImage,
  equipmentImage,
  equipmentNameAr,
  equipmentNameEn,
  equipmentSpecsAr,
  equipmentSpecsEn,
  code = 'AACC-ENG-REV.2025'
}: PageBannerProps) {
  const { lang, openLightbox } = useApp();
  const Chevron = lang === 'ar' ? ChevronLeft : ChevronRight;

  const title = lang === 'ar' ? titleAr : titleEn;
  const subtitle = lang === 'ar' ? subtitleAr : subtitleEn;

  // Smart automatic assignment of distinct background images and specialized equipment per page
  const pageTheme = React.useMemo(() => {
    const key = (titleAr + ' ' + titleEn).toLowerCase();

    // 1. About Page
    if (key.includes('عن الشركة') || key.includes('about')) {
      return {
        bg: backgroundImage || '/images/hero/hero_slide_1.jpg',
        equipImg: equipmentImage || '/images/equipment/ditch_witch_jt100.jpg',
        equipNameAr: equipmentNameAr || 'حفارة Ditch Witch JT100 All Terrain',
        equipNameEn: equipmentNameEn || 'Ditch Witch JT100 AT Heavy Rig',
        equipSpecsAr: equipmentSpecsAr || 'قوة سحب 100,000 رطل • حفر الصخور القاسية',
        equipSpecsEn: equipmentSpecsEn || '100,000 lbs Pullback • Hard Rock Drilling',
      };
    }

    // 2. Services / Activities Page
    if (key.includes('خدمات') || key.includes('أنشط') || key.includes('service')) {
      return {
        bg: backgroundImage || '/images/services/service_01_hdd.jpg',
        equipImg: equipmentImage || '/images/equipment/equipment_01_vermeer_d100.jpg',
        equipNameAr: equipmentNameAr || 'حفارة Vermeer D100x120 Series II',
        equipNameEn: equipmentNameEn || 'Vermeer D100x120 Heavy Rig',
        equipSpecsAr: equipmentSpecsAr || 'عزم دوران 12,000 ft-lb • أقطار حتى 1,500 ملم',
        equipSpecsEn: equipmentSpecsEn || '12,000 ft-lb Torque • Diameters up to 1,500 mm',
      };
    }

    // 3. Projects Page
    if (key.includes('مشاريع') || key.includes('project')) {
      return {
        bg: backgroundImage || '/images/projects/project_07_gulfstreet.jpg',
        equipImg: equipmentImage || '/images/equipment/rock_reamers.jpg',
        equipNameAr: equipmentNameAr || 'رؤوس التوسيع الصخرية Rock Reamers 42"',
        equipNameEn: equipmentNameEn || 'Heavy 42-Inch Rock Reamers',
        equipSpecsAr: equipmentSpecsAr || 'توسيع المسارات الصخرية الصلبة للمعابر الكبرى',
        equipSpecsEn: equipmentSpecsEn || 'Heavy Reaming for Sub-Highway Crossings',
      };
    }

    // 4. Equipment Fleet Page
    if (key.includes('معدات') || key.includes('أسطول') || key.includes('equipment')) {
      return {
        bg: backgroundImage || '/images/equipment/equipment_02_vermeer_d36.jpg',
        equipImg: equipmentImage || '/images/equipment/equipment_02_vermeer_d36.jpg',
        equipNameAr: equipmentNameAr || 'حفارة Vermeer D36x50 Series II Navigator',
        equipNameEn: equipmentNameEn || 'Vermeer D36x50 Series II Navigator',
        equipSpecsAr: equipmentSpecsAr || 'حفر موجه متقدم عالي الدقة للمناطق الحضرية',
        equipSpecsEn: equipmentSpecsEn || 'High-Mobility Urban Trenchless Rig',
      };
    }

    // 5. Clients & Partners Page
    if (key.includes('عملاء') || key.includes('client')) {
      return {
        bg: backgroundImage || '/images/projects/project_01_amaala.jpg',
        equipImg: equipmentImage || '/images/equipment/zlconn_zl900a.jpg',
        equipNameAr: equipmentNameAr || 'وحدة الضخ الهيدروليكي والتوجيه ZLCONN',
        equipNameEn: equipmentNameEn || 'ZLCONN High-Pressure Drilling System',
        equipSpecsAr: equipmentSpecsAr || 'ضخ مستمر 900 لتر/دقيقة لسوائل البنتونايت',
        equipSpecsEn: equipmentSpecsEn || '900 L/min Continuous Bentonite Flow',
      };
    }

    // 6. Quality & Certifications Page
    if (key.includes('جودة') || key.includes('شهادات') || key.includes('quality') || key.includes('cert')) {
      return {
        bg: backgroundImage || '/images/projects/project_03_alnarjis.jpg',
        equipImg: equipmentImage || '/images/equipment/equipment_03_dci_falcon.jpg',
        equipNameAr: equipmentNameAr || 'نظام التوجيه اللاسلكي DCI Falcon F5+',
        equipNameEn: equipmentNameEn || 'DCI Falcon F5+ Guidance System',
        equipSpecsAr: equipmentSpecsAr || 'توجيه المسار بالمليمتر والتردد المزدوج المتقدم',
        equipSpecsEn: equipmentSpecsEn || 'Millimeter Telemetry & Dual-Band Guidance',
      };
    }

    // 7. Contact Page & Default
    return {
      bg: backgroundImage || '/images/hero/hero_slide_4.jpg',
      equipImg: equipmentImage || '/images/equipment/hdpe_butt_fusion.jpg',
      equipNameAr: equipmentNameAr || 'ماكينة اللحام الهيدروليكي HDPE Butt Fusion',
      equipNameEn: equipmentNameEn || 'Hydraulic HDPE Butt Fusion Unit',
      equipSpecsAr: equipmentSpecsAr || 'لحام حراري عالي الدقة للأنابيب حتى 1,200 ملم',
      equipSpecsEn: equipmentSpecsEn || 'High-Pressure Fusion for 1,200 mm Pipes',
    };
  }, [backgroundImage, equipmentImage, equipmentNameAr, equipmentNameEn, equipmentSpecsAr, equipmentSpecsEn, titleAr, titleEn]);

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-[#0a0f14] to-slate-950 text-white py-12 sm:py-16 lg:py-20 border-b border-slate-800 dark:border-[#2a313a] overflow-hidden shadow-2xl">
      {/* 1. Distinct Background Image Layer for Each Page */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pageTheme.bg}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110 scale-105 transition-transform duration-1000"
        />

        {/* Directional Gradient Overlays (Ensures vivid visibility while guaranteeing 100% text readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 rtl:from-slate-950/95 rtl:via-slate-950/80 rtl:to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />

        {/* Ambient Royal Emerald & Gold Flares */}
        <div className="absolute -top-24 end-1/4 w-96 h-96 bg-[#0f382a]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 start-1/4 w-96 h-96 bg-[#937338]/25 rounded-full blur-3xl pointer-events-none" />

        {/* CAD Blueprint Drafting Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,168,105,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,168,105,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
      </div>

      {/* 2. Precision Corner Drafting Accents */}
      <div className="absolute top-4 start-4 w-5 h-5 border-t-2 border-s-2 border-[#c5a869]/60 pointer-events-none" />
      <div className="absolute top-4 end-4 w-5 h-5 border-t-2 border-e-2 border-[#c5a869]/60 pointer-events-none" />
      <div className="absolute bottom-4 start-4 w-5 h-5 border-b-2 border-s-2 border-[#c5a869]/60 pointer-events-none" />
      <div className="absolute bottom-4 end-4 w-5 h-5 border-b-2 border-e-2 border-[#c5a869]/60 pointer-events-none" />

      {/* 3. Main Banner Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Breadcrumb (7 Columns) */}
          <div className="lg:col-span-7 space-y-4 animate-fade-in">
            {/* Breadcrumb Navigation Pill */}
            <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-xs font-technical text-slate-300 shadow-sm">
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-[#c5a869] text-zinc-300 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-[#c5a869]" />
                <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
              </Link>
              <Chevron className="w-3 h-3 text-slate-500" />
              <span className="text-[#c5a869] font-bold truncate max-w-[220px] sm:max-w-none">{title}</span>
            </nav>

            {/* Headline with Gold Metallic Shimmer */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#c5a869]">
                {title}
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl bg-black/40 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-xs">
              {subtitle}
            </p>
          </div>

          {/* Specialized Equipment Cutout Showcase (5 Columns - Replaces old HUD Box) */}
          <div className="lg:col-span-5">
            <div
              onClick={() =>
                openLightbox(
                  pageTheme.equipImg,
                  `${lang === 'ar' ? pageTheme.equipNameAr : pageTheme.equipNameEn} - AACC Heavy Fleet`
                )
              }
              className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#131920]/90 via-[#0e141a]/95 to-[#080d12] backdrop-blur-md border border-slate-700/80 hover:border-[#c5a869] transition-all shadow-xl group cursor-pointer"
            >
              {/* Top Equipment Status Badge */}
              <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-[#c5a869]" />
                  <span className="text-[10px] font-technical uppercase font-bold text-[#c5a869] tracking-wider">
                    {lang === 'ar' ? 'الأسطول المعتمد والمعدات التخصصية' : 'AACC Approved Specialized Fleet'}
                  </span>
                </div>
                <span className="text-[10px] font-technical text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                  <Maximize2 className="w-3 h-3 text-[#c5a869]" />
                  <span>{lang === 'ar' ? 'معاينة' : 'Inspect'}</span>
                </span>
              </div>

              {/* Equipment Photo Frame with Floating Depth */}
              <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden border border-slate-700/60 bg-[#05080b] flex items-center justify-center group-hover:border-[#c5a869]/60 transition-colors">
                {/* Radial Glow behind the Equipment */}
                <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
                <div className="absolute w-40 h-40 bg-[#0f382a]/40 rounded-full blur-2xl pointer-events-none" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pageTheme.equipImg}
                  alt={lang === 'ar' ? pageTheme.equipNameAr : pageTheme.equipNameEn}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom Shadow Reflection */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Equipment Specifications Footer */}
              <div className="mt-3 pt-1">
                <h4 className="text-sm font-bold text-white leading-snug group-hover:text-[#c5a869] transition-colors">
                  {lang === 'ar' ? pageTheme.equipNameAr : pageTheme.equipNameEn}
                </h4>
                <p className="text-[11px] font-technical text-slate-400 mt-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lang === 'ar' ? pageTheme.equipSpecsAr : pageTheme.equipSpecsEn}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
