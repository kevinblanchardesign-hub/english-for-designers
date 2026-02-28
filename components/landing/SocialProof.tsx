'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const startValue = 0

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startValue + (end - startValue) * eased))

      if (progress < 1) requestAnimationFrame(updateCount)
      else setCount(end)
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

const stats = [
  {
    value: 12000,
    suffix: '+',
    label: 'designers formés',
    sublabel: 'sur la plateforme',
    icon: '🎨',
    color: 'from-blue-50 to-brand-azure',
  },
  {
    value: 45,
    suffix: '',
    label: 'pays représentés',
    sublabel: 'dans notre communauté',
    icon: '🌍',
    color: 'from-green-50 to-emerald-50',
  },
  {
    value: 6,
    suffix: ' mois',
    prefix: 'A1 → C2 en ',
    label: 'en moyenne',
    sublabel: 'avec la méthode intensive',
    icon: '🏆',
    color: 'from-amber-50 to-orange-50',
  },
  {
    value: 98,
    suffix: '%',
    label: 'de satisfaction',
    sublabel: 'd\'après nos apprenants',
    icon: '⭐',
    color: 'from-purple-50 to-pink-50',
  },
]

export function SocialProof() {
  return (
    <section className="section bg-white relative" style={{ paddingBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="container-xl relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">
            Ils nous font confiance
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark">
            Des chiffres qui parlent
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`rounded-3xl bg-gradient-to-br ${stat.color} p-6 border border-white shadow-card text-center`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-4xl sm:text-5xl font-black text-brand-dark mb-1 tabular-nums">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2}
                />
              </div>
              <p className="text-sm font-bold text-brand-dark mb-1">{stat.label}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">
            Utilisé par des designers chez
          </p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Figma',    color: '#A259FF' },
              { name: 'Adobe',    color: '#FF2D55' },
              { name: 'Ubisoft',  color: '#00D4AA' },
              { name: 'Publicis', color: '#F5A623' },
              { name: 'BETC',     color: '#FF6B35' },
              { name: 'Havas',    color: '#00C2FF' },
            ].map((brand) => (
              <motion.span
                key={brand.name}
                className="font-black text-2xl tracking-tight cursor-default select-none"
                variants={{
                  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1, y: 0, filter: 'blur(0px)',
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{ color: '#D1D5DB' }}
                whileHover={{
                  color: brand.color,
                  scale: 1.12,
                  transition: { duration: 0.18 },
                }}
                whileTap={{ scale: 0.97 }}
              >
                {brand.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
