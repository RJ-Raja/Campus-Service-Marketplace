import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Booking from '../models/Booking';
import Service from '../models/Service';
import Order from '../models/Order';
import { bookingCreateSchema, bookingUpdateSchema } from '../utils/validation';

// Buyer creates booking
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const parse = bookingCreateSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ success: false, message: 'Invalid payload', errors: parse.error.flatten() });

    const { serviceId, details, requestedDate } = parse.data;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    const booking = new Booking({
      serviceId: service._id,
      buyerId: user._id,
      providerId: service.providerId,
      details,
      requestedDate: requestedDate ? new Date(requestedDate) : undefined,
    });
    await booking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error('createBooking error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Provider gets pending bookings
export const getPendingBookingsForProvider = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const bookings = await Booking.find({ providerId: user._id, status: 'pending' }).sort({ createdAt: -1 }).populate('serviceId buyerId');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Provider accepts/rejects booking
export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { id } = req.params;
    const parse = bookingUpdateSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ success: false, message: 'Invalid payload', errors: parse.error.flatten() });

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.providerId.toString() !== user._id.toString()) return res.status(403).json({ success: false, message: 'Forbidden' });

    booking.status = parse.data.status as any;
    await booking.save();

    if (parse.data.status === 'accepted') {
      // create order
      const service = await Service.findById(booking.serviceId);
      const agreedPrice = parse.data.agreedPrice ?? service?.price ?? 0;
      const order = new Order({
        bookingId: booking._id,
        buyerId: booking.buyerId,
        providerId: booking.providerId,
        serviceId: booking.serviceId,
        agreedPrice,
      });
      await order.save();
      return res.json({ success: true, data: { booking, order } });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('updateBookingStatus error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { createBooking, getPendingBookingsForProvider, updateBookingStatus };
