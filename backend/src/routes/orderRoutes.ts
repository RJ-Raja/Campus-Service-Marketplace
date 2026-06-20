import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getMyActiveOrders } from '../controllers/orderController';

const router = Router();

router.get('/mine', authenticate, getMyActiveOrders);

export default router;
