import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Rating from '../ui/Rating'
import PriceTag from '../ui/PriceTag'
import { getImage } from '../../utils/image'

// One card for the featured grid, category rows and search results.
function ItemCard({ item, variant = 'default', buyersLabel, className = '' }) {
  const big = variant === 'big'
  const href = item.type === 'product' ? `/products/${item.slug}` : `/courses/${item.slug}`

  return (
    <Link
      to={href}
      className={`group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,.12)] ${className}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${big ? 'h-[220px] sm:h-[300px]' : 'h-[150px]'}`}
        style={{ backgroundColor: item.color }}
      >
        <img
          src={getImage(item.slug, 600, 450)}
          width={600}
          height={450}
          loading="lazy"
          alt={`${item.nameBn} ডেমো ছবি`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {big ? (
          <Badge variant="best">সেরা বিক্রিত</Badge>
        ) : (
          <Badge variant={item.type === 'product' ? 'product' : 'course'}>
            {item.type === 'product' ? 'পণ্য' : 'কোর্স'}
          </Badge>
        )}

        <h3 className={`font-semibold leading-snug text-ink ${big ? 'text-xl' : 'text-[17px]'}`}>
          {item.nameBn}
        </h3>

        <Rating value={item.rating} count={item.reviews} />

        {big && <p className="text-sm text-muted">{item.description}</p>}
        {buyersLabel && <p className="text-sm font-semibold text-brand">{buyersLabel}</p>}

        <PriceTag price={item.price} oldPrice={item.oldPrice} size={big ? 'lg' : 'sm'} />

        <span
          className={`mt-auto flex w-full items-center justify-center rounded-btn bg-brand font-semibold text-brand-ink transition group-hover:opacity-90 ${
            big ? 'h-12 text-lg' : 'h-11'
          }`}
        >
          {item.type === 'product' ? 'কিনুন' : 'ভর্তি হোন'}
        </span>
      </div>
    </Link>
  )
}

export default ItemCard
