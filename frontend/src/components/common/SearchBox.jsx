import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// Stays in sync with the URL: clicking the logo (goes home) clears it.
function SearchBox({ className = '' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get('q') || '',
  )

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('q') || '')
  }, [location.search])

  function onSubmit(event) {
    event.preventDefault()
    const next = new URLSearchParams()
    const trimmed = query.trim()
    if (trimmed) next.set('q', trimmed)
    const cat = new URLSearchParams(location.search).get('cat')
    if (cat) next.set('cat', cat)
    const search = next.toString()
    navigate(search ? `/search?${search}` : '/search')
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`flex h-12 min-w-0 flex-1 items-center gap-2 rounded-btn border border-line bg-surface pl-3 ${className}`}
    >
      <Search size={18} aria-hidden="true" className="shrink-0 text-muted" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="কোর্স খুঁজুন"
        aria-label="কোর্স বা পণ্য খুঁজুন"
        className={`h-full min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted ${FOCUS}`}
      />
      <button
        type="submit"
        className={`mr-1 h-11 shrink-0 rounded-[8px] bg-accent px-4 text-sm font-semibold text-footer hover:brightness-95 ${FOCUS}`}
      >
        খুঁজুন
      </button>
    </form>
  )
}

export default SearchBox
