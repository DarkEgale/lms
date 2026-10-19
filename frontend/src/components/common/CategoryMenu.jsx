import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { CATEGORIES, getCategoryStats } from '../../data'
import { formatCount } from '../../utils/format'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function countLabel(stats, category) {
  const entry = stats[category]
  if (!entry) return ''
  if (entry.product > 0) return `${formatCount(entry.product)}টি পণ্য`
  if (entry.course > 0) return `${formatCount(entry.course)}টি কোর্স`
  return ''
}

function CategoryMenu() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useClickOutside(wrapRef, () => setOpen(false), open)

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const stats = getCategoryStats()
  const params = new URLSearchParams(location.search)
  const active = params.get('cat') || ''
  const total = Object.values(stats).reduce(
    (sum, entry) => sum + entry.product + entry.course,
    0,
  )

  function select(category) {
    setOpen(false)
    navigate(category ? `/search?cat=${encodeURIComponent(category)}` : '/search')
  }

  const rowClass = (isActive) =>
    `flex w-full items-center justify-between gap-2 rounded-btn px-3 py-2.5 text-left text-sm hover:bg-hover ${
      isActive ? 'bg-brand/10 font-semibold text-brand' : 'text-ink'
    } ${FOCUS}`

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex h-11 max-w-[170px] items-center gap-2 rounded-btn border border-line bg-surface px-3 text-sm font-medium text-ink hover:bg-hover ${FOCUS}`}
      >
        <span className="truncate">{active || 'সব ক্যাটাগরি'}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="ক্যাটাগরি"
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-64 rounded-card border border-line bg-surface p-2 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => select('')}
            className={rowClass(!active)}
          >
            <span>সব ক্যাটাগরি</span>
            <span className="text-xs font-normal text-muted">
              {formatCount(total)}টি আইটেম
            </span>
          </button>
          <hr className="my-1 border-line" />
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="menuitem"
              aria-current={active === category ? 'true' : undefined}
              onClick={() => select(category)}
              className={rowClass(active === category)}
            >
              <span>{category}</span>
              <span className="text-xs font-normal text-muted">
                {countLabel(stats, category)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryMenu
