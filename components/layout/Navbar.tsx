'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass border-b border-white/60 py-3 shadow-sm'
            : 'bg-transparent py-5',
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xs font-black tracking-tight">E</span>
            </div>
            <span className="font-black text-brand-dark text-sm tracking-tight leading-tight">
              English For<br />
              <span className="text-brand-navy">Designers</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-600 transition-all duration-200 font-semibold',
                  pathname === link.href
                    ? 'text-brand-navy bg-brand-azure'
                    : 'text-brand-dark hover:text-brand-navy hover:bg-brand-azure/60',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-navy hover:bg-brand-azure transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:text-brand-dark transition-colors duration-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-dark hover:text-brand-navy transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  data-cursor="magnetic"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-navy hover:bg-brand-navy-dark transition-all duration-300 shadow-brand-lg hover:shadow-glow glow-blue"
                >
                  Commencer gratuitement
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <span className={cn('block w-6 h-0.5 bg-brand-dark transition-all duration-300', isMobileOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('block w-6 h-0.5 bg-brand-dark transition-all duration-300', isMobileOpen && 'opacity-0')} />
            <span className={cn('block w-6 h-0.5 bg-brand-dark transition-all duration-300', isMobileOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass pt-24 pb-8 px-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-brand-dark hover:bg-brand-azure hover:text-brand-navy transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                {session ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-bold text-white bg-brand-navy text-center"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-semibold text-brand-navy border-2 border-brand-navy text-center"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-bold text-white bg-brand-navy text-center"
                    >
                      Commencer gratuitement
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
