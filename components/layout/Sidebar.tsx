'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getRank, getProgressToNextRank } from '@/lib/xp'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: '/courses',
    label: 'Mes cours',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: '/leaderboard',
    label: 'Classement',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'Profil',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const xp = session?.user?.xp ?? 0
  const rank = getRank(xp)
  const progress = getProgressToNextRank(xp)

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-30 shadow-sm">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
            <span className="text-white text-xs font-black">E</span>
          </div>
          <span className="font-black text-brand-dark text-sm leading-tight">
            English For<br />
            <span className="text-brand-navy">Designers</span>
          </span>
        </Link>
      </div>

      {/* XP + Rank card */}
      {session && (
        <div className="p-4 mx-3 mt-4 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light text-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-white/70 font-medium">Niveau</p>
              <p className="font-bold text-sm">{rank.icon} {rank.title}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70 font-medium">XP</p>
              <p className="font-bold text-sm">{xp.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-white/50 mt-1">{progress}% vers le niveau suivant</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 mt-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 transition-all duration-200',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-brand-azure text-brand-navy shadow-inner-brand'
                : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50',
            )}
          >
            <span className={cn(pathname === item.href ? 'text-brand-navy' : 'text-gray-400')}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Streak widget */}
      {session && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-sm font-bold text-brand-dark">{session.user.streak} jours</p>
              <p className="text-xs text-gray-400">Streak actuel</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
