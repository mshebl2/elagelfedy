import mongoose, { Schema, Document, Model } from 'mongoose';
import { MessageType } from '@/types';

export interface IMessageDocument extends Omit<MessageType, '_id'>, Document {}

const MessageSchema = new Schema<IMessageDocument>(
  {
    referenceNo: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, default: '' },
    soilConditions: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'quoted', 'archived'],
      default: 'new',
      index: true,
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Message: Model<IMessageDocument> =
  mongoose.models.Message || mongoose.model<IMessageDocument>('Message', MessageSchema);

export default Message;
