'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { fadeUpVariants, staggerContainer } from '@/hooks/useScrollAnimation'

const vocabularyCards = [
  { word: 'Kerning', definition: 'Space between individual characters', level: 'A1', color: '#F0FFFF' },
  { word: 'Brief', definition: 'Project requirements document', level: 'A2', color: '#E8F4FF' },
  { word: 'Wireframe', definition: 'Low-fidelity layout structure', level: 'B1', color: '#EDE7F6' },
  { word: 'Iteration', definition: 'Repeated refinement cycle', level: 'B1', color: '#E8F5E9' },
  { word: 'Pitch', definition: 'Presenting your concept to a client', level: 'B2', color: '#FFF8E1' },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero bg-grid"
    >
      {/* Geometric decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(38,83,141,0.08) 0%, transparent 70%)',
            y,
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(38,83,141,0.06) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid accent line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-navy/10 to-transparent" />
      </div>

      <div className="container-xl relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ opacity }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-navy/15 text-xs font-bold text-brand-navy shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                A1 → C2 · 12 000+ designers formés
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-dark leading-[1.03] tracking-tight mb-6"
            >
              L'anglais des
              <br />
              <span className="gradient-text-animated">designers.</span>
              <br />
              <span className="relative">
                Enfin.
                <motion.span
                  className="absolute -bottom-2 left-0 h-1.5 bg-brand-navy rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg font-medium"
            >
              Vocabulaire métier, simulations pro, gamification — de{' '}
              <strong className="text-brand-dark">A1 à C2</strong>. Conçu 100% pour les UX, UI,
              motion designers, DA et illustrateurs.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4">
              <Link
                href="/register"
                data-cursor="magnetic"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-white font-bold bg-brand-navy hover:bg-brand-navy-dark transition-all duration-300 shadow-brand-lg hover:shadow-glow hover:-translate-y-0.5 text-base"
              >
                Commencer gratuitement
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold border-2 border-brand-navy text-brand-navy hover:bg-brand-azure transition-all duration-300 text-base hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Voir un exemple
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div variants={fadeUpVariants} className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['🎨', '✏️', '🖥️', '📱', '🎬'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-sm"
                    style={{ zIndex: 5 - i }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  4.9/5 · +450 avis vérifiés
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Vocabulary card stack */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Floating card stack */}
            {vocabularyCards.map((card, i) => (
              <motion.div
                key={card.word}
                className="absolute w-72 rounded-3xl shadow-card border border-white/80 overflow-hidden"
                style={{
                  backgroundColor: card.color,
                  rotate: (i - 2) * 6,
                  zIndex: vocabularyCards.length - i,
                  top: `${10 + i * 15}%`,
                  left: `${5 + i * 5}%`,
                }}
                initial={{ opacity: 0, y: 60, rotate: (i - 2) * 6 }}
                animate={{
                  opacity: i === 0 ? 1 : i === 1 ? 0.85 : 0.65,
                  y: 0,
                  rotate: (i - 2) * 6,
                }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, zIndex: 20, rotate: 0 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 text-brand-navy">
                      {card.level}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Design vocab</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark mb-1">{card.word}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.definition}</p>
                  <div className="mt-4 pt-4 border-t border-white/60 flex items-center gap-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-1.5 flex-1 rounded-full bg-brand-navy/20">
                        <div
                          className="h-full rounded-full bg-brand-navy"
                          style={{ width: j === 0 ? '100%' : j === 1 ? '60%' : '30%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Top card — featured, fully visible */}
            <motion.div
              className="absolute top-12 right-4 w-72 rounded-3xl bg-white shadow-card-hover border border-brand-navy/10 overflow-hidden z-30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-azure text-brand-navy border border-brand-navy/15">
                    Flashcard · A2
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-brand-navy' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Vocabulaire</p>
                <h3 className="text-3xl font-black text-brand-dark mb-1">Deliverable</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A specific output expected from the project.
                </p>
                <div className="mt-3 p-3 bg-brand-azure/40 rounded-xl">
                  <p className="text-xs text-brand-navy font-semibold italic">
                    "The deliverables include mockups and a style guide."
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-xl bg-brand-error/10 text-brand-error text-sm font-bold">
                    À revoir
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-brand-success/10 text-brand-success text-sm font-bold">
                    Compris ✓
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Floating XP badge */}
            <motion.div
              className="absolute bottom-10 left-4 px-4 py-3 rounded-2xl bg-white shadow-card-hover border border-yellow-100 flex items-center gap-2 z-40"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-xs font-bold text-brand-dark">+50 XP gagnés !</p>
                <p className="text-xs text-gray-400">Leçon complétée</p>
              </div>
            </motion.div>

            {/* Streak badge */}
            <motion.div
              className="absolute top-6 left-8 px-3 py-2.5 rounded-2xl bg-white shadow-card border border-orange-100 flex items-center gap-2 z-40"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <span className="text-lg">🔥</span>
              <div>
                <p className="text-xs font-bold text-brand-dark">14 jours</p>
                <p className="text-xs text-gray-400">de streak</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Découvrir</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-gray-300"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
