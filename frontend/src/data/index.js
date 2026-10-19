import { ITEMS } from './items'
import { CATEGORIES } from './categories'

export { CATEGORIES }

export function getItems() {
  return ITEMS
}

export function getItemBySlug(slug) {
  return ITEMS.find((item) => item.slug === slug) || null
}

export function getItemsByCategory(category) {
  return ITEMS.filter((item) => item.category === category)
}

// Per-category product/course counts for the navbar dropdown.
export function getCategoryStats() {
  const stats = {}
  for (const category of CATEGORIES) {
    stats[category] = { product: 0, course: 0 }
  }
  for (const item of ITEMS) {
    if (stats[item.category]) stats[item.category][item.type] += 1
  }
  return stats
}
