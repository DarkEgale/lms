import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import Select from '../components/ui/Select'
import PriceTag from '../components/ui/PriceTag'
import { useCart } from '../context/CartContext'
import { getItemBySlug } from '../data'
import {
  validateName,
  validatePhone,
  validateEmail,
  validateRequired,
} from '../utils/validate'

const QUALIFICATIONS = [
  'এসএসসি',
  'এইচএসসি',
  'ডিপ্লোমা',
  'স্নাতক',
  'স্নাতকোত্তর',
  'অন্যান্য',
]

const BATCHES = ['নভেম্বর ব্যাচ', 'ডিসেম্বর ব্যাচ', 'উইকেন্ড ব্যাচ']

const EMPTY = { name: '', phone: '', email: '', qualification: '', batch: '' }

function Placeholder({ text }) {
  return <div className="py-16 text-center text-muted">{text}</div>
}

export default function Enroll() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = getItemBySlug(slug)
  const { enrollDraft, setEnrollDraft } = useCart()
  const [form, setForm] = useState({ ...EMPTY })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  // Keep the draft so the data persists when the user comes back to edit.
  useEffect(() => {
    if (
      enrollDraft &&
      enrollDraft.slug === slug &&
      Object.values(form).every((value) => !value)
    ) {
      setForm(enrollDraft.data)
    }
  }, [enrollDraft, slug, form])

  const set = (key) => (event) => {
    const value = event.target.value
    const next = { ...form, [key]: value }
    setForm(next)
    setEnrollDraft({ slug, data: next })
  }

  function validate() {
    const next = {
      name: validateName(form.name),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
      qualification: validateRequired(form.qualification, 'শিক্ষাগত যোগ্যতা বেছে নিন'),
      batch: validateRequired(form.batch, 'পছন্দের ব্যাচ বেছে নিন'),
    }
    const found = Object.fromEntries(Object.entries(next).filter(([, message]) => message))
    setErrors(found)
    return Object.keys(found).length === 0
  }

  function onSubmit(event) {
    event.preventDefault()
    setStatus('')
    if (!validate()) return
    setEnrollDraft({ slug, data: form })
    setStatus('নথি সংরক্ষণ করা হয়েছে')
    navigate('/checkout')
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted">
        <Link to="/" className="text-brand hover:underline">
          হোম
        </Link>{' '}
        <span className="mx-1">/</span>{' '}
        <Link to={`/courses/${slug}`} className="text-brand hover:underline">
          {item.nameBn}
        </Link>{' '}
        <span className="mx-1">/</span>{' '}
        <span className="font-semibold text-ink">ভর্তি ফরম</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-2xl font-bold text-ink">শিক্ষার্থীর বিবরণ</h1>
          <p className="text-sm text-muted">
            সকল ক্ষেত্র পূরণ করুন। জমাদানের পর চেকআউটে নিয়ে যাওয়া হবে।
          </p>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Field
              label="পুরো নাম"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              placeholder="আপনার পুরো নাম লিখুন"
              autoComplete="name"
            />
            <Field
              label="ফোন নম্বর"
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
              placeholder="+8801XXXXXXXXX"
              autoComplete="tel"
            />
            <Field
              label="ইমেইল"
              type="email"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Select
              label="শিক্ষাগত যোগ্যতা"
              value={form.qualification}
              onChange={set('qualification')}
              options={QUALIFICATIONS}
              placeholder="বেছে নিন"
              error={errors.qualification}
            />
            <Select
              label="পছন্দের ব্যাচ"
              value={form.batch}
              onChange={set('batch')}
              options={BATCHES}
              placeholder="বেছে নিন"
              error={errors.batch}
            />

            {status && (
              <p className="rounded-btn border border-[#16a34a]/30 bg-[#16a34a]/10 px-4 py-3 text-sm font-semibold text-[#15803d]">
                {status}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              চেকআউটে যান
            </Button>
          </form>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <Badge variant="course">কোর্স</Badge>
            <h2 className="text-lg font-bold text-ink">{item.nameBn}</h2>
            <p className="text-sm text-muted">{item.category}</p>
            <PriceTag price={item.price} oldPrice={item.oldPrice} size="md" />
            <p className="mt-3 text-sm text-muted leading-relaxed">
              উপরের কোর্সে ভর্তির জন্য শিক্ষার্থীর তথ্য জমা দিন।
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
