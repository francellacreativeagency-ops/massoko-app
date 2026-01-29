'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { Textarea } from '@/components/ui/Input'
import { SectionBadge } from './SectionBadge'
import type { Question } from '@/data/questions'
import { TOTAL_QUESTIONS } from '@/data/questions'

interface QuestionCardProps {
  question: Question
  answer: string
  onAnswerChange: (answer: string) => void
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Section Badge */}
      <div className="flex justify-center mb-8">
        <SectionBadge
          title={question.sectionTitle}
          subtitle={question.sectionSubtitle}
          color={question.sectionColor}
        />
      </div>

      {/* Question Number */}
      <p className="text-center text-text-muted mb-2">
        Question {question.id} of {TOTAL_QUESTIONS}
      </p>

      {/* Question Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        {question.title}
      </h2>

      {/* Question Text */}
      <p className="text-xl text-text-secondary text-center mb-8 max-w-2xl mx-auto">
        &ldquo;{question.question}&rdquo;
      </p>

      {/* Guidance Box */}
      <div className="bg-bg-secondary border border-bg-tertiary rounded-xl p-4 mb-8 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-teal-500 mb-1">GUIDANCE</p>
            <p className="text-text-secondary text-sm">{question.guidance}</p>
          </div>
        </div>
      </div>

      {/* Answer Input */}
      <div className="max-w-2xl mx-auto">
        <Textarea
          placeholder="Optional: Type your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[150px]"
        />
      </div>
    </motion.div>
  )
}
