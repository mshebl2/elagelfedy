'use client';

import React from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { SiteContentType } from '@/types';
import InteractiveOrgChart from '@/components/ui/InteractiveOrgChart';
import {
  Compass,
  Cpu,
  Zap,
  Sparkles,
  Target,
  Crosshair,
  ShieldCheck,
  Clock,
  Globe2,
  Layers
} from 'lucide-react';

interface AboutSectionProps {
  content?: SiteContentType['about'];
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const leaders = content?.leadership || [
    {
      nameAr: 'م. محمود عبيد الشيخ',
      nameEn: 'Mahmoud Obead Alsheakh',
      roleAr: 'المؤسس المشارك والرئيس التنفيذي',
      roleEn: 'Co-Founder & Chief Executive Officer',
      experienceAr: '18+ سنة خبرة في الحفر الموجه',
      experienceEn: '18+ Yrs HDD',
      subRoleAr: 'سابقاً نور للاتصالات والأنقري • مشرف أول عمليات HDD',
      subRoleEn: 'Former Noor Telecom & Al-Angari • Senior HDD Superintendent',
      quoteAr:
        '«من خلال 18 عاماً من الخبرة في الحفر الأفقي الموجه، اكتسبنا فهماً هندسياً عميقاً لهذه التقنية المتقدمة. ننفذ المعابر المعقدة — من الطرق السريعة وخطوط السكك الحديدية إلى المعابر تحت المائية — مبتكرين حلولاً هندسية لكل تحدٍ جيولوجي.»',
      quoteEn:
        '“With 18 years of experience in horizontal directional boring, I gained deep understanding of this advanced technology. We implement complex crossings—from multi-lane highways and rail corridors to underwater lines—developing innovative solutions to every geological challenge.”',
      image: '/images/leadership/mahmoud_alsheakh.jpg',
      badges: ['Aramco PTW Certified', 'Vermeer & DCI Specialist'],
    },
    {
      nameAr: 'مؤيد حاج مسعود',
      nameEn: 'Mouayed Haj Masoud',
      roleAr: 'المؤسس المشارك والمدير الشريك',
      roleEn: 'Co-Founder & Managing Partner',
      experienceAr: '20+ سنة في قطاع الطاقة والبنية التحتية',
      experienceEn: '20+ Yrs Energy',
      subRoleAr: 'مؤسس شركة SICC • قيادي تنفيذي في مشاريع الجهد العالي والموارد الاستراتيجية',
      subRoleEn: 'Founder of SICC • Strategic Energy, High-Voltage & Resource Executive',
      quoteAr:
        '«مع أكثر من 20 عاماً من الخبرة في قطاعات الطاقة والصناعة، كان تركيزي دائماً على تطوير حلول مبتكرة وفعالة من حيث التكلفة لرفع الكفاءة التشغيلية مع الحفاظ الصارم على أعلى معايير السلامة المهنية.»',
      quoteEn:
        '“With over 20 years of experience in the energy and industrial sectors, my focus has always been developing innovative, cost-effective solutions to enhance operational efficiency while maintaining uncompromising safety discipline.”',
      image: '/images/leadership/mouayed_masoud.jpg',
      badges: ['Industrial Operations', 'Energy & Infrastructure'],
    },
  ];

  const vision = content?.vision || {
    titleAr: 'ريادة هندسية شاملة',
    titleEn: 'Comprehensive Engineering Leadership',
    textAr:
      '«نسعى لأن نكون الرواد في مجال الحفر الأفقي الموجه وحفر الأنفاق الدقيقة في المملكة والمنطقة، من خلال تقديم حلول هندسية مبتكرة تلبي متطلبات البنية التحتية المتنامية بأعلى معايير السلامة والجودة.»',
    textEn:
      '“We seek to be the leaders in horizontal drilling and tunneling across the Kingdom and region, providing innovative engineering solutions that meet growing infrastructure needs with the highest standards of safety and quality.”',
  };

