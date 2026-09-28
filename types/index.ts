export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export interface ProjectType {
  _id?: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  client: string;
  mainContractor?: string;
  location: string;
  year: string;
  lengthLm: string;
  diameter?: string;
  category: string;
  mainImage: string;
  gallery: string[];
  certificateImage?: string;
  schematicImage?: string;
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageType {
  _id?: string;
  referenceNo: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message?: string;
  soilConditions?: string;
  status: 'new' | 'reviewing' | 'quoted' | 'archived';
  notes?: string;
  createdAt?: string;
}

export interface ServiceType {
  _id?: string;
  number: string;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: string;
  icon?: string;
  tagsAr?: string[];
  tagsEn?: string[];
  featuresAr?: string[];
  featuresEn?: string[];
  order: number;
}

export interface EquipmentType {
  _id?: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  tagAr: string;
  tagEn: string;
  descriptionAr: string;
  descriptionEn: string;
  specsAr: { label: string; value: string }[];
  specsEn: { label: string; value: string }[];
  footerNoteAr?: string;
  footerNoteEn?: string;
  image: string;
  plateImage?: string;
  featured: boolean;
  order: number;
}

export interface CertificationType {
  _id?: string;
  titleAr: string;
  titleEn: string;
  certNumber: string;
  issuerAr: string;
  issuerEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: 'iso' | 'credential' | 'award' | 'article';
  image: string;
  badgeAr?: string;
  badgeEn?: string;
  detailsAr?: { label: string; value: string }[];
  detailsEn?: { label: string; value: string }[];
  order: number;
}

export interface SiteContentType {
  _id?: string;
  hero: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    highlightAr: string;
    highlightEn: string;
    subtitleAr: string;
    subtitleEn: string;
    metrics: {
      labelAr: string;
      labelEn: string;
      value: string;
      highlight?: boolean;
    }[];
  };
  about: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    leadership: {
      nameAr: string;
      nameEn: string;
      roleAr: string;
      roleEn: string;
      experienceAr: string;
      experienceEn: string;
      subRoleAr: string;
      subRoleEn: string;
      quoteAr: string;
      quoteEn: string;
      image: string;
      badges: string[];
    }[];
    vision: {
      titleAr: string;
      titleEn: string;
      textAr: string;
      textEn: string;
    };
    mission: {
      titleAr: string;
      titleEn: string;
      textAr: string;
      textEn: string;
    };
    values: {
      number: string;
      titleAr: string;
      titleEn: string;
      descriptionAr: string;
      descriptionEn: string;
    }[];
  };
  contact: {
    phone: string;
    email: string;
    addressAr: string;
    addressEn: string;
    cr: string;
    unifiedNo: string;
    vatNo: string;
    gosiNo: string;
  };
  seo: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    keywordsAr: string[];
    keywordsEn: string[];
    ogImage: string;
  };
}

export interface AdminUserType {
  _id?: string;
  username: string;
  email: string;
  role: 'superadmin' | 'editor';
  createdAt?: string;
}

export interface HeroSlideType {
  _id?: string;
  id?: string;
  image: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr?: string;
  badgeEn?: string;
  active: boolean;
  order: number;
}

export interface ClientType {
  _id?: string;
  id?: string;
  name: string;
  nameAr: string;
  categoryAr: string;
  categoryEn: string;
  logo: string;
  order: number;
  active: boolean;
  website?: string;
}

export interface BrandingSettingsType {
  logoUrl: string;
  logoHeight: number;
  brandNameAr: string;
  brandNameEn: string;
  taglineAr: string;
  taglineEn: string;
  primaryColor: string;
  accentGold: string;
  darkBg: string;
  faviconUrl?: string;
}

export interface ContactSettingsType {
  phone: string;
  secondaryPhone?: string;
  whatsapp: string;
  email: string;
  tendersEmail?: string;
  addressAr: string;
  addressEn: string;
  cr: string;
  unifiedNo: string;
  vatNo: string;
  gosiNo: string;
  chamberNo?: string;
  mapEmbedUrl?: string;
  social: {
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook?: string;
  };
}
