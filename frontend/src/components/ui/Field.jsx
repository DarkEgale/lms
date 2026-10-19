import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function Field({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId()
  const fieldId = id || autoId
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (visible ? 'text' : 'password') : type

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`h-[46px] w-full rounded-btn border bg-surface px-3.5 text-ink placeholder:text-muted ${FOCUS} ${
            isPassword ? 'pr-12' : ''
          } ${error ? 'border-error' : 'border-line'}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
            className={`absolute right-1 top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-btn text-muted hover:text-ink ${FOCUS}`}
          >
            {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default Field
