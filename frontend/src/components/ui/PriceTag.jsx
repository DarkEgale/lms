import { discountPercent, formatPrice } from '../../utils/format'

function PriceTag({ price, oldPrice, size = 'md', showDiscount = true, className = '' }) {
  const pct = discountPercent(price, oldPrice)

  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <span
        className={`font-bold text-brand ${
          size === 'lg' ? 'text-[26px] sm:text-[32px]' : 'text-lg'
        }`}
      >
        {formatPrice(price)}
      </span>
      {oldPrice > price && (
        <s className="text-sm text-muted">{formatPrice(oldPrice)}</s>
      )}
      {showDiscount && pct > 0 && (
        <span className="rounded-pill bg-accent px-2 py-0.5 text-xs font-semibold text-footer">
          {toBanglaPercent(pct)}% ছাড়
        </span>
      )}
    </span>
  )
}

function toBanglaPercent(value) {
  return String(value).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
}

export default PriceTag
