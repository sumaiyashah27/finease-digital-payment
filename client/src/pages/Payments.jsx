// import React from 'react';
// import { useEffect, useMemo, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import api from '../services/api';

// function CheckoutForm({ clientSecret }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setLoading(true);
//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin + '/payments' }
//     });
//     if (error) setMessage(error.message);
//     setLoading(false);
//   };

//   if (!clientSecret) return null;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement />
//       {message && <div className="text-red-600" role="alert">{message}</div>}
//       <button disabled={loading || !stripe} className="btn btn-primary" type="submit">
//         {loading ? 'Processing…' : 'Pay now'}
//       </button>
//     </form>
//   );
// }

// export default function Payments() {
//   const [clientSecret, setClientSecret] = useState(null);
//   const [amount, setAmount] = useState(1999);
//   const [desc, setDesc] = useState('Test payment');

//   const stripePk = import.meta.env.VITE_STRIPE_PUBLIC_KEY || null;
//   const stripePromise = useMemo(() => stripePk ? loadStripe(stripePk) : null, [stripePk]);

//   const createIntent = async () => {
//     const { data } = await api.post('/payments/create-intent', { amount: Number(amount), currency: 'usd', description: desc });
//     setClientSecret(data.clientSecret || null);
//     if (!stripePk && data.mock) {
//       alert('Mock payment succeeded (no Stripe key provided).');
//     }
//   };

//   useEffect(() => { setClientSecret(null); }, [amount, desc]);

//   return (
//     <div className="max-w-lg mx-auto card space-y-4">
//       <h1 className="text-xl font-semibold">Make a Payment</h1>
//       <label className="block">
//         <span className="sr-only">Amount</span>
//         <input className="input w-full" type="number" min="50" step="1" value={amount} onChange={e => setAmount(e.target.value)} aria-label="Amount in cents" />
//       </label>
//       <label className="block">
//         <span className="sr-only">Description</span>
//         <input className="input w-full" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" aria-label="Description" />
//       </label>
//       <button onClick={createIntent} className="btn btn-primary">Create Payment</button>

//       {stripePk && clientSecret && (
//         <Elements options={{ clientSecret }} stripe={stripePromise}>
//           <CheckoutForm clientSecret={clientSecret} />
//         </Elements>
//       )}

//       {!stripePk && clientSecret && (
//         <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//           <p className="text-green-700">Mock Mode active — payment simulated.</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { DollarSign, MessageSquare, CreditCard, Loader2, Lock } from 'lucide-react';
import api from '../services/api';

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/payments' },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  if (!clientSecret) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {message && (
        <div
          className="text-red-600 text-sm font-medium p-3 bg-red-50 rounded-lg border border-red-200"
          role="alert"
        >
          {message}
        </div>
      )}

      <button
        disabled={loading || !stripe}
        className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
        type="submit"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
}

export default function Payments() {
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState('19.99');
  const [desc, setDesc] = useState('SaaS Platform Subscription');
  const [intentLoading, setIntentLoading] = useState(false);
  const [intentError, setIntentError] = useState(null);

  const stripePk = import.meta.env.VITE_STRIPE_PUBLIC_KEY || null;
  const stripePromise = useMemo(() => (stripePk ? loadStripe(stripePk) : null), [stripePk]);

  const createIntent = async (e) => {
    e.preventDefault();
    setIntentLoading(true);
    setIntentError(null);
    setClientSecret(null);

    try {
      const amountInCents = Math.round(Number(amount) * 100);
      if (amountInCents < 50) {
        throw new Error('Amount must be at least $0.50');
      }

      const { data } = await api.post('/payments/create-intent', {
        amount: amountInCents,
        currency: 'usd',
        description: desc,
      });

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else if (!stripePk && data.mock) {
        alert('Mock payment succeeded (no Stripe key provided).');
      }
    } catch (err) {
      setIntentError(err.message || 'Failed to create payment intent.');
    } finally {
      setIntentLoading(false);
    }
  };

  useEffect(() => {
    setClientSecret(null);
    setIntentError(null);
  }, [amount, desc]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Payment</h1>

      <div className="grid md:grid-cols-2 md:gap-12">
        {/* LEFT: Payment Details */}
        <form onSubmit={createIntent} className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">1. Payment Details</h2>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="amount"
                type="number"
                min="0.50"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="19.99"
                aria-label="Amount in dollars"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="E.g., Monthly Subscription"
                aria-label="Description"
              />
            </div>
          </div>

          {intentError && (
            <div
              className="text-red-600 text-sm font-medium p-3 bg-red-50 rounded-lg border border-red-200"
              role="alert"
            >
              {intentError}
            </div>
          )}

          <button
            type="submit"
            disabled={intentLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {intentLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Payment...
              </>
            ) : (
              'Create Payment'
            )}
          </button>
        </form>

        {/* RIGHT: Payment Method */}
        <div className="space-y-6 mt-8 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-800">2. Payment Method</h2>

          {/* Stripe form visible once clientSecret exists */}
          {stripePk && clientSecret && (
            <Elements options={{ clientSecret }} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}

          {/* Waiting state */}
          {!clientSecret && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <CreditCard className="h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700">
                Your secure payment form will appear here.
              </p>
              <p className="text-sm text-gray-500">
                Please complete step 1 to continue.
              </p>
            </div>
          )}

          {/* Fallback for Mock Mode (no Stripe key) */}
          {!stripePk && clientSecret && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Mock Mode Active</p>
              <p className="text-green-700 text-sm">
                No Stripe key provided. Payment has been simulated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
