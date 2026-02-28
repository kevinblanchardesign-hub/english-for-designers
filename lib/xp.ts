import { prisma } from './prisma'

export type Rank = {
  title: string
  minXP: number
  maxXP: number
  color: string
  icon: string
}

export const RANKS: Rank[] = [
  { title: 'Intern', minXP: 0, maxXP: 499, color: '#9CA3AF', icon: '🎓' },
  { title: 'Junior Designer', minXP: 500, maxXP: 1999, color: '#2ECC71', icon: '✏️' },
  { title: 'Designer', minXP: 2000, maxXP: 4999, color: '#3B82F6', icon: '🎨' },
  { title: 'Senior Designer', minXP: 5000, maxXP: 9999, color: '#8B5CF6', icon: '⭐' },
  { title: 'Lead Designer', minXP: 10000, maxXP: 19999, color: '#F59E0B', icon: '🏆' },
  { title: 'Creative Director', minXP: 20000, maxXP: Infinity, color: '#26538D', icon: '👑' },
]

export function getRank(xp: number): Rank {
  return RANKS.findLast((rank) => xp >= rank.minXP) ?? RANKS[0]
}

export function getNextRank(xp: number): Rank | null {
  const currentRank = getRank(xp)
  const nextRank = RANKS.find((rank) => rank.minXP > currentRank.minXP)
  return nextRank ?? null
}

export function getProgressToNextRank(xp: number): number {
  const currentRank = getRank(xp)
  const nextRank = getNextRank(xp)

  if (!nextRank) return 100

  const rangeSize = nextRank.minXP - currentRank.minXP
  const progress = xp - currentRank.minXP
  return Math.min(Math.floor((progress / rangeSize) * 100), 100)
}

export async function addXP(
  userId: string,
  amount: number,
  reason: string,
): Promise<{ newXP: number; rank: Rank; rankUp: boolean }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true },
  })

  if (!user) throw new Error('User not found')

  const previousRank = getRank(user.xp)
  const newXP = user.xp + amount

  await prisma.user.update({
    where: { id: userId },
    data: { xp: newXP },
  })

  const newRank = getRank(newXP)
  const rankUp = newRank.title !== previousRank.title

  console.log(`XP added: +${amount} for ${userId} (${reason})`)
  return { newXP, rank: newRank, rankUp }
}

const BADGE_CHECKS: Record<string, (userId: string) => Promise<boolean>> = {
  complete_first_lesson: async (userId) => {
    const count = await prisma.progress.count({ where: { userId, completed: true } })
    return count >= 1
  },
  streak_7: async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { streak: true } })
    return (user?.streak ?? 0) >= 7
  },
  reach_level_B2: async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { level: true } })
    return ['B2', 'C1', 'C2'].includes(user?.level ?? '')
  },
  complete_10_brief_lessons: async (userId) => {
    const count = await prisma.progress.count({
      where: {
        userId,
        completed: true,
        course: { theme: 'brief' },
      },
    })
    return count >= 10
  },
  complete_module_pitch: async (userId) => {
    const progress = await prisma.progress.findFirst({
      where: { userId, completed: true, course: { slug: 'pitching-design-concept' } },
    })
    return progress !== null
  },
}

export async function checkBadges(userId: string): Promise<string[]> {
  const allBadges = await prisma.badge.findMany()
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  })
  const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId))
  const newlyEarned: string[] = []

  for (const badge of allBadges) {
    if (earnedBadgeIds.has(badge.id)) continue
    const checkFn = BADGE_CHECKS[badge.condition]
    if (!checkFn) continue

    const earned = await checkFn(userId)
    if (earned) {
      await prisma.userBadge.create({ data: { userId, badgeId: badge.id } })
      newlyEarned.push(badge.name)
    }
  }

  return newlyEarned
}

export async function updateStreak(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActiveAt: true, streak: true },
  })

  if (!user) throw new Error('User not found')

  const now = new Date()
  const lastActive = new Date(user.lastActiveAt)
  const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60)

  let newStreak = user.streak

  if (hoursSinceActive < 24) {
    // Same day, no change
  } else if (hoursSinceActive < 48) {
    // Consecutive day
    newStreak += 1
  } else {
    // Streak broken
    newStreak = 1
  }

  await prisma.user.update({
    where: { id: userId },
    data: { streak: newStreak, lastActiveAt: now },
  })

  return newStreak
}
