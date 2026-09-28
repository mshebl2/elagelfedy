import connectDB from './db';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Equipment from '@/models/Equipment';
import Certification from '@/models/Certification';
import SiteContent from '@/models/SiteContent';
import AdminUser from '@/models/AdminUser';
import Client from '@/models/Client';
import HeroSlide from '@/models/HeroSlide';
import SiteConfig from '@/models/SiteConfig';
import { hashPassword } from './auth';
import { readStore, writeStore } from './fileStore';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_EQUIPMENT,
  INITIAL_CERTIFICATIONS,
  INITIAL_SITE_CONTENT,
  INITIAL_HERO_SLIDES,
  INITIAL_CLIENTS,
  INITIAL_BRANDING_SETTINGS,
  INITIAL_CONTACT_SETTINGS,
} from './initialData';
import {
  ProjectType,
  ServiceType,
  EquipmentType,
  CertificationType,
  SiteContentType,
  HeroSlideType,
  ClientType,
  BrandingSettingsType,
  ContactSettingsType,
} from '@/types';

// In-Memory Fast Cache (TTL: 30 Seconds)
const memoryCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30000;

function getFromCache<T>(key: string): T | null {
  const item = memoryCache[key];
  if (item && Date.now() - item.timestamp < CACHE_TTL) {
    return item.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  memoryCache[key] = { data, timestamp: Date.now() };
}

function invalidateCache(key: string): void {
  delete memoryCache[key];
}

async function pingSearchEngines() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aacc-ksa.vercel.app';
    const sitemapUrl = encodeURIComponent(`${baseUrl}/sitemap.xml`);
    fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`).catch(() => {});
    fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`).catch(() => {});
  } catch (e) {}
}

let isSeeded = false;
let seedingPromise: Promise<void> | null = null;

export async function ensureDatabaseSeeded() {
  if (isSeeded) return;
  if (!seedingPromise) {
    seedingPromise = (async () => {
      const db = await connectDB();
      if (!db) return;

      try {
        const adminCount = await AdminUser.countDocuments();
        if (adminCount === 0) {
          const defaultUser = process.env.ADMIN_DEFAULT_USER || 'admin';
          const defaultPass = process.env.ADMIN_DEFAULT_PASS || 'AaccAdmin2026!';
          const passwordHash = await hashPassword(defaultPass);
          await AdminUser.create({
            username: defaultUser,
            email: 'admin@aacc-ksa.com',
            passwordHash,
            role: 'superadmin',
          });
        }

        const contentCount = await SiteContent.countDocuments();
        if (contentCount === 0) await SiteContent.create(INITIAL_SITE_CONTENT);

        const servicesCount = await Service.countDocuments();
        if (servicesCount === 0) await Service.insertMany(INITIAL_SERVICES);

        const projectsCount = await Project.countDocuments();
        if (projectsCount === 0) await Project.insertMany(INITIAL_PROJECTS);

        const equipmentCount = await Equipment.countDocuments();
        if (equipmentCount === 0) await Equipment.insertMany(INITIAL_EQUIPMENT);

        const certsCount = await Certification.countDocuments();
        if (certsCount === 0) await Certification.insertMany(INITIAL_CERTIFICATIONS);

        const clientsCount = await Client.countDocuments();
        if (clientsCount === 0) await Client.insertMany(INITIAL_CLIENTS);

        const heroSlidesCount = await HeroSlide.countDocuments();
        if (heroSlidesCount === 0) await HeroSlide.insertMany(INITIAL_HERO_SLIDES);

        const configCount = await SiteConfig.countDocuments();
        if (configCount === 0) {
          await SiteConfig.create({
            branding: INITIAL_BRANDING_SETTINGS,
            contact: INITIAL_CONTACT_SETTINGS,
          });
        }
        isSeeded = true;
      } catch (error) {
        console.error('Error during auto-seeding:', error);
      } finally {
        seedingPromise = null;
      }
    })();
  }
  return seedingPromise;
}

