import mongoose, { Schema, Document, Model } from 'mongoose';
import { ServiceType } from '@/types';

export interface IServiceDocument extends Omit<ServiceType, '_id'>, Document {}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    number: { type: String, required: true },
    code: { type: String, required: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    subtitleAr: { type: String, required: true },
    subtitleEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
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
