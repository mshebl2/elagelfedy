import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EquipmentSection from '@/components/sections/EquipmentSection';
import PageBanner from '@/components/ui/PageBanner';
import { getEquipmentList } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الأسطول الهندسي والمعدات الثقيلة المتخصصة',
  description:
    'أسطول حفارات الحفر الأفقي الموجه عالي السعة Ditch Witch JT100 All Terrain و Vermeer Navigator D100x120، محطات الخلط، وأنظمة التوجيه DCI Falcon F5.',
  keywords: [
    'حفارات الحفر الموجه',
    'Ditch Witch JT100',
    'Vermeer D100x120',
    'Vermeer D36x50',
    'DCI Falcon F5',
    'محطات خلط البنتونيت',
    'لحام أنابيب HDPE',
    'معدات حفر الصخور',
  ],
  alternates: {
    canonical: '/equipment',
    languages: {
      'ar-SA': '/equipment',
      'en-US': '/equipment?lang=en',
    },
  },
  openGraph: {
    title: 'الأسطول والمعدات الثقيلة المتخصصة | AACC HDD-MT',
    description: 'أسطول متقدم بقدرات سحب تصل إلى 100,000 رطل لحفر المعابر الصخرية المعقدة بكفاءة وسرعة فائقة.',
    url: 'https://www.alaajsa.com/equipment',
  },
};

export default async function EquipmentPage() {
  const equipmentList = await getEquipmentList();

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
        name: 'الأسطول والمعدات التخصصية',
        item: 'https://www.alaajsa.com/equipment',
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
          titleAr="الأسطول والمعدات الثقيلة المتخصصة"
          titleEn="Heavy Equipment Fleet & Technical Inventory"
          subtitleAr="أسطول حفارات متقدم بقدرات سحب تصل إلى 100,000 رطل، وأنظمة توجيه رقمية DCI Falcon F5 لحفر كافة التكوينات الصخرية."
          subtitleEn="Fleet of heavy HDD rigs with up to 100,000 lbs pullback, mud recycling units, and DCI Falcon F5 guidance systems."
          badgeAr="الأسطول الهندسي والمعدات"
          badgeEn="Engineering Machinery Fleet"
        />
        <main className="flex-1 animate-fade-in">
          <EquipmentSection equipmentList={equipmentList} />
        </main>
        <Footer />
      </div>
    </>
  );
}
