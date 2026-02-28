'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Badge, UserBadge } from '@prisma/client'

interface BadgeGalleryProps {
  badges: (Badge & { earned: boolean; earnedAt?: Date })[]
}

const rarityStyles: Record<string, string> = {
  common: 'bg-gray-50 border-gray-200',
  uncommon: 'bg-green-50 border-green-200',
  rare: 'bg-blue-50 border-blue-200',
  epic: 'bg-purple-50 border-purple-200',
  legendary: 'bg-amber-50 border-amber-200',
}

export function BadgeGallery({ badges }: BadgeGalleryProps) {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-card">
      <h2 className="text-lg font-black text-brand-dark mb-1">Badges</h2>
      <p className="text-sm text-gray-400 font-medium mb-5">
        {badges.filter((b) => b.earned).length}/{badges.length} débloqués
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-2xl border-2 text-center transition-all',
              badge.earned ? rarityStyles[badge.rarity] : 'bg-gray-50 border-gray-100 opacity-40 grayscale',
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: badge.earned ? 1 : 0.4, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            title={badge.description}
          >
            <span className="text-3xl">{badge.icon}</span>
            <span className="text-xs font-bold text-brand-dark leading-tight">{badge.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
