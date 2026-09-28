import mongoose, { Schema, Document } from 'mongoose';
import { HeroSlideType } from '@/types';

export interface IHeroSlide extends Omit<HeroSlideType, '_id'>, Document {}

const HeroSlideSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    subtitleAr: { type: String, required: true },
    subtitleEn: { type: String, required: true },
    badgeAr: { type: String, default: '' },
    badgeEn: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);
