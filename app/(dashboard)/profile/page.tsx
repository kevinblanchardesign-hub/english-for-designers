import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getRank, getProgressToNextRank } from '@/lib/xp'
import { BadgeGallery } from '@/components/dashboard/BadgeGallery'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Profil' }

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: { include: { course: true } },
      badges: { include: { badge: true } },
    },
  })

  if (!user) redirect('/login')

  const allBadges = await prisma.badge.findMany()
  const earnedBadgeIds = new Set(user.badges.map((ub) => ub.badgeId))
  const badgesWithStatus = allBadges.map((badge) => ({
    ...badge,
    earned: earnedBadgeIds.has(badge.id),
    earnedAt: user.badges.find((ub) => ub.badgeId === badge.id)?.earnedAt,
  }))

  const rank = getRank(user.xp)
  const progressToNext = getProgressToNextRank(user.xp)
  const completedCourses = user.progress.filter((p) => p.completed)

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black text-brand-dark mb-8">Mon profil</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="rounded-3xl bg-brand-dark text-white p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-navy to-blue-400 flex items-center justify-center text-3xl font-black text-white mb-4 shadow-glow">
            {user.name?.[0] ?? '?'}
          </div>
          <h2 className="text-xl font-black mb-1">{user.name ?? 'Designer'}</h2>
          <p className="text-white/50 text-sm font-medium mb-4">{user.email}</p>
          <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
            {rank.icon} {rank.title}
          </div>
          <div className="mt-6 w-full">
            <div className="flex justify-between text-xs text-white/50 mb-1.5">
              <span>Progression vers le prochain rang</span>
              <span>{progressToNext}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-brand-azure"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>

          {user.isPremium && (
            <div className="mt-5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 text-sm font-black w-full text-center">
              ⭐ Premium actif
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-card p-6">
            <h3 className="text-lg font-black text-brand-dark mb-5">Statistiques</h3>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-3xl font-black text-brand-dark">{user.xp.toLocaleString('fr-FR')}</p>
                <p className="text-sm text-gray-400 font-medium">XP total</p>
              </div>
              <div>
                <p className="text-3xl font-black text-brand-dark">{completedCourses.length}</p>
                <p className="text-sm text-gray-400 font-medium">Cours complétés</p>
              </div>
              <div>
                <p className="text-3xl font-black text-orange-500">🔥 {user.streak}</p>
                <p className="text-sm text-gray-400 font-medium">Jours de streak</p>
              </div>
              <div>
                <p className="text-3xl font-black text-brand-dark">{user.level}</p>
                <p className="text-sm text-gray-400 font-medium">Niveau CECRL</p>
              </div>
            </div>
          </div>

          {/* Completed courses */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-card p-6">
            <h3 className="text-lg font-black text-brand-dark mb-4">Cours terminés</h3>
            {completedCourses.length > 0 ? (
              <div className="space-y-2">
                {completedCourses.map((progress) => (
                  <div key={progress.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-brand-dark">{progress.course.title}</p>
                      <p className="text-xs text-gray-400">{progress.course.level} · {progress.xpEarned} XP gagnés</p>
                    </div>
                    <span className="text-brand-success font-bold text-sm">✓</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 font-medium">Aucun cours complété pour l'instant.</p>
            )}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <BadgeGallery badges={badgesWithStatus} />
      </div>
    </div>
  )
}
