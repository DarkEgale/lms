// Guide section 9: Bangla + English aware search over demo items.

const CATEGORY_EN = {
  ল্যাপটপ: 'laptop laptops notebook computer shop product products',
  'কম্পিউটার এক্সেসরিজ':
    'computer accessories keyboard mouse headphone monitor webcam shop product products',
  'ওয়েব ডেভেলপমেন্ট': 'web development programming coding developer course courses class training',
  'গ্রাফিক ডিজাইন': 'graphic design designer creative course courses class training',
  'ডিজিটাল মার্কেটিং': 'digital marketing seo ads social course courses class training',
}

const TYPE_EN = {
  product: 'পণ্য product products shop store',
  course: 'কোর্স course courses class training',
}

export function normalize(value) {
  return String(value).normalize('NFC').toLowerCase()
}

export function buildHaystack(item) {
  return normalize(
    [
      item.nameBn,
      item.category,
      TYPE_EN[item.type],
      item.nameEn,
      CATEGORY_EN[item.category],
      item.description || '',
    ].join(' '),
  )
}

// Every whitespace-separated word of the query must appear in the haystack.
export function searchItems(items, query) {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (words.length === 0) return items
  return items.filter((item) => {
    const haystack = buildHaystack(item)
    return words.every((word) => haystack.includes(word))
  })
}
