import { MetadataRoute } from 'next';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, '');
  }
  return 'https://www.alaajsa.com';
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
