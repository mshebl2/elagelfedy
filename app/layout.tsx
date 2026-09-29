import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import LightboxModal from '@/components/ui/LightboxModal';
import FloatingContactWidget from '@/components/ui/FloatingContactWidget';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0e10' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'شركة العاج الفضي للمقاولات | Alaaj Alfedhi Contracting Company (AACC HDD-MT)',
    template: '%s | شركة العاج الفضي للمقاولات (AACC)',
  },
  description:
    'شركة العاج الفضي للمقاولات (AACC HDD-MT) - المقاول المعتمد والمتخصص في الحفر الأفقي الموجه (HDD) حتى 1500 ملم، والأنفاق الدقيقة (Microtunneling)، وشبكات البنية التحتية الإستراتيجية بالمملكة العربية السعودية وفق معايير أرامكو وISO.',
  applicationName: 'شركة العاج الفضي للمقاولات',
  authors: [{ name: 'AACC Engineering Team', url: 'https://www.alaajsa.com' }],
  generator: 'Next.js',
  keywords: [
    'الحفر الأفقي الموجه',
    'الحفر الموجه بالصخور',
    'HDD Drilling Saudi Arabia',
    'Horizontal Directional Drilling Riyadh',
    'Microtunneling KSA',
    'أنفاق دقيقة',
    'شركة العاج الفضي للمقاولات',
    'alaajsa',
    'alaajsa.com',
    'AACC HDD-MT',
    'مقاول حفر موجه معتمد أرامكو',
    'مقاول معتمد الشركة السعودية للكهرباء',
    'شبكات المياه والصرف الصحي',
    'كابلات الجهد العالي والكهرباء',
    'تعدية الطرق والسكك الحديدية',
    'Ditch Witch JT100',
    'Vermeer D100x120',
    'لحام أنابيب HDPE',
  ],
  creator: 'شركة العاج الفضي للمقاولات',
  publisher: 'Alaaj Alfedhi Contracting Company',
  metadataBase: new URL('https://www.alaajsa.com'),
  alternates: {
    canonical: 'https://www.alaajsa.com',
    languages: {
      'ar-SA': 'https://www.alaajsa.com',
      'en-US': 'https://www.alaajsa.com/?lang=en',
    },
  },
  openGraph: {
    title: 'شركة العاج الفضي للمقاولات | AACC HDD-MT',
    description:
      'رواد الحفر الأفقي الموجه والأنفاق الدقيقة وشبكات البنية التحتية في المملكة العربية السعودية مع سجل إنجاز يتجاوز 12,136+ متراً طولياً.',
    url: 'https://www.alaajsa.com',
    siteName: 'شركة العاج الفضي للمقاولات (AACC HDD-MT)',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: '/images/logo/aacc_official_logo.png',
        width: 1024,
        height: 1024,
        alt: 'شعار شركة العاج الفضي للمقاولات AACC',
      },
      {
        url: '/images/hero/hero_slide_1.jpg',
        width: 1920,
        height: 1080,
        alt: 'مشاريع الحفر الأفقي الموجه بالمملكة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركة العاج الفضي للمقاولات | AACC HDD-MT',
    description:
      'رواد الحفر الأفقي الموجه والأنفاق الدقيقة وشبكات البنية التحتية بالمملكة العربية السعودية وفق معايير أرامكو وISO.',
    site: '@aacc_ksa',
    creator: '@aacc_ksa',
    images: ['/images/logo/aacc_official_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo/aacc_official_logo.png' },
    ],
  },
  category: 'Construction & Civil Engineering',
};

const themeInitScript = `
(function() {
  try {
    var savedTheme = localStorage.getItem('aacc_theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased selection:bg-[#0f382a]/20 selection:text-[#0f382a] dark:selection:bg-[#c5a869]/30 dark:selection:text-[#c5a869] min-h-screen transition-colors duration-300">
        <AppProviders initialLang="ar">
          {children}
          <LightboxModal />
          <FloatingContactWidget />
        </AppProviders>
      </body>
    </html>
  );
}
