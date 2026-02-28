'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Léa Martin',
    role: 'UX Designer',
    company: 'Spotify',
    city: 'Stockholm',
    level: 'B2',
    avatar: '👩‍💻',
    quote:
      "J'ai décroché mon poste chez Spotify grâce à ce que j'ai appris ici. Les simulations de pitch en anglais m'ont donné une confiance que je n'avais jamais eue avant.",
    stars: 5,
    color: '#E8F5E9',
  },
  {
    name: 'Thomas Dupont',
    role: 'Art Director',
    company: 'Publicis',
    city: 'Londres',
    level: 'C1',
    avatar: '👨‍🎨',
    quote:
      "Le vocabulaire design en anglais que j'ai appris ici, je l'utilise tous les jours. C'est vraiment fait pour les gens du métier, pas pour des touristes.",
    stars: 5,
    color: '#EFF6FF',
  },
  {
    name: 'Sofia Chen',
    role: 'Motion Designer',
    company: 'Netflix',
    city: 'Los Angeles',
    level: 'B2',
    avatar: '👩‍🎬',
    quote:
      "Je travaille maintenant avec des équipes américaines et canadiennes. English For Designers m'a donné les mots exacts dont j'avais besoin dans mon domaine.",
    stars: 5,
    color: '#FDF2F8',
  },
  {
    name: 'Marc Leblanc',
    role: 'UI Designer',
    company: 'BETC',
    city: 'Amsterdam',
    level: 'B1',
    avatar: '👨‍💻',
    quote:
      "Après 3 mois, je réponds aux briefs anglais sans paniquer. Le système de streak m'a forcé à pratiquer chaque jour — et ça marche vraiment.",
    stars: 5,
    color: '#FFFBEB',
  },
  {
    name: 'Amira Benali',
    role: 'Brand Designer',
    company: 'Freelance',
    city: 'Barcelone',
    level: 'B2',
    avatar: '👩‍🎨',
    quote:
      "J'ai des clients en Angleterre maintenant. Je n'aurais jamais osé les prospecter avant d'avoir suivi les simulations de pitch ici. Game changer.",
    stars: 5,
    color: '#F5F3FF',
  },
  {
    name: 'Julien Moreau',
    role: 'Product Designer',
    company: 'Figma',
    city: 'San Francisco',
    level: 'C2',
    avatar: '👨‍🎨',
    quote:
      "Avant d'être recruté chez Figma, j'ai intensivement utilisé les simulations de portfolio review. C'est exactement ce qui m'a préparé.",
    stars: 5,
    color: '#FFF0F0',
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 rounded-3xl border border-white shadow-card p-6"
      style={{ backgroundColor: testimonial.color }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.stars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote mark */}
      <div className="text-5xl font-black text-brand-navy/15 leading-none mb-2 font-serif">"</div>

      {/* Quote */}
      <p className="text-sm text-gray-700 leading-relaxed font-medium mb-5">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-brand-dark">{testimonial.name}</p>
          <p className="text-xs text-gray-400 font-medium truncate">
            {testimonial.role} · {testimonial.company} · {testimonial.city}
          </p>
        </div>
        <span className="flex-shrink-0 text-xs font-black px-2 py-0.5 rounded-full bg-white/70 text-brand-navy border border-brand-navy/15">
          {testimonial.level}
        </span>
      </div>
    </div>
  )
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const positionRef = useRef(0)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const speed = 0.4

    const animate = () => {
      if (!isPaused && container) {
        positionRef.current += speed
        if (positionRef.current >= container.scrollWidth / 2) {
          positionRef.current = 0
        }
        container.scrollLeft = positionRef.current
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [isPaused])

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="section bg-brand-light overflow-hidden">
      <div className="container-xl mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">
            Témoignages
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mb-4">
            Ce qu'ils disent
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Des designers qui ont transformé leur carrière grâce à l'anglais.
          </p>
        </motion.div>
      </div>

      {/* Scrolling carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden pb-2"
        style={{ scrollBehavior: 'auto' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex gap-4 px-6">
          {doubled.map((testimonial, i) => (
            <motion.div
              key={`${testimonial.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
