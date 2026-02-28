'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const levels = [
  {
    code: 'A1',
    name: 'Découverte',
    color: '#2ECC71',
    bgColor: '#E8F5E9',
    borderColor: '#A5D6A7',
    icon: '🌱',
    description: 'Tu connais quelques mots en anglais.',
    skills: [
      'Nommer les outils et logiciels',
      'Lire un brief simple',
      'Vocabulaire de la couleur',
      'Typographie basique',
    ],
    courseCount: 8,
    duration: '4-6 semaines',
  },
  {
    code: 'A2',
    name: 'Élémentaire',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    icon: '📐',
    description: 'Tu peux communiquer sur des projets simples.',
    skills: [
      'Décrire ton travail',
      'Répondre à un brief',
      'Email professionnel basique',
      'Présenter ton portfolio',
    ],
    courseCount: 10,
    duration: '6-8 semaines',
  },
  {
    code: 'B1',
    name: 'Intermédiaire',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    icon: '🎨',
    description: 'Tu peux travailler avec des clients étrangers.',
    skills: [
      'Présenter des wireframes',
      'Collaborer avec des équipes',
      'Gérer des révisions',
      'Feedback en anglais',
    ],
    courseCount: 12,
    duration: '8-10 semaines',
  },
  {
    code: 'B2',
    name: 'Avancé',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    icon: '🚀',
    description: 'Tu pitches tes concepts avec aisance.',
    skills: [
      'Pitch de concept',
      'Négocier des révisions',
      'Art direction verbale',
      'Présentation stratégique',
    ],
    courseCount: 10,
    duration: '10-12 semaines',
  },
  {
    code: 'C1',
    name: 'Courant',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    icon: '⭐',
    description: 'Tu diriges des équipes et des projets.',
    skills: [
      'Direction artistique complète',
      'Leadership créatif',
      'Contrats et négociation',
      'Conférences design',
    ],
    courseCount: 8,
    duration: '12-16 semaines',
  },
  {
    code: 'C2',
    name: 'Maîtrise',
    color: '#26538D',
    bgColor: '#F0FFFF',
    borderColor: '#90CAF9',
    icon: '👑',
    description: 'Tu penses et travailles en anglais.',
    skills: [
      'Communication C-level',
      'Consulting international',
      'Masterclass & conférences',
      'Mentoring en anglais',
    ],
    courseCount: 6,
    duration: '16-24 semaines',
  },
]

export function LevelPath() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null)

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">
            Votre progression
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mb-4">
            De A1 à C2,
            <br />
            <span className="gradient-text">à votre rythme</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Chaque niveau est conçu autour des situations réelles que les designers vivent.
          </p>
        </motion.div>

        {/* Level path — horizontal on desktop */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-success via-blue-400 via-amber-400 via-pink-400 via-purple-400 to-brand-navy"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-2">
            {levels.map((level, i) => (
              <motion.div
                key={level.code}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                onMouseEnter={() => setHoveredLevel(level.code)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                {/* Circle node */}
                <motion.div
                  className="relative z-10 w-24 h-24 mx-auto rounded-full flex flex-col items-center justify-center border-3 shadow-md mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: level.bgColor,
                    borderColor: level.borderColor,
                    borderWidth: '3px',
                    boxShadow: hoveredLevel === level.code ? `0 8px 30px ${level.color}40` : '',
                  }}
                >
                  <span className="text-2xl mb-0.5">{level.icon}</span>
                  <span className="text-sm font-black" style={{ color: level.color }}>
                    {level.code}
                  </span>
                </motion.div>

                {/* Level name */}
                <p className="text-center text-sm font-bold text-brand-dark mb-1">{level.name}</p>
                <p className="text-center text-xs text-gray-400 font-medium mb-3">{level.courseCount} cours</p>

                {/* Tooltip on hover */}
                <motion.div
                  className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-card-hover p-4"
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={
                    hoveredLevel === level.code
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: -5, scale: 0.95, pointerEvents: 'none' }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs font-semibold text-gray-400 mb-2 italic">{level.description}</p>
                  <ul className="space-y-1.5">
                    {level.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-1.5 text-xs font-medium text-brand-dark">
                        <span style={{ color: level.color }} className="mt-0.5 flex-shrink-0">✓</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">⏱ {level.duration}</span>
                    <Link
                      href={`/courses?level=${level.code}`}
                      className="text-xs font-bold text-brand-navy hover:underline"
                    >
                      Voir →
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm font-medium mb-4">
            Pas sûr·e de ton niveau ? On commence par un test de positionnement gratuit.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white text-sm font-bold hover:bg-brand-navy-dark transition-all hover:shadow-glow"
          >
            Faire le test de niveau →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
