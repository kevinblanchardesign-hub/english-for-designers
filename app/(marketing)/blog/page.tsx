import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Ressources',
  description: 'Articles, guides et ressources pour les designers qui apprennent l\'anglais.',
}

const articles = [
  {
    category: 'Vocabulaire',
    title: '50 mots indispensables en UX Design',
    excerpt: 'De "affordance" à "wireframe" en passant par "user flow" — les termes que tout designer UX doit connaître en anglais.',
    readTime: '6 min',
    date: '12 jan 2025',
    color: '#E8F4FF',
    emoji: '🖥️',
  },
  {
    category: 'Carrière',
    title: 'Comment pitcher son portfolio en anglais',
    excerpt: 'Structure, phrases clés, erreurs à éviter — un guide complet pour présenter votre travail à des recruteurs anglophones.',
    readTime: '8 min',
    date: '5 jan 2025',
    color: '#E8F5E9',
    emoji: '🎤',
  },
  {
    category: 'Brief',
    title: 'Décrypter un brief d\'agence internationale',
    excerpt: 'Les briefs anglais utilisent un vocabulaire précis. Voici comment les lire, les analyser et y répondre avec confiance.',
    readTime: '5 min',
    date: '28 déc 2024',
    color: '#FFF8E1',
    emoji: '📋',
  },
  {
    category: 'Typographie',
    title: 'Le vocabulaire de la typographie en anglais',
    excerpt: 'Kerning, leading, tracking, ascender — maîtrisez le lexique typographique pour travailler avec des équipes internationales.',
    readTime: '7 min',
    date: '20 déc 2024',
    color: '#F5F3FF',
    emoji: '✍️',
  },
  {
    category: 'Outils',
    title: 'Figma en anglais : guide complet',
    excerpt: 'Toutes les fonctionnalités Figma, les raccourcis et le vocabulaire de l\'interface expliqués en français-anglais.',
    readTime: '10 min',
    date: '15 déc 2024',
    color: '#FDF2F8',
    emoji: '🎨',
  },
  {
    category: 'Simulation',
    title: 'Comment négocier des révisions en anglais',
    excerpt: 'Les phrases diplomatiques pour défendre vos choix de design sans froisser vos clients anglophones.',
    readTime: '6 min',
    date: '10 déc 2024',
    color: '#FFF0E8',
    emoji: '🤝',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-brand-light min-h-screen">
      <div className="container-xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-5xl sm:text-6xl font-black text-brand-dark mb-4">
            Ressources design
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl leading-relaxed">
            Guides, listes de vocabulaire et conseils pratiques pour les designers qui apprennent l'anglais.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group rounded-3xl bg-white border border-white hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Color banner */}
              <div
                className="h-32 flex items-center justify-center text-5xl"
                style={{ backgroundColor: article.color }}
              >
                {article.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-brand-navy bg-brand-azure px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime} de lecture</span>
                </div>
                <h2 className="text-base font-black text-brand-dark mb-2 group-hover:text-brand-navy transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                  <span className="text-xs font-bold text-brand-navy group-hover:underline">
                    Lire →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
