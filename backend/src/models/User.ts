import { Schema, model, Document } from 'mongoose';

export type UserRole = 'Service Buyer' | 'Service Provider' | 'Moderator' | 'Admin';
export type UserStatus = 'active' | 'suspended';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Service Buyer', 'Service Provider', 'Moderator', 'Admin'],
      default: 'Service Buyer',
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
