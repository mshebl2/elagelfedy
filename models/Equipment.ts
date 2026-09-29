import mongoose, { Schema, Document, Model } from 'mongoose';
import { EquipmentType } from '@/types';

export interface IEquipmentDocument extends Omit<EquipmentType, '_id'>, Document {}

const EquipmentSchema = new Schema<IEquipmentDocument>(
  {
    nameAr: { type: String, required: true },
    nameEn: { type: String, required: true },
    categoryAr: { type: String, default: '' },
    categoryEn: { type: String, default: '' },
    tagAr: { type: String, default: '' },
    tagEn: { type: String, default: '' },
    descriptionAr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    specsAr: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    specsEn: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    footerNoteAr: { type: String, default: '' },
    footerNoteEn: { type: String, default: '' },
    image: { type: String, required: true },
    plateImage: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const Equipment: Model<IEquipmentDocument> =
  mongoose.models.Equipment || mongoose.model<IEquipmentDocument>('Equipment', EquipmentSchema);

export default Equipment;
