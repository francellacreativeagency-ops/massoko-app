'use client'

import { motion } from 'framer-motion'
import { Mail, Shield, ArrowRight, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/Logo'
import { useAssessmentStore } from '@/lib/store'
import { useAuthStore } from '@/lib/auth'

export default function StartPage() {
  const router = useRouter()
  const setUser = useAssessmentStore((state) => state.setUser)
  const { isAuthenticated, user: authUser } = useAuthStore()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If already logged in, sync user and redirect
  useEffect(() => {
    if (isAuthenticated && authUser) {
      setUser({ firstName: authUser.firstName, email: authUser.email })
      router.push('/instructions')
    }
  }, [isAuthenticated, authUser, setUser, router])

  const validateForm = () => {
    const newErrors: { firstName?: string; email?: string } = {}

    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your first name'
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Save to store (persists to localStorage)
      setUser({ firstName: firstName.trim(), email: email.trim() })

      // Navigate to instructions
      router.push('/instructions')
    } catch {
      setErrors({ email: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-teal-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3">
              Let&apos;s Get Started
            </h1>
            <p className="text-text-secondary">
              Enter your details to begin your Brand Strategy Assessment
            </p>
          </div>

          {/* Account Benefits */}
          <Card className="mb-6 border-teal-500/30 bg-teal-500/5">
            <p className="text-sm text-text-secondary mb-3">
              <strong className="text-teal-500">Want to save your progress?</strong>
            </p>
            <p className="text-sm text-text-muted mb-4">
              Create a free account to save answers, update them anytime, and access your brand strategy as your business grows.
            </p>
            <Link href="/signup">
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Free Account
              </Button>
            </Link>
          </Card>

          {/* Guest Form */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bg-tertiary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-bg-primary px-4 text-text-muted">or continue as guest</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              disabled={isSubmitting}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isSubmitting}
              className="mt-6 group"
            >
              {isSubmitting ? (
                'Starting...'
              ) : (
                <>
                  Continue as Guest
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% free</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>No spam ever</span>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted mt-4">
            Guest answers are saved locally in your browser only.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
