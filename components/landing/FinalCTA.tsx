'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-xl">
        <motion.div
          className="relative rounded-4xl bg-brand-dark overflow-hidden p-12 sm:p-16 lg:p-20 text-center"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #4A90D9, transparent)' }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #F0FFFF, transparent)' }}
            />
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(rgba(240,255,255,0.5) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/60 text-xs font-semibold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
              Rejoignez 12 000+ designers
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Votre prochaine opportunité
              <br />
              <span className="text-brand-azure">est en anglais.</span>
            </motion.h2>

            <motion.p
              className="text-lg text-white/50 font-medium leading-relaxed mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Les meilleurs studios, les clients les plus intéressants, les salaires les plus
              hauts — ils cherchent des designers qui parlent anglais. Commencez aujourd'hui,
              gratuitement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/register"
                data-cursor="magnetic"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-brand-dark bg-white hover:bg-brand-azure transition-all duration-300 text-base hover:shadow-lg hover:-translate-y-0.5"
              >
                Commencer gratuitement
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300 text-base hover:-translate-y-0.5"
              >
                Voir les tarifs
              </Link>
            </motion.div>

            {/* Micro trust signals */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {[
                '✅ Sans carte bancaire',
                '✅ Annulation facile',
                '✅ 30 jours remboursé',
              ].map((text) => (
                <span key={text} className="text-sm text-white/40 font-medium">
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
