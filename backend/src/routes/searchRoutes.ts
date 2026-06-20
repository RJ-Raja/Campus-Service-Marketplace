import { Router } from 'express';
import { searchServices, getServiceById } from '../controllers/searchController';

const router = Router();

router.get('/', searchServices);
router.get('/:id', getServiceById);

export default router;
