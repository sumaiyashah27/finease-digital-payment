import { Router } from 'express';
import { body } from 'express-validator';
import { createIntent, listTransactions } from '../controllers/paymentController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create-intent', requireAuth, [
  body('amount').isInt({ min: 50 }),
  body('currency').optional().isString(),
  body('description').optional().isString()
], createIntent);

router.get('/transactions', requireAuth, listTransactions);

export default router;
