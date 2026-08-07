import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * RotatingWord — cycles through `words`, keeping horizontal width stable
 * by measuring the widest word once mounted, then reserving that width.
 */
export default function RotatingWord({ words, interval = 2400, color = 'var(--lime)' }) {
  const [i, setI] = useState(0)
  const [minWidth, setMinWidth] = useState(0)
  const measureRef = useRef(null)

  useEffect(() => {
    // measure widest word after mount
    const el = measureRef.current
    if (!el) return
    const spans = el.querySelectorAll('span')
    let max = 0
    spans.forEach(s => { if (s.offsetWidth > max) max = s.offsetWidth })
    setMinWidth(max)
  }, [words])

  useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])

  return (
    <>
      {/* off-screen measurer — same font/size as parent via inherit */}
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          top: -9999,
          left: -9999,
        }}
      >
        {words.map(w => <span key={w}>{w}</span>)}
      </span>

      <span
        style={{
          display: 'inline-block',
          minWidth: minWidth ? `${minWidth}px` : undefined,
          color,
          verticalAlign: 'baseline',
          whiteSpace: 'nowrap',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ opacity: 0, y: '0.35em' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-0.35em' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'inline-block' }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}
