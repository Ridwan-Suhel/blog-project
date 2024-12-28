import express from 'express';
import { UserController } from './user.controller';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewears/auth';

const router = express.Router();

// calling controller function here with route
router.post('/auth/register', UserController.createUser);
router.get('/auth/users', UserController.getAllUsers);
router.patch('/admin/users/:userId/block', auth(USER_ROLE.admin), UserController.BlockUser);

export const UserRoutes = router;