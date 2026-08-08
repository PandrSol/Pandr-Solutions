import { useEffect, useRef } from 'react'

/**
 * CustomCursor — a two-part cursor: a small solid dot at the pointer,
 * and a larger outlined circle that trails behind. Both morph state when
 * the pointer is over interactive elements (a, button, [data-cursor]).
 *
 * Hidden on touch/coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const state = useRef({
    x: 0, y: 0,           // real pointer
    rx: 0, ry: 0,         // ring position (lerped)
    hovering: false,
    hidden: true,
  })

  useEffect(() => {
    // skip on touch-first devices
    if (window.matchMedia?.('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const s = state.current

    const onMove = (e) => {
      s.x = e.clientX
      s.y = e.clientY
      if (s.hidden) {
        s.hidden = false
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onLeave = () => {
      s.hidden = true
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onOverTarget = () => {
      s.hovering = true
      ring.dataset.hover = 'true'
      dot.dataset.hover = 'true'
    }
    const onOutTarget = () => {
      s.hovering = false
      ring.dataset.hover = 'false'
      dot.dataset.hover = 'false'
    }

    // event delegation for hover state
    const onOver = (e) => {
      if (e.target.closest?.('a, button, [data-cursor="hover"], input, textarea, summary')) {
        onOverTarget()
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.('a, button, [data-cursor="hover"], input, textarea, summary')) {
        onOutTarget()
      }
    }

    let raf = 0
    const loop = () => {
      // dot moves 1:1
      dot.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`
      // ring lerps toward the pointer
      s.rx += (s.x - s.rx) * 0.18
      s.ry += (s.y - s.ry) * 0.18
      ring.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', (e) => { if (!e.relatedTarget) onLeave() })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      {/* trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          marginLeft: -18, marginTop: -18,
          borderRadius: '50%',
          border: '1px solid rgba(196,255,61,0.55)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
          mixBlendMode: 'screen',
        }}
        data-hover="false"
        onTransitionEnd={undefined}
      />
      {/* pointer dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          marginLeft: -3, marginTop: -3,
          borderRadius: '50%',
          background: '#C4FF3D',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease, opacity 0.2s ease, transform 0.05s linear',
        }}
      />

      {/* hover-state styling — targets the data-hover attr on the two divs */}
      <style>{`
        html { cursor: none; }
        a, button, input, textarea, [data-cursor="hover"], summary { cursor: none; }

        div[data-hover="true"]:nth-of-type(1) {
          width: 60px;
          height: 60px;
          margin-left: -30px;
          margin-top: -30px;
          background: rgba(196,255,61,0.12);
          border-color: rgba(196,255,61,0.9);
        }

        @media (pointer: coarse) {
          html, a, button, input, textarea, summary { cursor: auto; }
        }
      `}</style>
    </>
  )
}
