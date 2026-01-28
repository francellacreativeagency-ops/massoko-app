'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'teal' | 'orange' | 'default'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    orange: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
    default: 'bg-bg-tertiary text-text-secondary border-bg-tertiary',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`
        inline-flex items-center
        font-medium
        rounded-full
        border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
