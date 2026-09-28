import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProjectType } from '@/types';

export interface IProjectDocument extends Omit<ProjectType, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    slug: { type: String, default: '' },
    titleAr: { type: String, default: '' },
    titleEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    client: { type: String, default: '' },
    mainContractor: { type: String, default: '' },
    location: { type: String, default: '' },
    year: { type: String, default: '' },
    lengthLm: { type: String, default: '' },
    diameter: { type: String, default: '' },
    category: { type: String, default: '' },
    mainImage: { type: String, default: '' },
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
