import mongoose, { Schema, Document, Model } from 'mongoose';
import { ServiceType } from '@/types';

export interface IServiceDocument extends Omit<ServiceType, '_id'>, Document {}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    number: { type: String, default: '' },
    code: { type: String, default: '' },
    titleAr: { type: String, default: '' },
    titleEn: { type: String, default: '' },
    subtitleAr: { type: String, default: '' },
    subtitleEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    tagsAr: [{ type: String }],
    tagsEn: [{ type: String }],
    featuresAr: [{ type: String }],
    featuresEn: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const Service: Model<IServiceDocument> =
  mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema);

export default Service;
