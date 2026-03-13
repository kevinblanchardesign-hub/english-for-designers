'use client'

export const dynamic = 'force-dynamic'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode      = 'select' | 'qcm' | 'fill' | 'match' | 'result'
type ModeId    = Exclude<Mode, 'select' | 'result'>
type AnswerState = 'idle' | 'correct' | 'wrong'

interface QCMQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  xp: number
}

interface FillQuestion {
  id: number
  before: string
  after: string
  hint: string
  answer: string
  options: string[]
  xp: number
}

interface MatchPair {
  id: number
  en: string
  fr: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const QCM_QUESTIONS: QCMQuestion[] = [
  { id: 1, question: 'Comment dit-on "livrable" en anglais ?',                        options: ['Delivery', 'Deliverable', 'Output', 'Result'],                                     correct: 1, xp: 10, explanation: '"Deliverable" désigne tout élément produit à livrer au client dans un projet design.' },
  { id: 2, question: 'Que signifie "scope creep" ?',                                  options: ['Créativité débordante', 'Dérive des objectifs', 'Nouveau périmètre', 'Retard'],   correct: 1, xp: 15, explanation: '"Scope creep" c\'est l\'ajout progressif et non maîtrisé de nouvelles fonctionnalités.' },
  { id: 3, question: 'Comment traduire "passer en revue" lors d\'une présentation ?', options: ['To go over', 'To walk through', 'To present', 'To review'],                       correct: 1, xp: 10, explanation: '"Walk through" implique une explication étape par étape — très utilisé en présentation design.' },
  { id: 4, question: 'Que veut dire "back to the drawing board" ?',                   options: ['Continuer le travail', 'Améliorer le design', 'Repartir de zéro', 'Dessiner à la main'], correct: 2, xp: 15, explanation: 'Littéralement "retour à la planche à dessin" — on repart de zéro.' },
  { id: 5, question: 'Quelle formule utilise-t-on pour joindre un fichier par email ?', options: ['I attach herewith', 'Please find attached', 'See the file below', 'Enclosed find'], correct: 1, xp: 10, explanation: '"Please find attached" est la formule professionnelle la plus courante en anglais des affaires.' },
  { id: 6, question: 'Comment dit-on "être en phase" avec quelqu\'un ?',              options: ['On the same level', 'In the same boat', 'On the same page', 'At the same time'], correct: 2, xp: 15, explanation: '"On the same page" = avoir la même compréhension d\'une situation.' },
  { id: 7, question: 'Que signifie "handoff" dans un contexte design ?',              options: ['Réunion d\'équipe', 'Passation au développeur', 'Validation client', 'Livraison finale'], correct: 1, xp: 10, explanation: 'Le "handoff" c\'est le moment où le designer transmet ses specs aux développeurs.' },
  { id: 8, question: '"Bandwidth" dans un contexte professionnel signifie ?',         options: ['Connexion internet', 'Vitesse de travail', 'Disponibilité / Capacité', 'Équipe élargie'], correct: 2, xp: 15, explanation: '"I don\'t have the bandwidth" = je n\'ai pas la capacité / disponibilité pour ça.' },
]

const FILL_QUESTIONS: FillQuestion[] = [
  { id: 1, before: 'Can you give me a', after: 'figure for the project budget?',          hint: 'estimation approximative', answer: 'ballpark',    options: ['ballpark', 'rough', 'estimated', 'close'],        xp: 15 },
  { id: 2, before: 'Let me',            after: 'you through our design process.',          hint: 'passer en revue',         answer: 'walk',        options: ['walk', 'guide', 'show', 'lead'],                  xp: 10 },
  { id: 3, before: 'Please find',       after: 'the updated mockups for your review.',     hint: 'ci-joint',                answer: 'attached',    options: ['attached', 'included', 'enclosed', 'below'],      xp: 10 },
  { id: 4, before: 'All',               after: 'have approved the final design.',          hint: 'parties prenantes',       answer: 'stakeholders', options: ['stakeholders', 'clients', 'managers', 'partners'], xp: 15 },
  { id: 5, before: 'To',                after: 'up, here are our three main recommendations.', hint: 'conclure / résumer',  answer: 'wrap',        options: ['wrap', 'sum', 'close', 'round'],                  xp: 10 },
  { id: 6, before: 'We need to avoid',  after: 'to stay on budget.',                       hint: 'dérive des objectifs',    answer: 'scope creep', options: ['scope creep', 'feature drift', 'extra work', 'changes'], xp: 20 },
]

const MATCH_PAIRS: MatchPair[] = [
  { id: 1, en: 'Wireframe',    fr: 'Maquette fil de fer'   },
  { id: 2, en: 'Deliverable',  fr: 'Livrable'              },
  { id: 3, en: 'Stakeholder',  fr: 'Partie prenante'       },
  { id: 4, en: 'Deadline',     fr: 'Date limite'           },
  { id: 5, en: 'Feedback',     fr: 'Retour / Avis'         },
  { id: 6, en: 'Pitch',        fr: 'Présentation commerciale' },
]

const MODES_CONFIG = [
  { id: 'qcm'   as const, label: 'QCM',           icon: '🎯', desc: 'Choisissez la bonne réponse parmi 4 options',  color: '#A259FF', bg: '#F5F0FF', count: QCM_QUESTIONS.length  },
  { id: 'fill'  as const, label: 'Lacunaire',      icon: '✏️', desc: 'Complétez la phrase avec le bon mot manquant', color: '#00D4AA', bg: '#F0FFFA', count: FILL_QUESTIONS.length },
  { id: 'match' as const, label: 'Association',    icon: '🔗', desc: 'Reliez chaque mot anglais à sa traduction',    color: '#F5A623', bg: '#FFFBEB', count: MATCH_PAIRS.length    },
]

// ─── QCM Exercise ─────────────────────────────────────────────────────────────

function QCMExercise({
  questions,
  onFinish,
}: {
  questions: QCMQuestion[]
  onFinish: (score: number, xp: number) => void
}) {
  const [index, setIndex]           = useState(0)
  const [selected, setSelected]     = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [score, setScore]           = useState(0)
  const [xpTotal, setXpTotal]       = useState(0)

  const q = questions[index]

  const handleSelect = useCallback((optionIndex: number) => {
    if (answerState !== 'idle') return
    setSelected(optionIndex)
    const isCorrect = optionIndex === q.correct
    setAnswerState(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore((s) => s + 1)
      setXpTotal((x) => x + q.xp)
    }
  }, [answerState, q])

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      onFinish(score + (answerState === 'correct' ? 0 : 0), xpTotal)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setAnswerState('idle')
    }
  }

  const progress = ((index) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-brand-navy"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
          {index + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          {/* Question */}
          <div className="rounded-3xl bg-brand-dark text-white p-8 mb-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                🎯 QCM
              </span>
              <span className="text-xs text-white/40 font-medium">+{q.xp} XP</span>
            </div>
            <p className="text-xl font-black leading-snug">{q.question}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect  = i === q.correct
              const revealed   = answerState !== 'idle'

              return (
                <motion.button
                  key={i}
                  className={cn(
                    'rounded-2xl p-4 text-left text-sm font-bold border-2 transition-all duration-200',
                    !revealed && 'bg-white border-gray-100 hover:border-brand-navy hover:text-brand-navy hover:shadow-card',
                    revealed && isCorrect  && 'bg-green-50 border-green-400 text-green-700',
                    revealed && isSelected && !isCorrect && 'bg-red-50 border-red-400 text-red-700',
                    revealed && !isSelected && !isCorrect && 'bg-gray-50 border-gray-100 text-gray-400',
                  )}
                  onClick={() => handleSelect(i)}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                >
                  <span className="mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {revealed && isCorrect   && <span className="float-right">✓</span>}
                  {revealed && isSelected  && !isCorrect && <span className="float-right">✗</span>}
                </motion.button>
              )
            })}
          </div>

          {/* Explanation + Next */}
          <AnimatePresence>
            {answerState !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={cn(
                  'rounded-2xl p-4 text-sm font-medium',
                  answerState === 'correct' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200',
                )}>
                  <span className="font-black mr-2">{answerState === 'correct' ? '🎉 Correct !' : '❌ Incorrect.'}</span>
                  {q.explanation}
                </div>
                <button
                  className="w-full py-4 rounded-2xl font-black bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors text-sm"
                  onClick={handleNext}
                >
                  {index + 1 >= questions.length ? 'Voir les résultats 🏆' : 'Question suivante →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Fill Exercise ─────────────────────────────────────────────────────────────

function FillExercise({
  questions,
  onFinish,
}: {
  questions: FillQuestion[]
  onFinish: (score: number, xp: number) => void
}) {
  const [index, setIndex]           = useState(0)
  const [selected, setSelected]     = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [score, setScore]           = useState(0)
  const [xpTotal, setXpTotal]       = useState(0)

  const q = questions[index]

  const handleSelect = (opt: string) => {
    if (answerState !== 'idle') return
    setSelected(opt)
    const isCorrect = opt === q.answer
    setAnswerState(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore((s) => s + 1)
      setXpTotal((x) => x + q.xp)
    }
  }

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      onFinish(score, xpTotal)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setAnswerState('idle')
    }
  }

  const progress = (index / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-green-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
          {index + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          {/* Sentence */}
          <div className="rounded-3xl bg-brand-dark text-white p-8 mb-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300">
                ✏️ Lacunaire
              </span>
              <span className="text-xs text-white/40 font-medium">+{q.xp} XP</span>
            </div>
            <p className="text-lg font-medium leading-relaxed">
              {q.before}{' '}
              <span className={cn(
                'inline-block font-black px-3 py-1 rounded-xl border-2 transition-colors',
                answerState === 'idle'    && 'border-white/30 text-white/30 bg-white/5 min-w-[80px] text-center',
                answerState === 'correct' && 'border-green-400 text-green-400 bg-green-400/10',
                answerState === 'wrong'   && 'border-red-400 text-red-400 bg-red-400/10',
              )}>
                {answerState === 'idle' ? '___' : selected}
              </span>{' '}
              {q.after}
            </p>
            <p className="text-xs text-white/40 font-medium mt-4">💡 Indice : {q.hint}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {q.options.map((opt) => {
              const isSelected = selected === opt
              const isCorrect  = opt === q.answer
              const revealed   = answerState !== 'idle'

              return (
                <motion.button
                  key={opt}
                  className={cn(
                    'rounded-2xl p-4 text-sm font-bold border-2 transition-all duration-200',
                    !revealed && 'bg-white border-gray-100 hover:border-teal-400 hover:text-teal-600 hover:shadow-card',
                    revealed && isCorrect  && 'bg-green-50 border-green-400 text-green-700',
                    revealed && isSelected && !isCorrect && 'bg-red-50 border-red-400 text-red-700',
                    revealed && !isSelected && !isCorrect && 'bg-gray-50 border-gray-100 text-gray-400',
                  )}
                  onClick={() => handleSelect(opt)}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                >
                  {opt}
                  {revealed && isCorrect   && <span className="ml-2">✓</span>}
                  {revealed && isSelected  && !isCorrect && <span className="ml-2">✗</span>}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {answerState !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={cn(
                  'rounded-2xl p-4 text-sm font-medium mb-4',
                  answerState === 'correct' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200',
                )}>
                  <span className="font-black mr-2">{answerState === 'correct' ? '🎉 Parfait !' : `❌ La bonne réponse était "${q.answer}".`}</span>
                </div>
                <button
                  className="w-full py-4 rounded-2xl font-black bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors text-sm"
                  onClick={handleNext}
                >
                  {index + 1 >= questions.length ? 'Voir les résultats 🏆' : 'Suivant →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Match Exercise ───────────────────────────────────────────────────────────

function MatchExercise({
  pairs,
  onFinish,
}: {
  pairs: MatchPair[]
  onFinish: (score: number, xp: number) => void
}) {
  const [selectedEn, setSelectedEn]   = useState<number | null>(null)
  const [selectedFr, setSelectedFr]   = useState<number | null>(null)
  const [matched, setMatched]         = useState<Set<number>>(new Set())
  const [wrong, setWrong]             = useState<Set<number>>(new Set())
  const [xpTotal, setXpTotal]         = useState(0)

  const shuffledFr = pairs // keep stable order for deterministic layout

  const handleEnClick = (id: number) => {
    if (matched.has(id)) return
    setSelectedEn(id)
    setSelectedFr(null)
  }

  const handleFrClick = (id: number) => {
    if (matched.has(id)) return
    if (selectedEn === null) return
    if (selectedEn === id) {
      // correct
      const newMatched = new Set(matched).add(id)
      setMatched(newMatched)
      setXpTotal((x) => x + 10)
      setSelectedEn(null)
      setSelectedFr(null)
      if (newMatched.size === pairs.length) {
        setTimeout(() => onFinish(pairs.length, xpTotal + 10), 500)
      }
    } else {
      // wrong — flash red briefly
      setSelectedFr(id)
      setWrong(new Set([selectedEn, id]))
      setTimeout(() => {
        setSelectedEn(null)
        setSelectedFr(null)
        setWrong(new Set())
      }, 700)
    }
  }

  const progress = (matched.size / pairs.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
          {matched.size} / {pairs.length} paires
        </span>
      </div>

      <div className="rounded-3xl bg-brand-dark text-white p-6 mb-6 shadow-card">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 mb-3 inline-block">🔗 Association</span>
        <p className="text-base font-bold text-white/80">Cliquez sur un mot anglais, puis sur sa traduction française.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* English column */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">🇬🇧 Anglais</p>
          {pairs.map((p) => (
            <motion.button
              key={p.id}
              className={cn(
                'w-full py-3.5 px-4 rounded-2xl text-sm font-bold border-2 transition-all duration-200',
                matched.has(p.id)    && 'bg-green-50 border-green-300 text-green-700',
                !matched.has(p.id) && selectedEn === p.id && !wrong.has(p.id) && 'bg-brand-navy border-brand-navy text-white scale-105 shadow-card',
                !matched.has(p.id) && wrong.has(p.id)   && 'bg-red-50 border-red-300 text-red-600',
                !matched.has(p.id) && selectedEn !== p.id && !wrong.has(p.id) && 'bg-white border-gray-100 hover:border-brand-navy hover:text-brand-navy',
              )}
              onClick={() => handleEnClick(p.id)}
              whileTap={{ scale: 0.97 }}
            >
              {matched.has(p.id) && '✓ '}{p.en}
            </motion.button>
          ))}
        </div>

        {/* French column — shuffled visually */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">🇫🇷 Français</p>
          {[...shuffledFr].reverse().map((p) => (
            <motion.button
              key={p.id}
              className={cn(
                'w-full py-3.5 px-4 rounded-2xl text-sm font-bold border-2 transition-all duration-200',
                matched.has(p.id)    && 'bg-green-50 border-green-300 text-green-700',
                !matched.has(p.id) && selectedFr === p.id && wrong.has(p.id) && 'bg-red-50 border-red-300 text-red-600',
                !matched.has(p.id) && !wrong.has(p.id) && 'bg-white border-gray-100 hover:border-amber-400 hover:text-amber-600',
              )}
              onClick={() => handleFrClick(p.id)}
              whileTap={{ scale: 0.97 }}
            >
              {matched.has(p.id) && '✓ '}{p.fr}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Results Screen ───────────────────────────────────────────────────────────

function ResultsScreen({
  score, total, xp, mode, onRetry, onBack,
}: {
  score: number; total: number; xp: number; mode: ModeId
  onRetry: () => void; onBack: () => void
}) {
  const pct = Math.round((score / total) * 100)
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'
  const msg   = pct >= 80 ? 'Excellent travail !' : pct >= 50 ? 'Bon effort !' : 'Continuez à pratiquer !'

  return (
    <motion.div
      className="max-w-lg mx-auto text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-7xl mb-5">{emoji}</div>
      <h2 className="text-3xl font-black text-brand-dark mb-2">{msg}</h2>
      <p className="text-gray-400 font-medium mb-8">Score : {score} / {total} bonnes réponses ({pct}%)</p>

      <div className="rounded-3xl bg-brand-dark text-white p-8 mb-6 shadow-card">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-1">Score</p>
            <p className="text-4xl font-black text-brand-azure">{pct}%</p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-1">XP gagnés</p>
            <p className="text-4xl font-black text-amber-400">+{xp}</p>
          </div>
        </div>
        {/* Score bar */}
        <div className="mt-6 h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={cn('h-full rounded-full', pct >= 80 ? 'bg-green-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400')}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl font-bold border-2 border-brand-navy text-brand-navy hover:bg-brand-azure transition-colors text-sm"
        >
          ← Changer de mode
        </button>
        <button
          onClick={onRetry}
          className="flex-1 py-4 rounded-2xl font-bold bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors text-sm"
        >
          🔄 Réessayer
        </button>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PracticePage() {
  const [mode, setMode]       = useState<Mode>('select')
  const [score, setScore]     = useState(0)
  const [xp, setXp]           = useState(0)
  const [activeMode, setActiveMode] = useState<ModeId>('qcm')

  const handleFinish = (s: number, x: number) => {
    setScore(s)
    setXp(x)
    setMode('result')
  }

  const handleStart = (id: ModeId) => {
    setActiveMode(id)
    setMode(id)
  }

  const handleRetry = () => {
    setMode(activeMode)
    setScore(0)
    setXp(0)
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-dark mb-2">Mode Pratique 🎯</h1>
        <p className="text-gray-400 font-medium">
          Entraînez-vous avec des exercices interactifs et gagnez des XP
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Mode selection ── */}
        {mode === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Exercices totaux',     value: QCM_QUESTIONS.length + FILL_QUESTIONS.length + MATCH_PAIRS.length, icon: '📝', bg: '#E8F4FF', color: '#0070CC' },
                { label: 'Modes disponibles',    value: MODES_CONFIG.length, icon: '🎮', bg: '#F5F0FF', color: '#A259FF' },
                { label: 'XP max. disponibles',  value: [...QCM_QUESTIONS, ...FILL_QUESTIONS].reduce((a, q) => a + q.xp, 0) + MATCH_PAIRS.length * 10, icon: '⭐', bg: '#FFF8E1', color: '#F59E0B' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="rounded-3xl bg-white border border-gray-100 p-5 shadow-card text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-11 h-11 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl" style={{ backgroundColor: s.bg }}>
                    {s.icon}
                  </div>
                  <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-xl font-black text-brand-dark mb-5">Choisissez un mode</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {MODES_CONFIG.map((m, i) => (
                <motion.button
                  key={m.id}
                  className="rounded-3xl bg-white border-2 border-gray-100 p-6 text-left hover:border-gray-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => handleStart(m.id)}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: m.bg }}
                  >
                    {m.icon}
                  </div>
                  <h3 className="text-lg font-black text-brand-dark mb-1.5" style={{ color: m.color }}>
                    {m.label}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">{m.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">{m.count} exercices</span>
                    <span className="text-xs font-black text-white px-3 py-1.5 rounded-xl" style={{ backgroundColor: m.color }}>
                      Commencer →
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Tips */}
            <motion.div
              className="mt-8 rounded-3xl bg-brand-azure border border-brand-navy/10 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-black text-brand-dark mb-3">💡 Conseils pour progresser</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: '🎯', tip: 'Faites un mode QCM chaque jour pour ancrer le vocabulaire.' },
                  { icon: '✏️', tip: 'Le lacunaire améliore votre mémoire contextuelle.' },
                  { icon: '🔗', tip: "L'association renforce les connexions cerveau → mot." },
                ].map((t) => (
                  <div key={t.tip} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{t.icon}</span>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{t.tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── QCM ── */}
        {mode === 'qcm' && (
          <motion.div key="qcm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setMode('select')} className="text-sm font-bold text-gray-400 hover:text-brand-navy flex items-center gap-1">
                ← Retour
              </button>
              <h2 className="text-xl font-black text-brand-dark">QCM 🎯</h2>
            </div>
            <QCMExercise
              key={`qcm-${Date.now()}`}
              questions={QCM_QUESTIONS}
              onFinish={(s, x) => { handleFinish(s, x) }}
            />
          </motion.div>
        )}

        {/* ── Fill ── */}
        {mode === 'fill' && (
          <motion.div key="fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setMode('select')} className="text-sm font-bold text-gray-400 hover:text-brand-navy flex items-center gap-1">
                ← Retour
              </button>
              <h2 className="text-xl font-black text-brand-dark">Lacunaire ✏️</h2>
            </div>
            <FillExercise
              key={`fill-${Date.now()}`}
              questions={FILL_QUESTIONS}
              onFinish={handleFinish}
            />
          </motion.div>
        )}

        {/* ── Match ── */}
        {mode === 'match' && (
          <motion.div key="match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setMode('select')} className="text-sm font-bold text-gray-400 hover:text-brand-navy flex items-center gap-1">
                ← Retour
              </button>
              <h2 className="text-xl font-black text-brand-dark">Association 🔗</h2>
            </div>
            <MatchExercise
              key={`match-${Date.now()}`}
              pairs={MATCH_PAIRS}
              onFinish={handleFinish}
            />
          </motion.div>
        )}

        {/* ── Results ── */}
        {mode === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen
              score={score}
              total={activeMode === 'qcm' ? QCM_QUESTIONS.length : activeMode === 'fill' ? FILL_QUESTIONS.length : MATCH_PAIRS.length}
              xp={xp}
              mode={activeMode}
              onRetry={handleRetry}
              onBack={() => setMode('select')}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
