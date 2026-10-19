import { CATEGORIES } from '../../data'
import { formatCount } from '../../utils/format'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// Nothing checked = all categories (guide section 9).
function SearchSidebar({ checked, counts, onChange }) {
  const allChecked = checked.size === CATEGORIES.length

  function toggle(category) {
    const next = new Set(checked)
    if (next.has(category)) next.delete(category)
    else next.add(category)
    onChange(next)
  }

  return (
    <aside
      aria-label="ফিল্টার"
      className="self-start rounded-card border border-line bg-surface p-4 md:sticky md:top-24"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-ink">ফিল্টার</h2>
        <button
          type="button"
          onClick={() => onChange(allChecked ? new Set() : new Set(CATEGORIES))}
          className={`min-h-[44px] px-1 text-sm font-semibold text-brand hover:underline ${FOCUS}`}
        >
          {allChecked ? 'সব বাদ দিন' : 'সব নির্বাচন'}
        </button>
      </div>

      <ul>
        {CATEGORIES.map((category) => (
          <li key={category}>
            <label
              className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-2 rounded-btn hover:bg-hover ${FOCUS}`}
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={checked.has(category)}
                  onChange={() => toggle(category)}
                  className="h-[18px] w-[18px] accent-brand"
                />
                <span className="text-sm text-ink">{category}</span>
              </span>
              <span className="text-xs text-muted">
                {formatCount(counts[category] || 0)} টি
              </span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SearchSidebar
