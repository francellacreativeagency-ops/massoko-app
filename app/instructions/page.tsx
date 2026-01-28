'use client'

import { motion } from 'framer-motion'
import { Mic, Smartphone, Lightbulb, ArrowRight, MessageSquare, Keyboard, Copy, Bot } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/Logo'

export default function InstructionsPage() {
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const gptPrompt = `I'm going to send you multiple voice recordings where I answer brand strategy questions. Each recording will start with "Question [number]" followed by my answer.

Your role is to:
1. Transcribe each voice recording accurately
2. Organize all answers by question number in order
3. Wait for me to say "I'm done with all recordings" before providing the final organized list
4. Keep each answer intact without summarizing

Please confirm you understand and are ready for my first recording.`

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(gptPrompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3">How This Works</h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              Choose your preferred method to answer the 57 brand discovery questions.
              Voice recording gives deeper, more authentic responses.
            </p>
          </div>

          {/* Method Selection */}
          <h2 className="text-xl font-bold mb-4 text-center">Choose Your Method</h2>

          {/* Option 1: AI Voice Transcription */}
          <Card className="mb-6 border-teal-500/30 bg-teal-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-teal-500" />
              </div>
              <div>
                <h3 className="font-semibold text-teal-500">OPTION 1: AI Voice Transcription (Recommended)</h3>
                <p className="text-text-muted text-sm">Use Claude or ChatGPT to transcribe your recordings</p>
              </div>
            </div>

            <div className="bg-bg-tertiary rounded-xl p-4 mb-4">
              <p className="text-sm text-text-secondary mb-3">
                <strong>How it works:</strong> Record yourself answering each question, then send the audio to ChatGPT or Claude for transcription.
              </p>
              <ol className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-teal-500 font-bold">1.</span>
                  Open your phone&apos;s voice recorder app
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-bold">2.</span>
                  <strong>Say the question number first:</strong> &quot;Question 1...&quot; then give your answer
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-bold">3.</span>
                  Send the recording to ChatGPT or Claude for transcription
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-bold">4.</span>
                  Copy your transcribed answers back here
                </li>
              </ol>
            </div>

            {/* ChatGPT 10-min limit warning */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-500 mb-2">ChatGPT Voice Limit (10 minutes max)</p>
                  <p className="text-sm text-text-secondary mb-3">
                    ChatGPT has a 10-minute recording limit. Copy this prompt first to tell it you&apos;ll be sending multiple recordings:
                  </p>
                  <div className="bg-bg-primary rounded-lg p-3 text-xs text-text-muted font-mono mb-3">
                    {gptPrompt}
                  </div>
                  <Button
                    onClick={handleCopyPrompt}
                    variant="outline"
                    size="sm"
                    className="text-orange-500 border-orange-500/50 hover:bg-orange-500/10"
                  >
                    {copiedPrompt ? (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy ChatGPT Prompt
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Option 2: Phone Notes */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-teal-500" />
                <div>
                  <h3 className="font-semibold">OPTION 2: iPhone Notes</h3>
                  <p className="text-text-muted text-xs">Built-in voice-to-text</p>
                </div>
              </div>
              <ol className="space-y-2 text-text-secondary text-sm">
                <li className="flex gap-2">
                  <span className="text-teal-500 font-medium">1.</span>
                  Open the Notes app
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-medium">2.</span>
                  Tap the microphone icon on keyboard
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-medium">3.</span>
                  Say &quot;Question [number]&quot; then your answer
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-medium">4.</span>
                  Your words transcribe automatically
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-medium">5.</span>
                  Copy answers and paste into assessment
                </li>
              </ol>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-orange-500" />
                <div>
                  <h3 className="font-semibold">OPTION 3: Samsung/Android Notes</h3>
                  <p className="text-text-muted text-xs">Built-in voice-to-text</p>
                </div>
              </div>
              <ol className="space-y-2 text-text-secondary text-sm">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-medium">1.</span>
                  Open Samsung Notes or Google Keep
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-medium">2.</span>
                  Tap the microphone icon
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-medium">3.</span>
                  Say &quot;Question [number]&quot; then your answer
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-medium">4.</span>
                  Review and edit as needed
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-medium">5.</span>
                  Copy answers and paste into assessment
                </li>
              </ol>
            </Card>
          </div>

          {/* Option 4: Just Type */}
          <Card className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Keyboard className="w-6 h-6 text-text-muted" />
              <div>
                <h3 className="font-semibold">OPTION 4: Just Type</h3>
                <p className="text-text-muted text-xs">Type your answers directly</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm">
              Prefer typing? No problem! You can type your answers directly into each question field.
              Take your time and answer as thoroughly as you&apos;d like.
            </p>
          </Card>

          {/* Pro Tips */}
          <Card className="mb-8 border-teal-500/30 bg-teal-500/5">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-teal-500" />
              <h3 className="font-semibold text-teal-500">Pro Tips for Better Answers</h3>
            </div>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                <strong>Always say the question number first</strong> — &quot;Question 5: My answer is...&quot;
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                Find a quiet space where you can think and speak freely
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                Speak naturally, like you&apos;re talking to a friend
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                Don&apos;t overthink — your first instinct is often best
              </li>
              <li className="flex gap-2">
                <span className="text-teal-500">•</span>
                Your answers are saved automatically, so you can come back anytime
              </li>
            </ul>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/assessment">
              <Button size="lg" className="group">
                I Understand, Let&apos;s Begin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
