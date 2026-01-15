import { cn } from '@/lib/utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function Display({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('font-sans text-5xl font-bold leading-tight', className)}>
      {children}
    </h1>
  )
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('font-sans text-3xl font-bold leading-tight', className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn('font-sans text-2xl font-medium', className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('font-sans text-xl font-medium', className)}>
      {children}
    </h3>
  )
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn('font-body text-base leading-relaxed', className)}>
      {children}
    </p>
  )
}

export function Quote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('font-sans text-xl font-medium italic leading-relaxed', className)}>
      {children}
    </blockquote>
  )
}

export function Small({ children, className }: TypographyProps) {
  return (
    <p className={cn('font-body text-sm', className)}>
      {children}
    </p>
  )
}
