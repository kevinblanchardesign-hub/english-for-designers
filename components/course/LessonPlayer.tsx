'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flashcard } from './Flashcard'
import { Quiz } from './Quiz'
import { SimulationDialog } from './SimulationDialog'
import type { Lesson } from '@prisma/client'

interface LessonPlayerProps {
  lesson: Lesson
  onComplete: (score: number) => void
  isLast: boolean
}

export function LessonPlayer({ lesson, onComplete, isLast }: LessonPlayerProps) {
  const content = lesson.content as Record<string, unknown>

  const renderContent = () => {
    switch (lesson.type) {
      case 'flashcard':
        return (
          <Flashcard
            cards={content.cards as Parameters<typeof Flashcard>[0]['cards']}
            onComplete={onComplete}
          />
        )
      case 'quiz':
        return (
          <Quiz
            questions={content.questions as Parameters<typeof Quiz>[0]['questions']}
            onComplete={onComplete}
          />
        )
      case 'simulation':
        return (
          <SimulationDialog
            scenario={content.scenario as string}
            prompt={content.prompt as string | undefined}
            briefText={content.briefText as string | undefined}
            questions={content.questions as Parameters<typeof SimulationDialog>[0]['questions']}
            sampleResponse={content.sampleResponse as string | undefined}
            tips={content.tips as string[] | undefined}
            onComplete={onComplete}
          />
        )
      case 'video':
        return (
          <div className="text-center p-8">
            <div className="rounded-3xl bg-brand-dark aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Vidéo disponible en version Premium</p>
              </div>
            </div>
            {Array.isArray(content.keyPhrases) && (
              <div className="text-left">
                <h3 className="text-lg font-black text-brand-dark mb-3">Phrases clés</h3>
                <div className="space-y-2">
                  {(content.keyPhrases as string[]).map((phrase, i) => (
                    <div key={i} className="p-3 rounded-xl bg-brand-azure border border-brand-navy/15">
                      <p className="text-sm font-semibold text-brand-dark italic">{phrase}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => onComplete(90)}
              className="mt-6 w-full py-4 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors"
            >
              {isLast ? 'Terminer le cours ✓' : 'Leçon suivante →'}
            </button>
          </div>
        )
      default:
        return (
          <div className="text-center p-8">
            <p className="text-gray-400">Type de leçon non reconnu : {lesson.type}</p>
          </div>
        )
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            lesson.type === 'flashcard' ? 'bg-blue-50 text-blue-600' :
            lesson.type === 'quiz' ? 'bg-purple-50 text-purple-600' :
            lesson.type === 'simulation' ? 'bg-pink-50 text-pink-600' :
            'bg-gray-50 text-gray-600'
          }`}>
            {lesson.type === 'flashcard' && '🃏 Flashcards'}
            {lesson.type === 'quiz' && '📝 Quiz'}
            {lesson.type === 'simulation' && '🎭 Simulation'}
            {lesson.type === 'video' && '🎬 Vidéo'}
          </span>
        </div>
        <h2 className="text-xl font-black text-brand-dark">{lesson.title}</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
