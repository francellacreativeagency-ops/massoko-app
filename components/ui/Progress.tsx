'use client'

import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: 'teal' | 'orange'
}

export function Progress({
  value,
  max = 100,
  className = '',
  showLabel = true,
  color = 'teal',
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100)

  const colors = {
    teal: 'from-teal-500 to-teal-400',
    orange: 'from-orange-500 to-orange-600',
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-3 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-text-muted mt-2 text-center">
          {percentage}% Complete
        </p>
      )}
    </div>
  )
}
