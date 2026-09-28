import React from 'react';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EquipmentSection from '@/components/sections/EquipmentSection';
import QualityCertificationsSection from '@/components/sections/QualityCertificationsSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ContactRfqSection from '@/components/sections/ContactRfqSection';
import {
  getSiteContent,
  getServices,
  getProjects,
  getEquipmentList,
  getCertificationsList,
  getHeroSlides,
  getClients,
} from '@/lib/dataService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [content, services, projects, equipmentList, certificationsList, heroSlides, clientsList] = await Promise.all([
    getSiteContent(),
    getServices(),
    getProjects(),
    getEquipmentList(),
    getCertificationsList(),
    getHeroSlides(),
    getClients(),
  ]);

  // Comprehensive Schema.org JSON-LD structured data for Google Knowledge Graph & Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Corporation', 'GeneralContractor'],
        '@id': 'https://aacc-ksa.vercel.app/#corporation',
        name: 'شركة العاج الفضي للمقاولات',
        alternateName: 'Alaaj Alfedhi Contracting Company (AACC HDD-MT)',
        legalName: 'شركة العاج الفضي للمقاولات',
        url: 'https://aacc-ksa.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aacc-ksa.vercel.app/images/logo/aacc_official_logo.png',
          caption: 'شعار شركة العاج الفضي للمقاولات',
        },
        image: 'https://aacc-ksa.vercel.app/images/hero/hero_slide_1.jpg',
        telephone: '+966509424820',
        email: 'mo.hdd@hotmail.com',
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Building 3315, Hafsa Bint Umar St., Al Andalus',
          addressLocality: 'Riyadh',
          addressRegion: 'Riyadh Province',
          postalCode: '13212',
          addressCountry: 'SA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 24.739744,
          longitude: 46.786512,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kingdom of Saudi Arabia',
        },
        sameAs: [
          'https://linkedin.com/company/aacc-ksa',
          'https://x.com/aacc_ksa',
          'https://instagram.com/aacc_ksa',
          'https://youtube.com/@aacc_ksa',
        ],
        knowsAbout: [
          'Horizontal Directional Drilling (HDD)',
          'Microtunneling',
          'Underground Infrastructure Networks',
          'Water Transmission Pipelines',
          'High Voltage Power Cable Undergrounding',
          'Saudi Aramco Standards',
          'Saudi Electricity Company (SEC)',
          'ISO 9001:2015 Quality Management',
          'ISO 14001:2015 Environmental Management',
          'ISO 45001:2018 Occupational Health and Safety',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AACC Core Engineering Capabilities',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Horizontal Directional Drilling in Rock (HDD)',
                description: 'حفر أفقي موجه بالصخور القاسية حتى قطر 1500 ملم ولمسافات تتجاوز 1200 متر.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Microtunneling & Pipe Jacking',
                description: 'تنفيذ أنفاق دقيقة تحت الطرق السريعة وخطوط السكك الحديدية بنظام الدفع الهيدروليكي.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Water Transmission & Distribution Networks',
                description: 'تمديد خطوط نقل المياه الإستراتيجية وشبكات التوزيع بأنابيب الكربون ستيل وHDPE.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Industrial Power & Underground High Voltage Cables',
                description: 'تمديد كابلات الجهد العالي والمتوسط ومحطات التحويل وفق مواصفات الشركة السعودية للكهرباء.',
              },
            },
          ],
        },
        identifier: [
          {
            '@type': 'PropertyValue',
            name: 'Commercial Registration (CR)',
            value: '1009156401',
          },
          {
            '@type': 'PropertyValue',
            name: 'Unified Number (700)',
            value: '7043006183',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://aacc-ksa.vercel.app/#website',
        url: 'https://aacc-ksa.vercel.app',
        name: 'شركة العاج الفضي للمقاولات (AACC HDD-MT)',
        description: 'رواد الحفر الأفقي الموجه والأنفاق الدقيقة وشبكات البنية التحتية في المملكة العربية السعودية.',
        publisher: {
          '@id': 'https://aacc-ksa.vercel.app/#corporation',
        },
        inLanguage: ['ar-SA', 'en-US'],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#fbf9f6] dark:bg-[#0c0e10] text-slate-800 dark:text-zinc-100 selection:bg-[#0f382a]/10 dark:selection:bg-[#c5a869]/30 selection:text-[#0f382a] dark:selection:text-[#c5a869]">
        {/* 0. Top Corporate Utility Bar */}
        <CorporateTopBar />

        {/* 1. Main Navigation Header */}
        <Header />

        {/* Main Content Flow */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection content={content.hero} slides={heroSlides} />

          {/* 2. About Us & Leadership */}
          <AboutSection content={content.about} />

          {/* 3. The 8 Approved Services */}
          <ServicesSection services={services} />

          {/* 4. Verified Projects & Certificates */}
          <ProjectsSection projects={projects} />

          {/* 5. Industrial Fleet & Machinery */}
          <EquipmentSection equipmentList={equipmentList} />

          {/* 6. Quality, Safety & Official Certifications (Unified) */}
          <QualityCertificationsSection certifications={certificationsList} />

          {/* 7. Strategic Clients & Partners */}
          <ClientsSection clientsList={clientsList} />

          {/* 8. Contact Us & RFQ Tender Desk */}
          <ContactRfqSection contactInfo={content.contact} services={services} />
        </main>

        {/* 10. Corporate Footer */}
        <Footer />
      </div>
    </>
  );
}
