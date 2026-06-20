import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { createBooking, getPendingBookingsForProvider, updateBookingStatus } from '../controllers/bookingController';

const router = Router();

router.post('/', authenticate, authorize(['Service Buyer']), createBooking);
router.get('/provider/pending', authenticate, authorize(['Service Provider']), getPendingBookingsForProvider);
router.put('/:id', authenticate, authorize(['Service Provider']), updateBookingStatus);

export default router;
