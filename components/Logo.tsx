'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <Link href="/" className={`font-bold ${sizes[size]} ${className}`}>
      <span className="text-teal-500">MASS</span>
      <span className="text-orange-500">OKO</span>
    </Link>
  )
}
