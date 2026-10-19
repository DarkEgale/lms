import { useCallback, useEffect, useRef, useState } from 'react'

// Drives any horizontal scroll-snap track: step by one item, optional
// autoplay that loops, and pause on hover / focus / touch.
export function useSlider({ interval = 0, loop = true } = {}) {
  const trackRef = useRef(null)
  const touchTimer = useRef(null)
  const reducedMotion = useRef(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const onChange = (event) => {
      reducedMotion.current = event.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const behavior = () => (reducedMotion.current ? 'auto' : 'smooth')

  const step = useCallback(
    (dir) => {
      const track = trackRef.current
      const first = track && track.firstElementChild
      if (!track || !first) return
      const styles = window.getComputedStyle(track)
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
      const delta = first.getBoundingClientRect().width + gap
      const max = track.scrollWidth - track.clientWidth

      if (dir > 0 && track.scrollLeft >= max - 2) {
        if (loop) track.scrollTo({ left: 0, behavior: behavior() })
        return
      }
      if (dir < 0 && track.scrollLeft <= 2) {
        if (loop) track.scrollTo({ left: max, behavior: behavior() })
        return
      }
      track.scrollBy({ left: dir * delta, behavior: behavior() })
    },
    [loop],
  )

  useEffect(() => {
    if (!interval || paused) return
    const id = setInterval(() => {
      const track = trackRef.current
      if (!track || reducedMotion.current) return
      const max = track.scrollWidth - track.clientWidth
      if (max <= 0) return
      if (track.scrollLeft >= max - 2) {
        if (loop) track.scrollTo({ left: 0, behavior: behavior() })
      } else {
        step(1)
      }
    }, interval)
    return () => clearInterval(id)
  }, [interval, paused, loop, step])

  useEffect(() => () => clearTimeout(touchTimer.current), [])

  const handlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
    onTouchStart: () => {
      setPaused(true)
      clearTimeout(touchTimer.current)
    },
    onTouchEnd: () => {
      clearTimeout(touchTimer.current)
      touchTimer.current = setTimeout(() => setPaused(false), 4000)
    },
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  return { trackRef, step, handlers, onKeyDown }
}
