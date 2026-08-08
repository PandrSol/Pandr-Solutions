import { useEffect, useRef, useState } from 'react'

/**
 * ScrambleText — shows `text` normally, but when its parent enters a
 * hover state (via CSS parent hover matching a `hoverSelector`) it
 * briefly scrambles through random chars before settling on the target.
 *
 * Usage:
 *   <ScrambleText text="Home" triggerRef={linkRef} />
 */
export default function ScrambleText({ text, triggerRef, chars = '!<>-_\\/[]{}—=+*^?#' }) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(0)

  useEffect(() => setDisplay(text), [text])

  useEffect(() => {
    const el = triggerRef?.current
    if (!el) return

    const scramble = () => {
      cancelAnimationFrame(rafRef.current)
      const from = display
      const to = text
      const length = Math.max(from.length, to.length)
      const queue = []
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 12)
        const end = start + Math.floor(Math.random() * 12) + 6
        queue.push({
          from: from[i] || '',
          to:   to[i] || '',
          start,
          end,
          char: '',
        })
      }
      let frame = 0
      const step = () => {
        let output = ''
        let complete = 0
        for (const q of queue) {
          if (frame >= q.end) {
            complete++
            output += q.to
          } else if (frame >= q.start) {
            if (!q.char || Math.random() < 0.28) {
              q.char = chars[Math.floor(Math.random() * chars.length)]
            }
            output += q.char
          } else {
            output += q.from
          }
        }
        setDisplay(output)
        if (complete < queue.length) {
          frame++
          rafRef.current = requestAnimationFrame(step)
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    el.addEventListener('mouseenter', scramble)
    return () => {
      el.removeEventListener('mouseenter', scramble)
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, triggerRef, chars])

  return <span>{display}</span>
}
