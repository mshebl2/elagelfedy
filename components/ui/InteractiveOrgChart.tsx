'use client';

import React, { useState } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import {
  Crown,
  UserCheck,
  Users,
  Calculator,
  Compass,
  Layers,
  FolderKanban,
  Maximize2,
  ShieldCheck,
  HardHat,
  Building2,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export default function InteractiveOrgChart() {
  const { lang, openLightbox } = useApp();
  const [viewMode, setViewMode] = useState<'hierarchy' | 'blueprint'>('hierarchy');

  return (
    <div className="rounded-2xl bg-white dark:bg-[#0c0e10] border border-slate-200 dark:border-[#2a313a] p-6 sm:p-10 shadow-sm transition-colors duration-300">
      {/* Section Header with Tabs & Zoom Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#202730] pb-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f382a] dark:bg-[#c5a869]" />
            <span className="text-xs uppercase font-technical font-bold text-[#0f382a] dark:text-[#c5a869] tracking-wider">
              {lang === 'ar' ? 'الهيكل الإداري والتنظيمي المعتمد' : 'Approved Organizational Structure'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            {lang === 'ar' ? 'حوكمة القيادة وإدارة العمليات' : 'Corporate Governance & Operations Tree'}
          </h3>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#161c22] border border-slate-200 dark:border-[#2a313a]">
            <button
              type="button"
              onClick={() => setViewMode('hierarchy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical font-bold transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-white dark:bg-[#252f3a] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'الهيكل الإداري' : 'Organizational Tree'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('blueprint')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-technical font-bold transition-all ${
                viewMode === 'blueprint'
                  ? 'bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'المخطط الهندسي (SVG)' : 'Blueprint (Vector)'}
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              openLightbox(
                '/images/about/org_chart_modern.svg',
                lang === 'ar'
                  ? 'الهيكل التنظيمي المعتمد - شركة العاج الفضي للمقاولات'
                  : 'Approved Organization Chart - AACC HDD-MT'
              )
            }
            title={lang === 'ar' ? 'تكبير المخطط' : 'Enlarge Chart'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#161c22] dark:hover:bg-[#222b35] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-[#2a313a] transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEW 1: AUTHENTIC CORPORATE HIERARCHY TREE */}
      {viewMode === 'hierarchy' ? (
        <div className="w-full">
          {/* ================= LEVEL 1: CHAIRMAN & BOARD ================= */}
          <div className="flex flex-col items-center">
            <div className="relative max-w-md w-full bg-gradient-to-b from-slate-50 to-white dark:from-[#151c24] dark:to-[#0f141a] rounded-2xl p-6 border-2 border-[#c5a869] shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Crown className="w-6 h-6" />
              </div>
              
              <span className="text-[11px] font-technical uppercase tracking-widest text-[#937338] dark:text-[#c5a869] font-bold block mb-1">
                {lang === 'ar' ? 'مجلس الإدارة • Board of Directors' : 'Board of Directors'}
              </span>

              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                {lang === 'ar' ? 'رئيس مجلس الإدارة' : 'Chairman of the Board'}
              </h4>

              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                {lang === 'ar'
                  ? 'القيادة الإستراتيجية والحوكمة المؤسسية وتوجيه الرؤية المستقبلية'
                  : 'Strategic Governance, Corporate Direction & Board Leadership'}
              </p>

              {/* Node Bottom Anchor Point */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#c5a869] border-2 border-white dark:border-[#0c0e10]" />
            </div>

            {/* Vertical Connector Line */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#c5a869] to-[#0f382a] dark:to-[#c5a869]" />
          </div>

          {/* ================= LEVEL 2: CO-FOUNDER & CEO ================= */}
          <div className="flex flex-col items-center">
            <div className="relative max-w-2xl w-full bg-white dark:bg-[#131920] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-[#2a313a] shadow-sm hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-start">
                {/* Real Executive Profile Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/leadership/mahmoud_alsheakh.jpg"
                  alt="Eng. Mahmoud Alsheakh"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-[#c5a869] shadow-xs shrink-0"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-1">
                    <span className="text-[11px] font-technical uppercase font-bold text-[#0f382a] dark:text-[#c5a869] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40">
                      {lang === 'ar' ? 'القيادة التنفيذية' : 'Executive Leadership'}
                    </span>
                    <span className="text-[11px] font-technical text-slate-500 dark:text-zinc-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a869]" />
                      <span>{lang === 'ar' ? '18+ سنة خبرة في الحفر الموجه' : '18+ Yrs HDD Expertise'}</span>
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'المؤسس المشارك والرئيس التنفيذي' : 'Co-Founder & Chief Executive Officer'}
                  </h4>
                  
                  <p className="text-xs sm:text-sm font-technical font-semibold text-[#937338] dark:text-[#c5a869] mt-0.5">
                    {lang === 'ar' ? 'م. محمود عبيد الشيخ' : 'Eng. Mahmoud Obead Alsheakh'}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed">
                    {lang === 'ar'
                      ? 'الإشراف الشامل على تطوير الأعمال، والعمليات التنفيذية لمشاريع الحفر الموجه والأنفاق، وضمان الامتثال الصارم لمعايير الجودة والسلامة لأرامكو والجهات السيادية.'
                      : 'Overall executive governance, strategic operations, HDD project delivery, and sovereign compliance under Saudi Aramco and Royal Commission standards.'}
                  </p>
                </div>
              </div>

              {/* Node Bottom Anchor Point */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0f382a] dark:bg-[#c5a869] border-2 border-white dark:border-[#0c0e10]" />
            </div>

            {/* Tree Branch Splitter to Level 3 */}
            <div className="w-0.5 h-8 bg-slate-300 dark:bg-[#2a313a]" />
          </div>

          {/* Tree Horizontal Distribution Bar (Desktop) */}
          <div className="hidden lg:block relative w-[92%] mx-auto mb-6">
            <div className="h-0.5 bg-slate-300 dark:bg-[#2a313a] w-full" />
            <div className="absolute top-0 left-0 w-0.5 h-6 bg-slate-300 dark:bg-[#2a313a]" />
            <div className="absolute top-0 left-[25%] w-0.5 h-6 bg-slate-300 dark:bg-[#2a313a]" />
            <div className="absolute top-0 left-[50%] w-0.5 h-6 bg-slate-300 dark:bg-[#2a313a]" />
            <div className="absolute top-0 left-[75%] w-0.5 h-6 bg-slate-300 dark:bg-[#2a313a]" />
            <div className="absolute top-0 right-0 w-0.5 h-6 bg-slate-300 dark:bg-[#2a313a]" />
          </div>

          {/* ================= LEVEL 3: 5 FUNCTIONAL DIRECTORS & MANAGERS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Projects Manager */}
            <div className="bg-slate-50/70 dark:bg-[#131920] rounded-xl p-5 border border-slate-200 dark:border-[#242d36] hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-technical uppercase font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                  {lang === 'ar' ? 'إدارة المشاريع' : 'Project Management'}
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'مدير إدارة المشاريع' : 'Projects Manager'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'تخطيط الجداول الزمنية، مطابقة الجودة، وإدارة عمليات التسليم الميداني.'
                    : 'Milestone planning, QA compliance, client handovers, and execution timelines.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#202832] text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                <span>{lang === 'ar' ? 'قسم التخطيط والمشاريع' : 'PMO Department'}</span>
              </div>
            </div>

            {/* 2. HDD-MT Operations Manager */}
            <div className="bg-slate-50/70 dark:bg-[#131920] rounded-xl p-5 border border-slate-200 dark:border-[#242d36] hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-technical uppercase font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                  {lang === 'ar' ? 'العمليات والميدان' : 'Field Operations'}
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'مدير عمليات الحفر والأنفاق' : 'HDD-MT Operations Manager'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'إدارة أسطول الحفارات الثقيلة والأنفاق الدقيقة وجاهزية الميدان.'
                    : 'Fleet allocation, microtunneling machinery, and heavy rig mobilization.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#202832] text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                <span>{lang === 'ar' ? 'إدارة الأسطول والميدان' : 'Fleet & Field Ops'}</span>
              </div>
            </div>

            {/* 3. HDD Superintendent */}
            <div className="bg-slate-50/70 dark:bg-[#131920] rounded-xl p-5 border border-slate-200 dark:border-[#242d36] hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-technical uppercase font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                  {lang === 'ar' ? 'الإشراف الميداني' : 'Site Direction'}
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'مشرف عام الحفر الموجه' : 'HDD Superintendent'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'التوجيه الميداني الدقيق لمسارات الحفر الصخري وأنظمة DCI Falcon.'
                    : 'Bore-path telemetry, hard rock navigation, and reamer pullback supervision.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#202832] text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                <span>{lang === 'ar' ? 'الإشراف الفني المباشر' : 'Drilling Telemetry'}</span>
              </div>
            </div>

            {/* 4. Human Resources Manager */}
            <div className="bg-slate-50/70 dark:bg-[#131920] rounded-xl p-5 border border-slate-200 dark:border-[#242d36] hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-technical uppercase font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                  {lang === 'ar' ? 'الموارد البشرية' : 'Human Capital'}
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'مدير الموارد البشرية' : 'Human Resources Manager'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'استقطاب الكفاءات الهندسية، وبرامج التوطين والسعودة والتأهيل.'
                    : 'Talent development, Saudization compliance, training, and personnel safety.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#202832] text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                <span>{lang === 'ar' ? 'إدارة الموارد والتوطين' : 'HR & Saudization'}</span>
              </div>
            </div>

            {/* 5. Finance Manager */}
            <div className="bg-slate-50/70 dark:bg-[#131920] rounded-xl p-5 border border-slate-200 dark:border-[#242d36] hover:border-[#0f382a] dark:hover:border-[#c5a869] transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-technical uppercase font-bold text-slate-500 dark:text-zinc-400 block mb-1">
                  {lang === 'ar' ? 'الإدارة المالية' : 'Finance & Audit'}
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'المدير المالي' : 'Finance Manager'}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {lang === 'ar'
                    ? 'إدارة التدفقات النقدية والموازنات المالية والمراجعة والرقابة.'
                    : 'Financial governance, procurement audits, fiscal planning, and budgets.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#202832] text-[10px] font-technical text-slate-500 dark:text-zinc-400">
                <span>{lang === 'ar' ? 'الرقابة المالية والمحاسبة' : 'Fiscal Governance'}</span>
              </div>
            </div>
          </div>

          {/* ================= LEVEL 4: 3 FOUNDATION STRATEGIC PILLARS ================= */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#242d36] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                  {lang === 'ar' ? 'الجودة والسلامة المهنية QHSE' : 'Quality & HSE Standards'}
                </strong>
                <span className="text-[11px] text-slate-600 dark:text-zinc-400">
                  {lang === 'ar' ? 'تصاريح أرامكو PTW وسجل 100% Zero LTI' : 'Aramco PTW & 100% Zero LTI Record'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-slate-950 flex items-center justify-center shrink-0">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                  {lang === 'ar' ? 'العمليات والميدان' : 'Field Operations'}
                </strong>
                <span className="text-[11px] text-slate-600 dark:text-zinc-400">
                  {lang === 'ar' ? 'أسطول الحفارات المتقدمة وفرق التوجيه' : 'Advanced Rig Fleet & Navigation Crews'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                  {lang === 'ar' ? 'الإدارة التنفيذية والحوكمة' : 'Executive Governance'}
                </strong>
                <span className="text-[11px] text-slate-600 dark:text-zinc-400">
                  {lang === 'ar' ? 'التوسع الاستراتيجي وشراكات رؤية 2030' : 'Strategic Expansion & Vision 2030'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: VECTOR BLUEPRINT DIAGRAM VIEW */
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2a313a] bg-[#070c0e] p-4 group cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/org_chart_modern.svg"
            alt="AACC Modern Approved Organization Chart"
            className="w-full h-auto max-h-[640px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
            onClick={() =>
              openLightbox(
                '/images/about/org_chart_modern.svg',
                lang === 'ar'
                  ? 'الهيكل التنظيمي المعتمد - شركة العاج الفضي'
                  : 'Approved Organization Structure - AACC'
              )
            }
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-technical border border-[#c5a869] shadow-lg flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#c5a869]" />
              {lang === 'ar' ? 'اضغط لتكبير المخطط بدقة فائقة' : 'Click to enlarge full vector chart'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
