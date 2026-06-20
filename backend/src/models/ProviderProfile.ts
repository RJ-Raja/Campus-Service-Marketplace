import { Schema, model, Document, Types } from 'mongoose';

export interface IProviderProfile extends Document {
  userId: Types.ObjectId;
  bio?: string;
  skills: string[];
  verifiedStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const providerProfileSchema = new Schema<IProviderProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    verifiedStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProviderProfile = model<IProviderProfile>('ProviderProfile', providerProfileSchema);
export default ProviderProfile;
