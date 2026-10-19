import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function Select({
  label,
  value,
  onChange,
  options = [],
  error,
  placeholder,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId()
  const fieldId = id || autoId

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`h-[46px] w-full appearance-none rounded-btn border bg-surface px-3.5 pr-10 text-ink ${FOCUS} ${
            error ? 'border-error' : 'border-line'
          }`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => {
            const item = typeof option === 'string' ? { value: option, label: option } : option
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          })}
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select
