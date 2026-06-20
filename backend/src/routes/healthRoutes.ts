import { Router } from 'express';
import { healthCheck, testConnection } from '../controllers/healthController';

const router = Router();

// Health check endpoint
router.get('/health', healthCheck);

// Test connection endpoint
router.get('/test-connection', testConnection);

export default router;
