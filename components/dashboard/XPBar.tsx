'use client'

import { motion } from 'framer-motion'
import { getRank, getNextRank, getProgressToNextRank } from '@/lib/xp'

interface XPBarProps {
  xp: number
}

export function XPBar({ xp }: XPBarProps) {
  const rank = getRank(xp)
  const nextRank = getNextRank(xp)
  const progress = getProgressToNextRank(xp)
  const xpToNext = nextRank ? nextRank.minXP - xp : 0

  return (
    <div className="rounded-3xl bg-brand-dark text-white p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-white/50 font-semibold uppercase tracking-wide mb-1">Votre rang</p>
          <h3 className="text-xl font-black">
            {rank.icon} {rank.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/50 font-semibold uppercase tracking-wide mb-1">XP Total</p>
          <p className="text-2xl font-black">{xp.toLocaleString('fr-FR')}</p>
        </div>
      </div>

      {/* XP bar */}
      <div className="mb-2">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-brand-azure"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50 font-medium">{rank.title}</span>
        {nextRank ? (
          <span className="text-xs text-white/50 font-medium">
            {xpToNext.toLocaleString('fr-FR')} XP → {nextRank.icon} {nextRank.title}
          </span>
        ) : (
          <span className="text-xs text-amber-400 font-bold">🏆 Rang maximum atteint !</span>
        )}
      </div>
    </div>
  )
}
