import { Schema, model, Document, Types } from 'mongoose';

export type OrderStatus = 'in_progress' | 'completed' | 'disputed';

export interface IOrder extends Document {
  bookingId: Types.ObjectId;
  buyerId: Types.ObjectId;
  providerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  agreedPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    agreedPrice: { type: Number, required: true },
    status: { type: String, enum: ['in_progress', 'completed', 'disputed'], default: 'in_progress' },
  },
  { timestamps: true }
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
