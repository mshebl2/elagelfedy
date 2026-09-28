'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { ProjectType } from '@/types';
import { CERTIFIED_PROJECTS_LOG, SCHEMATICS_AND_PHOTOS } from '@/lib/initialData';
import { StatCard } from '@/components/ui/AnimatedCounter';
import {
  CheckCircle2,
  Table as TableIcon,
  Image as ImageIcon,
  ShieldCheck,
  Search,
  Award,
  Layers,
  Sparkles,
  Maximize2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  FileCheck2,
  SlidersHorizontal,
  Compass,
  Zap,
  Activity
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectType[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientFilter, setSelectedClientFilter] = useState('all');

  const featuredProjects = projects.filter((p) => p.featured || p.certificateImage).slice(0, 3);

  const clientFilters = [
    { id: 'all', labelAr: 'كافة المشاريع', labelEn: 'All Projects' },
    { id: 'sec', labelAr: 'السعودية للكهرباء (SEC)', labelEn: 'SEC (Power)' },
    { id: 'aramco', labelAr: 'أرامكو السعودية (Aramco)', labelEn: 'Saudi Aramco' },
    { id: 'kaec', labelAr: 'مدينة الملك عبدالله (KAEC)', labelEn: 'KAEC' },
    { id: 'binyah', labelAr: 'بنية وأمالا البحر الأحمر', labelEn: 'Binyah / Red Sea' },
  ];

  const filteredLog = useMemo(() => {
    return CERTIFIED_PROJECTS_LOG.filter((item) => {
      // Client category filter
      let matchesClient = true;
      if (selectedClientFilter === 'sec') {
        matchesClient = item.client.toLowerCase().includes('sec') || item.client.toLowerCase().includes('electric');
      } else if (selectedClientFilter === 'aramco') {
        matchesClient = item.client.toLowerCase().includes('aramco');
      } else if (selectedClientFilter === 'kaec') {
        matchesClient = item.client.toLowerCase().includes('kaec') || item.location.toLowerCase().includes('economic');
      } else if (selectedClientFilter === 'binyah') {
        matchesClient = item.contractor.toLowerCase().includes('binyah') || item.client.toLowerCase().includes('amaala') || item.client.toLowerCase().includes('red sea');
      }

      if (!matchesClient) return false;

      // Text search query
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.nameAr.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query) ||
        item.clientAr.toLowerCase().includes(query) ||
        item.contractor.toLowerCase().includes(query) ||
        item.contractorAr.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.locationAr.toLowerCase().includes(query) ||
        item.num.toLowerCase().includes(query) ||
        item.length.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedClientFilter]);

  return (
    <section id="projects" className="py-24 bg-[#fbf9f6] dark:bg-[#0e1115] border-b border-slate-200 dark:border-[#2a313a]/80 transition-colors duration-300 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#0f382a]/5 dark:bg-[#c5a869]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-96 h-96 bg-[#937338]/5 dark:bg-[#0f382a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200/80 dark:border-[#2a313a] gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/5 dark:bg-[#c5a869]/10 border border-emerald-800/15 dark:border-[#c5a869]/30 mb-3">
              <span className="w-2 h-2 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-full animate-pulse"></span>
              <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                {dict.projects.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {dict.projects.title}
            </h2>
            <p className="text-sm font-technical text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {dict.projects.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="px-3.5 py-1.5 bg-gradient-to-r from-[#0f382a] to-[#164e3b] dark:from-[#937338] dark:to-[#c5a869] text-white dark:text-[#0c0e10] font-technical text-xs font-extrabold rounded-lg shadow-md tracking-wider">
              {lang === 'ar' ? 'سجل الإنجازات المعتمدة' : 'Official Track Record'}
            </span>
          </div>
        </div>

        {/* Executive KPI Stats Dashboard Strip with Animated Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <StatCard
            isPrimary={true}
            title={lang === 'ar' ? 'إجمالي الأمتار الطولية المعتمدة' : 'Total Certified Reach'}
            value={12136}
            suffix="+"
            unit="LM"
            subtitle={lang === 'ar' ? '✓ مسلّمة رسمياً بشهادات إنجاز' : '✓ Officially handed over'}
            icon={<Layers className="w-4 h-4" />}
            tag={lang === 'ar' ? 'سجل معتمد' : 'Certified'}
          />

          <StatCard
            title={lang === 'ar' ? 'سجل السلامة المهنية' : 'Safety Record'}
            value={100}
            suffix="%"
            unitHighlight="Zero LTI"
            subtitle={lang === 'ar' ? 'مطابقة لتصاريح أرامكو PTW' : 'Aramco PTW & HSSE Compliant'}
            icon={<ShieldCheck className="w-4 h-4" />}
            tag={lang === 'ar' ? 'صفر حوادث' : '0 Incidents'}
          />

          <StatCard
            title={lang === 'ar' ? 'أقصى قطر حفر منجز' : 'Max Completed Diameter'}
            value={1500}
            unit='mm (60")'
            subtitle={lang === 'ar' ? 'حفر صخري وسحب حزم متعددة' : 'Hard rock & bundled pulls'}
            icon={<Maximize2 className="w-4 h-4" />}
            tag={lang === 'ar' ? 'قطر عملاق' : 'Heavy Bore'}
          />

          <StatCard
            title={lang === 'ar' ? 'المعابر الكبرى المنجزة' : 'Major Corridors Executed'}
            value={150}
            suffix="+"
            unit="Crossings"
            subtitle={lang === 'ar' ? 'طرق سريعة، سكك حديد، أودية' : 'Highways, Railways & Wadis'}
            icon={<Compass className="w-4 h-4" />}
            tag={lang === 'ar' ? 'معابر كبرى' : 'Strategic'}
          />
        </div>

        {/* 1. Official Work Completion Certificates Showcase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200/80 dark:border-[#2a313a] pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide font-heading">
                {dict.projects.certSectionTitle}
              </h3>
            </div>
            <span className="text-xs font-technical text-[#937338] dark:text-[#c5a869] font-bold px-2.5 py-1 bg-[#937338]/10 dark:bg-[#c5a869]/10 rounded-md border border-[#937338]/20 dark:border-[#c5a869]/30">
              {dict.projects.certSectionBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] p-5 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-[#937338] dark:hover:border-[#c5a869] transition-all duration-300 hover:shadow-xl relative"
              >
                <div className="space-y-4">
                  {/* Certificate Stamped Image Preview */}
                  <div className="bg-slate-50 dark:bg-[#0c0e10] p-3 border border-slate-200 dark:border-[#2a313a] rounded-xl overflow-hidden relative group/img cursor-pointer"
                    onClick={() =>
                      openLightbox(
                        project.certificateImage || project.mainImage,
                        `${project.client} - ${lang === 'ar' ? project.titleAr : project.titleEn}`
                      )
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.certificateImage || project.mainImage}
                      alt={lang === 'ar' ? project.titleAr : project.titleEn}
                      className="w-full h-64 object-contain bg-white dark:bg-[#0c0e10] rounded-lg transition-transform duration-500 group-hover/img:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-xs">
                      <span className="px-3 py-1.5 bg-white text-slate-900 dark:bg-[#0c0e10] dark:text-white rounded-lg text-xs font-technical font-bold flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'عرض الشهادة الرسمية' : 'View Stamped Certificate'}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-technical text-[#937338] dark:text-[#c5a869] uppercase font-extrabold tracking-wider">
                        {project.client}
                      </span>
                      <span className="text-[10px] font-technical px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1a2026] text-slate-600 dark:text-zinc-400 font-semibold">
                        {project.year}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors leading-snug">
                      {lang === 'ar' ? project.titleAr : project.titleEn}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed line-clamp-3">
                      {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2a313a] flex items-center justify-between text-xs font-technical">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{project.lengthLm}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Completed Projects Master Summary (12,136+ LM) - Executive High-Tech Table */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-[#2a313a] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide font-heading">
                  {dict.projects.masterLogTitle}
                </h3>
              </div>
              <p className="text-xs font-technical text-slate-500 dark:text-zinc-400 mt-1">
                {dict.projects.masterLogSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-[#0c0e10] font-technical text-xs font-extrabold rounded-lg shadow-sm">
                12,136+ {lang === 'ar' ? 'متر طولي منجز' : 'Linear Meters Total'}
              </span>
            </div>
          </div>

          {/* Interactive Filters & Search Controls */}
          <div className="bg-white dark:bg-[#12161a] p-4 rounded-2xl border border-slate-200 dark:border-[#2a313a] mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {clientFilters.map((flt) => (
                <button
                  key={flt.id}
                  onClick={() => setSelectedClientFilter(flt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-technical transition-all ${
                    selectedClientFilter === flt.id
                      ? 'bg-[#0f382a] text-white dark:bg-[#c5a869] dark:text-[#0c0e10] font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-[#181d22] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#222830]'
                  }`}
                >
                  {lang === 'ar' ? flt.labelAr : flt.labelEn}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث في سجل المشاريع المعتمدة...' : 'Search certified project logs...'}
                className="w-full ps-9 pe-4 py-2 bg-slate-50 dark:bg-[#0c0e10] border border-slate-200 dark:border-[#2a313a] rounded-xl text-xs font-technical text-slate-800 dark:text-zinc-200 placeholder-slate-400 focus:outline-hidden focus:border-[#937338] dark:focus:border-[#c5a869]"
              />
            </div>
          </div>

          {/* Responsive High-Tech Projects Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] rounded-2xl shadow-sm">
            <table className="w-full text-start text-xs font-technical">
              <thead className="bg-slate-100/90 dark:bg-[#161a1f] text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-[#2a313a]">
                <tr>
                  <th className="p-4 text-start font-bold">{dict.projects.tableIndex}</th>
                  <th className="p-4 text-start font-bold min-w-[260px]">{dict.projects.tableName}</th>
                  <th className="p-4 text-start font-bold min-w-[150px]">{dict.projects.tableContractor}</th>
                  <th className="p-4 text-start font-bold min-w-[150px]">{dict.projects.tableClient}</th>
                  <th className="p-4 text-start font-bold min-w-[160px]">{lang === 'ar' ? 'القطر والمواصفة' : 'Diameter & Spec'}</th>
                  <th className="p-4 text-end font-bold min-w-[110px]">{dict.projects.tableLength}</th>
                  <th className="p-4 text-center font-bold min-w-[130px]">{dict.projects.tableStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#2a313a]/70 text-slate-700 dark:text-zinc-300">
                {filteredLog.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-zinc-400">
                      {lang === 'ar' ? 'لا توجد مشاريع مطابقة للبحث' : 'No projects matched your search'}
                    </td>
                  </tr>
                ) : (
                  filteredLog.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-slate-50/90 dark:hover:bg-[#161b20] transition-colors group"
                    >
                      {/* Project Index Badge */}
                      <td className="p-4 font-bold text-[#937338] dark:text-[#c5a869] whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-[#937338]/10 dark:bg-[#c5a869]/10 border border-[#937338]/20 dark:border-[#c5a869]/30">
                          {row.num}
                        </span>
                      </td>

                      {/* Project Name & Scope */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#0f382a] dark:group-hover:text-[#c5a869] transition-colors text-xs leading-snug">
                          {lang === 'ar' ? row.nameAr : row.nameEn}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 block mt-0.5">
                          {lang === 'ar' ? row.locationAr : row.location}
                        </span>
                      </td>

                      {/* Contractor */}
                      <td className="p-4 font-medium text-slate-700 dark:text-zinc-300">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{lang === 'ar' ? row.contractorAr : row.contractor}</span>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#181d22] border border-slate-200 dark:border-[#2a313a] inline-block">
                          {lang === 'ar' ? row.clientAr : row.client}
                        </span>
                      </td>

                      {/* Diameter & Spec */}
                      <td className="p-4 font-technical text-slate-600 dark:text-zinc-300">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/20 text-[11px] font-semibold">
                          {row.diameter || 'HDPE / Steel'}
                        </span>
                      </td>

                      {/* Length */}
                      <td className="p-4 text-end font-extrabold text-slate-900 dark:text-white font-mono text-sm whitespace-nowrap" dir="ltr">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                          {row.length}
                        </span>
                      </td>

                      {/* Certified Status */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] rounded-lg font-extrabold border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{lang === 'ar' ? row.statusAr : row.statusEn}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. As-Built Schematics & Field Execution Photos */}
        <div>
          <div className="mb-6 border-b border-slate-200/80 dark:border-[#2a313a] pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#0f382a] dark:text-[#c5a869]" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide font-heading">
                {dict.projects.schematicsTitle}
              </h3>
            </div>
            <p className="text-xs font-technical text-slate-500 dark:text-zinc-400 mt-1">
              {dict.projects.schematicsSubtitle}
            </p>
          </div>

          {/* Schematics Profile Drawings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {SCHEMATICS_AND_PHOTOS.schematics.map((item, sIdx) => (
              <div
                key={sIdx}
                className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] p-4 rounded-2xl shadow-sm hover:border-[#937338] transition-all group cursor-pointer"
                onClick={() => openLightbox(item.image, lang === 'ar' ? item.titleAr : item.titleEn)}
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-100 dark:border-[#2a313a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={lang === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-48 object-contain bg-white dark:bg-[#0c0e10] rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="px-3 py-1 bg-white text-slate-900 dark:bg-black dark:text-white rounded-lg text-xs font-technical font-bold flex items-center gap-1 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'تكبير المخطط الهندسي' : 'Zoom Schematic'}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-technical">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </span>
                  <span className="text-[#0f382a] dark:text-[#c5a869] font-bold shrink-0 ms-2 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-[10px]">
                    {lang === 'ar' ? item.tagAr : item.tagEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Field Execution Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SCHEMATICS_AND_PHOTOS.fieldPhotos.map((photo, pIdx) => (
              <div
                key={pIdx}
                className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#12161a] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => openLightbox(photo.image, lang === 'ar' ? photo.titleAr : photo.titleEn)}
              >
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.image}
                    alt={lang === 'ar' ? photo.titleAr : photo.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 start-2 end-2">
                    <span className="block text-[11px] font-technical text-white font-medium drop-shadow-md truncate">
                      {lang === 'ar' ? photo.titleAr : photo.titleEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
