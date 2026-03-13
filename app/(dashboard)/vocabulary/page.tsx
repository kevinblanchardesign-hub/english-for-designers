'use client'

export const dynamic = 'force-dynamic'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

type Category = 'all' | 'design' | 'business' | 'presentation' | 'email' | 'idioms'

interface Word {
  id: number
  en: string
  fr: string
  category: Exclude<Category, 'all'>
  example: string
  level: string
  mastered: boolean
}

const CATEGORIES = [
  { id: 'all' as const,          label: 'Tous',         icon: '📖', color: '#6B7280', bg: '#F9FAFB' },
  { id: 'design' as const,       label: 'Design',       icon: '🎨', color: '#A259FF', bg: '#F5F0FF' },
  { id: 'business' as const,     label: 'Business',     icon: '💼', color: '#0070CC', bg: '#EFF6FF' },
  { id: 'presentation' as const, label: 'Présentation', icon: '🎤', color: '#00D4AA', bg: '#F0FFFA' },
  { id: 'email' as const,        label: 'Emails',       icon: '📧', color: '#F5A623', bg: '#FFFBEB' },
  { id: 'idioms' as const,       label: 'Idiomes',      icon: '💬', color: '#FF6B35', bg: '#FFF5F0' },
]

const LEVEL_COLORS: Record<string, string> = {
  A1: '#22C55E', A2: '#84CC16', B1: '#F59E0B', B2: '#F97316', C1: '#EF4444', C2: '#8B5CF6',
}

