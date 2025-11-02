import { validationResult } from 'express-validator';
import Transaction from '../models/Transaction.js';
import { createPaymentIntent } from '../services/stripeService.js';

export const createIntent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { amount, currency, description } = req.body;
    const intent = await createPaymentIntent({ amount, currency, description, metadata: { userId: req.user?.sub || 'guest' } });
    const tx = await Transaction.create({
      userId: req.user?.sub || null,
      amount,
      currency: currency || 'usd',
      status: intent.status || 'requires_confirmation',
      stripePaymentIntentId: intent.id,
      description
    });
    res.status(201).json({ clientSecret: intent.client_secret, intentId: intent.id, mock: !!intent.mock, txId: tx._id });
  } catch (e) { next(e); }
};

export const listTransactions = async (req, res, next) => {
  try {
    const list = await Transaction.find({}).sort({ createdAt: -1 }).limit(100);
    res.json(list);
  } catch (e) { next(e); }
};
