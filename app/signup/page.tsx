'use client'

import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/lib/auth'
import { useAssessmentStore } from '@/lib/store'

export default function SignupPage() {
  const router = useRouter()
  const { signup, isAuthenticated, isLoading } = useAuthStore()
  const { setUser } = useAssessmentStore()

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/instructions')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim()) {
      setError('Please enter your first name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!password) {
      setError('Please enter a password.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const result = await signup(email, password, firstName)

    if (result.success) {
      // Also set user in assessment store
      setUser({ email: email.toLowerCase().trim(), firstName: firstName.trim() })
      router.push('/instructions')
    } else {
      setError(result.error || 'Signup failed. Please try again.')
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
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
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
              <UserPlus className="w-8 h-8 text-teal-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Create Your Account</h1>
            <p className="text-text-secondary">
              Save your progress and build your brand over time
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6 space-y-2">
            {[
              'Save your answers and come back anytime',
              'Update and refine your brand as you grow',
              'Access your brand strategy report forever',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Creating account...'
                ) : (
                  <>
                    Create Account & Start
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-muted text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-500 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </Card>

          <p className="text-center text-text-muted text-sm mt-6">
            Or{' '}
            <Link href="/start" className="text-teal-500 hover:underline">
              continue as guest
            </Link>{' '}
            (answers saved locally only)
          </p>
        </motion.div>
      </main>
    </div>
  )
}
