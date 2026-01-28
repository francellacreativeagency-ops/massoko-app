'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'
import { QuestionCard } from '@/components/assessment/QuestionCard'
import { ProgressBar } from '@/components/assessment/ProgressBar'
import { questions, TOTAL_QUESTIONS } from '@/data/questions'
import { useAssessmentStore } from '@/lib/store'

export default function AssessmentPage() {
  const router = useRouter()
  const {
    user,
    answers,
    currentQuestion,
    setAnswer,
    setCurrentQuestion,
  } = useAssessmentStore()

  const [localAnswer, setLocalAnswer] = useState('')

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push('/start')
    }
  }, [user, router])

  // Sync local answer with store
  useEffect(() => {
    setLocalAnswer(answers[currentQuestion] || '')
  }, [currentQuestion, answers])

  const question = questions.find((q) => q.id === currentQuestion)

  if (!question || !user) {
    return null
  }

  const handleAnswerChange = (answer: string) => {
    setLocalAnswer(answer)
    setAnswer(currentQuestion, answer)
  }

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Go to review page
      router.push('/assessment/review')
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const hasAnswer = localAnswer.trim().length > 0

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 border-b border-bg-tertiary">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-text-muted text-sm">
            Question {currentQuestion} of {TOTAL_QUESTIONS}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 py-8">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Question */}
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion}
                question={question}
                answer={localAnswer}
                onAnswerChange={handleAnswerChange}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentQuestion === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  {hasAnswer ? (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      I&apos;ve Recorded
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <ProgressBar current={currentQuestion} total={TOTAL_QUESTIONS} />
          </div>
        </div>
      </main>
    </div>
  )
}
