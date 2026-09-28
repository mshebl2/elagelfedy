import mongoose, { Schema, Document } from 'mongoose';
import { ClientType } from '@/types';

export interface IClient extends Omit<ClientType, '_id'>, Document {}

const ClientSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    nameAr: { type: String, required: true },
    nameEn: { type: String, required: true },
    logoUrl: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
