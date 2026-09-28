import mongoose, { Schema, Document } from 'mongoose';
import { HeroSlideType } from '@/types';

export interface IHeroSlide extends Omit<HeroSlideType, '_id'>, Document {}

const HeroSlideSchema = new Schema(
  {
    id: { type: String },
    image: { type: String, default: '' },
    titleAr: { type: String, default: '' },
    titleEn: { type: String, default: '' },
    subtitleAr: { type: String, default: '' },
    subtitleEn: { type: String, default: '' },
    badgeAr: { type: String, default: '' },
    badgeEn: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);

