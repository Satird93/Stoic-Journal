import { cn } from '@/lib/utils'

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  multiline?: boolean
  rows?: number
  className?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  multiline = false,
  rows = 4,
  className,
}: InputProps) {
  const baseClasses = cn(
    'w-full px-md py-md',
    'bg-surface text-text border-3 border-border',
    'transition-all duration-200 ease-brutal',
    'focus:outline-none focus:border-accent focus:shadow-brutal-sm',
    'placeholder:text-text-secondary',
    error && 'border-red-500',
    disabled && 'opacity-50 cursor-not-allowed'
  )

  if (multiline) {
    return (
      <div className="space-y-sm">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(baseClasses, 'resize-none', className)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(baseClasses, className)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
