'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-secondary text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full
            bg-bg-tertiary
            border border-bg-tertiary
            rounded-xl
            px-4 py-3
            text-text-primary
            placeholder-text-muted
            focus:outline-none
            focus:ring-2
            focus:ring-teal-500
            focus:border-transparent
            transition-all
            duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-secondary text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full
            bg-bg-tertiary
            border border-bg-tertiary
            rounded-xl
            px-4 py-3
            text-text-primary
            placeholder-text-muted
            focus:outline-none
            focus:ring-2
            focus:ring-teal-500
            focus:border-transparent
            transition-all
            duration-200
            resize-none
            min-h-[120px]
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
