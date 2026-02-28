'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SimulationDialogProps {
  scenario: string
  prompt?: string
  briefText?: string
  questions?: { question: string; answer: string }[]
  sampleResponse?: string
  tips?: string[]
  onComplete?: (score: number) => void
}

export function SimulationDialog({
  scenario,
  prompt,
  briefText,
  questions,
  sampleResponse,
  tips,
  onComplete,
}: SimulationDialogProps) {
  const [userResponse, setUserResponse] = useState('')
  const [step, setStep] = useState<'brief' | 'write' | 'review'>('brief')
  const [score, setScore] = useState<number | null>(null)

  const handleSubmit = () => {
    // Simple scoring based on response length and quality
    const wordCount = userResponse.trim().split(/\s+/).length
    const baseScore = Math.min(100, Math.max(40, wordCount * 3))
    setScore(baseScore)
    setStep('review')
    onComplete?.(baseScore)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Scenario badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🎭</span>
        <div>
          <p className="text-xs text-brand-navy font-bold uppercase tracking-wide">Simulation</p>
          <p className="font-black text-brand-dark">{scenario}</p>
        </div>
      </div>

      {/* Step: Brief */}
      {step === 'brief' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {briefText && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-5">
              <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide">📋 Brief reçu</p>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{briefText}</p>
            </div>
          )}

          {questions && (
            <div className="space-y-3 mb-5">
              <p className="text-sm font-bold text-brand-dark">Répondez à ces questions :</p>
              {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="text-sm font-semibold text-brand-dark mb-2">{q.question}</p>
                  <p className="text-sm text-brand-navy font-medium">→ {q.answer}</p>
                </div>
              ))}
            </div>
          )}

          {tips && (
            <div className="p-4 rounded-xl bg-brand-azure border border-brand-navy/15 mb-5">
              <p className="text-xs font-bold text-brand-navy mb-2">💡 Conseils</p>
              <ul className="space-y-1">
                {tips.map((tip, i) => (
                  <li key={i} className="text-xs text-gray-600 font-medium flex gap-2">
                    <span className="text-brand-navy">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prompt && (
            <button
              onClick={() => setStep('write')}
              className="w-full py-4 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors"
            >
              Commencer l'exercice →
            </button>
          )}

          {!prompt && (
            <button
              onClick={() => onComplete?.(80)}
              className="w-full py-4 rounded-2xl bg-brand-success text-white font-bold hover:opacity-90 transition-opacity"
            >
              Continuer ✓
            </button>
          )}
        </motion.div>
      )}

      {/* Step: Write */}
      {step === 'write' && prompt && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="p-4 rounded-xl bg-brand-azure border border-brand-navy/15 mb-4">
            <p className="text-sm font-semibold text-brand-dark">{prompt}</p>
          </div>
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Écrivez votre réponse ici..."
            rows={8}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-brand-navy focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300 mb-4 resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={userResponse.trim().length < 20}
            className="w-full py-4 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Soumettre ma réponse
          </button>
        </motion.div>
      )}

      {/* Step: Review */}
      {step === 'review' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {score !== null && (
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-brand-navy mb-1">{score}%</div>
              <p className="text-sm text-gray-400">Score estimé</p>
            </div>
          )}

          {userResponse && (
            <div className="mb-5">
              <p className="text-sm font-bold text-brand-dark mb-2">Votre réponse :</p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 font-medium whitespace-pre-wrap leading-relaxed">
                {userResponse}
              </div>
            </div>
          )}

          {sampleResponse && (
            <div className="mb-5">
              <p className="text-sm font-bold text-brand-success mb-2">✓ Réponse de référence :</p>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">
                {sampleResponse}
              </div>
            </div>
          )}

          <button
            onClick={() => onComplete?.(score ?? 80)}
            className="w-full py-4 rounded-2xl bg-brand-success text-white font-bold hover:opacity-90 transition-opacity"
          >
            Continuer →
          </button>
        </motion.div>
      )}
    </div>
  )
}
