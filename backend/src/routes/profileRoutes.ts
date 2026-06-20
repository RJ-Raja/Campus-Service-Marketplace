import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getMyProfile, updateMyProfile } from '../controllers/profileController';

const router = Router();

router.get('/me', authenticate, getMyProfile);
router.put('/me', authenticate, updateMyProfile);

export default router;
