import express from 'express';
import { protect } from '../controllers/auth';
import { getChat } from '../controllers/chat';

const router = express.Router();

router.use(protect);
router.get('/', getChat);

export default router;
