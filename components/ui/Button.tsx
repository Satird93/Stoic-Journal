import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const baseClasses = 'font-medium transition-all duration-200 ease-brutal border-3'

  const variantClasses = {
    primary: cn(
      'bg-text text-surface border-border shadow-brutal-sm',
      'hover:border-accent hover:shadow-brutal-hover',
      'active:shadow-none active:translate-x-1 active:translate-y-1'
    ),
    secondary: cn(
      'bg-surface text-text border-border shadow-brutal-sm',
      'hover:border-accent',
      'active:shadow-none'
    ),
    ghost: cn(
      'bg-transparent text-text border-transparent',
      'hover:border-b-3 hover:border-text'
    ),
  }

  const sizeClasses = {
    sm: 'px-md py-sm text-sm',
    md: 'px-lg py-md text-base',
    lg: 'px-xl py-md text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
