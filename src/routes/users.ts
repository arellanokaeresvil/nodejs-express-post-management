import express from 'express';
import userController from '../containers/userContainer';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware); 

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.get('/restore/:id', userController.restore);


export default router;
