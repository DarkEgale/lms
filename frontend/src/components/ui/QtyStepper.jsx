import { Minus, Plus } from 'lucide-react'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function QtyStepper({ value, onChange, min = 1, className = '' }) {
  return (
    <div
      className={`inline-flex h-[44px] items-center rounded-btn border border-line bg-surface ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="পরিমাণ কমান"
        className={`flex h-[44px] w-[44px] items-center justify-center rounded-btn text-ink hover:bg-hover disabled:opacity-40 ${FOCUS}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span aria-live="polite" className="w-10 text-center font-semibold text-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="পরিমাণ বাড়ান"
        className={`flex h-[44px] w-[44px] items-center justify-center rounded-btn text-ink hover:bg-hover ${FOCUS}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

export default QtyStepper
