import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { StreakWidget } from '@/components/dashboard/StreakWidget'
import { XPBar } from '@/components/dashboard/XPBar'
import { BadgeGallery } from '@/components/dashboard/BadgeGallery'
import { CourseCard } from '@/components/dashboard/CourseCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
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

  // In-progress courses
  const inProgressCourses = await prisma.course.findMany({
    where: {
      progress: { some: { userId: user.id, completed: false } },
    },
    take: 4,
  })

  const completedCount = user.progress.filter((p) => p.completed).length
  const totalXP = user.xp

  return (
    <div className="max-w-6xl">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-dark mb-1">
          Bonjour, {user.name?.split(' ')[0] ?? 'Designer'} 👋
        </h1>
        <p className="text-gray-400 font-medium">
          Voici votre progression du{' '}
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Cours complétés"
          value={completedCount}
          icon="📚"
          bgColor="#E8F4FF"
          sublabel="depuis le début"
        />
        <StatsCard
          title="XP accumulés"
          value={totalXP.toLocaleString('fr-FR')}
          icon="⭐"
          bgColor="#FFF8E1"
          sublabel="points d'expérience"
        />
        <StatsCard
          title="Niveau actuel"
          value={user.level}
          icon="🎯"
          bgColor="#E8F5E9"
          sublabel="progression CECRL"
        />
        <StatsCard
          title="Badges gagnés"
          value={earnedBadgeIds.size}
          icon="🏅"
          bgColor="#F5F3FF"
          sublabel={`sur ${allBadges.length} disponibles`}
        />
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column — courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP bar */}
          <XPBar xp={totalXP} />

          {/* In-progress courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-brand-dark">En cours</h2>
              <Link href="/courses" className="text-sm font-bold text-brand-navy hover:underline">
                Voir tous →
              </Link>
            </div>
            {inProgressCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {inProgressCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isPremiumUser={user.isPremium}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-white border border-gray-100 p-8 text-center">
                <span className="text-4xl mb-3 block">🚀</span>
                <h3 className="font-black text-brand-dark mb-2">Commencez votre premier cours !</h3>
                <p className="text-sm text-gray-400 mb-4">Explorez le catalogue et démarrez votre apprentissage.</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-bold hover:bg-brand-navy-dark transition-colors"
                >
                  Voir les cours →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right column — gamification */}
        <div className="space-y-4">
          <StreakWidget streak={user.streak} lastActiveAt={user.lastActiveAt} />
          <BadgeGallery badges={badgesWithStatus} />
        </div>
      </div>
    </div>
  )
}
