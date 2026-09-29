import mongoose, { Schema, Document, Model } from 'mongoose';
import { CertificationType } from '@/types';

export interface ICertificationDocument extends Omit<CertificationType, '_id'>, Document {}

const CertificationSchema = new Schema<ICertificationDocument>(
  {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    certNumber: { type: String, default: '' },
    issuerAr: { type: String, required: true },
    issuerEn: { type: String, required: true },
    descriptionAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    type: {
      type: String,
      enum: ['iso', 'credential', 'award', 'article'],
      required: true,
    },
    image: { type: String, required: true },
    badgeAr: { type: String, default: '' },
    badgeEn: { type: String, default: '' },
    detailsAr: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    detailsEn: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const Certification: Model<ICertificationDocument> =
  mongoose.models.Certification || mongoose.model<ICertificationDocument>('Certification', CertificationSchema);

export default Certification;
