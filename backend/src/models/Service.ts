import { Schema, model, Document, Types } from 'mongoose';

export type ServiceStatus = 'draft' | 'active' | 'archived';

export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  providerId: Types.ObjectId;
  status: ServiceStatus;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    images: { type: [String], default: [] },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'active', 'archived'], default: 'active' },
  },
  { timestamps: true }
);

// Text index for search on title and description
serviceSchema.index({ title: 'text', description: 'text' });

const Service = model<IService>('Service', serviceSchema);
export default Service;
