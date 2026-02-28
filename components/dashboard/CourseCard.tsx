'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'
import type { Course } from '@prisma/client'

interface CourseCardProps {
  course: Course & { progress?: number; isEnrolled?: boolean }
  isPremiumUser: boolean
}

const themeColors: Record<string, string> = {
  vocabulary: '#E8F4FF',
  grammar: '#E8F5E9',
  simulation: '#FDF2F8',
  brief: '#FFF8E1',
}

const themeIcons: Record<string, string> = {
  vocabulary: '📚',
  grammar: '✍️',
  simulation: '🎤',
  brief: '📋',
}

export function CourseCard({ course, isPremiumUser }: CourseCardProps) {
  const isLocked = course.isPremium && !isPremiumUser
  const bgColor = themeColors[course.theme] ?? '#F5F5F5'
  const icon = themeIcons[course.theme] ?? '📖'
  const progress = course.progress ?? 0
  const levelKey = course.level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

  return (
    <motion.div
      className={cn(
        'group rounded-3xl bg-white border border-gray-100 overflow-hidden transition-all duration-300',
        !isLocked && 'hover:shadow-card-hover hover:-translate-y-1',
        isLocked && 'opacity-75',
      )}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Banner */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-5xl">{icon}</span>
        {isLocked && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🔒</span>
              <span className="text-xs font-bold text-brand-navy">Premium</span>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <Badge level={levelKey} />
          {course.isPremium && (
            <Badge variant="premium">⭐ Pro</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-black text-brand-dark text-base mb-1.5 group-hover:text-brand-navy transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-4">
          <span>⏱ {course.duration} min</span>
          <span>⭐ +{course.xpReward} XP</span>
        </div>

        {/* Progress bar */}
        {course.isEnrolled && progress > 0 && (
          <ProgressBar
            value={progress}
            max={100}
            label="Progression"
            sublabel={`${progress}%`}
            size="sm"
            className="mb-4"
          />
        )}

        {/* CTA */}
        {isLocked ? (
          <Link
            href="/pricing"
            className="block w-full py-3 rounded-2xl text-center text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:opacity-90 transition-opacity"
          >
            Débloquer avec Premium →
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="block w-full py-3 rounded-2xl text-center text-sm font-bold bg-brand-azure text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 border-2 border-brand-navy/10 hover:border-transparent"
          >
            {progress > 0 ? 'Continuer →' : 'Commencer →'}
          </Link>
        )}
      </div>
    </motion.div>
  )
}
