import express from 'express';
import { protect } from '../controllers/auth';
import { createMessage, getMessages } from '../controllers/message';

const router = express.Router();

router.use(protect);
router.post('/', createMessage);
router.get('/', getMessages);

export default router;
