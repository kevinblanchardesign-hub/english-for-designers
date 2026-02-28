'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  sublabel?: string
  icon: string
  color?: string
  bgColor?: string
  trend?: { value: number; label: string }
  className?: string
}

export function StatsCard({ title, value, sublabel, icon, color = '#26538D', bgColor = '#F0FFFF', trend, className }: StatsCardProps) {
  return (
    <motion.div
      className={cn('rounded-3xl bg-white border border-gray-100 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        {trend && (
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', trend.value >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-brand-dark mb-1">{value}</p>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
      {trend && <p className="text-xs text-gray-400 mt-1">{trend.label}</p>}
    </motion.div>
  )
}
