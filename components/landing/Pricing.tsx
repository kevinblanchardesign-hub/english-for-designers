'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const plans = {
  free: {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Pour découvrir la plateforme',
    cta: 'Commencer gratuitement',
    ctaHref: '/register',
    featured: false,
    features: [
      { text: '3 premiers modules par niveau', included: true },
      { text: 'Flashcards de base (200 mots)', included: true },
      { text: '2 simulations de test', included: true },
      { text: 'Progression visible', included: true },
      { text: 'Support communauté', included: true },
      { text: 'Tous les modules premium', included: false },
      { text: 'Simulations illimitées', included: false },
      { text: 'Certificats de niveau', included: false },
      { text: 'Support prioritaire', included: false },
    ],
  },
  premium: {
    name: 'Premium',
    price: { monthly: 12.9, annual: 7.9 },
    description: 'Pour une progression sérieuse',
    cta: 'Essayer 7 jours gratuit',
    ctaHref: '/register?plan=monthly',
    featured: false,
    features: [
      { text: 'Tous les modules (60+ cours)', included: true },
      { text: 'Flashcards illimitées (1200+ mots)', included: true },
      { text: 'Simulations illimitées', included: true },
      { text: 'Système XP & gamification complet', included: true },
      { text: 'Classement et badges', included: true },
      { text: 'Certificats de niveau reconnus', included: true },
      { text: 'Support prioritaire < 24h', included: true },
      { text: 'Nouveaux cours chaque mois', included: true },
      { text: 'Accès offline (app mobile)', included: false },
    ],
  },
  annual: {
    name: 'Premium Annuel',
    price: { monthly: null, annual: 94.8 },
    pricePerMonth: 7.9,
    description: 'La meilleure valeur — économisez 39%',
    cta: 'S\'abonner maintenant',
    ctaHref: '/register?plan=annual',
    featured: true,
    badge: '🎉 Populaire',
    savings: '39%',
    features: [
      { text: 'Tout Premium, sans limite', included: true },
      { text: 'Accès offline (app mobile)', included: true },
      { text: 'Sessions live mensuelles', included: true },
      { text: 'Ressources exclusives designers', included: true },
      { text: 'Communauté Discord privée', included: true },
      { text: 'Certificats LinkedIn officiels', included: true },
      { text: 'Feedback personnalisé sur vos pitchs', included: true },
      { text: 'Priorité nouvelles fonctionnalités', included: true },
      { text: '2 mois offerts vs mensuel', included: true },
    ],
  },
}

export function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')

  const displayedPlans = [plans.free, billing === 'monthly' ? plans.premium : plans.annual]

  return (
    <section className="section bg-white" id="pricing">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">
            Tarification
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mb-4">
            Simple et transparent
          </h2>
          <p className="text-lg text-gray-500 font-medium mb-8">
            Commencez gratuitement. Passez premium quand vous êtes prêt·e.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-gray-100 border border-gray-200">
            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300',
                billing === 'monthly'
                  ? 'bg-white text-brand-dark shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2',
                billing === 'annual'
                  ? 'bg-white text-brand-dark shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              Annuel
              <span className="text-xs bg-brand-success text-white px-2 py-0.5 rounded-full font-bold">
                -39%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free plan */}
          <motion.div
            className="rounded-3xl border-2 border-gray-100 bg-white p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-black text-brand-dark mb-1">{plans.free.name}</h3>
              <p className="text-sm text-gray-400 font-medium">{plans.free.description}</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-black text-brand-dark">0€</span>
              <span className="text-gray-400 text-sm font-medium ml-1">pour toujours</span>
            </div>
            <Link
              href={plans.free.ctaHref}
              className="block w-full py-3.5 rounded-2xl text-center text-sm font-bold border-2 border-gray-200 text-brand-dark hover:border-brand-navy hover:text-brand-navy transition-all duration-200 mb-8"
            >
              {plans.free.cta}
            </Link>
            <ul className="space-y-3">
              {plans.free.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                  {feature.included ? (
                    <svg className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-200 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className={feature.included ? 'text-gray-600' : 'text-gray-300'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium monthly */}
          <AnimatePresence mode="wait">
            {billing === 'monthly' && (
              <motion.div
                key="monthly"
                className="rounded-3xl border-2 border-brand-navy/20 bg-gradient-to-b from-brand-azure to-white p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-black text-brand-dark mb-1">{plans.premium.name}</h3>
                  <p className="text-sm text-gray-400 font-medium">{plans.premium.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-brand-dark">12,90€</span>
                  <span className="text-gray-400 text-sm font-medium ml-1">/mois</span>
                </div>
                <Link
                  href={plans.premium.ctaHref}
                  className="block w-full py-3.5 rounded-2xl text-center text-sm font-bold bg-brand-navy text-white hover:bg-brand-navy-dark transition-all mb-8"
                >
                  {plans.premium.cta}
                </Link>
                <ul className="space-y-3">
                  {plans.premium.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                      {feature.included ? (
                        <svg className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-200 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.included ? 'text-gray-600' : 'text-gray-300'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Annual */}
            {billing === 'annual' && (
              <motion.div
                key="annual"
                className="relative rounded-3xl border-2 border-brand-navy bg-brand-dark text-white p-8 shadow-brand-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, #4A90D9, transparent)' }}
                />

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-amber-900 text-xs font-black mb-5">
                  🎉 Le plus populaire
                </div>

                <h3 className="text-xl font-black mb-1">Premium Annuel</h3>
                <p className="text-sm text-white/50 font-medium mb-6">La meilleure valeur</p>

                <div className="mb-1">
                  <span className="text-5xl font-black">7,90€</span>
                  <span className="text-white/50 text-sm font-medium ml-1">/mois</span>
                </div>
                <p className="text-sm text-white/40 mb-6">Facturé 94,80€/an · 2 mois offerts</p>

                <Link
                  href={plans.annual.ctaHref}
                  data-cursor="magnetic"
                  className="block w-full py-3.5 rounded-2xl text-center text-sm font-bold bg-white text-brand-navy hover:bg-brand-azure transition-all mb-8 relative z-10"
                >
                  {plans.annual.cta}
                </Link>

                <ul className="space-y-3 relative z-10">
                  {plans.annual.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enterprise placeholder */}
          <motion.div
            className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-black text-brand-dark mb-2">Équipe</h3>
            <p className="text-sm text-gray-400 font-medium mb-6">
              Formation pour votre agence ou studio de design. Tarifs dégressifs.
            </p>
            <a
              href="mailto:hello@english-for-designers.com"
              className="px-5 py-3 rounded-xl text-sm font-bold border-2 border-gray-300 text-brand-dark hover:border-brand-navy hover:text-brand-navy transition-all"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>

        {/* Trust */}
        <motion.p
          className="text-center text-sm text-gray-400 font-medium mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          ✅ Essai gratuit 7 jours · ✅ Résiliation à tout moment · ✅ Remboursement 30 jours
        </motion.p>
      </div>
    </section>
  )
}
