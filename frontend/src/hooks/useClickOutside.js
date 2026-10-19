import { useEffect } from 'react'

export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return
    function onMouseDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [ref, handler, active])
}
