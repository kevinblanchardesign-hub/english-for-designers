import type { Metadata } from 'next'
import { Hero } from '@/components/landing/Hero'
import { SocialProof } from '@/components/landing/SocialProof'
import { Features } from '@/components/landing/Features'
import { LevelPath } from '@/components/landing/LevelPath'
import { Testimonials } from '@/components/landing/Testimonials'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { FinalCTA } from '@/components/landing/FinalCTA'

export const metadata: Metadata = {
  title: "English For Designers — L'anglais des designers. Enfin.",
  description:
    "Plateforme e-learning d'anglais spécialisée pour les designers. Vocabulaire métier, simulations pro, gamification — de A1 à C2.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <LevelPath />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  )
}
