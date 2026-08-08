import { useEffect, useRef, useState } from 'react'

/**
 * ProcessStep — a numbered step in the "How we work" list.
 *  - Left rail: a lime bullet with an animated timeline segment that
 *    fills from top to bottom as the step scrolls into view.
 *  - Card body: cursor-following lime spotlight on hover, number that
 *    scales, content shifts slightly toward the cursor.
 *  - When the step is in view, its bullet lights up.
 */
export default function ProcessStep({
  n,
  title,
  body,
  isLast = false,
}) {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const numberRef = useRef(null)
  const rafRef = useRef(0)
  const [inView, setInView] = useState(false)
  const [hover, setHover] = useState(false)
  const target = useRef({ tx: 0, ty: 0, gx: 50, gy: 50, active: 0 })
  const current = useRef({ tx: 0, ty: 0, gx: 50, gy: 50, active: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    target.current.tx = (nx - 0.5) * 6
    target.current.ty = (ny - 0.5) * 4
    target.current.gx = nx * 100
    target.current.gy = ny * 100
    target.current.active = 1
    if (!rafRef.current) loop()
  }

  const onEnter = () => setHover(true)
  const onLeave = () => {
    setHover(false)
    target.current = { tx: 0, ty: 0, gx: 50, gy: 50, active: 0 }
    if (!rafRef.current) loop()
  }

  const loop = () => {
    const t = target.current
    const c = current.current
    c.tx += (t.tx - c.tx) * 0.15
    c.ty += (t.ty - c.ty) * 0.15
    c.gx += (t.gx - c.gx) * 0.18
    c.gy += (t.gy - c.gy) * 0.18
    c.active += (t.active - c.active) * 0.15

    if (numberRef.current) {
      numberRef.current.style.transform = `translate3d(${c.tx.toFixed(2)}px, ${c.ty.toFixed(2)}px, 0)`
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(280px circle at ${c.gx}% ${c.gy}%, rgba(196,255,61,${0.14 * c.active}), transparent 60%)`
      glowRef.current.style.opacity = c.active.toFixed(3)
    }

    const settled =
      Math.abs(t.tx - c.tx) < 0.05 && Math.abs(t.ty - c.ty) < 0.05 &&
      Math.abs(t.active - c.active) < 0.01
    if (!settled) rafRef.current = requestAnimationFrame(loop)
    else rafRef.current = 0
  }

  return (
    <li ref={wrapRef} style={{
      display: 'grid',
      gridTemplateColumns: '28px 1fr',
      gap: '1.25rem',
      alignItems: 'stretch',
    }}>
      {/* Left rail: bullet + connecting line */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span
          aria-hidden="true"
          style={{
            width: 12, height: 12, borderRadius: '50%',
            marginTop: '1.75rem',
            background: inView ? 'var(--lime)' : 'transparent',
            border: `2px solid ${inView ? 'var(--lime)' : 'var(--border-strong)'}`,
            boxShadow: inView ? '0 0 16px rgba(196,255,61,0.6)' : 'none',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            flexShrink: 0,
            zIndex: 1,
          }}
        />
        {!isLast && (
          <span
            aria-hidden="true"
            style={{
              width: 1,
              flexGrow: 1,
              marginTop: '0.35rem',
              background: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, var(--lime), transparent)',
              transformOrigin: 'top',
              transform: inView ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }} />
          </span>
        )}
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          position: 'relative',
          padding: '2rem',
          border: `1px solid ${hover ? 'rgba(196,255,61,0.3)' : 'var(--border)'}`,
          borderRadius: '16px',
          background: 'var(--surface)',
          display: 'flex', gap: '1.5rem',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, background 0.3s ease',
          marginBottom: isLast ? 0 : '1.25rem',
        }}
        data-cursor="hover"
      >
        <span
          ref={numberRef}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--lime)',
            fontSize: '1.5rem',
            fontWeight: 500,
            flexShrink: 0,
            display: 'inline-block',
            willChange: 'transform',
            position: 'relative',
            zIndex: 1,
          }}
        >{n}</span>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 className="display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {title}
          </h3>
          <p style={{ color: 'var(--muted-2)', lineHeight: 1.7 }}>{body}</p>
        </div>

        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </li>
  )
}
