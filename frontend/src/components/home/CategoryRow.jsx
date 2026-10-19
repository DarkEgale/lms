import Slider from '../common/Slider'
import ItemCard from '../common/ItemCard'
import SectionHeading from '../ui/SectionHeading'
import { getItemsByCategory } from '../../data'

// One category: header + a single-row slider of five 260px cards (no autoplay).
function CategoryRow({ category }) {
  const items = getItemsByCategory(category).slice(0, 5)

  if (items.length === 0) return null

  return (
    <section aria-label={category}>
      <SectionHeading
        as="h3"
        title={category}
        titleClassName="text-2xl"
        className="mb-4"
        link={{ label: 'সব দেখুন', to: `/search?cat=${encodeURIComponent(category)}` }}
      />
      <Slider ariaLabel={`${category} আইটেম`}>
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} className="w-[260px] shrink-0 snap-start" />
        ))}
      </Slider>
    </section>
  )
}

export default CategoryRow
