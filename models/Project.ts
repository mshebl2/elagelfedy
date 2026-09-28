import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProjectType } from '@/types';

export interface IProjectDocument extends Omit<ProjectType, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    descriptionAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    client: { type: String, required: true },
    mainContractor: { type: String, default: '' },
    location: { type: String, required: true },
    year: { type: String, required: true },
    lengthLm: { type: String, required: true },
    diameter: { type: String, default: '' },
    category: { type: String, required: true },
    mainImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    certificateImage: { type: String, default: '' },
    schematicImage: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true, strict: false }
);

const Project: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);

export default Project;
