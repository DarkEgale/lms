const VARIANTS = {
  product: 'bg-accent/20 text-ink',
  course: 'bg-brand/15 text-brand',
  best: 'bg-accent text-footer',
}

function Badge({ variant = 'product', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
