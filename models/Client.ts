import mongoose, { Schema, Document } from 'mongoose';
import { ClientType } from '@/types';

export interface IClient extends Omit<ClientType, '_id'>, Document {}

const ClientSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, default: '' },
    nameAr: { type: String, default: '' },
    categoryAr: { type: String, default: '' },
    categoryEn: { type: String, default: '' },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

