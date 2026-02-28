import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium'
type LevelVariant = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
  level?: LevelVariant
  size?: 'sm' | 'md'
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-gray-100 text-gray-600 border border-gray-200',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  premium: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 shadow-sm',
}

const levelClasses: Record<LevelVariant, string> = {
  A1: 'level-a1 border',
  A2: 'level-a2 border',
  B1: 'level-b1 border',
  B2: 'level-b2 border',
  C1: 'level-c1 border',
  C2: 'level-c2 border',
}

export function Badge({ className, variant = 'default', level, size = 'sm', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        level ? levelClasses[level] : variantClasses[variant],
        className,
      )}
      {...props}
    >
      {level && !children ? level : children}
    </span>
  )
}

export default Badge
