'use client'

import { useState, useCallback } from 'react'

interface UseProgressOptions {
  courseId: string
  onComplete?: (xpEarned: number) => void
}

export function useProgress({ courseId, onComplete }: UseProgressOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markComplete = useCallback(
    async (score?: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, score }),
        })

        if (!res.ok) throw new Error('Failed to save progress')

        const data = await res.json() as { xpEarned: number }
        onComplete?.(data.xpEarned)
        return data
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [courseId, onComplete],
  )

  return { markComplete, isLoading, error }
}
