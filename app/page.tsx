'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Target, MessageSquare, Package, ChevronDown, Star, LogIn, UserPlus, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/lib/auth'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-bg-tertiary">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            {mounted && isAuthenticated && user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm text-text-secondary">
                  <User className="w-4 h-4" />
                  <span>{user.firstName}</span>
                </div>
                <Link href="/assessment">
                  <Button size="sm">Continue Assessment</Button>
                </Link>
                <button
                  onClick={logout}
                  className="text-text-muted hover:text-text-secondary transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Log In
                  </Button>
                </Link>
                <Link href="/start">
                  <Button size="sm">Start Free Assessment</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-2 bg-teal-500/10 text-teal-500 rounded-full text-sm font-medium mb-6">
              Free Brand Strategy Assessment
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            You&apos;ve got the skills.
            <br />
            You&apos;ve got the experience.
            <br />
            <span className="text-text-secondary">
              You&apos;ve even got ideas for offers—
            </span>
            <br />
            <span className="text-orange-500">
              But you can&apos;t seem to package it into something people will actually pay for.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Take this free assessment to uncover exactly who you serve, what you offer,
            and how to talk about it—so you can finally start building the business only you can build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/start">
              <Button size="lg" className="group">
                Get My Free Brand Strategy Report
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-4 text-text-muted text-sm">
              Takes ~45 minutes | Get your personalized report | 100% free
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Sound familiar?
            </motion.h2>

            <div className="space-y-4">
              {[
                'You\'ve been "figuring out your niche" for months (maybe years)...',
                'Every time you sit down to create content, your mind goes blank...',
                'You\'ve watched people with less experience launch and grow...',
                'You\'ve helped people for free—but turning that into business feels impossible...',
                'You\'re drowning in courses about "finding your niche"...',
                'The gap between where you are and where you want to be feels overwhelming',
              ].map((pain, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-bg-primary rounded-xl"
                  variants={fadeInUp}
                >
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-text-secondary text-lg">{pain}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 border-2 border-teal-500 rounded-2xl bg-teal-500/5"
              variants={fadeInUp}
            >
              <p className="text-lg text-text-primary text-center">
                <strong className="text-teal-500">Here&apos;s the truth:</strong> You don&apos;t have a content problem.
                You don&apos;t have a niche problem.{' '}
                <span className="text-orange-500 font-semibold">
                  You have a clarity problem
                </span>
                —and it&apos;s keeping your gifts trapped inside your 9-5.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            This assessment will help you discover:
          </motion.h2>
          <motion.p
            className="text-text-secondary text-center mb-12 max-w-2xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Get the clarity you need to move forward with confidence
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                icon: Target,
                title: 'Audience Clarity',
                description:
                  'Stop speaking to everyone and start attracting the exact people who need what you offer.',
                color: 'teal',
              },
              {
                icon: MessageSquare,
                title: 'Messaging Foundation',
                description:
                  'Know exactly what to say so content creation feels natural instead of overwhelming.',
                color: 'orange',
              },
              {
                icon: Package,
                title: 'Offer Positioning',
                description:
                  'Understand how your story, struggles, and strengths become a business only YOU can build.',
                color: 'teal',
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card hover className="h-full">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      benefit.color === 'teal'
                        ? 'bg-teal-500/20 text-teal-500'
                        : 'bg-orange-500/20 text-orange-500'
                    }`}
                  >
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-text-secondary">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                step: '01',
                title: 'Answer the Discovery Questions',
                description:
                  '57 thought-provoking questions designed to uncover your unique brand DNA.',
              },
              {
                step: '02',
                title: 'Copy Your Custom Prompt',
                description:
                  'Get a beautifully formatted prompt with all your answers ready to paste into Claude AI.',
              },
              {
                step: '03',
                title: 'Generate Your Full Report',
                description:
                  'Paste into Claude and receive your comprehensive brand strategy report instantly—free.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start"
                variants={fadeInUp}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-bg-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-teal-500 text-sm font-medium uppercase tracking-wider">
                Your Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Hi, I&apos;m Francis Kiing
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  I know what it&apos;s like to feel stuck—to have skills, experience, and a
                  burning desire to help others, but no clear path to turn it into a business.
                </p>
                <p>
                  After years of helping entrepreneurs find their voice and build their brands,
                  I&apos;ve developed this assessment to guide you through the exact process
                  I use with my clients.
                </p>
                <p>
                  This isn&apos;t another generic quiz. It&apos;s a deep dive into who you are,
                  who you serve, and how you can package your unique gifts into something
                  the world will pay for.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center">
                <div className="text-8xl">FK</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            What Others Are Saying
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                name: 'Ann Njambi',
                role: 'Business Coach',
                quote:
                  'This assessment completely transformed how I see my business. For the first time, I have absolute clarity on who I serve and how to talk about what I do. The questions forced me to dig deep, and the insights were invaluable.',
              },
              {
                name: 'Kevin Kamau',
                role: 'Creative Entrepreneur',
                quote:
                  'I\'ve taken countless quizzes and courses, but nothing came close to this. The brand strategy report gave me a complete roadmap—from my messaging to my offer structure. I finally feel confident about my direction.',
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-text-muted text-sm">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <FAQItem
              question="How long does the assessment take?"
              answer="The assessment takes about 45 minutes to complete. We recommend finding a quiet space and answering thoughtfully for the best results."
            />
            <FAQItem
              question="Is this really free?"
              answer="Yes! The entire assessment and brand strategy report are completely free. You'll get a beautifully formatted prompt to paste into Claude AI for your comprehensive personalized report."
            />
            <FAQItem
              question="What happens after I complete the assessment?"
              answer="You'll receive your brand strategy summary with key themes and insights. Then, simply copy the provided prompt and paste it into Claude AI to generate your full, comprehensive brand strategy report instantly."
            />
            <FAQItem
              question="Can I save my progress and come back later?"
              answer="Yes, your progress is automatically saved in your browser. You can close the tab and return anytime to continue where you left off."
            />
            <FAQItem
              question="Who is this assessment for?"
              answer="This assessment is perfect for coaches, consultants, creatives, and service providers who have skills and experience but struggle to package it into a clear, compelling brand."
            />
            <FAQItem
              question="What makes this different from other brand assessments?"
              answer="This isn't a generic quiz. It's a deep strategic framework designed to uncover your unique brand DNA—your story, your audience, your positioning, and your path to monetization."
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeInUp}
            >
              Ready to get clarity on your brand?
            </motion.h2>

            <motion.div
              className="space-y-3 mb-8 text-left max-w-md mx-auto"
              variants={fadeInUp}
            >
              {[
                'Your unique brand essence and positioning',
                'Exactly who you serve and how to reach them',
                'A messaging framework that makes content creation easy',
                'Offer ideas with a clear monetization roadmap',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/start">
                <Button size="lg" className="group">
                  Start My Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-bg-tertiary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} MASSOKO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-bg-tertiary rounded-xl overflow-hidden"
      variants={fadeInUp}
    >
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 text-text-secondary">{answer}</p>
      </motion.div>
    </motion.div>
  )
}
