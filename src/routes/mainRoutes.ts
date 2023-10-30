import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/user', userController.getUser);
router.get('/user/:id', userController.getUserId);
router.post('/register', userController.createUser);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;
