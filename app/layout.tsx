import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Providers } from './providers'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'English For Designers — L\'anglais des designers. Enfin.',
    template: '%s | English For Designers',
  },
  description:
    'Plateforme e-learning d\'anglais spécialisée pour les designers. Vocabulaire métier, simulations pro, gamification — de A1 à C2. Rejoignez 12 000+ designers formés.',
  keywords: [
    'anglais designers',
    'english design vocabulary',
    'UX english',
    'UI design english',
    'e-learning design',
    'anglais professionnel design',
    'design brief english',
  ],
  authors: [{ name: 'English For Designers' }],
  creator: 'English For Designers',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://english-for-designers.com',
    siteName: 'English For Designers',
    title: 'English For Designers — L\'anglais des designers. Enfin.',
    description: 'Vocabulaire métier, simulations pro, gamification — de A1 à C2.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'English For Designers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'English For Designers',
    description: 'L\'anglais des designers. Enfin.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#26538D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  )
}
