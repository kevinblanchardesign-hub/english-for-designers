import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getRank } from '@/lib/xp'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Classement' }

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const topUsers = await prisma.user.findMany({
    orderBy: { xp: 'desc' },
    take: 20,
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
      streak: true,
      level: true,
      _count: { select: { progress: true } },
    },
  })

  const currentUserRank = topUsers.findIndex((u) => u.id === session.user.id) + 1

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-dark mb-2">Classement 🏆</h1>
        <p className="text-gray-400 font-medium">
          Top designers de la semaine · Mis à jour en temps réel
        </p>
      </div>

      {/* Podium top 3 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[topUsers[1], topUsers[0], topUsers[2]].map((user, podiumIndex) => {
          if (!user) return <div key={podiumIndex} />
          const positions = [2, 1, 3]
          const position = positions[podiumIndex]
          const rank = getRank(user.xp)
          const heights = ['h-24', 'h-32', 'h-20']
          const medals = ['🥈', '🥇', '🥉']

          return (
            <div key={user.id} className={`flex flex-col items-center gap-2 ${podiumIndex === 1 ? 'order-2' : podiumIndex === 0 ? 'order-1' : 'order-3'}`}>
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-navy to-blue-400 flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {user.name?.[0] ?? '?'}
                </div>
                <span className="absolute -top-2 -right-2 text-xl">{medals[podiumIndex]}</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-brand-dark">{user.name?.split(' ')[0]}</p>
                <p className="text-xs text-gray-400">{user.xp.toLocaleString('fr-FR')} XP</p>
                <p className="text-xs font-semibold text-brand-navy">{rank.icon} {rank.title}</p>
              </div>
              <div
                className={`w-full rounded-t-xl ${heights[podiumIndex]} flex items-end justify-center pb-2`}
                style={{
                  background: position === 1
                    ? 'linear-gradient(to top, #F59E0B, #FDE68A)'
                    : position === 2
                    ? 'linear-gradient(to top, #9CA3AF, #E5E7EB)'
                    : 'linear-gradient(to top, #CD7C2F, #F0A868)',
                }}
              >
                <span className="text-white font-black text-lg">#{position}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full leaderboard */}
      <div className="rounded-3xl bg-white border border-gray-100 shadow-card overflow-hidden">
        {topUsers.map((user, index) => {
          const rank = getRank(user.xp)
          const isCurrentUser = user.id === session.user.id

          return (
            <div
              key={user.id}
              className={`flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0 transition-colors ${isCurrentUser ? 'bg-brand-azure/40' : 'hover:bg-gray-50'}`}
            >
              {/* Position */}
              <span className={`w-8 text-center text-sm font-black ${index < 3 ? 'text-brand-navy' : 'text-gray-400'}`}>
                #{index + 1}
              </span>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-navy to-blue-400 flex items-center justify-center text-white font-black flex-shrink-0">
                {user.name?.[0] ?? '?'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-black ${isCurrentUser ? 'text-brand-navy' : 'text-brand-dark'}`}>
                  {user.name ?? 'Designer Anonyme'}
                  {isCurrentUser && <span className="ml-1.5 text-xs font-semibold">(vous)</span>}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {rank.icon} {rank.title} · Niveau {user.level}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-sm font-black text-brand-dark">{user.xp.toLocaleString('fr-FR')}</p>
                  <p className="text-xs text-gray-400">XP</p>
                </div>
                <div>
                  <p className="text-sm font-black text-orange-500">🔥{user.streak}</p>
                  <p className="text-xs text-gray-400">streak</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
