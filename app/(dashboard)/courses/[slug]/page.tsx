'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LessonPlayer } from '@/components/course/LessonPlayer'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import type { Course, Lesson } from '@prisma/client'

type CourseWithLessons = Course & { lessons: Lesson[] }

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [course, setCourse] = useState<CourseWithLessons | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses?slug=${params.slug}`)
        if (!res.ok) { router.push('/courses'); return }
        const data = await res.json() as CourseWithLessons
        setCourse(data)
      } catch {
        router.push('/courses')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourse()
  }, [params.slug, router])

  const handleLessonComplete = async (score: number) => {
    if (!course || !session) return

    const isLastLesson = currentLessonIndex === course.lessons.length - 1

    if (isLastLesson) {
      // Mark course as complete
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, score }),
      })
      if (res.ok) {
        const data = await res.json() as { xpEarned: number }
        setXpEarned(data.xpEarned)
        setIsComplete(true)
      }
    } else {
      setCurrentLessonIndex((i) => i + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-3 border-brand-navy border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Chargement du cours...</p>
        </div>
      </div>
    )
  }

  if (!course) return null

  const lessons = course.lessons.sort((a, b) => a.order - b.order)
  const progress = ((currentLessonIndex) / lessons.length) * 100

  if (isComplete) {
    return (
      <motion.div
        className="max-w-lg mx-auto text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-7xl mb-5">🎉</div>
        <h1 className="text-3xl font-black text-brand-dark mb-2">Cours terminé !</h1>
        <p className="text-gray-400 font-medium mb-6">{course.title}</p>
        <div className="p-6 rounded-3xl bg-brand-dark text-white mb-6 shadow-brand-lg">
          <p className="text-white/60 text-sm font-medium mb-1">XP gagnés</p>
          <div className="text-6xl font-black text-brand-azure">+{xpEarned}</div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/courses"
            className="flex-1 py-4 rounded-2xl font-bold border-2 border-brand-navy text-brand-navy hover:bg-brand-azure transition-colors"
          >
            Tous les cours
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 py-4 rounded-2xl font-bold bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors"
          >
            Dashboard →
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl">
      {/* Course header */}
      <div className="mb-8">
        <Link href="/courses" className="text-sm text-gray-400 hover:text-brand-navy font-medium mb-4 flex items-center gap-1">
          ← Retour aux cours
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-brand-dark mb-1">{course.title}</h1>
            <div className="flex items-center gap-2">
              <Badge level={course.level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'} />
              {course.isPremium && <Badge variant="premium">⭐ Premium</Badge>}
              <span className="text-xs text-gray-400 font-medium">
                Leçon {currentLessonIndex + 1}/{lessons.length}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400 font-medium">+{course.xpReward} XP</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar value={progress} className="mb-8" size="sm" />

      {/* Paywall check */}
      {course.isPremium && !session?.user.isPremium ? (
        <div className="rounded-3xl bg-brand-dark text-white p-10 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-black mb-2">Contenu Premium</h2>
          <p className="text-white/60 font-medium mb-6">
            Débloquez tous les cours avec un abonnement Premium.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 rounded-2xl bg-white text-brand-dark font-bold hover:bg-brand-azure transition-colors"
          >
            Passer Premium →
          </Link>
        </div>
      ) : (
        /* Lesson content */
        <div className="rounded-3xl bg-white border border-gray-100 shadow-card p-8">
          {lessons[currentLessonIndex] && (
            <LessonPlayer
              lesson={lessons[currentLessonIndex]}
              onComplete={handleLessonComplete}
              isLast={currentLessonIndex === lessons.length - 1}
            />
          )}
        </div>
      )}

      {/* Lesson nav */}
      <div className="flex gap-2 mt-6">
        {lessons.map((lesson, i) => (
          <button
            key={lesson.id}
            onClick={() => i < currentLessonIndex && setCurrentLessonIndex(i)}
            className={`h-2 flex-1 rounded-full transition-all ${
              i < currentLessonIndex ? 'bg-brand-success' :
              i === currentLessonIndex ? 'bg-brand-navy' : 'bg-gray-100'
            }`}
            aria-label={`Leçon ${i + 1}: ${lesson.title}`}
          />
        ))}
      </div>
    </div>
  )
}
