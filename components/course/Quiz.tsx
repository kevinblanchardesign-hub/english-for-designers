'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizProps {
  questions: Question[]
  onComplete?: (score: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const current = questions[currentIndex]

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === current.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
      const finalScore = Math.round(((score + (selectedAnswer === current.correct ? 1 : 0)) / questions.length) * 100)
      onComplete?.(finalScore)
    }
  }

  if (isComplete) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div className="text-center p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📖'}</div>
        <h3 className="text-2xl font-black text-brand-dark mb-2">Quiz terminé !</h3>
        <div className="text-5xl font-black text-brand-navy mb-2">{pct}%</div>
        <p className="text-gray-400 text-sm font-medium mb-6">
          {score}/{questions.length} bonnes réponses
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setScore(0)
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
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors duration-300',
              i < currentIndex ? 'bg-brand-success' : i === currentIndex ? 'bg-brand-navy' : 'bg-gray-100',
            )}
          />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-brand-navy font-bold uppercase tracking-widest mb-3">
            Question {currentIndex + 1}/{questions.length}
          </p>
          <h2 className="text-xl font-black text-brand-dark mb-6 leading-tight">{current.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {current.options.map((option, i) => {
              const isSelected = selectedAnswer === i
              const isCorrect = i === current.correct
              const showResult = selectedAnswer !== null

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200',
                    !showResult && 'border-gray-100 bg-white hover:border-brand-navy hover:bg-brand-azure/30',
                    showResult && isCorrect && 'border-brand-success bg-green-50 text-green-700',
                    showResult && isSelected && !isCorrect && 'border-brand-error bg-red-50 text-red-700',
                    showResult && !isSelected && !isCorrect && 'border-gray-100 bg-white text-gray-400',
                  )}
                  whileHover={!selectedAnswer ? { scale: 1.01 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.99 } : {}}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0',
                      !showResult && 'bg-gray-100 text-gray-500',
                      showResult && isCorrect && 'bg-brand-success text-white',
                      showResult && isSelected && !isCorrect && 'bg-brand-error text-white',
                      showResult && !isSelected && !isCorrect && 'bg-gray-100 text-gray-300',
                    )}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="p-4 rounded-2xl bg-brand-azure border border-brand-navy/15 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-bold text-brand-navy mb-1">💡 Explication</p>
                <p className="text-sm text-gray-600 font-medium">{current.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors"
            >
              {currentIndex < questions.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
