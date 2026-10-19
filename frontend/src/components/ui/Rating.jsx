import { Star } from 'lucide-react'
import { formatCount } from '../../utils/format'

function Rating({ value = 0, count, size = 14, showCount = true, className = '' }) {
  const label =
    `${value} রেটিং` + (count != null ? `, ${formatCount(count)} রিভিউ` : '')

  return (
    <span
      aria-label={label}
      className={`inline-flex items-center gap-1 text-sm text-muted ${className}`}
    >
      <Star size={size} className="fill-accent text-accent" aria-hidden="true" />
      <span className="font-semibold text-ink">{value}</span>
      {showCount && count != null && <span>({formatCount(count)} রিভিউ)</span>}
    </span>
  )
}

export default Rating