// 1. Site Content
export async function getSiteContent(): Promise<SiteContentType> {
  const cached = getFromCache<SiteContentType>('siteContent');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const content = await SiteContent.findOne().lean();
      if (content) {
        const parsed = JSON.parse(JSON.stringify(content));
        setCache('siteContent', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching site content from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.siteContent || INITIAL_SITE_CONTENT;
  setCache('siteContent', fallback);
  return fallback;
}

export async function saveSiteContent(content: Partial<SiteContentType>): Promise<SiteContentType> {
  invalidateCache('siteContent');
  const current = await getSiteContent();
  const merged = { ...current, ...content };
  const { _id, ...cleanMerged } = merged as any;
  writeStore({ siteContent: cleanMerged as SiteContentType });

  const db = await connectDB();
  if (db) {
    try {
      await SiteContent.findOneAndUpdate({}, cleanMerged, { upsert: true, new: true });
      setCache('siteContent', merged as SiteContentType);
    } catch (e) {
      console.warn('Error saving site content to MongoDB:', e);
    }
  }
  return merged as SiteContentType;
}

// 2. Hero Slides
export async function getHeroSlides(): Promise<HeroSlideType[]> {
  const cached = getFromCache<HeroSlideType[]>('heroSlides');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const slides = await HeroSlide.find().sort({ order: 1 }).lean();
      if (slides && slides.length > 0) {
        const parsed = JSON.parse(JSON.stringify(slides));
        setCache('heroSlides', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching hero slides from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.heroSlides || INITIAL_HERO_SLIDES;
  setCache('heroSlides', fallback);
  return fallback;
}

export async function saveHeroSlides(slides: HeroSlideType[]): Promise<HeroSlideType[]> {
  invalidateCache('heroSlides');
  writeStore({ heroSlides: slides });
  const db = await connectDB();
  if (db) {
    try {
      await HeroSlide.deleteMany({});
      const cleaned = slides.map(({ _id, ...rest }: any) => rest);
      await HeroSlide.insertMany(cleaned);
      setCache('heroSlides', slides);
    } catch (e) {
      console.warn('Error persisting hero slides to MongoDB:', e);
    }
  }
  return slides;
}

// 3. Clients
export async function getClients(): Promise<ClientType[]> {
  const cached = getFromCache<ClientType[]>('clients');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const clients = await Client.find().sort({ order: 1 }).lean();
      if (clients && clients.length > 0) {
        const parsed = JSON.parse(JSON.stringify(clients));
        setCache('clients', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching clients from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.clients || INITIAL_CLIENTS;
  setCache('clients', fallback);
  return fallback;
}

export async function saveClients(clients: ClientType[]): Promise<ClientType[]> {
  invalidateCache('clients');
  writeStore({ clients });
  const db = await connectDB();
  if (db) {
    try {
      await Client.deleteMany({});
      const cleaned = clients.map(({ _id, ...rest }: any) => rest);
      await Client.insertMany(cleaned);
      setCache('clients', clients);
    } catch (e) {
      console.warn('Error persisting clients to MongoDB:', e);
    }
  }
  return clients;
}

// 4. Branding Settings
export async function getBrandingSettings(): Promise<BrandingSettingsType> {
  const cached = getFromCache<BrandingSettingsType>('branding');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const config = await SiteConfig.findOne().lean();
      if (config && config.branding) {
        const parsed = JSON.parse(JSON.stringify(config.branding));
        setCache('branding', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching branding from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.branding || INITIAL_BRANDING_SETTINGS;
  setCache('branding', fallback);
  return fallback;
}

export async function saveBrandingSettings(settings: Partial<BrandingSettingsType>): Promise<BrandingSettingsType> {
  invalidateCache('branding');
  const current = await getBrandingSettings();
  const merged = { ...current, ...settings };
  const { _id, ...cleanBranding } = merged as any;
  writeStore({ branding: cleanBranding });
  
  const db = await connectDB();
  if (db) {
    try {
      await SiteConfig.findOneAndUpdate({}, { $set: { branding: cleanBranding } }, { upsert: true });
      setCache('branding', merged);
    } catch (e) {
      console.warn('Error saving branding to MongoDB:', e);
    }
  }
  return merged;
}

// 5. Contact Settings
export async function getContactSettings(): Promise<ContactSettingsType> {
  const cached = getFromCache<ContactSettingsType>('contact');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const config = await SiteConfig.findOne().lean();
      if (config && config.contact) {
        const parsed = JSON.parse(JSON.stringify(config.contact));
        setCache('contact', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching contact from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.contact || INITIAL_CONTACT_SETTINGS;
  setCache('contact', fallback);
  return fallback;
}

export async function saveContactSettings(settings: Partial<ContactSettingsType>): Promise<ContactSettingsType> {
  invalidateCache('contact');
  const current = await getContactSettings();
  const merged = { ...current, ...settings };
  const { _id, ...cleanContact } = merged as any;
  writeStore({ contact: cleanContact });
  
  const db = await connectDB();
  if (db) {
    try {
      await SiteConfig.findOneAndUpdate({}, { $set: { contact: cleanContact } }, { upsert: true });
      setCache('contact', merged);
    } catch (e) {
      console.warn('Error saving contact to MongoDB:', e);
    }
  }
  return merged;
}

// 6. Services
export async function getServices(): Promise<ServiceType[]> {
  const cached = getFromCache<ServiceType[]>('services');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const services = await Service.find().sort({ order: 1 }).lean();
      if (services && services.length > 0) {
        const parsed = JSON.parse(JSON.stringify(services));
        setCache('services', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching services from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.services || INITIAL_SERVICES;
  setCache('services', fallback);
  return fallback;
}

export async function saveServices(services: ServiceType[]): Promise<ServiceType[]> {
  invalidateCache('services');
  writeStore({ services });
  const db = await connectDB();
  if (db) {
    try {
      await Service.deleteMany({});
      const cleaned = services.map(({ _id, ...rest }: any) => rest);
      await Service.insertMany(cleaned);
      setCache('services', services);
    } catch (e) {
      console.warn('Error persisting services to MongoDB:', e);
    }
  }
  pingSearchEngines();
  return services;
}

// 7. Projects
export async function getProjects(): Promise<ProjectType[]> {
  const cached = getFromCache<ProjectType[]>('projects');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const projects = await Project.find().sort({ order: 1 }).lean();
      if (projects && projects.length > 0) {
        const parsed = JSON.parse(JSON.stringify(projects));
        setCache('projects', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching projects from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.projects || INITIAL_PROJECTS;
  setCache('projects', fallback);
  return fallback;
}

export async function saveProjects(projects: ProjectType[]): Promise<ProjectType[]> {
  invalidateCache('projects');
  writeStore({ projects });
  const db = await connectDB();
  if (db) {
    try {
      await Project.deleteMany({});
      const cleaned = projects.map(({ _id, ...rest }: any) => rest);
      await Project.insertMany(cleaned);
      setCache('projects', projects);
    } catch (e) {
      console.warn('Error persisting projects to MongoDB:', e);
    }
  }
  pingSearchEngines();
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  const projects = await getProjects();
  const found = projects.find((p) => p.slug === slug);
  return found || null;
}

// 8. Equipment
export async function getEquipmentList(): Promise<EquipmentType[]> {
  const cached = getFromCache<EquipmentType[]>('equipment');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const equipment = await Equipment.find().sort({ order: 1 }).lean();
      if (equipment && equipment.length > 0) {
        const parsed = JSON.parse(JSON.stringify(equipment));
        setCache('equipment', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching equipment from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.equipment || INITIAL_EQUIPMENT;
  setCache('equipment', fallback);
  return fallback;
}

export async function saveEquipment(equipment: EquipmentType[]): Promise<EquipmentType[]> {
  invalidateCache('equipment');
  writeStore({ equipment });
  const db = await connectDB();
  if (db) {
    try {
      await Equipment.deleteMany({});
      const cleaned = equipment.map(({ _id, ...rest }: any) => rest);
      await Equipment.insertMany(cleaned);
      setCache('equipment', equipment);
    } catch (e) {
      console.warn('Error persisting equipment to MongoDB:', e);
    }
  }
  return equipment;
}

export const getEquipment = getEquipmentList;

// 9. Certifications
export async function getCertificationsList(): Promise<CertificationType[]> {
  const cached = getFromCache<CertificationType[]>('certifications');
  if (cached) return cached;

  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const certs = await Certification.find().sort({ order: 1 }).lean();
      if (certs && certs.length > 0) {
        const parsed = JSON.parse(JSON.stringify(certs));
        setCache('certifications', parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error fetching certifications from MongoDB:', e);
    }
  }

  const store = readStore();
  const fallback = store.certifications || INITIAL_CERTIFICATIONS;
  setCache('certifications', fallback);
  return fallback;
}

export async function saveCertifications(certs: CertificationType[]): Promise<CertificationType[]> {
  invalidateCache('certifications');
  writeStore({ certifications: certs });
  const db = await connectDB();
  if (db) {
    try {
      await Certification.deleteMany({});
      const cleaned = certs.map(({ _id, ...rest }: any) => rest);
      await Certification.insertMany(cleaned);
      setCache('certifications', certs);
    } catch (e) {
      console.warn('Error persisting certifications to MongoDB:', e);
    }
  }
  return certs;
}

export const getCertifications = getCertificationsList;
