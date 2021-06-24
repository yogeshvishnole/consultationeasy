import express from 'express';
const router = express.Router();

import { protect, restrictTo } from '../controllers/auth';
import {
  createConsultant,
  getConsultantBYuserId,
  getConsultants,
  getConsultantById,
} from '../controllers/consultant';
import { runValidation } from '../validators';
import { consultantCreateValidator } from '../validators/consultant';

router
  .route('/')
  .post(
    protect,
    restrictTo('subscriber'),
    consultantCreateValidator,
    runValidation,
    createConsultant,
  );

router.route('/userId/:userId').get(getConsultantBYuserId);
router.get('/', getConsultants);
router.get('/:id', getConsultantById);
export default router;