  const mission = content?.mission || {
    titleAr: 'تبني أحدث التقنيات وتجاوز التوقعات',
    titleEn: 'Technology Adoption & Exceeding Expectations',
    textAr:
      '«نتبنى أحدث التقنيات العالمية في الحفر الموجه وحفر الأنفاق لتقديم خدمات فائقة الدقة والسرعة، متجاوزين توقعات عملائنا، وفاتحين آفاقاً جديدة في تطوير البنية التحتية مع الالتزام التام بالمسؤولية المجتمعية والبيئية.»',
    textEn:
      '“We adopt the latest technologies in horizontal directional drilling and tunneling to provide fast, efficient services, exceed client expectations, and open new horizons in infrastructure development while committing to social and environmental responsibility.”',
  };

  const values = content?.values || [
    {
      number: '01',
      titleAr: 'الدقة الهندسية',
      titleEn: 'Engineering Precision',
      descriptionAr: 'توجيه telemetry تحت سطحي عالي الدقة بنظام DCI Falcon مع لحام وتماسك معتمد لأنابيب البولي إيثيلين والصلب.',
      descriptionEn: 'Sub-millimeter DCI Falcon guidance telemetry and certified butt-fusion joint integrity.',
    },
    {
      number: '02',
      titleAr: 'سلامة بلا حوادث (Zero-Harm)',
      titleEn: 'Zero-Harm Safety',
      descriptionAr: 'امتثال تام لتصاريح عمل أرامكو السعودية (PTW)، ومعايير Kent HSSE العالمية، وتدقيق يومي في الميدان.',
      descriptionEn: 'Aramco PTW compliance, Kent HSSE excellence benchmarks, and daily field audits.',
    },
    {
      number: '03',
      titleAr: 'الالتزام الصارم بالمواعيد',
      titleEn: 'On-Time Delivery',
      descriptionAr: 'سرعة استثنائية مثبتة، مثل إنجاز نفق صخري بقطر 42 بوصة وبطول 110 أمتار خلال 7 أيام عمل فقط.',
      descriptionEn: 'Demonstrated speed, such as completing a 110m 42-inch rock tunnel in exactly 7 days.',
    },
    {
      number: '04',
      titleAr: 'شراكة مستدامة',
      titleEn: 'Sustainable Partnership',
      descriptionAr: 'أدنى تأثير بيئي على السطح، وإعادة تدوير مغلقة لسوائل الحفر، وقيمة مضافة طويلة الأجل للمقاولين.',
      descriptionEn: 'Minimal surface disturbance, closed-loop fluid recycling, and long-term contractor value.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#fbf9f6] dark:bg-[#13171b] border-b border-slate-200 dark:border-[#2a313a]/60 grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
          <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
            {lang === 'ar' ? content?.badgeAr || dict.about.badge : content?.badgeEn || dict.about.badge}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          {lang === 'ar' ? content?.titleAr || dict.about.title : content?.titleEn || dict.about.title}
        </h2>
        <p className="text-base text-slate-600 dark:text-zinc-300 max-w-4xl leading-relaxed mb-12">
          {lang === 'ar'
            ? content?.descriptionAr ||
              'تأسست شركة العاج الفضي للمقاولات (AACC HDD-MT) بقدرات تخصصية عالية في الحفر الأفقي الموجه والبنية التحتية المدنية، وتقود تنفيذ أكثر المعابر الأرضية تعقيداً، وتمديد خطوط المرافق الحيوية للمشاريع العملاقة في المملكة.'
            : content?.descriptionEn ||
              'Founded with specialized horizontal directional boring and civil infrastructure capabilities, Alaaj Alfedhi Contracting Company (AACC HDD-MT) leads complex subterranean crossings, utility installations, and mega infrastructure across the Kingdom.'}
        </p>

        {/* Leadership Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="border border-slate-200/90 dark:border-[#2a313a] bg-white dark:bg-[#0c0e10] p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:border-[#c5a869] dark:hover:border-[#c5a869]/70 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle Ambient Background Glow on Hover */}
              <div className="absolute top-0 end-0 w-64 h-64 bg-gradient-to-br from-[#c5a869]/5 to-transparent dark:from-[#c5a869]/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  {/* Executive Photo Container with Elegant Border */}
                  <div className="relative shrink-0">
                    <div className="w-36 sm:w-44 h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-[#2a313a] bg-slate-100 dark:bg-[#13171b] shadow-md relative group/photo cursor-pointer hover:border-[#c5a869] transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={leader.image}
                        alt={lang === 'ar' ? leader.nameAr : leader.nameEn}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                        onClick={() =>
                          openLightbox(
                            leader.image,
                            `${lang === 'ar' ? leader.nameAr : leader.nameEn} - ${
                              lang === 'ar' ? leader.roleAr : leader.roleEn
                            }`
                          )
                        }
                      />
                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                          <Sparkles className="w-4 h-4 text-[#c5a869]" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Details Column */}
                  <div className="space-y-3.5 text-center sm:text-start flex-1 min-w-0">
                    {/* Top Badges Row */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-[#0f382a] dark:text-emerald-300 text-[11px] font-bold uppercase rounded-full border border-emerald-200 dark:border-emerald-800/40 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{lang === 'ar' ? 'القيادة التنفيذية' : 'Executive Leadership'}</span>
                      </span>

                      {/* Years of Experience Badge (Clean, High-Contrast, Prominent) */}
                      <span className="px-3 py-1 bg-amber-500/10 dark:bg-[#c5a869]/15 text-[#937338] dark:text-[#c5a869] text-[11px] font-bold uppercase rounded-full border border-amber-300/60 dark:border-[#c5a869]/40 inline-flex items-center gap-1.5 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#937338] dark:text-[#c5a869] shrink-0" />
                        <span>{lang === 'ar' ? leader.experienceAr : leader.experienceEn}</span>
                      </span>
                    </div>

                    {/* Name & Role */}
                    <div className="space-y-0.5">
                      <h3 className="text-2xl sm:text-[26px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {lang === 'ar' ? leader.nameAr : leader.nameEn}
                      </h3>
                      <p className="text-xs sm:text-sm font-technical font-semibold text-slate-500 dark:text-zinc-400">
                        {lang === 'ar' ? leader.nameEn : leader.nameAr}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-[#937338] dark:text-[#c5a869] pt-1">
                        {lang === 'ar' ? leader.roleAr : leader.roleEn}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {lang === 'ar' ? leader.subRoleAr : leader.subRoleEn}
                    </p>

                    {/* Accreditations Badges */}
                    <div className="flex flex-wrap gap-2 pt-1.5 justify-center sm:justify-start font-technical text-[10px]">
                      {leader.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-[#161c22] border border-slate-200 dark:border-[#2a313a] text-slate-700 dark:text-zinc-300 font-semibold rounded-lg shadow-2xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Quote Block */}
              <blockquote className="border-s-2 border-[#937338] dark:border-[#c5a869] ps-4 text-xs sm:text-[13px] text-slate-600 dark:text-zinc-300 italic leading-relaxed bg-slate-50 dark:bg-[#13171b] p-4 rounded-e-2xl mt-4">
                {lang === 'ar' ? leader.quoteAr : leader.quoteEn}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Approved Organization Structure Presentation */}
        <div className="mb-12">
          <InteractiveOrgChart />
        </div>

        {/* Vision & Mission Statements with Ultra-Modern Engineering Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* 1. Vision Card (الرؤية المؤسسية 2030) */}
          <div className="border border-slate-200 dark:border-[#2a313a] bg-gradient-to-br from-white via-white to-amber-50/20 dark:from-[#0f1317] dark:via-[#0c0e10] dark:to-[#141920] p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#c5a869] transition-all duration-300">
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#c5a869] via-amber-400 to-[#937338]" />

            {/* Background Watermark Icon */}
            <div className="absolute -bottom-6 -end-6 w-36 h-36 opacity-5 dark:opacity-5 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity text-[#c5a869] pointer-events-none">
              <Compass className="w-full h-full" />
            </div>

            {/* Header with Modern 3D Icon Badge */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                {/* Ambient Glow */}
                <div className="absolute -inset-1 bg-[#c5a869]/30 rounded-2xl blur-md group-hover:bg-[#c5a869]/50 transition-all pointer-events-none" />
                
                {/* 3D Glassmorphic Icon Container */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c5a869]/25 via-amber-500/15 to-[#0c0e10]/80 dark:bg-gradient-to-br dark:from-[#c5a869]/30 dark:via-[#1a2027] dark:to-[#0c0e10] border-2 border-[#c5a869]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Compass className="w-7 h-7 text-[#937338] dark:text-[#c5a869] transition-transform duration-700 group-hover:rotate-45" />
                  <span className="absolute -top-1 -end-1 w-3 h-3 rounded-full bg-[#c5a869] border-2 border-white dark:border-[#0c0e10] shadow-xs" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c5a869]/10 text-[#937338] dark:text-[#c5a869] text-[10px] font-technical uppercase font-bold tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'الرؤية المؤسسية 2030' : 'Corporate Vision 2030'}</span>
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-[#c5a869] transition-colors">
                  {lang === 'ar' ? vision.titleAr : vision.titleEn}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed relative z-10 font-normal">
              {lang === 'ar' ? vision.textAr : vision.textEn}
            </p>
          </div>

          {/* 2. Mission Card (الرسالة المؤسسية الهندسية) */}
          <div className="border border-slate-200 dark:border-[#2a313a] bg-gradient-to-br from-white via-white to-emerald-50/20 dark:from-[#0f1317] dark:via-[#0c0e10] dark:to-[#0e1614] p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden group hover:border-[#10b981] transition-all duration-300">
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-700" />

            {/* Background Watermark Icon */}
            <div className="absolute -bottom-6 -end-6 w-36 h-36 opacity-5 dark:opacity-5 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity text-emerald-500 pointer-events-none">
              <Cpu className="w-full h-full" />
            </div>

            {/* Header with Modern 3D Icon Badge */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                {/* Ambient Glow */}
                <div className="absolute -inset-1 bg-emerald-500/30 rounded-2xl blur-md group-hover:bg-emerald-500/50 transition-all pointer-events-none" />
                
                {/* 3D Glassmorphic Icon Container */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-[#0c0e10]/80 dark:bg-gradient-to-br dark:from-emerald-500/30 dark:via-[#121c18] dark:to-[#0c0e10] border-2 border-emerald-500/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Cpu className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <span className="absolute -top-1 -end-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0c0e10] animate-pulse" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-technical uppercase font-bold tracking-wider">
                  <Zap className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'الرسالة المؤسسية الهندسية' : 'Corporate Engineering Mission'}</span>
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {lang === 'ar' ? mission.titleAr : mission.titleEn}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed relative z-10 font-normal">
              {lang === 'ar' ? mission.textAr : mission.textEn}
            </p>
          </div>
        </div>

        {/* 4 Architectural Values with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((val, idx) => {
            const valIcons = [Crosshair, ShieldCheck, Clock, Globe2];
            const ValIcon = valIcons[idx % valIcons.length];
            return (
              <div
                key={idx}
                className="p-5 border-t-2 border-[#0f382a] dark:border-[#c5a869] bg-white dark:bg-[#0c0e10] border-x border-b border-slate-200 dark:border-[#2a313a] rounded-xl shadow-2xs space-y-2 group hover:border-[#c5a869] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-technical text-[#937338] dark:text-[#c5a869] text-xs font-bold block">
                    {val.number}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#181d22] border border-slate-200 dark:border-[#2a313a] flex items-center justify-center text-[#0f382a] dark:text-[#c5a869] group-hover:bg-[#c5a869]/20 transition-colors">
                    <ValIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                  {lang === 'ar' ? val.titleAr : val.titleEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {lang === 'ar' ? val.descriptionAr : val.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
