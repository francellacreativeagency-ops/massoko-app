'use client'

import { motion } from 'framer-motion'
import { FileText, ChevronDown, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { Logo } from '@/components/Logo'
import { questions, sections } from '@/data/questions'
import { useAssessmentStore } from '@/lib/store'

export default function ReviewPage() {
  const router = useRouter()
  const { user, answers, setAnswer, getAnsweredCount } = useAssessmentStore()
  const [expandedSections, setExpandedSections] = useState<number[]>([1])

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push('/start')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleGenerateReport = () => {
    router.push('/report/free')
  }

  const answeredCount = getAnsweredCount()

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="py-4 px-4 border-b border-bg-tertiary sticky top-0 bg-bg-primary/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-text-muted text-sm">
            {answeredCount} of 57 answered
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3">
            Paste Your Recorded Answers
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            If you recorded externally, paste your transcriptions below.
            Match each answer to its question number.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4 mb-8">
          {/* Part 1 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-teal-500 mb-4">
              Part 1: The Soul Work
            </h2>
            {sections
              .filter((s) => s.part === 1)
              .map((section) => (
                <SectionAccordion
                  key={section.id}
                  section={section}
                  questions={questions.filter((q) => q.section === section.id)}
                  answers={answers}
                  onAnswerChange={setAnswer}
                  isExpanded={expandedSections.includes(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
          </div>

          {/* Part 2 */}
          <div>
            <h2 className="text-lg font-semibold text-orange-500 mb-4">
              Part 2: The Strategy Work
            </h2>
            {sections
              .filter((s) => s.part === 2)
              .map((section) => (
                <SectionAccordion
                  key={section.id}
                  section={section}
                  questions={questions.filter((q) => q.section === section.id)}
                  answers={answers}
                  onAnswerChange={setAnswer}
                  isExpanded={expandedSections.includes(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
          </div>
        </div>

        {/* Note */}
        <p className="text-text-muted text-center text-sm mb-8">
          Minimum 10 answers recommended for a meaningful report
        </p>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleGenerateReport}
            className="group"
          >
            Generate My Free Report
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  )
}

interface SectionAccordionProps {
  section: {
    id: number
    title: string
    subtitle: string
    color: string
  }
  questions: typeof questions
  answers: Record<number, string>
  onAnswerChange: (questionId: number, answer: string) => void
  isExpanded: boolean
  onToggle: () => void
}

function SectionAccordion({
  section,
  questions: sectionQuestions,
  answers,
  onAnswerChange,
  isExpanded,
  onToggle,
}: SectionAccordionProps) {
  const answeredInSection = sectionQuestions.filter(
    (q) => answers[q.id]?.trim()
  ).length

  return (
    <div className="border border-bg-tertiary rounded-xl overflow-hidden mb-3">
      <button
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-bg-secondary transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-2 h-2 rounded-full ${
              section.color === 'teal' ? 'bg-teal-500' : 'bg-orange-500'
            }`}
          />
          <span className="font-medium">{section.title}</span>
          <span className="text-text-muted text-sm">
            ({answeredInSection}/{sectionQuestions.length})
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4 space-y-4"
        >
          {sectionQuestions.map((question) => (
            <div key={question.id}>
              <label className="block text-sm text-text-secondary mb-2">
                <span className="text-text-muted">Q{question.id}:</span>{' '}
                {question.title}
              </label>
              <Textarea
                placeholder={`Answer for: "${question.question}"`}
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
