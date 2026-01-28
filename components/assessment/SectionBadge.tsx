'use client'

interface SectionBadgeProps {
  title: string
  subtitle: string
  color: 'teal' | 'orange'
}

export function SectionBadge({ title, subtitle, color }: SectionBadgeProps) {
  const colors = {
    teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    orange: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  }

  const dotColors = {
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
  }

  return (
    <div
      className={`
        inline-flex items-center gap-3
        px-4 py-2
        rounded-full
        border
        ${colors[color]}
      `}
    >
      <span className={`w-2 h-2 rounded-full ${dotColors[color]}`} />
      <span className="font-medium">{title}</span>
      <span className="text-text-muted">|</span>
      <span className="text-text-secondary text-sm">{subtitle}</span>
    </div>
  )
}
