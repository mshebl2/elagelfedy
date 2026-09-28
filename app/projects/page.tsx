import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectsSection from '@/components/sections/ProjectsSection';
import PageBanner from '@/components/ui/PageBanner';
import { getProjects } from '@/lib/dataService';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سجل المشاريع المعتمدة والإنجازات الميدانية (12,136+ متر)',
  description:
    'استكشف السجل الرسمي لمشاريع شركة العاج الفضي المنفذة بنجاح: مشاريع أرامكو، الشركة السعودية للكهرباء، مدينة الملك عبدالله، وأمالا البحر الأحمر مع شهادات الإنجاز المعتمدة.',
  keywords: [
    'مشاريع الحفر الأفقي الموجه',
    'سجل مشاريع شركة العاج الفضي',
    'شهادات إنجاز أرامكو',
    'مشاريع السعودية للكهرباء',
    'مشاريع أمالا البحر الأحمر',
    'مشاريع مدينة الملك عبدالله الاقتصادية',
    'سجل الإنجاز الهندسي',
  ],
  alternates: {
    canonical: '/projects',
    languages: {
      'ar-SA': '/projects',
      'en-US': '/projects?lang=en',
    },
  },
  openGraph: {
    title: 'سجل المشاريع المعتمدة والإنجازات | AACC HDD-MT',
    description: 'توثيق رسمي لأكثر من 12,136 متر طولي من الحفر الموجه والأنفاق المنفذة لصالح كبرى الجهات والشركات السيادية بالمملكة.',
    url: 'https://aacc-ksa.vercel.app/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

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
        name: 'سجل المشاريع المعتمدة',
        item: 'https://aacc-ksa.vercel.app/projects',
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
          titleAr="سجل المشاريع المعتمدة والإنجازات الميدانية"
          titleEn="Verified Projects Track Record & Certifications"
          subtitleAr="أكثر من 12,136 متر طولي من الحفر الموجه والأنفاق المنفذة بدقة متناهية وبسجل سلامة 100% بدون أي إصابات هادرة للوقت."
          subtitleEn="Over 12,136 linear meters of high-capacity directional drilling executed with zero lost-time incidents."
          badgeAr="سجل المشاريع الموثقة"
          badgeEn="Verified Delivery Record"
        />
        <main className="flex-1 animate-fade-in">
          <ProjectsSection projects={projects} />
        </main>
        <Footer />
      </div>
    </>
  );
}
