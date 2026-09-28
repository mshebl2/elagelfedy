'use client';

import React, { useState } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Compass,
  Car
} from 'lucide-react';

interface LiveLocationMapProps {
  className?: string;
  showTitle?: boolean;
}

export default function LiveLocationMap({ className = '', showTitle = true }: LiveLocationMapProps) {
  const { lang } = useApp();
  const [copied, setCopied] = useState(false);

  const addressAr = 'مبنى 3315، شارع حفصة بنت عمر، حي الأندلس، الرياض 13212، المملكة العربية السعودية';
  const addressEn = 'Building 3315, Hafsa Bint Umar St, Al Andalus, Riyadh 13212, Kingdom of Saudi Arabia';
  const coordinates = '24.739744, 46.786512';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=3315+Hafsa+Bint+Umar+St,+Al+Andalus,+Riyadh+13212,+Saudi+Arabia';
  const wazeUrl = 'https://waze.com/ul?q=3315+Hafsa+Bint+Umar+St,+Al+Andalus,+Riyadh';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(lang === 'ar' ? addressAr : addressEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#0c0e10] overflow-hidden shadow-sm hover:border-[#c5a869]/50 transition-all ${className}`}
    >
      {showTitle && (
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#2a313a] flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-[#13171b]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0f382a] to-emerald-600 dark:from-[#937338] dark:to-[#c5a869] text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-technical uppercase text-[#0f382a] dark:text-[#c5a869] font-bold tracking-wider block">
                {lang === 'ar' ? 'الموقع الجغرافي المباشر' : 'Live Geolocation'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'المقر الرئيسي — الرياض' : 'Headquarters — Riyadh'}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAddress}
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-technical text-slate-700 dark:text-zinc-300 hover:text-[#0f382a] dark:hover:text-[#c5a869] transition-colors"
              title={lang === 'ar' ? 'نسخ العنوان' : 'Copy Address'}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>{lang === 'ar' ? 'نسخ العنوان' : 'Copy'}</span>
                </>
              )}
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0f382a] dark:bg-[#c5a869] text-white dark:text-slate-950 text-[11px] font-technical font-bold hover:opacity-90 transition-opacity"
            >
              <Navigation className="w-3 h-3" />
              <span>{lang === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Interactive Google Map Iframe */}
      <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100 dark:bg-slate-900">
        <iframe
          title="AACC Riyadh Headquarters Location Map"
          src="https://maps.google.com/maps?q=3315%20Hafsa%20Bint%20Umar%20St,%20Al%20Andalus,%20Riyadh%2013212%20Saudi%20Arabia&t=m&z=16&output=embed&iwloc=near"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter contrast-[1.02] dark:invert-[0.9] dark:hue-rotate-180 dark:brightness-95"
        />

        {/* Location Floating Pin Card */}
        <div className="absolute top-3 start-3 max-w-[280px] bg-white/95 dark:bg-[#0c0e10]/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-[#2a313a] shadow-lg pointer-events-none">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 animate-bounce">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                {lang === 'ar' ? 'شركة العاج الفضي للمقاولات' : 'Alaaj Alfedhi Contracting (AACC)'}
              </p>
              <p className="text-[10px] text-slate-600 dark:text-zinc-400 mt-0.5 leading-snug">
                {lang === 'ar' ? addressAr : addressEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Action Bar */}
      <div className="p-3 sm:p-4 bg-slate-50/80 dark:bg-[#13171b]/90 border-t border-slate-200 dark:border-[#2a313a] flex flex-wrap items-center justify-between gap-3 text-xs font-technical">
        <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-400 text-[11px]">
          <Compass className="w-3.5 h-3.5 text-[#0f382a] dark:text-[#c5a869]" />
          <span>{lang === 'ar' ? 'الإحداثيات:' : 'Coordinates:'}</span>
          <code className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-900 dark:text-zinc-200 font-mono text-[10px]">
            {coordinates}
          </code>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Waze</span>
          </a>
          <span className="text-slate-300 dark:text-zinc-700">•</span>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#0f382a] dark:text-[#c5a869] font-bold hover:underline"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
