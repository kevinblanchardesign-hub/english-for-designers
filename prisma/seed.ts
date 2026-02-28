import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const courses = [
  {
    title: 'Design Colors in English',
    slug: 'design-colors-in-english',
    description: 'Master the vocabulary of color theory, palettes, and chromatic relationships in professional English. Perfect for your first design client conversations.',
    level: 'A1',
    theme: 'vocabulary',
    isPremium: false,
    xpReward: 30,
    duration: 15,
    lessons: [
      {
        title: 'Primary & Secondary Colors',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Hue', back: 'The pure spectral color (red, blue, yellow)', example: '"The hue of this brand is a warm coral."' },
            { front: 'Saturation', back: 'The intensity or purity of a color', example: '"Lower the saturation for a muted palette."' },
            { front: 'Tint', back: 'A color mixed with white', example: '"Use a soft tint for the background."' },
            { front: 'Shade', back: 'A color mixed with black', example: '"The dark shade adds depth to the UI."' },
            { front: 'Complementary', back: 'Colors opposite on the color wheel', example: '"Blue and orange are complementary colors."' },
          ],
        },
      },
      {
        title: 'Color in Design Briefs',
        type: 'quiz',
        order: 2,
        content: {
          questions: [
            {
              question: 'Your client says "We want a monochromatic palette." What do they mean?',
              options: ['Multiple bright colors', 'Variations of a single color', 'Black and white only', 'Random colors'],
              correct: 1,
              explanation: 'Monochromatic means using tints, shades, and tones of one base color.',
            },
            {
              question: 'Which term describes a color scheme with three evenly spaced colors?',
              options: ['Analogous', 'Triadic', 'Split-complementary', 'Tetradic'],
              correct: 1,
              explanation: 'Triadic color schemes use three colors equally spaced around the color wheel.',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Typography Vocabulary',
    slug: 'typography-vocabulary',
    description: 'From kerning to leading, master the precise language of typography that every designer needs to communicate professionally in English.',
    level: 'A1',
    theme: 'vocabulary',
    isPremium: false,
    xpReward: 35,
    duration: 20,
    lessons: [
      {
        title: 'Type Anatomy',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Serif', back: 'Small decorative strokes at the ends of letterforms', example: '"Times New Roman is a classic serif typeface."' },
            { front: 'Kerning', back: 'Adjusting space between individual characters', example: '"The kerning between A and V needs to be tightened."' },
            { front: 'Leading', back: 'Vertical space between lines of text', example: '"Increase the leading for better readability."' },
            { front: 'Tracking', back: 'Uniform spacing across a range of characters', example: '"Open up the tracking on the headline."' },
            { front: 'Ascender', back: 'Part of a lowercase letter that rises above the x-height', example: '"The ascender on the \'h\' is too tall."' },
            { front: 'Baseline', back: 'The invisible line on which letters sit', example: '"Align all elements to the same baseline."' },
          ],
        },
      },
      {
        title: 'Typography in Practice',
        type: 'quiz',
        order: 2,
        content: {
          questions: [
            {
              question: 'A client asks you to "tighten the tracking on the headline." What should you do?',
              options: ['Make the font bigger', 'Reduce spacing between all letters', 'Move the headline up', 'Change the font weight'],
              correct: 1,
              explanation: 'Tracking controls the overall letter-spacing across a text selection.',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Reading Your First Design Brief',
    slug: 'reading-design-brief',
    description: 'Decode the language of design briefs with confidence. Understand client expectations, project scopes, and deliverables in English.',
    level: 'A2',
    theme: 'brief',
    isPremium: false,
    xpReward: 40,
    duration: 25,
    lessons: [
      {
        title: 'Brief Vocabulary',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Deliverable', back: 'A specific output expected from the project', example: '"The deliverables include mockups and a style guide."' },
            { front: 'Scope', back: 'The defined boundaries of a project', example: '"Revisions are outside the scope of this brief."' },
            { front: 'Stakeholder', back: 'Anyone with an interest in the project outcome', example: '"All stakeholders must approve the final design."' },
            { front: 'Turnaround', back: 'The time needed to complete a task', example: '"What\'s the turnaround time for first drafts?"' },
            { front: 'Benchmark', back: 'A reference point for comparison', example: '"Use Apple\'s website as a visual benchmark."' },
          ],
        },
      },
      {
        title: 'Analyze a Real Brief',
        type: 'simulation',
        order: 2,
        content: {
          scenario: 'Agency Brief: Rebranding',
          briefText: 'We are looking for a complete visual identity overhaul for our SaaS startup. The deliverables include a new logo, color palette, typography system, and brand guidelines document. Timeline: 4 weeks. Budget: $8,000. Our target audience is tech-savvy millennials. Please provide two initial concepts.',
          questions: [
            { question: 'What are the main deliverables?', answer: 'Logo, color palette, typography system, brand guidelines' },
            { question: 'What is the timeline?', answer: '4 weeks' },
            { question: 'Who is the target audience?', answer: 'Tech-savvy millennials' },
          ],
        },
      },
    ],
  },
  {
    title: 'Describing Your Work',
    slug: 'describing-your-work',
    description: 'Find the right words to explain your design decisions, justify your choices, and present your portfolio with confidence in English.',
    level: 'A2',
    theme: 'vocabulary',
    isPremium: false,
    xpReward: 40,
    duration: 20,
    lessons: [
      {
        title: 'Portfolio Language',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Rationale', back: 'The reasoning behind a design decision', example: '"My rationale for this layout was to improve scannability."' },
            { front: 'Iteration', back: 'A version or round of revisions', example: '"This is the third iteration of the homepage design."' },
            { front: 'Hierarchy', back: 'The visual order of importance', example: '"I established a clear visual hierarchy with size contrast."' },
            { front: 'Whitespace', back: 'Empty space used intentionally in a layout', example: '"The generous whitespace gives the design a premium feel."' },
          ],
        },
      },
    ],
  },
  {
    title: 'Email a Client About Revisions',
    slug: 'email-client-revisions',
    description: 'Write clear, professional emails to clients requesting feedback, explaining revision rounds, and managing expectations diplomatically.',
    level: 'B1',
    theme: 'simulation',
    isPremium: false,
    xpReward: 50,
    duration: 30,
    lessons: [
      {
        title: 'Email Vocabulary',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Actionable feedback', back: 'Specific, clear suggestions that can be acted upon', example: '"Please provide actionable feedback on the mockups."' },
            { front: 'Round of revisions', back: 'One cycle of changes based on feedback', example: '"This project includes two rounds of revisions."' },
            { front: 'Sign-off', back: 'Formal approval of a deliverable', example: '"We need your sign-off before moving to development."' },
          ],
        },
      },
      {
        title: 'Write a Revision Email',
        type: 'simulation',
        order: 2,
        content: {
          scenario: 'Email Simulation',
          prompt: 'Write a professional email to your client, Sarah Johnson at TechStart Inc., to share the first mockups and request feedback within 3 business days.',
          sampleResponse: 'Subject: First Mockups Ready for Review — TechStart Rebrand\n\nDear Sarah,\n\nI hope this email finds you well. I\'m pleased to share the first round of mockups for the TechStart rebrand project.\n\nPlease find the designs attached. I\'d love to get your feedback within the next 3 business days so we can stay on schedule.\n\nA few things I\'d like your input on:\n- Overall direction and visual tone\n- Color palette suitability\n- Logo lockup variations\n\nDon\'t hesitate to reach out if you have any questions.\n\nBest regards,\n[Your Name]',
          tips: ['Use formal but warm language', 'Be specific about deadlines', 'Guide the client on what to review'],
        },
      },
    ],
  },
  {
    title: 'Presenting a Wireframe',
    slug: 'presenting-wireframe',
    description: 'Learn how to walk a client through wireframes, explain UX decisions, and handle questions about information architecture like a pro.',
    level: 'B1',
    theme: 'simulation',
    isPremium: true,
    xpReward: 60,
    duration: 35,
    lessons: [
      {
        title: 'UX Presentation Language',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'User flow', back: 'The path a user takes through an interface', example: '"Let me walk you through the checkout user flow."' },
            { front: 'Pain point', back: 'A problem or frustration in the user experience', example: '"The main pain point was finding the navigation."' },
            { front: 'Above the fold', back: 'Content visible without scrolling', example: '"We placed the CTA above the fold for higher conversion."' },
          ],
        },
      },
    ],
  },
  {
    title: 'Pitching Your Design Concept',
    slug: 'pitching-design-concept',
    description: 'Master the art of the pitch. Structure compelling presentations, handle objections, and sell your creative vision in English.',
    level: 'B2',
    theme: 'simulation',
    isPremium: true,
    xpReward: 75,
    duration: 45,
    lessons: [
      {
        title: 'Pitch Structure',
        type: 'video',
        order: 1,
        content: {
          videoUrl: null,
          transcript: 'A great design pitch follows a clear structure: Problem → Insight → Solution → Execution → Impact.',
          keyPhrases: [
            '"We identified that users were struggling with..."',
            '"Our insight was that..."',
            '"The solution we propose is..."',
            '"This approach will result in..."',
          ],
        },
      },
    ],
  },
  {
    title: 'Negotiating Feedback',
    slug: 'negotiating-feedback',
    description: 'Professionally push back on impractical requests, defend your design decisions, and reach consensus without losing the client.',
    level: 'B2',
    theme: 'simulation',
    isPremium: true,
    xpReward: 80,
    duration: 40,
    lessons: [
      {
        title: 'Diplomatic Language',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Constructive pushback', back: 'Professionally disagreeing while offering an alternative', example: '"I understand your concern. What if we tried this approach instead?"' },
            { front: 'Design rationale', back: 'Evidence-based explanation of a design choice', example: '"Based on user testing, this layout performed 40% better."' },
          ],
        },
      },
    ],
  },
  {
    title: 'Art Direction in English',
    slug: 'art-direction-english',
    description: 'Lead creative teams, give precise direction to photographers and illustrators, and communicate your vision with authority in English.',
    level: 'C1',
    theme: 'vocabulary',
    isPremium: true,
    xpReward: 100,
    duration: 50,
    lessons: [
      {
        title: 'Art Direction Vocabulary',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Art direction', back: 'The process of defining and overseeing visual style', example: '"The art direction calls for a raw, editorial aesthetic."' },
            { front: 'Visual language', back: 'The set of consistent visual elements defining a brand', example: '"We need to establish a consistent visual language."' },
          ],
        },
      },
    ],
  },
  {
    title: 'Creative Leadership Vocabulary',
    slug: 'creative-leadership-vocabulary',
    description: 'Communicate as a creative leader. Mentor junior designers, run critiques, present strategy to executives, and inspire teams in English.',
    level: 'C1',
    theme: 'vocabulary',
    isPremium: true,
    xpReward: 120,
    duration: 60,
    lessons: [
      {
        title: 'Leadership Language',
        type: 'flashcard',
        order: 1,
        content: {
          cards: [
            { front: 'Design critique', back: 'A structured discussion evaluating design work', example: '"Let\'s run a design critique on these concepts."' },
            { front: 'Creative brief', back: 'A document guiding the creative process', example: '"Make sure the team has reviewed the creative brief."' },
          ],
        },
      },
    ],
  },
]