const INITIAL_WORDS: Word[] = [
  // Design
  { id: 1,  en: 'Wireframe',             fr: 'Maquette fil de fer',         category: 'design',       example: 'Let me create a wireframe before we move to the prototype.',       level: 'A2', mastered: false },
  { id: 2,  en: 'Mockup',                fr: 'Maquette haute fidélité',      category: 'design',       example: 'The client approved the mockup, so we can start building.',        level: 'A2', mastered: true  },
  { id: 3,  en: 'Prototype',             fr: 'Prototype interactif',         category: 'design',       example: 'We need to test the prototype with real users.',                   level: 'B1', mastered: false },
  { id: 4,  en: 'Iteration',             fr: 'Itération / Cycle',            category: 'design',       example: 'After several iterations, we found the perfect solution.',         level: 'B1', mastered: false },
  { id: 5,  en: 'Deliverable',           fr: 'Livrable',                     category: 'design',       example: 'The main deliverable for this sprint is the homepage design.',      level: 'B2', mastered: false },
  { id: 6,  en: 'User flow',             fr: 'Parcours utilisateur',         category: 'design',       example: "Let's map out the user flow before designing the screens.",         level: 'B1', mastered: true  },
  { id: 7,  en: 'Asset',                 fr: 'Ressource graphique',          category: 'design',       example: 'Please export all the assets in SVG format.',                      level: 'A2', mastered: false },
  { id: 8,  en: 'Handoff',              fr: 'Passation au développeur',     category: 'design',       example: 'We scheduled the design handoff for next Monday.',                 level: 'B2', mastered: false },
  // Business
  { id: 9,  en: 'Brief',                 fr: 'Cahier des charges',           category: 'business',     example: 'The client sent us a detailed brief for the new campaign.',         level: 'A2', mastered: true  },
  { id: 10, en: 'Deadline',              fr: 'Date limite',                  category: 'business',     example: 'We need to meet the deadline by Friday.',                          level: 'A1', mastered: true  },
  { id: 11, en: 'Stakeholder',           fr: 'Partie prenante',              category: 'business',     example: 'All stakeholders agreed on the final design direction.',            level: 'B2', mastered: false },
  { id: 12, en: 'Scope creep',           fr: 'Dérive des objectifs',         category: 'business',     example: "We need to avoid scope creep to stay on budget.",                  level: 'C1', mastered: false },
  { id: 13, en: 'Pitch',                 fr: 'Présentation commerciale',     category: 'business',     example: 'Our pitch impressed the investors.',                               level: 'B1', mastered: false },
  { id: 14, en: 'Feedback',              fr: 'Retour / Avis',                category: 'business',     example: "I'd love to get your feedback on this design.",                    level: 'A2', mastered: true  },
  { id: 15, en: 'Milestone',             fr: 'Jalon / Étape clé',            category: 'business',     example: 'We hit our first major milestone ahead of schedule.',               level: 'B2', mastered: false },
  { id: 16, en: 'Bandwidth',             fr: 'Disponibilité / Capacité',     category: 'business',     example: "I don't have the bandwidth to take on another project right now.",  level: 'C1', mastered: false },
  // Présentation
  { id: 17, en: 'To walk through',       fr: 'Passer en revue',              category: 'presentation', example: 'Let me walk you through our design process.',                       level: 'B1', mastered: false },
  { id: 18, en: 'To elaborate',          fr: 'Développer / Expliquer',       category: 'presentation', example: 'Could you elaborate on this point?',                               level: 'B2', mastered: false },
  { id: 19, en: 'To wrap up',            fr: 'Conclure / Résumer',           category: 'presentation', example: 'To wrap up, here are our three main recommendations.',              level: 'B1', mastered: true  },
  { id: 20, en: 'To address',            fr: 'Aborder / Traiter',            category: 'presentation', example: "I'd like to address the main concerns you raised.",                 level: 'B2', mastered: false },
  { id: 21, en: 'To take you through',   fr: 'Vous guider à travers',        category: 'presentation', example: "I'll take you through our creative approach.",                      level: 'B1', mastered: false },
  { id: 22, en: 'As you can see',        fr: 'Comme vous pouvez le voir',    category: 'presentation', example: 'As you can see, the layout is much cleaner now.',                  level: 'A2', mastered: true  },
  // Email
  { id: 23, en: 'Please find attached',  fr: 'Veuillez trouver ci-joint',    category: 'email',        example: 'Please find attached the revised mockups.',                        level: 'B1', mastered: false },
  { id: 24, en: 'As per your request',   fr: 'Comme demandé',                category: 'email',        example: "As per your request, I've updated the color palette.",              level: 'B2', mastered: false },
  { id: 25, en: 'Looking forward to',    fr: "Dans l'attente de",            category: 'email',        example: 'Looking forward to hearing your thoughts!',                        level: 'B1', mastered: true  },
  { id: 26, en: 'I hope this helps',     fr: "J'espère que cela aide",       category: 'email',        example: 'I hope this helps clarify the process.',                           level: 'A2', mastered: false },
  { id: 27, en: 'Further to our call',   fr: 'Suite à notre appel',          category: 'email',        example: 'Further to our call, I am sending you the updated proposal.',      level: 'C1', mastered: false },
  // Idiomes
  { id: 28, en: 'Back to the drawing board', fr: 'Repartir de zéro',         category: 'idioms',       example: "The client rejected everything — back to the drawing board!",      level: 'B2', mastered: false },
  { id: 29, en: 'Think outside the box', fr: 'Sortir des sentiers battus',   category: 'idioms',       example: 'For this project, we really need to think outside the box.',       level: 'B1', mastered: false },
  { id: 30, en: 'On the same page',      fr: 'Être en phase',                category: 'idioms',       example: "Are we all on the same page about the new direction?",              level: 'B1', mastered: true  },
  { id: 31, en: 'Ballpark figure',       fr: 'Estimation approximative',     category: 'idioms',       example: 'Can you give me a ballpark figure for the budget?',                level: 'C1', mastered: false },
  { id: 32, en: 'Touch base',            fr: 'Prendre contact / Faire le point', category: 'idioms',   example: "Let's touch base after the client meeting.",                        level: 'B2', mastered: false },
]

// ─── Flashcard ────────────────────────────────────────────────────────────────

