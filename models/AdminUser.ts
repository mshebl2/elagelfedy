import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUserDocument extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'editor';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUserDocument>(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'superadmin' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

const AdminUser: Model<IAdminUserDocument> =
  mongoose.models.AdminUser || mongoose.model<IAdminUserDocument>('AdminUser', AdminUserSchema);

export default AdminUser;
