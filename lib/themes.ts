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
  partOneAnswered: number
  partTwoAnswered: number
  completionPercentage: number
} {
  const answered = Object.entries(answers).filter(
    ([, answer]) => answer && answer.trim().length > 0
  )

  const partOneAnswered = answered.filter(([id]) => parseInt(id) <= 25).length
  const partTwoAnswered = answered.filter(([id]) => parseInt(id) > 25).length

  return {
    totalAnswered: answered.length,
    partOneAnswered,
    partTwoAnswered,
    completionPercentage: Math.round((answered.length / 57) * 100),
  }
}
