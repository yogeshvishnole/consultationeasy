import express from 'express';
import { protect, restrictTo } from '../controllers/auth';
import { me } from '../controllers/user';

const router = express.Router();

router.get('/me', protect, restrictTo('admin', 'subscriber'), me);

export default router;
