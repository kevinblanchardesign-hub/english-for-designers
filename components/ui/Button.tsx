import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  magnetic?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-navy text-white hover:bg-brand-navy-dark shadow-brand-lg hover:shadow-glow active:scale-[0.98] glow-blue',
  secondary:
    'bg-brand-azure text-brand-navy hover:bg-brand-azure-dark border border-brand-navy/20',
  outline:
    'border-2 border-brand-navy text-brand-navy hover:bg-brand-azure bg-transparent',
  ghost:
    'text-brand-dark hover:bg-gray-100 hover:text-brand-navy bg-transparent',
  danger:
    'bg-brand-error text-white hover:opacity-90 shadow-md',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
  xl: 'px-9 py-4 text-base rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, magnetic, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        data-cursor={magnetic ? 'magnetic' : undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading && (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
