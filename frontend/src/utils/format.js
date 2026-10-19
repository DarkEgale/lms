const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

export function toBanglaDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)])
}

export function toEnglishDigits(value) {
  return String(value).replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
}

export function formatPrice(value) {
  return '৳' + toBanglaDigits(Number(value).toLocaleString('en-IN'))
}

export function formatCount(value) {
  return toBanglaDigits(Number(value).toLocaleString('en-IN'))
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round((1 - price / oldPrice) * 100)
}
