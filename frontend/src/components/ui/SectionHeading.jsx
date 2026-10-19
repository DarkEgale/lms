import { Link } from 'react-router-dom'

function SectionHeading({
  title,
  subtitle,
  align = 'left',
  link,
  as: Tag = 'h2',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}) {
  const centered = align === 'center'

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 ${
        centered ? 'flex-col text-center' : ''
      } ${className}`}
    >
      <div className={centered ? 'max-w-3xl' : ''}>
        <Tag className={`font-bold text-ink ${titleClassName || 'text-2xl'}`}>{title}</Tag>
        {subtitle && (
          <p className={`mt-2 text-muted ${subtitleClassName || 'text-base sm:text-lg'}`}>
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link.to}
          className="shrink-0 font-semibold text-brand hover:underline"
        >
          {link.label}
        </Link>
      )}
    </div>
  )
}

export default SectionHeading
