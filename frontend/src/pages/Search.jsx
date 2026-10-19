import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ItemCard from '../components/common/ItemCard'
import SearchSidebar from '../components/search/SearchSidebar'
import { CATEGORIES, getItems } from '../data'
import { searchItems } from '../utils/search'
import { formatCount } from '../utils/format'

function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''

  const [checked, setChecked] = useState(() => new Set(cat ? [cat] : []))
  useEffect(() => {
    setChecked(new Set(cat ? [cat] : []))
  }, [cat])

  const items = useMemo(() => getItems(), [])

  const results = useMemo(() => {
    let list = items
    if (checked.size > 0) list = list.filter((item) => checked.has(item.category))
    if (q.trim()) list = searchItems(list, q)
    return list
  }, [items, checked, q])

  const counts = useMemo(() => {
    const base = q.trim() ? searchItems(items, q) : items
    const map = {}
    for (const category of CATEGORIES) {
      map[category] = base.filter((item) => item.category === category).length
    }
    return map
  }, [items, q])

  const heading = q
    ? `"${q}" এর জন্য ${formatCount(results.length)} টি ফলাফল`
    : `সব পণ্য ও কোর্স (${formatCount(results.length)} টি)`

  return (
    <div className="grid gap-6 pb-8 md:grid-cols-[260px_1fr]">
      <SearchSidebar checked={checked} counts={counts} onChange={setChecked} />

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-ink">{heading}</h1>
          <Button to="/" variant="outline">
            হোমে ফিরে যান
          </Button>
        </div>

        {results.length === 0 ? (
          <div className="rounded-card border-2 border-dashed border-line px-6 py-14 text-center">
            <p className="text-lg font-semibold text-ink">কিছু পাওয়া যায়নি</p>
            <p className="mt-2 text-sm text-muted">
              টিপস: বানান মিলিয়ে দেখুন বা ফিল্টার পরিবর্তন করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
            {results.map((item) => (
              <ItemCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
