import ItemCard from '../common/ItemCard'
import { getItemBySlug } from '../../data'

const NORMAL_SLUGS = [
  'noise-cancelling-headphone',
  'react-js-masterclass',
  'wireless-keyboard-mouse-combo',
  'graphic-design-masterclass',
]

// One 2x2 big card (best seller of the month) + four normal cards.
function FeaturedGrid() {
  const big = getItemBySlug('pro-gaming-laptop')
  const normal = NORMAL_SLUGS.map(getItemBySlug).filter(Boolean)

  if (!big) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ItemCard
        item={big}
        variant="big"
        buyersLabel="৩২০+ জন কিনেছেন"
        className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
      />
      {normal.map((item) => (
        <ItemCard key={item.slug} item={item} />
      ))}
    </div>
  )
}

export default FeaturedGrid
