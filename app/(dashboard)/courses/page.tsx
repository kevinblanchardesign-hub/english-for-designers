import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CourseCard } from '@/components/dashboard/CourseCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Catalogue des cours' }

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { level?: string; theme?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isPremium: true },
  })

  const courses = await prisma.course.findMany({
    where: {
      ...(searchParams.level ? { level: searchParams.level } : {}),
      ...(searchParams.theme ? { theme: searchParams.theme } : {}),
    },
    include: {
      progress: { where: { userId: session.user.id } },
    },
    orderBy: [{ level: 'asc' }, { isPremium: 'asc' }],
  })

  const coursesByLevel = LEVELS.reduce(
    (acc, level) => {
      acc[level] = courses
        .filter((c) => c.level === level)
        .map((c) => ({
          ...c,
          progress: c.progress[0]?.completed ? 100 : c.progress[0] ? 50 : 0,
          isEnrolled: c.progress.length > 0,
        }))
      return acc
    },
    {} as Record<string, (Omit<(typeof courses)[number], 'progress'> & { progress: number; isEnrolled: boolean })[]>,
  )

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-dark mb-2">Catalogue des cours</h1>
        <p className="text-gray-400 font-medium">{courses.length} cours disponibles · De A1 à C2</p>
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <a
          href="/courses"
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${!searchParams.level ? 'bg-brand-navy text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-navy hover:text-brand-navy'}`}
        >
          Tous
        </a>
        {LEVELS.map((level) => (
          <a
            key={level}
            href={`/courses?level=${level}`}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${searchParams.level === level ? 'bg-brand-navy text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-navy hover:text-brand-navy'}`}
          >
            {level}
          </a>
        ))}
      </div>

      {/* Courses by level */}
      {LEVELS.map((level) => {
        const levelCourses = coursesByLevel[level]
        if (!levelCourses?.length) return null
        const shouldShow = !searchParams.level || searchParams.level === level

        return shouldShow ? (
          <section key={level} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-3 py-1 rounded-full text-sm font-black border level-${level.toLowerCase()}`}>
                {level}
              </span>
              <h2 className="text-xl font-black text-brand-dark">
                {level === 'A1' && 'Découverte'}
                {level === 'A2' && 'Élémentaire'}
                {level === 'B1' && 'Intermédiaire'}
                {level === 'B2' && 'Avancé'}
                {level === 'C1' && 'Courant'}
                {level === 'C2' && 'Maîtrise'}
              </h2>
              <span className="text-sm text-gray-400 font-medium">{levelCourses.length} cours</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {levelCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course as Parameters<typeof CourseCard>[0]['course']}
                  isPremiumUser={user?.isPremium ?? false}
                />
              ))}
            </div>
          </section>
        ) : null
      })}
    </div>
  )
}
