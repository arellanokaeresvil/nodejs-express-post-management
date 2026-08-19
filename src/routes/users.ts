import express from 'express';
import userController from '../containers/userContainer';

const router = express.Router();

router.get('/', userController.index);
router.get('/:id', userController.show);

export default router;
