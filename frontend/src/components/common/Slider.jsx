import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSlider } from '../../hooks/useSlider'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// One generic horizontal scroll-snap row for the services slider and every
// category row. Children are the slide items (they carry their own width,
// shrink-0 and snap-start).
function Slider({
  children,
  autoplay = 0,
  loop = true,
  ariaLabel = 'স্লাইডার',
  className = '',
  showArrows = true,
}) {
  const { trackRef, step, handlers, onKeyDown } = useSlider({ interval: autoplay, loop })

  return (
    <div className={`relative ${className}`} {...handlers}>
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 outline-none"
      >
        {children}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="আগের স্লাইড"
            className={`absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md hover:bg-hover md:flex ${FOCUS}`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="পরবর্তী স্লাইড"
            className={`absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md hover:bg-hover md:flex ${FOCUS}`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}

export default Slider
