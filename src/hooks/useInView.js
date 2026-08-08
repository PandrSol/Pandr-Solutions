import { useEffect, useRef, useState } from 'react'

/**
 * useInView — small IntersectionObserver hook. Fires once by default,
 * returns [ref, inView].
 *
 * Perfect for touch/mobile animations that need to be scroll-driven
 * because there's no cursor.
 */
export function useInView({ threshold = 0.15, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) io.disconnect()
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}
