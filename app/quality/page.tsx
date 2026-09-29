import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QualityCertificationsSection from '@/components/sections/QualityCertificationsSection';
import PageBanner from '@/components/ui/PageBanner';
import { getCertificationsList } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسات الجودة الشاملة والسلامة المهنية والبيئة (QHSE)',
  description:
    'سياسات الجودة الشاملة والامتثال لمعايير السلامة المهنية والبيئة (ISO 9001, ISO 14001, ISO 45001) وتصاريح أرامكو PTW لشركة العاج الفضي للمقاولات.',
  keywords: [
    'سياسة الجودة المقاولات',
    'السلامة المهنية أرامكو PTW',
    'ISO 9001 كواليتي',
    'ISO 45001 سلامة مهنية',
    'سجل Zero LTI',
    'معايير Kent HSSE',
  ],
  alternates: {
    canonical: '/quality',
    languages: {
      'ar-SA': '/quality',
      'en-US': '/quality?lang=en',
    },
  },
  openGraph: {
    title: 'سياسات الجودة والسلامة والبيئة | AACC HDD-MT',
    description: 'التزام غير مشروط بمعايير ISO الدولية لحماية الأرواح والمنشآت مع تحقيق سجل 100% بدون أي إصابات هادرة للوقت.',
    url: 'https://www.alaajsa.com/quality',
  },
};

export default async function QualityPage() {
  const certifications = await getCertificationsList();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://www.alaajsa.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'سياسات الجودة والسلامة (QHSE)',
        item: 'https://www.alaajsa.com/quality',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#fbf9f6] dark:bg-[#0c0e10] text-slate-800 dark:text-zinc-100 transition-colors duration-300">
        <CorporateTopBar />
        <Header />
        <PageBanner
          titleAr="الجودة والسلامة والاعتمادات الرسمية (QHSE)"
          titleEn="Quality, Safety & Official Accreditations"
          subtitleAr="التزام غير مشروط بمعايير ISO الدولية لحماية الأرواح والمنشآت والحفاظ على البيئة مع تحقيق نسبة صفر حوادث مهنية."
          subtitleEn="Uncompromising adherence to ISO 9001, ISO 14001, and ISO 45001 standards with a verified 100% Zero LTI track record."
          badgeAr="معايير السلامة والجودة والاعتمادات"
          badgeEn="Global Standards & Accreditations"
        />
        <main className="flex-1 animate-fade-in">
          <QualityCertificationsSection certifications={certifications} />
        </main>
        <Footer />
      </div>
    </>
  );
}
