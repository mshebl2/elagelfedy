import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutSection from '@/components/sections/AboutSection';
import PageBanner from '@/components/ui/PageBanner';
import { getSiteContent } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن الشركة والقيادة التنفيذية والهيكل التنظيمي',
  description:
    'تعرف على شركة العاج الفضي للمقاولات (AACC)، القيادة التنفيذية (م. محمود الشيخ ومؤيد مسعود)، الرؤية الاستراتيجية والهيكل التنظيمي المعتمد في الحفر الأفقي الموجه.',
  keywords: [
    'عن شركة العاج الفضي',
    'محمود عبيد الشيخ',
    'مؤيد حاج مسعود',
    'إدارة شركة العاج الفضي',
    'الهيكل التنظيمي للحفر الموجه',
    'مقاولات البنية التحتية الرياض',
  ],
  alternates: {
    canonical: '/about',
    languages: {
      'ar-SA': '/about',
      'en-US': '/about?lang=en',
    },
  },
  openGraph: {
    title: 'عن الشركة والقيادة التنفيذية | شركة العاج الفضي للمقاولات',
    description: '18+ سنة خبرة في الحفر الأفقي الموجه (HDD) والأنفاق الدقيقة ومشاريع البنية التحتية الاستراتيجية بالمملكة.',
    url: 'https://www.alaajsa.com/about',
  },
};

export default async function AboutPage() {
  const content = await getSiteContent();

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
        name: 'عن الشركة والقيادة',
        item: 'https://www.alaajsa.com/about',
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
        titleAr="عن الشركة والقيادة التنفيذية"
        titleEn="About AACC & Executive Leadership"
        subtitleAr="رواد الحفر الأفقي الموجه وحفر الأنفاق الدقيقة وشبكات البنية التحتية الإستراتيجية بالمملكة العربية السعودية."
        subtitleEn="Pioneers of Heavy Horizontal Directional Drilling (HDD), Microtunneling & Infrastructure Networks in Saudi Arabia."
        badgeAr="الهوية المؤسسية والحوكمة"
        badgeEn="Corporate Identity & Governance"
      />
      <main className="flex-1 animate-fade-in">
        <AboutSection content={content.about} />
      </main>
      <Footer />
    </div>
  </>
);
}
