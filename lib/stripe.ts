import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    price: 12.9,
    currency: 'eur',
    interval: 'month' as const,
    label: 'Monthly',
  },
  annual: {
    priceId: process.env.STRIPE_PRICE_ANNUAL!,
    price: 94.8,
    currency: 'eur',
    interval: 'year' as const,
    label: 'Annual',
    savingsPercent: 39,
  },
} as const
