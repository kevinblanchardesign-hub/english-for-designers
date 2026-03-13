import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        if (!userId) break

        await prisma.user.update({
          where: { id: userId },
          data: {
            isPremium: true,
            subscriptionId: session.subscription as string,
          },
        })
        console.log(`✅ Premium activated for user ${userId}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { isPremium: false, subscriptionId: null },
          })
        } else {
          // Find by stripeId
          const customer = await stripe.customers.retrieve(subscription.customer as string)
          if (customer.deleted) break
          const user = await prisma.user.findFirst({
            where: { stripeId: customer.id },
          })
          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: { isPremium: false, subscriptionId: null },
            })
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        const user = await prisma.user.findFirst({ where: { stripeId: customerId } })

        if (user) {
          const { Resend } = await import('resend')
          const resend = new Resend(process.env.RESEND_API_KEY)
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL ?? 'no-reply@english-for-designers.com',
            to: user.email,
            subject: 'Problème de paiement — English For Designers',
            html: `
              <h2>Bonjour ${user.name ?? 'Designer'},</h2>
              <p>Nous n'avons pas pu traiter votre paiement pour votre abonnement English For Designers.</p>
              <p>Veuillez mettre à jour votre moyen de paiement pour continuer à profiter de l'accès Premium.</p>
              <a href="${process.env.NEXTAUTH_URL}/pricing" style="background:#26538D;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px;">
                Mettre à jour le paiement
              </a>
              <p>Si vous avez des questions, répondez à cet email.</p>
            `,
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const isActive = subscription.status === 'active' || subscription.status === 'trialing'
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { isPremium: isActive },
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }
}
