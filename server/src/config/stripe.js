import Stripe from 'stripe';

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
}
export default stripe; // may be null to indicate mock mode
