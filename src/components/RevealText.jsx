import { useEffect, useRef, useState } from 'react'

/**
 * RevealText — splits `children` into word spans, each with a clip-path
 * reveal from bottom, staggered. Uses a raw IntersectionObserver + inline
 * CSS transitions (no framer variants) so it fires reliably every time.
 */
export default function RevealText({
  children,
  className,
  style,
  stagger = 0.06,
  delay = 0,
  duration = 0.7,
  as: Tag = 'span',
}) {
  const words = String(children).split(' ')
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shown) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: i === words.length - 1 ? 0 : '0.28em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: shown ? 'translateY(0%)' : 'translateY(110%)',
              transition: `transform ${duration}s cubic-bezier(0.22,1,0.36,1)`,
              transitionDelay: `${delay + i * stagger}s`,
              willChange: 'transform',
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </Tag>
  )
}
