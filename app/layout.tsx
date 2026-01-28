import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MASSOKO | Brand Strategy Assessment',
  description: 'Discover your brand essence, positioning, and strategy with our free assessment. Get clarity on who you serve, what you offer, and how to talk about it.',
  keywords: ['brand strategy', 'personal brand', 'brand assessment', 'business coaching', 'brand positioning'],
  authors: [{ name: 'Francis Kiing' }],
  openGraph: {
    title: 'MASSOKO | Brand Strategy Assessment',
    description: 'Discover your brand essence, positioning, and strategy with our free assessment.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-primary text-text-primary min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
