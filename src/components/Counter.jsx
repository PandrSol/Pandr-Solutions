import { useEffect, useRef, useState } from 'react'

/**
 * Counter — animates from 0 to `to` when it scrolls into view.
 * Renders `prefix + value + suffix`. Handles floats via `decimals`.
 */
export default function Counter({
  to,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  style,
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (t) => {
            const p = Math.min(1, (t - start) / (duration * 1000))
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(to * eased)
            if (p < 1) requestAnimationFrame(step)
            else setDisplay(to)
          }
          requestAnimationFrame(step)
          io.disconnect()
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  const shown = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString()

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{shown}{suffix}
    </span>
  )
}
