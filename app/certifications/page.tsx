import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QualityCertificationsSection from '@/components/sections/QualityCertificationsSection';
import PageBanner from '@/components/ui/PageBanner';
import { getCertificationsList } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منظومة الجودة والاعتمادات الرسمية والتراخيص الحكومية',
  description:
    'شهادات الآيزو الدولية المعتمدة ISO 9001:2015, ISO 14001:2015, ISO 45001:2018، السجلات التجارية الرسمية والتراخيص المعتمدة لشركة العاج الفضي للمقاولات.',
  keywords: [
    'شهادات آيزو المقاولات',
    'ISO 9001 AACC',
    'ISO 14001 AACC',
    'ISO 45001 AACC',
    'اعتمادات أرامكو السعودية',
    'السجل التجاري شركة العاج الفضي',
    'الرقم الموحد 7043006183',
  ],
  alternates: {
    canonical: '/certifications',
    languages: {
      'ar-SA': '/certifications',
      'en-US': '/certifications?lang=en',
    },
  },
  openGraph: {
    title: 'منظومة الجودة والاعتمادات الرسمية | AACC HDD-MT',
    description: 'شهادات الآيزو الثلاثية المعتمدة والتراخيص الحكومية الموثقة لشركة العاج الفضي للمقاولات.',
    url: 'https://aacc-ksa.vercel.app/certifications',
  },
};

export default async function CertificationsPage() {
  const certifications = await getCertificationsList();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://aacc-ksa.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'الجودة والاعتمادات والتراخيص',
        item: 'https://aacc-ksa.vercel.app/certifications',
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
          titleAr="الجودة والسلامة والاعتمادات الرسمية"
          titleEn="QHSE Quality & Official Corporate Accreditations"
          subtitleAr="منظومة متكاملة لشهادات الآيزو الدولية، والسجلات الرسمية الصادرة من وزارة التجارة وهيئة الزكاة والضريبة والتأمينات الاجتماعية."
          subtitleEn="Integrated international ISO standards, commercial licenses, and official statutory accreditations across the Kingdom."
          badgeAr="التراخيص والجودة المعتمدة"
          badgeEn="Accreditations & Compliance"
        />
        <main className="flex-1 animate-fade-in">
          <QualityCertificationsSection certifications={certifications} />
        </main>
        <Footer />
      </div>
    </>
  );
}
