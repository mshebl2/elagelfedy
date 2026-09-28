import React from 'react';
import { notFound } from 'next/navigation';
import CorporateTopBar from '@/components/layout/CorporateTopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProjectBySlug, getProjects } from '@/lib/dataService';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Calendar, Ruler, Building, HardHat } from 'lucide-react';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'المشروع غير موجود | AACC HDD-MT',
    };
  }

  const title = `${project.titleAr} | شركة العاج الفضي للمقاولات`;
  const desc = project.descriptionAr || project.descriptionEn || `مشروع ${project.titleAr} المنفذ لصالح ${project.client} في ${project.location}.`;

  return {
    title,
    description: desc,
    keywords: [
      project.titleAr,
      project.titleEn,
      project.client,
      project.mainContractor || 'AACC',
      project.location,
      'حفر أفقي موجه',
      'AACC HDD Projects',
    ],
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        'ar-SA': `/projects/${slug}`,
        'en-US': `/projects/${slug}?lang=en`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `https://aacc-ksa.vercel.app/projects/${slug}`,
      images: [
        {
          url: project.mainImage,
          width: 1200,
          height: 800,
          alt: project.titleAr,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [project.mainImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
          {
            '@type': 'ListItem',
            position: 3,
            name: project.titleAr,
            item: `https://aacc-ksa.vercel.app/projects/${slug}`,
          },
        ],
      },
      {
        '@type': 'Project',
        '@id': `https://aacc-ksa.vercel.app/projects/${slug}#project`,
        name: project.titleAr,
        alternateName: project.titleEn,
        description: project.descriptionAr || project.descriptionEn,
        image: project.mainImage,
        location: {
          '@type': 'Place',
          name: project.location,
        },
        provider: {
          '@type': 'Corporation',
          name: 'شركة العاج الفضي للمقاولات (AACC HDD-MT)',
          url: 'https://aacc-ksa.vercel.app',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#fbf9f6] dark:bg-[#0c0e10] text-slate-800 dark:text-zinc-100">
      <CorporateTopBar />
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-technical uppercase font-bold text-[#0f382a] dark:text-[#c5a869] hover:underline"
            >
              <ArrowRight className="w-4 h-4 rtl:hidden" />
              <ArrowLeft className="w-4 h-4 ltr:hidden" />
              <span>العودة إلى المشاريع / Back to Projects</span>
            </Link>

            <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-technical text-xs font-bold rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>تم الإنجاز والتسليم / Certified Completed</span>
            </span>
          </div>

          {/* Project Title Header */}
          <div className="border-b border-slate-200 dark:border-[#2a313a] pb-8 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#0f382a] dark:bg-[#c5a869] inline-block rounded-xs"></span>
              <span className="text-xs uppercase font-technical tracking-widest text-[#0f382a] dark:text-[#c5a869] font-bold">
                {project.category} • {project.client}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.titleAr}
            </h1>
            <p className="text-base font-technical text-slate-600 dark:text-zinc-400 mt-1">
              {project.titleEn}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image Gallery & Certificate */}
            <div className="lg:col-span-8 space-y-6">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-[#2a313a] bg-slate-100 dark:bg-[#13171b] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.mainImage}
                  alt={project.titleAr}
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
              </div>

              {project.certificateImage && (
                <div className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-6 rounded shadow-2xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0f382a] dark:text-[#c5a869]" />
                    <span>شهادة إنجاز الأعمال المعتمدة من العميل</span>
                  </h3>
                  <div className="bg-slate-50 dark:bg-[#0c0e10] p-3 border border-slate-200 dark:border-[#2a313a] rounded flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.certificateImage}
                      alt="Certificate"
                      className="max-h-96 w-auto object-contain rounded"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-6 rounded shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  نطاق العمل والتنفيذ الهندسي
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {project.descriptionAr}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-technical border-t border-slate-100 dark:border-[#2a313a] pt-3">
                  {project.descriptionEn}
                </p>
              </div>
            </div>

            {/* Right Column: Key Specifications & RFQ Callout */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border border-slate-200 dark:border-[#2a313a] bg-white dark:bg-[#13171b] p-6 rounded shadow-2xs space-y-4 font-technical">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-[#2a313a] pb-2">
                  المواصفات الفنية للعملية
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-[#937338] dark:text-[#c5a869] shrink-0" />
                    <div>
                      <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">العميل النهائي:</span>
                      <strong className="text-slate-900 dark:text-white">{project.client}</strong>
                    </div>
                  </div>

                  {project.mainContractor && (
                    <div className="flex items-center gap-3">
                      <HardHat className="w-4 h-4 text-[#937338] dark:text-[#c5a869] shrink-0" />
                      <div>
                        <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">المقاول الرئيسي:</span>
                        <strong className="text-slate-900 dark:text-white">{project.mainContractor}</strong>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#937338] dark:text-[#c5a869] shrink-0" />
                    <div>
                      <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">الموقع الجغرافي:</span>
                      <strong className="text-slate-900 dark:text-white">{project.location}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#937338] dark:text-[#c5a869] shrink-0" />
                    <div>
                      <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">سنة الإنجاز:</span>
                      <strong className="text-slate-900 dark:text-white">{project.year}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Ruler className="w-4 h-4 text-[#937338] dark:text-[#c5a869] shrink-0" />
                    <div>
                      <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">طول المعبر:</span>
                      <strong className="text-slate-900 dark:text-white" dir="ltr">{project.lengthLm}</strong>
                    </div>
                  </div>

                  {project.diameter && (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#937338] dark:border-[#c5a869] shrink-0"></div>
                      <div>
                        <span className="text-slate-500 dark:text-zinc-400 block text-[10px]">قطر النفق / الأنبوب:</span>
                        <strong className="text-slate-900 dark:text-white">{project.diameter}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Tender / RFQ Box */}
              <div className="p-6 border border-[#0f382a] dark:border-[#c5a869]/60 bg-[#0f382a]/5 dark:bg-[#13171b] rounded shadow-2xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  هل لديك مشروع مماثل؟
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  يقوم فريقنا الهندسي بدراسة مسار الحفر والمخططات الجيوتقنية وتقديم عروض أسعار دقيقة خلال 24 ساعة.
                </p>
                <Link
                  href="/#contact"
                  className="w-full py-3 bg-[#0f382a] hover:bg-[#184e3b] dark:bg-[#c5a869] text-white dark:text-[#0c0e10] font-technical font-bold text-xs uppercase tracking-wider rounded text-center block transition-colors"
                >
                  طلب دراسة فنية وعرض سعر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </>
);
}
