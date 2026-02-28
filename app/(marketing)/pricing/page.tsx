import type { Metadata } from 'next'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { FinalCTA } from '@/components/landing/FinalCTA'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: "Commencez gratuitement. Passez premium quand vous êtes prêt·e. Plans mensuel et annuel disponibles.",
}

export default function PricingPage() {
  return (
    <div className="pt-20">
      <div className="section bg-white">
        <div className="container-xl text-center mb-2">
          <h1 className="text-5xl sm:text-6xl font-black text-brand-dark mb-4 mt-8">
            Tarification simple
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
            Pas de surprise, pas de frais cachés. Commencez gratuitement.
          </p>
        </div>
      </div>
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
