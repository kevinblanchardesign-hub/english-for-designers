'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/hooks/useScrollAnimation'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Email ou mot de passe incorrect.')
      setIsLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleGoogle = () => signIn('google', { callbackUrl: '/dashboard' })

  return (
    <motion.div
      className="w-full max-w-md"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="glass rounded-4xl shadow-brand-lg border border-white/80 p-8 sm:p-10">
        {/* Header */}
        <motion.div variants={fadeUpVariants} className="text-center mb-8">
          <h1 className="text-3xl font-black text-brand-dark mb-2">Bon retour ! 👋</h1>
          <p className="text-sm text-gray-400 font-medium">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-brand-navy font-bold hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
        </motion.div>

        {/* Google OAuth */}
        <motion.div variants={fadeUpVariants}>
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-gray-200 hover:border-brand-navy/30 hover:bg-brand-azure/30 transition-all duration-200 font-semibold text-brand-dark text-sm mb-5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuer avec Google
          </button>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 font-medium">ou avec email</span>
          <div className="flex-1 h-px bg-gray-100" />
        </motion.div>

        {/* Form */}
        <motion.form variants={fadeUpVariants} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-dark mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@studio.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-brand-navy focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300 bg-white"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-bold text-brand-dark">Mot de passe</label>
              <a href="#" className="text-xs text-brand-navy font-semibold hover:underline">
                Oublié ?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-brand-navy focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300 bg-white"
            />
          </div>

          {error && (
            <motion.p
              className="text-sm text-brand-error font-semibold bg-red-50 px-4 py-3 rounded-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Se connecter
          </Button>
        </motion.form>
      </div>
    </motion.div>
  )
}