const badges = [
  {
    name: 'First Step',
    description: 'Complete your very first lesson',
    icon: '🎯',
    condition: 'complete_first_lesson',
    rarity: 'common',
  },
  {
    name: 'Brief Master',
    description: 'Complete 10 brief-themed lessons',
    icon: '📋',
    condition: 'complete_10_brief_lessons',
    rarity: 'uncommon',
  },
  {
    name: 'On Fire',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    condition: 'streak_7',
    rarity: 'rare',
  },
  {
    name: 'Pitch Pro',
    description: 'Complete the pitch simulation module',
    icon: '🎤',
    condition: 'complete_module_pitch',
    rarity: 'rare',
  },
  {
    name: 'International',
    description: 'Reach B2 level proficiency',
    icon: '🌍',
    condition: 'reach_level_B2',
    rarity: 'epic',
  },
  {
    name: 'Design Scholar',
    description: 'Complete all A1 and A2 courses',
    icon: '📚',
    condition: 'complete_all_beginner',
    rarity: 'uncommon',
  },
  {
    name: 'Speed Learner',
    description: 'Complete 3 lessons in a single day',
    icon: '⚡',
    condition: 'three_lessons_one_day',
    rarity: 'common',
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Seed badges
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.condition },
      update: badge,
      create: { id: badge.condition, ...badge },
    })
  }

  // Seed courses with lessons
  for (const courseData of courses) {
    const { lessons, ...course } = courseData

    const createdCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: { ...course },
      create: { ...course },
    })

    for (const lesson of lessons) {
      const existing = await prisma.lesson.findFirst({
        where: { courseId: createdCourse.id, order: lesson.order },
      })

      if (!existing) {
        await prisma.lesson.create({
          data: { ...lesson, courseId: createdCourse.id },
        })
      }
    }

    console.log(`✅ Course seeded: ${course.title}`)
  }

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
