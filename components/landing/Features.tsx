'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUpVariants } from '@/hooks/useScrollAnimation'

const features = [
  {
    icon: '🎨',
    title: 'Vocabulaire Design',
    subtitle: 'Précis. Professionnel. Immédiatement utilisable.',
    description:
      'Typographie, UX research, branding, motion design, illustration... Tous les termes métier que vos clients et collaborateurs internationaux utilisent, enseignés en contexte.',
    highlights: ['Flashcards mémorisées à vie', '1200+ termes spécialisés', 'Exemples dans des vrais briefs'],
    gradient: 'from-blue-500/10 to-brand-azure',
    accent: '#26538D',
    preview: ['Typography', 'Whitespace', 'Kerning', 'Deliverable', 'Iteration', 'Mood Board'],
  },
  {
    icon: '🎯',
    title: 'Simulations Réelles',
    subtitle: 'Entraîne-toi aux situations que tu vivras vraiment.',
    description:
      'Pitch client en anglais, réponse à un brief d\'agence internationale, portfolio review avec un art director étranger, négociation de révisions — le tout simulé et coaché.',
    highlights: ['Pitch client complet', 'Email pro en anglais', 'Review de portfolio'],
    gradient: 'from-purple-500/10 to-pink-50',
    accent: '#7C3AED',
    preview: ['Client Pitch', 'Brief Review', 'Portfolio Talk', 'Revision Email', 'Art Direction', 'Team Collab'],
  },
  {
    icon: '🏆',
    title: 'Gamification',
    subtitle: 'Progresse comme dans un jeu. Vraiment.',
    description:
      'XP, badges exclusifs, streaks, classements par niveau — un système de récompenses conçu pour maintenir ta motivation sur la durée et rendre l\'apprentissage addictif.',
    highlights: ['Système XP + Rangs', 'Badges collectionnables', 'Classement hebdo'],
    gradient: 'from-amber-500/10 to-orange-50',
    accent: '#D97706',
    preview: ['Streak 🔥', 'Badges 🏅', 'XP ⭐', 'Rangs 👑', 'Défis 🎯', 'Classement 📊'],
  },
]

export function Features() {
  return (
    <section className="section bg-brand-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="container-xl relative">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">
            Pourquoi ça marche
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark leading-tight mb-4">
            Trois piliers pour
            <br />
            <span className="gradient-text">maîtriser l'anglais</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Une méthode construite par et pour des designers — pas un cours d'anglais générique
            recyclé.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariants}
              className={`group relative rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover`}
              style={{ '--accent': feature.accent } as React.CSSProperties}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.accent}12, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-5 inline-block"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-black text-brand-dark mb-1">{feature.title}</h3>
                <p className="text-sm font-semibold text-gray-400 mb-4">{feature.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{feature.description}</p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: feature.accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Preview tags */}
                <div className="flex flex-wrap gap-2">
                  {feature.preview.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/70 text-gray-600 border border-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
