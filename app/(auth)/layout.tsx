import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-hero bg-grid flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
            <span className="text-white text-xs font-black">E</span>
          </div>
          <span className="font-black text-brand-dark text-sm leading-tight">
            English For<br />
            <span className="text-brand-navy">Designers</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-brand-dark transition-colors font-medium"
        >
          ← Retour
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  )
}
