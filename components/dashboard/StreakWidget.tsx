'use client'

import { motion } from 'framer-motion'

interface StreakWidgetProps {
  streak: number
  lastActiveAt: Date
}

export function StreakWidget({ streak, lastActiveAt }: StreakWidgetProps) {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const today = new Date().getDay()
  // Show last 7 days with activity simulation
  const activeDays = Array.from({ length: 7 }, (_, i) => i < (streak % 7 || streak))

  return (
    <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-white/70 font-semibold uppercase tracking-wide mb-1">Streak actuel</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black">{streak}</span>
            <span className="text-lg font-bold text-white/70">jours</span>
          </div>
        </div>
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🔥
        </motion.span>
      </div>

      {/* Week grid */}
      <div className="flex gap-1.5">
        {days.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs ${
                activeDays[i]
                  ? 'bg-white text-orange-500 font-black'
                  : 'bg-white/20 text-white/50'
              }`}
            >
              {activeDays[i] ? '✓' : ''}
            </div>
            <span className="text-xs text-white/60 font-medium">{day}</span>
          </div>
        ))}
      </div>

      {streak === 0 && (
        <p className="mt-3 text-xs text-white/70 font-medium">
          Complétez un cours aujourd'hui pour démarrer votre streak !
        </p>
      )}
    </div>
  )
}
