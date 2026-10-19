import { useParams, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, Check, ArrowRight } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import QtyStepper from '../components/ui/QtyStepper'
import { useCart } from '../context/CartContext'
import { getItemBySlug } from '../data'
import { formatPrice, discountPercent, toBanglaDigits } from '../utils/format'

function Placeholder({ text }) {
  return <div className="py-16 text-center text-muted">{text}</div>
}

// Big colored SVG art panel (min-height 380px per guide).
function ProductArt({ color }) {
  return (
    <div
      className="min-h-[380px] w-full overflow-hidden rounded-card border border-line"
      style={{ backgroundColor: color }}
    >
      <svg className="w-full h-full" viewBox="0 0 32 18" preserveAspectRatio="xMidYMid slice">
        <rect width="24" height="14" x="4" y="2" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <rect width="18" height="2.5" x="7" y="8" rx="1.25" fill="rgba(255,255,255,0.28)" />
        <path d="M2 15.5h28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="7" cy="14.5" r="1.1" fill="rgba(255,255,255,0.45)" />
        <circle cx="25" cy="14.5" r="1.1" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = getItemBySlug(slug)
  const { add, clear } = useCart()
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState('')

  if (!item) return <Placeholder text="এই পণ্যটি পাওয়া যায়নি" />

  const pct = discountPercent(item.price, item.oldPrice)
  const inStock = (item.stock || 0) > 0

  function handleAddToCart() {
    add(item, qty)
    setStatus(`${toBanglaDigits(qty)}টি কার্টে যোগ করা হয়েছে`)
    setTimeout(() => setStatus(''), 3500)
  }

  function handleBuyNow() {
    clear()
    add(item, qty)
    navigate('/checkout')
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted">
        <Link to="/" className="text-brand hover:underline">
          হোম
        </Link>{' '}
        <span className="mx-1">/</span>
        <span className="mx-1 text-ink">পণ্য</span>{' '}
        <span className="mx-1">/</span>
        <span className="font-semibold text-ink">{item.nameBn}</span>
      </nav>

      <div className="grid gap-6 sm:grid-cols-2 items-start">
        <ProductArt color={item.color} />

        <div className="space-y-5">
          <Badge variant={item.type === 'product' ? 'product' : 'course'}>
            {item.type === 'product' ? 'পণ্য' : 'কোর্স'}
          </Badge>

          <h1 className="text-2xl font-bold text-ink">{item.nameBn}</h1>

          <div className="flex items-center gap-2 text-sm">
            <Star size={16} className="fill-accent text-accent" aria-hidden="true" />
            <span className="font-semibold">{item.rating}</span>
            <span className="text-muted">({toBanglaDigits(item.reviews)} রিভিউ)</span>
            <span className="mx-1 text-muted">·</span>
            <span className={inStock ? 'font-semibold text-[#15803d]' : 'font-semibold text-error'}>
              {inStock ? 'স্টকে আছে' : 'স্টক নেই'}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-bold text-brand text-[32px]">{formatPrice(item.price)}</span>
            {item.oldPrice > item.price && <s className="text-muted">{formatPrice(item.oldPrice)}</s>}
            {pct > 0 && (
              <span className="rounded-pill bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                {toBanglaDigits(pct)}% ছাড়
              </span>
            )}
          </div>

          {status && (
            <p className="rounded-btn border border-[#16a34a]/30 bg-[#16a34a]/10 px-4 py-3 text-sm font-semibold text-[#15803d]">
              {status}
            </p>
          )}

          <div className="flex flex-col gap-2">
            {[
              'আসল পণ্য',
              '১ বছরের ওয়ারেন্টি',
              '৭ দিনের মধ্যে রিফান্ড বা এক্সচেঞ্জ',
              'সারা দেশে ক্যাশ অন ডেলিভারি',
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="shrink-0 mt-0.5 text-accent" size={16} aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <label className="text-sm font-semibold text-ink">পরিমাণ</label>
            </div>
            <QtyStepper value={qty} onChange={setQty} min={1} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" onClick={handleAddToCart} className="w-full">
              কার্টে যোগ করুন
            </Button>
            <Button variant="accent" size="lg" onClick={handleBuyNow} className="w-full">
              এখনই কিনুন <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
