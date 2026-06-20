import { AuthRequest } from '../middlewares/auth';
import { Response } from 'express';
import Order from '../models/Order';

// Get active orders for the authenticated user (buyer or provider)
export const getMyActiveOrders = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const orders = await Order.find({
      $and: [
        { status: { $ne: 'completed' } },
        { $or: [{ buyerId: user._id }, { providerId: user._id }] },
      ],
    }).sort({ createdAt: -1 }).populate('serviceId bookingId');

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('getMyActiveOrders error', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { getMyActiveOrders };
