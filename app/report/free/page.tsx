'use client'

import { motion } from 'framer-motion'
import { Sparkles, Copy, Check, ExternalLink, FileText, Zap, Edit3, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/Logo'
import { Badge } from '@/components/ui/Badge'
import { questions, sections } from '@/data/questions'
import { useAssessmentStore } from '@/lib/store'
import { useAuthStore } from '@/lib/auth'
import { extractKeyThemes, generateAnswerSummary } from '@/lib/themes'

export default function FreeReportPage() {
  const router = useRouter()
  const { user, answers, getFormattedPrompt } = useAssessmentStore()
  const { isAuthenticated } = useAuthStore()
  const [copied, setCopied] = useState(false)
  const [showPromptPreview, setShowPromptPreview] = useState(false)

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push('/start')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const themes = extractKeyThemes(answers)
  const summary = generateAnswerSummary(answers)
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleCopyPrompt = async () => {
    const prompt = getFormattedPrompt()
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="py-4 px-4 border-b border-bg-tertiary">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/assessment">
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Answers
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link href="/signup">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Save Progress
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Your Brand Strategy Assessment Complete!
          </h1>
          <p className="text-text-secondary">
            Prepared for <span className="text-teal-500 font-medium">{user.firstName}</span>
          </p>
          <p className="text-text-muted text-sm mt-1">Completed: {today}</p>
        </motion.div>

        {/* Key Themes Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Your Key Themes
            </h2>
            <p className="text-text-secondary mb-4">
              Based on your answers, here are the patterns we found:
            </p>
            {themes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {themes.map((theme, index) => (
                  <Badge key={index} variant="teal" size="md">
                    {theme}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-text-muted italic">
                Complete more questions to reveal your key themes.
              </p>
            )}
          </Card>
        </motion.section>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-500">{summary.totalAnswered}</p>
            <p className="text-text-muted text-sm">Questions Answered</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-orange-500">{summary.completionPercentage}%</p>
            <p className="text-text-muted text-sm">Completion Rate</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-500">{themes.length}</p>
            <p className="text-text-muted text-sm">Key Themes Found</p>
          </Card>
        </motion.div>

        {/* GET YOUR FULL REPORT - Main CTA */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-teal-500 bg-gradient-to-br from-teal-500/10 to-teal-500/5">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Get Your 60-Page Brand Strategy Blueprint
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Copy the prompt below and paste it into Claude to generate your
                comprehensive, Grade-A brand strategy report instantly.
              </p>

              {/* What You'll Get */}
              <div className="grid md:grid-cols-2 gap-3 text-left mb-8 max-w-2xl mx-auto">
                {[
                  'Executive Summary & Positioning',
                  'Brand Foundation & Essence',
                  '3 Detailed Customer Avatars',
                  'Transformation Promise & Journey',
                  'Offer Architecture (3 Tiers)',
                  'Messaging & Positioning Strategy',
                  'Content & Marketing Strategy',
                  'Business Model & Revenue Plan',
                  'Competitive Analysis',
                  '90-Day Action Plan',
                  'Lead Magnet Assessment Framework',
                  'Unfair Advantage & Differentiation',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>

              {/* Copy Button */}
              <Button
                onClick={handleCopyPrompt}
                variant="primary"
                size="lg"
                className="group mb-4"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied! Now paste into Claude
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Prompt for Claude
                  </>
                )}
              </Button>

              {/* Instructions */}
              <div className="bg-bg-tertiary rounded-xl p-6 text-left max-w-lg mx-auto">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-500" />
                  How to get your report:
                </h3>
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold">1.</span>
                    Click the button above to copy your prompt
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold">2.</span>
                    Open Claude at{' '}
                    <a
                      href="https://claude.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:underline inline-flex items-center gap-1"
                    >
                      claude.ai <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold">3.</span>
                    Paste the prompt and press Enter
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500 font-bold">4.</span>
                    Receive your comprehensive brand strategy report!
                  </li>
                </ol>
              </div>

              {/* Toggle Preview */}
              <button
                onClick={() => setShowPromptPreview(!showPromptPreview)}
                className="mt-6 text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPromptPreview ? 'Hide prompt preview' : 'Preview what will be copied'}
              </button>

              {/* Prompt Preview */}
              {showPromptPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="bg-bg-primary border border-bg-tertiary rounded-lg p-4 text-left max-h-64 overflow-y-auto">
                    <pre className="text-xs text-text-muted whitespace-pre-wrap font-mono">
                      {getFormattedPrompt()}
                    </pre>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.section>

        {/* Complete Answers Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Your Complete Answers
            </h2>

            <div className="space-y-6">
              {sections.map((section) => {
                const sectionQuestions = questions.filter(
                  (q) => q.section === section.id
                )
                const answeredQuestions = sectionQuestions.filter(
                  (q) => answers[q.id]?.trim()
                )

                if (answeredQuestions.length === 0) return null

                return (
                  <div key={section.id}>
                    <h3
                      className={`text-sm font-semibold mb-3 ${
                        section.color === 'teal'
                          ? 'text-teal-500'
                          : 'text-orange-500'
                      }`}
                    >
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {answeredQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="bg-bg-tertiary rounded-lg p-4"
                        >
                          <p className="text-sm text-text-muted mb-1">
                            Q{question.id}: {question.title}
                          </p>
                          <p className="text-text-primary">
                            {answers[question.id]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.section>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleCopyPrompt}
            variant="primary"
            size="lg"
            className="group"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied! Now paste into Claude
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Prompt for Claude
              </>
            )}
          </Button>
          <p className="text-text-muted text-sm mt-3">
            Your personalized brand strategy report is just one paste away
          </p>
        </motion.div>
      </main>
    </div>
  )
}
