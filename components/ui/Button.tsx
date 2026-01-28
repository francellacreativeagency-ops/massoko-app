'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2'

  const variants = {
    primary:
      'bg-gradient-to-r from-teal-500 to-teal-400 text-bg-primary hover:from-teal-400 hover:to-teal-500 shadow-lg shadow-teal-500/25',
    secondary:
      'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-500 shadow-lg shadow-orange-500/25',
    outline:
      'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-bg-primary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
