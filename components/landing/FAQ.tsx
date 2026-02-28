'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: "C'est vraiment fait pour les designers ?",
    answer:
      "Oui, 100%. Chaque cours, chaque exercice, chaque simulation est construit autour du monde du design. Tu ne vas pas apprendre à commander au restaurant en anglais — tu vas apprendre à pitcher ton concept à un client londonien, à répondre à un brief d'agence américaine, à expliquer tes choix typographiques à un art director étranger. C'est la seule plateforme spécialisée pour les métiers du design.",
  },
  {
    question: 'Quel niveau dois-je avoir pour commencer ?',
    answer:
      "Absolument aucun niveau requis. On accueille les vrais débutants (A1 — qui ne connaissent que \"hello\" et \"thank you\") jusqu'aux designers qui veulent atteindre un niveau C2 pour diriger des équipes internationales. Un test de positionnement gratuit t'oriente dès l'inscription vers le bon point de départ.",
  },
  {
    question: 'La version gratuite est vraiment gratuite ?',
    answer:
      "Oui, sans carte bancaire requise et sans limite de temps. Tu as accès aux 3 premiers modules de chaque niveau, à 200 flashcards et à 2 simulations de test. C'est suffisant pour voir si la méthode te convient avant d'investir. Pas de trial qui expire après 7 jours à moins que tu ne l'aies choisi.",
  },
  {
    question: 'Combien de temps par jour faut-il ?',
    answer:
      "15 à 20 minutes par jour suffisent pour progresser régulièrement. Le système de streak t'encourage à pratiquer quotidiennement. Pour une progression rapide (A1 → B2 en 6 mois), on recommande 30 minutes par jour. Mais même avec 10 minutes le soir, tu avanceras si tu es régulier·e.",
  },
  {
    question: 'Y a-t-il des cours vidéo ?',
    answer:
      "Oui, certains cours incluent des vidéos explicatives pour les concepts plus complexes (simulations de pitch, présentation de portfolio...). La méthode principale repose sur les flashcards interactives, les quiz et les simulations de dialogue — des formats conçus pour l'apprentissage actif, pas passif.",
  },
  {
    question: 'Est-ce que je peux avoir un certificat ?',
    answer:
      "Oui ! Les abonnés Premium reçoivent un certificat de niveau vérifiable (A1 à C2) à la complétion de chaque palier. Ces certificats sont partageables sur LinkedIn et reconnus dans le milieu du design. Un certificat \"English For Designers\" sur ton profil LinkedIn, c'est un signal fort pour les recruteurs internationaux.",
  },
  {
    question: 'Puis-je annuler mon abonnement ?',
    answer:
      "Absolument, à tout moment, sans justification et sans frais de résiliation. Si tu annules, tu gardes l'accès jusqu'à la fin de ta période déjà payée. Si tu n'es pas satisfait·e dans les 30 premiers jours, on te rembourse intégralement — sans poser de questions.",
  },
  {
    question: "Y a-t-il une application mobile ?",
    answer:
      "Une app mobile est en développement et sera disponible pour les abonnés annuels en priorité. En attendant, le site est entièrement responsive et optimisé pour mobile — tu peux pratiquer depuis ton téléphone sans application. Les abonnés annuels auront aussi accès offline aux cours téléchargés.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section bg-brand-light">
      <div className="container-xl max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark">
            Questions fréquentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={cn(
                'rounded-2xl border transition-all duration-300 overflow-hidden',
                openIndex === i
                  ? 'border-brand-navy/20 bg-white shadow-card'
                  : 'border-gray-100 bg-white hover:border-brand-navy/15',
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm sm:text-base font-bold text-brand-dark">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-azure border border-brand-navy/15 flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3 text-brand-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-5">
                      <div className="h-px bg-gray-100 mb-4" />
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* More help */}
        <motion.p
          className="text-center text-sm text-gray-400 font-medium mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Autre question ?{' '}
          <a href="mailto:hello@english-for-designers.com" className="text-brand-navy font-bold hover:underline">
            Écrivez-nous
          </a>{' '}
          — réponse en moins de 24h.
        </motion.p>
      </div>
    </section>
  )
}
