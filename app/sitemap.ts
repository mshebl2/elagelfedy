import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/dataService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aacc-ksa.vercel.app';
  const projects = await getProjects();

  const coreRoutes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.95 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.95 },
    { path: '/equipment', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/certifications', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/quality', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/clients', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/contact', changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const staticUrls: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        ar: `${baseUrl}${route.path}`,
        en: `${baseUrl}${route.path}?lang=en`,
      },
    },
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        ar: `${baseUrl}/projects/${p.slug}`,
        en: `${baseUrl}/projects/${p.slug}?lang=en`,
      },
    },
  }));

  return [...staticUrls, ...projectUrls];
}
