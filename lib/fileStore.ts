import fs from 'fs';
import path from 'path';
import {
  INITIAL_SITE_CONTENT,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_EQUIPMENT,
  INITIAL_CERTIFICATIONS,
  INITIAL_HERO_SLIDES,
  INITIAL_CLIENTS,
  INITIAL_BRANDING_SETTINGS,
  INITIAL_CONTACT_SETTINGS,
} from './initialData';
import {
  SiteContentType,
  HeroSlideType,
  ClientType,
  ServiceType,
  ProjectType,
  EquipmentType,
  CertificationType,
  BrandingSettingsType,
  ContactSettingsType,
} from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'site_store.json');

export interface SiteStoreSchema {
  siteContent: SiteContentType;
  heroSlides: HeroSlideType[];
  clients: ClientType[];
  services: ServiceType[];
  projects: ProjectType[];
  equipment: EquipmentType[];
  certifications: CertificationType[];
  branding: BrandingSettingsType;
  contact: ContactSettingsType;
}

function getDefaultStore(): SiteStoreSchema {
  return {
    siteContent: INITIAL_SITE_CONTENT,
    heroSlides: INITIAL_HERO_SLIDES,
    clients: INITIAL_CLIENTS,
    services: INITIAL_SERVICES,
    projects: INITIAL_PROJECTS,
    equipment: INITIAL_EQUIPMENT,
    certifications: INITIAL_CERTIFICATIONS,
    branding: INITIAL_BRANDING_SETTINGS,
    contact: INITIAL_CONTACT_SETTINGS,
  };
}

export function readStore(): SiteStoreSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial = getDefaultStore();
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const defaults = getDefaultStore();
    return {
      ...defaults,
      ...parsed,
    };
  } catch (err) {
    console.error('Error reading file store, using defaults:', err);
    return getDefaultStore();
  }
}

export function writeStore(data: Partial<SiteStoreSchema>): SiteStoreSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = readStore();
    const updated = {
      ...current,
      ...data,
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error writing file store:', err);
    return getDefaultStore();
  }
}
