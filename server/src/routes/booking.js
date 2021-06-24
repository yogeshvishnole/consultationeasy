import express from 'express';
import { protect } from '../controllers/auth';
import {
  stripeSessionId,
  stripeSuccess,
  getAllBookings,
  getBooking,
} from '../controllers/booking';

const router = express.Router();
router.use(protect);
router.post('/stripeSessionId', stripeSessionId);
router.post('/stripeSuccess', stripeSuccess);
router.get('/', getAllBookings);
router.get('/:id', getBooking);

export default router;
