import { TOTAL_QUESTIONS } from '@/data/questions'

export function extractKeyThemes(answers: Record<number, string>): string[] {
  const allText = Object.values(answers).filter(Boolean).join(' ').toLowerCase()

  const patterns = [
    { pattern: /leader|leadership/gi, theme: 'Leadership Development' },
    { pattern: /coach|mentor|coaching|mentoring/gi, theme: 'Coaching & Mentorship' },
    { pattern: /faith|god|spiritual|kingdom|church|ministry/gi, theme: 'Faith-Based Calling' },
    { pattern: /heal|trauma|pain|recovery|restore/gi, theme: 'Healing & Restoration' },
    { pattern: /teach|training|education|learn/gi, theme: 'Teaching & Education' },
    { pattern: /strategy|systems|process|framework/gi, theme: 'Strategic Systems' },
    { pattern: /women|mom|mother|female/gi, theme: "Women's Empowerment" },
    { pattern: /purpose|calling|mission|destiny/gi, theme: 'Purpose Discovery' },
    { pattern: /business|entrepreneur|startup|founder/gi, theme: 'Entrepreneurship' },
    { pattern: /creative|create|art|design|write/gi, theme: 'Creative Expression' },
    { pattern: /health|wellness|fitness|nutrition/gi, theme: 'Health & Wellness' },
    { pattern: /finance|money|wealth|income/gi, theme: 'Financial Transformation' },
    { pattern: /relationship|marriage|family|parent/gi, theme: 'Relationships & Family' },
    { pattern: /career|job|profession|work/gi, theme: 'Career Development' },
    { pattern: /brand|marketing|content|social media/gi, theme: 'Brand & Marketing' },
    { pattern: /tech|software|app|digital/gi, theme: 'Technology & Digital' },
    { pattern: /consult|advisory|expert/gi, theme: 'Consulting & Advisory' },
    { pattern: /community|tribe|network|connect/gi, theme: 'Community Building' },
    { pattern: /scale|growth|expand|million/gi, theme: 'Scaling & Growth' },
    { pattern: /service|agency|freelance/gi, theme: 'Service-Based Business' },
  ]

  const themes: string[] = []
  patterns.forEach(({ pattern, theme }) => {
    if (pattern.test(allText) && !themes.includes(theme)) {
      themes.push(theme)
    }
  })

  return themes.slice(0, 5)
}

export function generateAnswerSummary(answers: Record<number, string>): {
  totalAnswered: number
  completionPercentage: number
  sectionProgress: Record<number, { answered: number; total: number }>
} {
  const answered = Object.entries(answers).filter(
    ([, answer]) => answer && answer.trim().length > 0
  )

  // Section breakdown based on new structure
  const sectionQuestionCounts: Record<number, number> = {
    1: 4,   // Brand Essence & Foundation
    2: 6,   // Target Audience Deep Dive
    3: 4,   // Competitive Positioning
    4: 5,   // Transformation Promise
    5: 5,   // Offer Architecture & Pricing
    6: 4,   // Market Opportunity & Timing
    7: 4,   // Messaging & Positioning
    8: 4,   // Content & Marketing Strategy
    9: 4,   // Business Model & Revenue
    10: 4,  // Differentiation & Unfair Advantage
  }

  // Calculate section progress
  const sectionProgress: Record<number, { answered: number; total: number }> = {}

  // Initialize all sections
  Object.entries(sectionQuestionCounts).forEach(([sectionId, total]) => {
    sectionProgress[parseInt(sectionId)] = { answered: 0, total }
  })

  // Count answered questions per section
  answered.forEach(([id]) => {
    const questionId = parseInt(id)
    // Determine which section based on question ID
    let sectionId = 1
    let cumulativeCount = 0

    for (const [sid, count] of Object.entries(sectionQuestionCounts)) {
      cumulativeCount += count
      if (questionId <= cumulativeCount) {
        sectionId = parseInt(sid)
        break
      }
    }

    if (sectionProgress[sectionId]) {
      sectionProgress[sectionId].answered++
    }
  })

  return {
    totalAnswered: answered.length,
    completionPercentage: Math.round((answered.length / TOTAL_QUESTIONS) * 100),
    sectionProgress,
  }
}
