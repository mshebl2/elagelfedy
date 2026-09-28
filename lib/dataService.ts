import connectDB from './db';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Equipment from '@/models/Equipment';
import Certification from '@/models/Certification';
import SiteContent from '@/models/SiteContent';
import AdminUser from '@/models/AdminUser';
import Client from '@/models/Client';
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

export async function ensureDatabaseSeeded() {
  const db = await connectDB();
  if (!db) return;

  try {
    // Seed Admin User
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
      console.log('✅ Default Admin User created:', defaultUser);
    }

    // Seed Site Content
    const contentCount = await SiteContent.countDocuments();
    if (contentCount === 0) {
      await SiteContent.create(INITIAL_SITE_CONTENT);
      console.log('✅ Site Content seeded');
    }

    // Seed Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.insertMany(INITIAL_SERVICES);
      console.log('✅ Services seeded (8 activities)');
    }

    // Seed Projects
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany(INITIAL_PROJECTS);
      console.log('✅ Projects seeded');
    }

    // Seed Equipment
    const equipmentCount = await Equipment.countDocuments();
    if (equipmentCount === 0) {
      await Equipment.insertMany(INITIAL_EQUIPMENT);
      console.log('✅ Equipment seeded');
    }

    // Seed Certifications
    const certsCount = await Certification.countDocuments();
    if (certsCount === 0) {
      await Certification.insertMany(INITIAL_CERTIFICATIONS);
      console.log('✅ Certifications seeded');
    }

    // Seed Clients
    const clientsCount = await Client.countDocuments();
    if (clientsCount === 0) {
      await Client.insertMany(INITIAL_CLIENTS);
      console.log('✅ Clients seeded');
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error);
  }
}

// 1. Site Content
export async function getSiteContent(): Promise<SiteContentType> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const content = await SiteContent.findOne().lean();
      if (content) {
        return JSON.parse(JSON.stringify(content));
      }
    } catch (e) {
      console.warn('Error fetching site content from MongoDB, using store fallback:', e);
    }
  }
  return store.siteContent || INITIAL_SITE_CONTENT;
}

export async function saveSiteContent(content: Partial<SiteContentType>): Promise<SiteContentType> {
  const current = await getSiteContent();
  const merged = { ...current, ...content };
  writeStore({ siteContent: merged as SiteContentType });

  const db = await connectDB();
  if (db) {
    try {
      await SiteContent.findOneAndUpdate({}, merged, { upsert: true, new: true });
    } catch (e) {
      console.warn('Error saving site content to MongoDB:', e);
    }
  }
  return merged as SiteContentType;
}

// 2. Hero Slides
export async function getHeroSlides(): Promise<HeroSlideType[]> {
  const store = readStore();
  return store.heroSlides || INITIAL_HERO_SLIDES;
}

export async function saveHeroSlides(slides: HeroSlideType[]): Promise<HeroSlideType[]> {
  writeStore({ heroSlides: slides });
  return slides;
}

// 3. Clients
export async function getClients(): Promise<ClientType[]> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const clients = await Client.find().sort({ order: 1 }).lean();
      if (clients && clients.length > 0) {
        return JSON.parse(JSON.stringify(clients));
      }
    } catch (e) {
      console.warn('Error fetching clients from MongoDB, using store fallback:', e);
    }
  }
  return store.clients || INITIAL_CLIENTS;
}

export async function saveClients(clients: ClientType[]): Promise<ClientType[]> {
  writeStore({ clients });
  const db = await connectDB();
  if (db) {
    try {
      await Client.deleteMany({});
      await Client.insertMany(clients);
    } catch (e) {
      console.warn('Error persisting clients to MongoDB:', e);
    }
  }
  return clients;
}

// 4. Branding Settings
export async function getBrandingSettings(): Promise<BrandingSettingsType> {
  const store = readStore();
  return store.branding || INITIAL_BRANDING_SETTINGS;
}

export async function saveBrandingSettings(settings: Partial<BrandingSettingsType>): Promise<BrandingSettingsType> {
  const current = await getBrandingSettings();
  const merged = { ...current, ...settings };
  writeStore({ branding: merged });
  return merged;
}

// 5. Contact Settings
export async function getContactSettings(): Promise<ContactSettingsType> {
  const store = readStore();
  return store.contact || INITIAL_CONTACT_SETTINGS;
}

export async function saveContactSettings(settings: Partial<ContactSettingsType>): Promise<ContactSettingsType> {
  const current = await getContactSettings();
  const merged = { ...current, ...settings };
  writeStore({ contact: merged });
  return merged;
}

// 6. Services
export async function getServices(): Promise<ServiceType[]> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const services = await Service.find().sort({ order: 1 }).lean();
      if (services && services.length > 0) {
        return JSON.parse(JSON.stringify(services));
      }
    } catch (e) {
      console.warn('Error fetching services from MongoDB, using store fallback:', e);
    }
  }
  return store.services || INITIAL_SERVICES;
}

export async function saveServices(services: ServiceType[]): Promise<ServiceType[]> {
  writeStore({ services });
  const db = await connectDB();
  if (db) {
    try {
      await Service.deleteMany({});
      await Service.insertMany(services);
    } catch (e) {
      console.warn('Error persisting services to MongoDB:', e);
    }
  }
  return services;
}

// 7. Projects
export async function getProjects(): Promise<ProjectType[]> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const projects = await Project.find().sort({ order: 1 }).lean();
      if (projects && projects.length > 0) {
        return JSON.parse(JSON.stringify(projects));
      }
    } catch (e) {
      console.warn('Error fetching projects from MongoDB, using store fallback:', e);
    }
  }
  return store.projects || INITIAL_PROJECTS;
}

export async function saveProjects(projects: ProjectType[]): Promise<ProjectType[]> {
  writeStore({ projects });
  const db = await connectDB();
  if (db) {
    try {
      await Project.deleteMany({});
      await Project.insertMany(projects);
    } catch (e) {
      console.warn('Error persisting projects to MongoDB:', e);
    }
  }
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  const projects = await getProjects();
  const found = projects.find((p) => p.slug === slug);
  return found || null;
}

// 8. Equipment
export async function getEquipmentList(): Promise<EquipmentType[]> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const equipment = await Equipment.find().sort({ order: 1 }).lean();
      if (equipment && equipment.length > 0) {
        return JSON.parse(JSON.stringify(equipment));
      }
    } catch (e) {
      console.warn('Error fetching equipment from MongoDB, using store fallback:', e);
    }
  }
  return store.equipment || INITIAL_EQUIPMENT;
}

export const getEquipment = getEquipmentList;

// 9. Certifications
export async function getCertificationsList(): Promise<CertificationType[]> {
  const store = readStore();
  const db = await connectDB();
  if (db) {
    try {
      await ensureDatabaseSeeded();
      const certs = await Certification.find().sort({ order: 1 }).lean();
      if (certs && certs.length > 0) {
        return JSON.parse(JSON.stringify(certs));
      }
    } catch (e) {
      console.warn('Error fetching certifications from MongoDB, using store fallback:', e);
    }
  }
  return store.certifications || INITIAL_CERTIFICATIONS;
}

export const getCertifications = getCertificationsList;
