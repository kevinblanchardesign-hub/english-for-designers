'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  sublabel?: string
  color?: 'navy' | 'success' | 'warning' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const colorClasses = {
  navy: 'bg-brand-navy',
  success: 'bg-brand-success',
  warning: 'bg-amber-400',
  gradient: 'bg-gradient-to-r from-brand-navy to-blue-400',
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  sublabel,
  color = 'navy',
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {(label || sublabel) && (
        <div className="flex justify-between items-baseline mb-1.5">
          {label && <span className="text-sm font-semibold text-brand-dark">{label}</span>}
          {sublabel && <span className="text-xs text-gray-400">{sublabel}</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-gray-100 overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', colorClasses[color])}
          initial={animated ? { width: 0 } : { width: `${percent}%` }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
