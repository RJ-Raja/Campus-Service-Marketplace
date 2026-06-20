import { Schema, model, Document, Types } from 'mongoose';

export type BookingStatus = 'pending' | 'accepted' | 'rejected';

export interface IBooking extends Document {
  serviceId: Types.ObjectId;
  buyerId: Types.ObjectId;
  providerId: Types.ObjectId;
  details?: string;
  requestedDate?: Date;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    details: { type: String, default: '' },
    requestedDate: { type: Date },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const Booking = model<IBooking>('Booking', bookingSchema);
export default Booking;
