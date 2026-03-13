import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { addXP, checkBadges, updateStreak } from '@/lib/xp'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { courseId, score } = await req.json() as { courseId: string; score?: number }

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

    // Upsert progress
    const progress = await prisma.progress.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      update: {
        completed: true,
        score,
        xpEarned: course.xpReward,
        completedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        courseId,
        completed: true,
        score,
        xpEarned: course.xpReward,
        completedAt: new Date(),
      },
    })

    // Add XP
    const { newXP, rank, rankUp } = await addXP(
      session.user.id,
      course.xpReward,
      `Completed course: ${course.slug}`,
    )

    // Update streak
    const newStreak = await updateStreak(session.user.id)

    // Check badges
    const newBadges = await checkBadges(session.user.id)

    return NextResponse.json({
      xpEarned: course.xpReward,
      newXP,
      rank,
      rankUp,
      newStreak,
      newBadges,
    })
  } catch (error) {
    console.error('Progress POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
