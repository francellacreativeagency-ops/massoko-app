import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { questions } from '@/data/questions'

export interface User {
  email: string
  firstName: string
}

interface AssessmentState {
  // User info
  user: User | null
  setUser: (user: User) => void

  // Assessment answers
  answers: Record<number, string>
  setAnswer: (questionId: number, answer: string) => void

  // Current question
  currentQuestion: number
  setCurrentQuestion: (questionId: number) => void

  // Helper functions
  getAnsweredCount: () => number
  getAllAnswersText: () => string
  getFormattedPrompt: () => string
  reset: () => void
}

const initialState = {
  user: null,
  answers: {},
  currentQuestion: 1,
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ user }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),

      setCurrentQuestion: (questionId) => set({ currentQuestion: questionId }),

      getAnsweredCount: () => {
        const answers = get().answers
        return Object.values(answers).filter((a) => a && a.trim().length > 0).length
      },

      getAllAnswersText: () => {
        const answers = get().answers
        return Object.entries(answers)
          .filter(([, answer]) => answer && answer.trim().length > 0)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([id, answer]) => `Question ${id}: ${answer}`)
          .join('\n\n')
      },

      getFormattedPrompt: () => {
        const { user, answers } = get()
        const firstName = user?.firstName || 'Friend'

        // Build formatted answers with question context
        const formattedAnswers = Object.entries(answers)
          .filter(([, answer]) => answer && answer.trim().length > 0)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([id, answer]) => {
            const question = questions.find(q => q.id === parseInt(id))
            if (!question) return ''
            return `**Q${id} - ${question.title}** (${question.sectionTitle})
"${question.question}"

Answer: ${answer}`
          })
          .filter(Boolean)
          .join('\n\n---\n\n')

        return `# BRAND STRATEGY REPORT REQUEST

## Client Information
**Name:** ${firstName}
**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

---

## Instructions

You are Francis Kiing, a world-class Brand Strategist and the creator of the MASSOKO Brand Strategy Assessment. Based on the client's answers below, create a comprehensive, personalized Brand Strategy Report in Francis's voice—professional yet warm, strategic yet practical, and faith-friendly when relevant.

### Tone & Style
- Professional yet warm and encouraging
- Faith-friendly (if relevant to their answers)
- Action-oriented and specific
- Confident and inspiring

### Report Sections to Generate

Please create each of these sections with specific, personalized insights based on their answers:

1. **BRAND ESSENCE**
   - A compelling summary of who they are and what they're called to do
   - Their core identity statement (one powerful sentence)

2. **CORE BRAND THEMES**
   - Their mission statement
   - Their deeper "why"
   - 3-5 key themes that emerged from their answers

3. **UNIQUE VOICE & VIBE**
   - Three words that describe their brand tone
   - Description of how they should communicate

4. **MONETIZABLE STRENGTHS**
   - 4-6 specific ways they can monetize their expertise
   - Each with a title and brief description

5. **SIGNATURE FRAMEWORK**
   - Create a custom acronym-based framework from their key concepts
   - Framework name, tagline, and 4-7 steps with descriptions

6. **BRAND POSITIONING STATEMENT**
   - A complete "I help [WHO] go from [PROBLEM] to [OUTCOME] through [METHOD]" statement

7. **TARGET AUDIENCE PROFILE**
   - Detailed description of who they serve
   - Their audience's top 5 struggles
   - How they solve each struggle

8. **COMPETITIVE EDGE**
   - 5 things that make them different from others in their space

9. **CONTENT PILLAR STRATEGY**
   - 4-5 content pillars with percentage allocation
   - Specific topic ideas for each pillar

10. **MONETIZATION ROADMAP**
    - 4 tiers from entry-level to premium
    - Specific offer ideas and price ranges for each tier

11. **NEXT STEPS**
    - 6 specific, actionable next steps they should take
    - In priority order

12. **STRATEGIC PRIORITY**
    - Their #1 focus area right now
    - One quick win they can accomplish this week

13. **BRAND ASSETS**
    - Short bio (50 words)
    - Medium bio (100 words)
    - Long bio (200 words)
    - Instagram bio (160 characters)
    - LinkedIn headline
    - Twitter/X bio

---

## Client's Assessment Answers

${formattedAnswers}

---

## Final Instructions

Please generate the complete Brand Strategy Report now. Make it:
- Highly specific to their answers (not generic)
- Actionable and practical
- Encouraging and inspiring
- Well-formatted with clear headings and bullet points

Begin the report with a personalized greeting to ${firstName} from Francis Kiing.`
      },

      reset: () => set(initialState),
    }),
    {
      name: 'massoko-assessment',
    }
  )
)
