import mongoose from 'mongoose';

const txSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { type: String, enum: ['requires_payment_method','requires_confirmation','succeeded','failed','processing'], default: 'requires_payment_method' },
  stripePaymentIntentId: { type: String },
  description: { type: String },
  metadata: { type: Object }
}, { timestamps: true });

export default mongoose.model('Transaction', txSchema);
