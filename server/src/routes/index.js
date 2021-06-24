import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category';
import consultantRouter from './consultant';
import stripeRouter from './stripe';
import bookingRouter from './booking';
import chatRouter from './chat';
import messageRouter from './message';

const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/consultants', consultantRouter);
router.use('/bookings', bookingRouter);
router.use('/chats', chatRouter);
router.use('/messages', messageRouter);
router.use('/auth', authRouter);
router.use('/stripe', stripeRouter);

export { router as default };
