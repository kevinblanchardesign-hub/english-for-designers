'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashcardData {
  front: string
  back: string
  example?: string
}

interface FlashcardProps {
  cards: FlashcardData[]
  onComplete?: (score: number) => void
}

export function Flashcard({ cards, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<('know' | 'review')[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const currentCard = cards[currentIndex]
  const progress = (currentIndex / cards.length) * 100

  const handleResult = (result: 'know' | 'review') => {
    const newResults = [...results, result]
    setResults(newResults)

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1)
      setIsFlipped(false)
    } else {
      setIsComplete(true)
      const score = Math.round((newResults.filter((r) => r === 'know').length / cards.length) * 100)
      onComplete?.(score)
    }
  }

  if (isComplete) {
    const score = Math.round((results.filter((r) => r === 'know').length / cards.length) * 100)
    return (
      <motion.div
        className="text-center p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl mb-4">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '📚'}</div>
        <h3 className="text-2xl font-black text-brand-dark mb-2">
          {score >= 80 ? 'Excellent !' : score >= 50 ? 'Bon travail !' : 'Continue à pratiquer !'}
        </h3>
        <p className="text-gray-500 mb-6">
          Tu as maîtrisé <strong>{results.filter((r) => r === 'know').length}</strong> sur{' '}
          <strong>{cards.length}</strong> cartes.
        </p>
        <div className="text-4xl font-black text-brand-navy mb-6">{score}%</div>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setIsFlipped(false)
            setResults([])
            setIsComplete(false)
          }}
          className="px-6 py-3 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors"
        >
          Recommencer
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-semibold text-gray-400 mb-2">
          <span>{currentIndex + 1} / {cards.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-navy rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className="relative h-64 cursor-pointer mb-8"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-azure to-white border border-brand-navy/15 shadow-card flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-xs text-brand-navy font-bold uppercase tracking-widest mb-4">
              Cliquez pour révéler
            </p>
            <h2 className="text-4xl font-black text-brand-dark">{currentCard.front}</h2>
            <p className="text-xs text-gray-400 mt-4 font-medium">Design vocabulary</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl bg-brand-dark border border-white/10 shadow-card flex flex-col items-center justify-center p-8 text-center text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-lg font-semibold leading-relaxed mb-4">{currentCard.back}</p>
            {currentCard.example && (
              <p className="text-sm text-white/50 italic border-t border-white/10 pt-3 mt-1">
                {currentCard.example}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Actions — only show after flip */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => handleResult('review')}
              className="flex-1 py-4 rounded-2xl bg-red-50 text-brand-error font-bold text-sm border-2 border-red-100 hover:bg-red-100 transition-colors"
            >
              À revoir 🔄
            </button>
            <button
              onClick={() => handleResult('know')}
              className="flex-1 py-4 rounded-2xl bg-green-50 text-brand-success font-bold text-sm border-2 border-green-100 hover:bg-green-100 transition-colors"
            >
              Compris ! ✓
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFlipped && (
        <p className="text-center text-sm text-gray-400 font-medium">
          Cliquez sur la carte pour voir la définition
        </p>
      )}
    </div>
  )
}
