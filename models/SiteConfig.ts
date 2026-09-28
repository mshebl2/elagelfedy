import mongoose, { Schema, Document } from 'mongoose';
import { BrandingSettingsType, ContactSettingsType } from '@/types';

export interface ISiteConfig extends Document {
  branding: BrandingSettingsType;
  contact: ContactSettingsType;
}

const SiteConfigSchema = new Schema(
  {
    branding: { type: Schema.Types.Mixed, default: {} },
    contact: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);
