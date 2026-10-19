import { toEnglishDigits } from './format'

export function validateRequired(value, message) {
  return String(value).trim() ? '' : message
}

export function validateName(value) {
  return validateRequired(value, 'পুরো নাম লিখুন')
}

export function validateEmail(value) {
  const trimmed = String(value).trim()
  if (!trimmed) return 'ইমেইল লিখুন'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'সঠিক ইমেইল লিখুন'
  return ''
}

export function normalizePhone(value) {
  return toEnglishDigits(value).replace(/[\s-]/g, '')
}

// +88 / 88 optional, then 01, then 3–9, then eight digits.
export function validatePhone(value) {
  const phone = normalizePhone(value)
  if (!phone) return 'মোবাইল নম্বর লিখুন'
  if (!/^(\+?88)?01[3-9]\d{8}$/.test(phone)) return 'সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন'
  return ''
}

export function validatePassword(value) {
  if (!value) return 'পাসওয়ার্ড লিখুন'
  if (value.length < 8) return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে'
  return ''
}

export function validatePasswordMatch(password, confirm) {
  return password === confirm ? '' : 'পাসওয়ার্ড মিলছে না'
}

export function validateTerms(checked) {
  return checked ? '' : 'শর্তাবলিতে সম্মতি দিন'
}