function FlashCard({ word, onToggleMastered }: { word: Word; onToggleMastered: (id: number) => void }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: 1200 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d', minHeight: 200 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-3xl bg-white border border-gray-100 shadow-card p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <span
              className="text-xs font-black px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: LEVEL_COLORS[word.level] ?? '#6B7280' }}
            >
              {word.level}
            </span>
            {word.mastered && (
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                ✓ Appris
              </span>
            )}
          </div>
          <div className="text-center py-2">
            <p className="text-2xl font-black text-brand-dark mb-1.5">{word.en}</p>
            <p className="text-xs text-gray-400 font-medium">Cliquer pour voir la traduction →</p>
          </div>
          <div className="flex justify-center">
            <span className="text-xs text-gray-200 font-medium select-none">🔄</span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-3xl bg-brand-dark text-white p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/10 text-white/60 self-start">
            {word.level}
          </span>
          <div className="text-center py-2">
            <p className="text-xl font-black text-brand-azure mb-2">{word.fr}</p>
            <p className="text-xs text-white/50 italic leading-relaxed line-clamp-2">
              "{word.example}"
            </p>
          </div>
          <button
            className={cn(
              'w-full py-2.5 rounded-2xl text-xs font-bold transition-all',
              word.mastered
                ? 'bg-green-500 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white',
            )}
            onClick={(e) => { e.stopPropagation(); onToggleMastered(word.id) }}
          >
            {word.mastered ? '✓ Maîtrisé !' : '+ Marquer comme appris'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [search, setSearch]                     = useState('')
  const [words, setWords]                       = useState<Word[]>(INITIAL_WORDS)
  const [masteredOnly, setMasteredOnly]         = useState(false)

  const filtered = useMemo(() => {
    return words.filter((w) => {
      const matchCat     = selectedCategory === 'all' || w.category === selectedCategory
      const matchSearch  = w.en.toLowerCase().includes(search.toLowerCase()) ||
                           w.fr.toLowerCase().includes(search.toLowerCase())
      const matchMastered = !masteredOnly || w.mastered
      return matchCat && matchSearch && matchMastered
    })
  }, [words, selectedCategory, search, masteredOnly])

  const masteredCount  = words.filter((w) => w.mastered).length
  const toReviewCount  = words.length - masteredCount

  const toggleMastered = (id: number) =>
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, mastered: !w.mastered } : w)))

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-dark mb-2">Vocabulaire 📚</h1>
        <p className="text-gray-400 font-medium">
          Maîtrisez le lexique essentiel du design en anglais — cliquez sur une carte pour la retourner
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Mots au total', value: words.length,  icon: '📖', bg: '#E8F4FF', color: '#0070CC' },
          { label: 'Maîtrisés',    value: masteredCount,   icon: '✅', bg: '#E8F5E9', color: '#22C55E' },
          { label: 'À revoir',     value: toReviewCount,   icon: '🔄', bg: '#FFF8E1', color: '#F59E0B' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-3xl bg-white border border-gray-100 p-5 shadow-card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div
              className="w-11 h-11 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl"
              style={{ backgroundColor: stat.bg }}
            >
              {stat.icon}
            </div>
            <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200',
              selectedCategory === cat.id
                ? 'text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:scale-105',
            )}
            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Search + mastered toggle */}
      <div className="flex gap-3 mb-7">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un mot en anglais ou en français…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-brand-navy transition-colors bg-white"
          />
        </div>
        <button
          onClick={() => setMasteredOnly((v) => !v)}
          className={cn(
            'px-4 py-3 rounded-2xl text-sm font-bold border transition-all duration-200 whitespace-nowrap',
            masteredOnly
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300',
          )}
        >
          ✓ Appris seulement
        </button>
      </div>

      {/* Word grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key="grid"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            layout
          >
            {filtered.map((word, i) => (
              <motion.div
                key={word.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
              >
                <FlashCard word={word} onToggleMastered={toggleMastered} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg font-black text-brand-dark mb-2">Aucun mot trouvé</p>
            <p className="text-sm text-gray-400">Essayez un autre terme ou changez de catégorie.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
