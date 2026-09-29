import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientsSection from '@/components/sections/ClientsSection';
import PageBanner from '@/components/ui/PageBanner';
import type { Metadata } from 'next';

import { getClients } from '@/lib/dataService';

export const metadata: Metadata = {
  title: 'العملاء والشركاء الإستراتيجيون',
  description:
    'شركاء النجاح لشركة العاج الفضي: أرامكو السعودية، الشركة السعودية للكهرباء، شركة المياه الوطنية، ومدينة الملك عبدالله الاقتصادية.',
  keywords: [
    'عملاء شركة العاج الفضي',
    'شركاء أرامكو',
    'شركاء السعودية للكهرباء',
    'عملاء مشاريع البنية التحتية',
    'مقاولين أمالا والبحر الأحمر',
  ],
  alternates: {
    canonical: '/clients',
    languages: {
      'ar-SA': '/clients',
      'en-US': '/clients?lang=en',
    },
  },
  openGraph: {
    title: 'العملاء والشركاء الإستراتيجيون | AACC HDD-MT',
    description: 'شراكات تنفيذية موثوقة مع كبرى الهيئات والمؤسسات الحكومية وشركات التطوير بالمملكة.',
    url: 'https://www.alaajsa.com/clients',
  },
};

export default async function ClientsPage() {
  const clients = await getClients();

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
        name: 'العملاء والشركاء الإستراتيجيون',
        item: 'https://www.alaajsa.com/clients',
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
          titleAr="العملاء والشركاء الإستراتيجيون"
          titleEn="Strategic Clients & Project Partners"
          subtitleAr="نفخر بالثقة المتبادلة مع كبرى الجهات السيادية والشركات الوطنية الرائدة في مشاريع التنمية والبنية التحتية العملاقة."
          subtitleEn="Proud to deliver critical infrastructure for Saudi Aramco, SEC, National Water Company, and KAEC."
        />
        <main className="flex-1 animate-fade-in">
          <ClientsSection clientsList={clients} />
        </main>
        <Footer />
      </div>
    </>
  );
}
