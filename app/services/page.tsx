import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicesSection from '@/components/sections/ServicesSection';
import PageBanner from '@/components/ui/PageBanner';
import { getServices } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الأنشطة المعتمدة والخدمات الهندسية التخصصية',
  description:
    'الأنشطة والخدمات المعتمدة لشركة العاج الفضي: الحفر الأفقي الموجه بالصخور (HDD)، الأنفاق الدقيقة (Microtunneling)، شبكات نقل المياه، الصرف والسيول، وكابلات الجهد العالي.',
  keywords: [
    'خدمات الحفر الأفقي الموجه',
    'حفر موجه بالصخور',
    'أنفاق دقيقة Microtunneling',
    'شبكات المياه والصرف الرياض',
    'كابلات أرضية الجهد العالي',
    'تعدية خطوط السكة الحديد',
    'حفر نفط وغاز أرامكو',
  ],
  alternates: {
    canonical: '/services',
    languages: {
      'ar-SA': '/services',
      'en-US': '/services?lang=en',
    },
  },
  openGraph: {
    title: 'الأنشطة المعتمدة والخدمات الهندسية | AACC HDD-MT',
    description: 'تنفيذ حلول الحفر الأفقي الموجه والأنفاق الدقيقة ومشاريع البنية التحتية حتى قطر 1500 ملم.',
    url: 'https://aacc-ksa.vercel.app/services',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();

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
        name: 'الأنشطة والخدمات المعتمدة',
        item: 'https://aacc-ksa.vercel.app/services',
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
          titleAr="الأنشطة المعتمدة والمجالات التخصصية"
          titleEn="Core Approved Capabilities & Engineering Disciplines"
          subtitleAr="حلول هندسية تحت أرضية وبنية تحتية عملاقة وفق أعلى معايير أرامكو والهيئة الملكية والشركة السعودية للكهرباء."
          subtitleEn="Heavy subterranean and civil infrastructure solutions engineered to Saudi Aramco, SEC, and Royal Commission standards."
          badgeAr="القدرات الهندسية الشاملة"
          badgeEn="End-to-End Capabilities"
        />
        <main className="flex-1 animate-fade-in">
          <ServicesSection services={services} />
        </main>
        <Footer />
      </div>
    </>
  );
}
