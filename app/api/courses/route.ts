import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const level = searchParams.get('level')

    if (slug) {
      const course = await prisma.course.findUnique({
        where: { slug },
        include: { lessons: { orderBy: { order: 'asc' } } },
      })
      if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      return NextResponse.json(course)
    }

    const courses = await prisma.course.findMany({
      where: level ? { level } : {},
      orderBy: [{ level: 'asc' }, { isPremium: 'asc' }],
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Courses GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
