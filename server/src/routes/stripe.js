import express from 'express';
import { runValidation } from '../validators/';
import { protect, restrictTo } from '../controllers/auth';
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
} from '../controllers/stripe';

const router = express.Router();

router.get('/create-connect-account', protect, createConnectAccount);
router.get('/get-account-status', protect, getAccountStatus);
router.get('/get-account-balance', protect, getAccountBalance);

export default router;
