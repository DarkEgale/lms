import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-brand text-brand-ink hover:opacity-90',
  accent: 'bg-accent text-footer hover:brightness-95',
  outline: 'border border-line bg-surface text-ink hover:bg-hover',
  link: 'bg-transparent px-0 text-brand hover:underline',
}

const SIZES = {
  md: 'h-[46px] px-5',
  lg: 'h-[48px] px-6',
}

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function Button({
  variant = 'primary',
  size = 'md',
  to,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition',
    VARIANTS[variant],
    SIZES[size],
    disabled ? 'pointer-events-none opacity-60' : '',
    FOCUS,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default Button
