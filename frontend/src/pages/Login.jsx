import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandPanel from '../components/auth/BrandPanel'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordMatch,
  validatePhone,
  validateTerms,
} from '../utils/validate'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

const EMPTY = { name: '', email: '', phone: '', password: '', confirm: '', terms: false }

function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const isRegister = location.pathname === '/register'

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function switchTab(path) {
    setForm(EMPTY)
    setErrors({})
    setStatus('')
    navigate(path)
  }

  function onSubmit(event) {
    event.preventDefault()
    setStatus('')

    const next = isRegister
      ? {
          name: validateName(form.name),
          email: validateEmail(form.email),
          phone: validatePhone(form.phone),
          password: validatePassword(form.password),
          confirm: validatePasswordMatch(form.password, form.confirm),
          terms: validateTerms(form.terms),
        }
      : {
          email: validateEmail(form.email),
          password: validatePassword(form.password),
        }

    const found = Object.fromEntries(Object.entries(next).filter(([, message]) => message))
    setErrors(found)
    if (Object.keys(found).length === 0) {
      setStatus(isRegister ? 'রেজিস্ট্রেশন সফল হয়েছে' : 'লগইন সফল হয়েছে')
    }
  }

  const tabClass = (active) =>
    `min-h-[44px] rounded-btn px-4 text-sm font-semibold transition ${FOCUS} ${
      active ? 'bg-brand text-brand-ink' : 'text-muted hover:text-ink'
    }`

  return (
    <div className="mx-auto grid max-w-[1000px] overflow-hidden rounded-panel border border-line bg-surface md:grid-cols-2">
      <BrandPanel />

      <div className="p-6 sm:p-8">
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-btn border border-line bg-bg p-1">
          <button
            type="button"
            aria-pressed={!isRegister}
            onClick={() => switchTab('/login')}
            className={tabClass(!isRegister)}
          >
            লগইন
          </button>
          <button
            type="button"
            aria-pressed={isRegister}
            onClick={() => switchTab('/register')}
            className={tabClass(isRegister)}
          >
            রেজিস্ট্রেশন
          </button>
        </div>

        <h1 className="mb-5 text-2xl font-bold text-ink">
          {isRegister ? 'রেজিস্ট্রেশন' : 'লগইন'}
        </h1>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {isRegister && (
            <Field
              label="পুরো নাম"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              placeholder="আপনার পুরো নাম"
              autoComplete="name"
            />
          )}

          <Field
            label="ইমেইল"
            type="email"
            value={form.email}
            onChange={set('email')}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          {isRegister && (
            <Field
              label="মোবাইল নম্বর"
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
              placeholder="+8801XXXXXXXXX"
              autoComplete="tel"
            />
          )}

          <Field
            label="পাসওয়ার্ড"
            type="password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />

          {isRegister && (
            <Field
              label="পাসওয়ার্ড আবার লিখুন"
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
              autoComplete="new-password"
            />
          )}

          {isRegister && (
            <div>
              <label className="flex min-h-[44px] cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={set('terms')}
                  className="mt-1 h-[18px] w-[18px] shrink-0 accent-brand"
                />
                <span className="text-sm text-muted">
                  আমি{' '}
                  <a href="#" className="text-brand hover:underline">
                    শর্তাবলি
                  </a>{' '}
                  ও{' '}
                  <a href="#" className="text-brand hover:underline">
                    গোপনীয়তা নীতি
                  </a>{' '}
                  সম্মত
                </span>
              </label>
              {errors.terms && (
                <p role="alert" className="mt-1 text-sm text-error">
                  {errors.terms}
                </p>
              )}
            </div>
          )}

          {status && (
            <p
              role="status"
              className="rounded-btn border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-semibold text-brand"
            >
              {status}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            {isRegister ? 'রেজিস্টার করুন' : 'লগইন'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted">
          {isRegister ? (
            <>
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link to="/login" className="font-semibold text-brand hover:underline">
                লগইন করুন
              </Link>
            </>
          ) : (
            <>
              নতুন ইউজার?{' '}
              <Link to="/register" className="font-semibold text-brand hover:underline">
                রেজিস্ট্রেশন করুন
              </Link>
            </>
          )}
        </p>

        <p className="mt-2 text-sm">
          <Link to="/" className="font-semibold text-brand hover:underline">
            হোমে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
