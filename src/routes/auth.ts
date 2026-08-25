import express from 'express';
import AuthController from '../containers/authContainers';
import { loginRateLimiter } from '../middlewares/rateLimiter';

const router = express.Router();
router.post('/login', loginRateLimiter, AuthController.login)
router.post('/logout', AuthController.logout)

export default router;
