import express from 'express';
import AuthController from '../containers/authContainers';

const router = express.Router();
router.post('/login', AuthController.login)

export default router;
