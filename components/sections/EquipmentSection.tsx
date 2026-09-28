'use client';

import React from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { getDictionary } from '@/lib/i18n';
import { EquipmentType } from '@/types';

interface EquipmentSectionProps {
  equipmentList?: EquipmentType[];
}

export default function EquipmentSection({ equipmentList = [] }: EquipmentSectionProps) {
  const { lang, openLightbox } = useApp();
  const dict = getDictionary(lang);

  const safeList = Array.isArray(equipmentList) ? equipmentList : [];
  const primaryRigs = safeList.slice(0, 2);
  const secondaryTooling = safeList.slice(2);

  return (
    <section id="equipment" className="py-20 bg-white dark:bg-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
            <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
              {dict.equipment.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {dict.equipment.title}
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
            {dict.equipment.subtitle}
          </p>
        </div>

        {/* 1. Main Flagship Drilling Rigs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {primaryRigs.map((rig, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] rounded-lg shadow-2xs overflow-hidden flex flex-col justify-between card-hover-effect transition-all"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-50 dark:bg-[#0c0e10] border-b border-slate-200 dark:border-[#2a313a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rig.image}
                    alt={lang === 'ar' ? rig.nameAr : rig.nameEn}
                    className="w-full h-full object-cover img-zoom"
                    onClick={() =>
                      openLightbox(
                        rig.image,
                        `${lang === 'ar' ? rig.nameAr : rig.nameEn} - ${lang === 'ar' ? rig.tagAr : rig.tagEn}`
                      )
                    }
                  />
                  <span className="absolute top-3 end-3 bg-white/95 dark:bg-[#0c0e10]/95 px-2.5 py-0.5 border border-[#0f382a] dark:border-[#c5a869] text-[10px] font-technical text-[#0f382a] dark:text-[#c5a869] font-bold rounded shadow-xs">
                    {lang === 'ar' ? rig.tagAr : rig.tagEn}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' ? rig.nameAr : rig.nameEn}
                    </h3>
                    <span className="text-xs font-technical text-[#937338] dark:text-[#c5a869] font-bold">
                      {lang === 'ar' ? rig.categoryAr : rig.categoryEn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {lang === 'ar' ? rig.descriptionAr : rig.descriptionEn}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-200 dark:border-[#2a313a] pt-3 font-technical">
                    {(lang === 'ar' ? rig.specsAr : rig.specsEn).map((spec, sIdx) => (
                      <div key={sIdx}>
                        <span className="text-slate-500 dark:text-zinc-400 block">{spec.label}:</span>
                        <strong className="text-slate-900 dark:text-white">{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {(rig.footerNoteAr || rig.footerNoteEn) && (
                <div className="p-3 bg-slate-50 dark:bg-[#0c0e10] border-t border-slate-200 dark:border-[#2a313a] text-[10px] font-technical text-slate-600 dark:text-zinc-400">
                  {lang === 'ar' ? rig.footerNoteAr : rig.footerNoteEn}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. Mega Rig, Tooling & Butt Fusion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryTooling.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-4 rounded-lg shadow-2xs space-y-3 flex flex-col justify-between card-hover-effect transition-all"
            >
              <div className="space-y-3">
                <div className="h-36 overflow-hidden rounded bg-slate-50 dark:bg-[#0c0e10] border border-slate-200 dark:border-[#2a313a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={lang === 'ar' ? item.nameAr : item.nameEn}
                    className="w-full h-full object-cover img-zoom"
                    onClick={() => openLightbox(item.image, lang === 'ar' ? item.nameAr : item.nameEn)}
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? item.nameAr : item.nameEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div>
                {item.plateImage ? (
                  <div className="p-2 border border-slate-200 dark:border-[#2a313a] bg-slate-50 dark:bg-[#0c0e10] rounded mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.plateImage}
                      alt="OEM Nameplate"
                      className="w-full h-16 object-contain img-zoom"
                      onClick={() => openLightbox(item.plateImage!, 'ZLCONN OEM Factory Nameplate')}
                    />
                  </div>
                ) : (
                  <div className="text-[10px] font-technical text-slate-600 dark:text-zinc-400 border-t border-slate-200 dark:border-[#2a313a] pt-2">
                    {(lang === 'ar' ? item.specsAr : item.specsEn).map((sp, i) => (
                      <div key={i}>
                        {sp.label}: <strong className="text-slate-900 dark:text-white">{sp.value}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
