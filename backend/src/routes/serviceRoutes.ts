import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import upload from '../middlewares/upload';
import { createService, getMyServices, updateService } from '../controllers/serviceController';

const router = Router();

// Create service (only Service Provider) - images uploaded via multipart/form-data
router.post('/', authenticate, authorize(['Service Provider']), upload.array('images', 6), createService);

// Get services for authenticated provider
router.get('/mine', authenticate, authorize(['Service Provider']), getMyServices);

// Update service by id (owner only)
router.put('/:id', authenticate, authorize(['Service Provider']), upload.array('images', 6), updateService);

export default router;
