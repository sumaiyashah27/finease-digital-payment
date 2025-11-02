import stripe from '../config/stripe.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Returns a payment intent-like object. Uses Stripe if configured, else mock.
 */
export const createPaymentIntent = async ({ amount, currency = 'usd', description, metadata }) => {
  if (stripe) {
    return await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      metadata,
      automatic_payment_methods: { enabled: true }
    });
  }
  // Mock mode
  return {
    id: 'pi_' + uuidv4(),
    client_secret: 'mock_client_secret_' + uuidv4(),
    amount,
    currency,
    status: 'requires_confirmation',
    description,
    metadata,
    mock: true
  };
};
