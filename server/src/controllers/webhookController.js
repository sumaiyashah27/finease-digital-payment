export const stripeWebhook = async (req, res) => {
  // For real Stripe integration, verify signature with STRIPE_WEBHOOK_SECRET
  // This is a placeholder; in mock mode this endpoint isn't used.
  res.json({ received: true });
};
