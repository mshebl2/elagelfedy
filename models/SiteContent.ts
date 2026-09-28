import mongoose, { Schema, Document, Model } from 'mongoose';
import { SiteContentType } from '@/types';

export interface ISiteContentDocument extends Omit<SiteContentType, '_id'>, Document {}

const SiteContentSchema = new Schema<ISiteContentDocument>(
  {
    hero: {
      badgeAr: { type: String, default: '' },
      badgeEn: { type: String, default: '' },
      titleAr: { type: String, default: '' },
      titleEn: { type: String, default: '' },
      highlightAr: { type: String, default: '' },
      highlightEn: { type: String, default: '' },
      subtitleAr: { type: String, default: '' },
      subtitleEn: { type: String, default: '' },
      metrics: [
        {
          labelAr: String,
          labelEn: String,
          value: String,
          highlight: Boolean,
        },
      ],
    },
    about: {
      badgeAr: { type: String, default: '' },
      badgeEn: { type: String, default: '' },
      titleAr: { type: String, default: '' },
      titleEn: { type: String, default: '' },
      descriptionAr: { type: String, default: '' },
      descriptionEn: { type: String, default: '' },
      leadership: [
        {
          nameAr: String,
          nameEn: String,
          roleAr: String,
          roleEn: String,
          experienceAr: String,
          experienceEn: String,
          subRoleAr: String,
          subRoleEn: String,
          quoteAr: String,
          quoteEn: String,
          image: String,
          badges: [String],
        },
      ],
      vision: {
        titleAr: String,
        titleEn: String,
        textAr: String,
        textEn: String,
      },
      mission: {
        titleAr: String,
        titleEn: String,
        textAr: String,
        textEn: String,
      },
      values: [
        {
          number: String,
          titleAr: String,
          titleEn: String,
          descriptionAr: String,
          descriptionEn: String,
        },
      ],
    },
    contact: {
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      addressAr: { type: String, default: '' },
      addressEn: { type: String, default: '' },
      cr: { type: String, default: '' },
      unifiedNo: { type: String, default: '' },
      vatNo: { type: String, default: '' },
      gosiNo: { type: String, default: '' },
    },
    seo: {
      titleAr: { type: String, default: '' },
      titleEn: { type: String, default: '' },
      descriptionAr: { type: String, default: '' },
      descriptionEn: { type: String, default: '' },
      keywordsAr: [String],
      keywordsEn: [String],
      ogImage: { type: String, default: '' },
    },
  },
  { timestamps: true, strict: false }
);

const SiteContent: Model<ISiteContentDocument> =
  mongoose.models.SiteContent || mongoose.model<ISiteContentDocument>('SiteContent', SiteContentSchema);

export default SiteContent;
