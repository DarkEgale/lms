import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import { SLIDES } from '../../data/slides'
import { getImage } from '../../utils/image'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white'

function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const onChange = (event) => {
      reducedMotion.current = event.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      if (reducedMotion.current) return
      setIndex((current) => (current + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused])

  const go = (dir) =>
    setIndex((current) => (current + dir + SLIDES.length) % SLIDES.length)

  return (
    <section
      aria-label="প্রচারণা স্লাইডার"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
    >
      {/* Grid stack: container height = tallest slide, all slides crossfade. */}
      <div className="grid overflow-hidden rounded-panel">
        {SLIDES.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.id}
              inert={!active}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 flex flex-col gap-5 rounded-panel p-6 pb-20 transition-opacity duration-500 md:flex-row md:items-center md:gap-8 md:p-12 md:pb-[84px] ${
                active ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              style={{ backgroundColor: slide.bg }}
            >
              <div className="order-first h-[150px] shrink-0 overflow-hidden rounded-card md:order-2 md:h-[300px] md:w-[38%]">
                <img
                  src={getImage(slide.seed, 800, 600)}
                  width={800}
                  height={600}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col items-start gap-4 md:order-1">
                <span className="rounded-pill bg-white/15 px-3 py-1 text-sm font-semibold text-white">
                  {slide.badge}
                </span>
                <h2 className="text-[clamp(28px,4.2vw,46px)] font-bold leading-tight text-white">
                  {slide.title}
                </h2>
                <p className="max-w-[46ch] text-[18px] text-white/85">{slide.text}</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="accent" size="lg" to={slide.cta1.to}>
                    {slide.cta1.label}
                  </Button>
                  <Button variant="white" size="lg" to={slide.cta2.to}>
                    {slide.cta2.label}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls: dots left, round arrows right. */}
      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between md:inset-x-14 md:bottom-6">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`স্লাইড ${i + 1}`}
              aria-current={i === index || undefined}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-[30px] bg-accent' : 'w-2.5 bg-white/40 hover:bg-white/70'
              } ${FOCUS}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="আগের স্লাইড"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white hover:bg-white/25 ${FOCUS}`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="পরবর্তী স্লাইড"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white hover:bg-white/25 ${FOCUS}`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
