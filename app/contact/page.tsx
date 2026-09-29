import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactRfqSection from '@/components/sections/ContactRfqSection';
import PageBanner from '@/components/ui/PageBanner';
import { getServices } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'طلب عرض سعر ودراسة هندسية / تواصل مع الإدارة',
  description:
    'تواصل مباشرة مع الإدارة الهندسية لشركة العاج الفضي للمقاولات (AACC) لطلب عروض الأسعار والدراسات الفنية لحفر المعابر والأنفاق وشبكات البنية التحتية.',
  keywords: [
    'طلب عرض سعر حفر موجه',
    'تواصل شركة العاج الفضي',
    'رقم هاتف شركة العاج الفضي',
    'إيميل شركة العاج الفضي',
    'عنوان شركة العاج الفضي بالرياض',
    'مكتب حفر موجه الرياض',
  ],
  alternates: {
    canonical: '/contact',
    languages: {
      'ar-SA': '/contact',
      'en-US': '/contact?lang=en',
    },
  },
  openGraph: {
    title: 'طلب عرض سعر ودراسة هندسية | AACC HDD-MT',
    description: 'تواصل مباشر مع الإدارة الهندسية وطلب دراسات جيوتقنية وعروض أسعار دقيقة لمشاريعك.',
    url: 'https://www.alaajsa.com/contact',
  },
};

export default async function ContactPage() {
  const services = await getServices();

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
            name: 'تواصل معنا وطلب عرض سعر',
            item: 'https://www.alaajsa.com/contact',
          },
        ],
      },
      {
        '@type': 'ContactPage',
        '@id': 'https://www.alaajsa.com/contact#webpage',
        url: 'https://www.alaajsa.com/contact',
        name: 'صفحة التواصل والمناقصات - شركة العاج الفضي للمقاولات',
        description: 'قنوات التواصل المباشر وطلب دراسات الحفر الموجه والمناقصات الهندسية.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#fbf9f6] dark:bg-[#0c0e10] text-slate-800 dark:text-zinc-100 transition-colors duration-300">
        <CorporateTopBar />
        <Header />
        <PageBanner
          titleAr="طلب عرض سعر ودراسة هندسية / تواصل معنا"
          titleEn="Request RFQ, Technical Proposal & Contact Us"
          subtitleAr="فريقنا الهندسي جاهز لتقديم الدراسات الفنية وحساب الكميات وخطط التنفيذ لمشاريع الحفر الموجه والبنية التحتية فوراً."
          subtitleEn="Our engineering leadership is ready to provide technical studies, BOQ estimates, and HDD execution plans."
          badgeAr="التواصل الهندسي المباشر"
          badgeEn="Direct Technical Inquiries"
        />
        <main className="flex-1 animate-fade-in">
          <ContactRfqSection services={services} />
        </main>
        <Footer />
      </div>
    </>
  );
}
