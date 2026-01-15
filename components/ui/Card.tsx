import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  hover?: boolean
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  hover = false,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-md',
    md: 'p-lg',
    lg: 'p-xl',
  }

  return (
    <div
      className={cn(
        'bg-surface border-3 border-border shadow-brutal',
        'transition-all duration-200 ease-brutal',
        hover && 'hover:shadow-brutal-hover hover:translate-x-1 hover:-translate-y-1 cursor-pointer',
        variant === 'accent' && 'border-accent',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
