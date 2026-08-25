import { Router } from 'express';

import userRoutes from './users'
import authRoutes from './auth'

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;