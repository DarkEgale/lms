import { Link } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="দক্ষতা — হোমে ফিরে যান"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-brand text-accent">
        <TrendingUp size={20} aria-hidden="true" />
      </span>
      <span className="text-[22px] font-bold leading-none text-current">দক্ষতা</span>
    </Link>
  )
}

export default Logo
