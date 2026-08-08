import { useRef, useState } from 'react'

/**
 * ServiceCard — a discipline card with layered interactions:
 *  - 3D perspective tilt on cursor position
 *  - Cursor-following lime spotlight
 *  - HUGE background number that fades in and scales on hover
 *  - Arrow that shifts and rotates on hover
 *  - Deliverable pills that cascade in on hover
 */
export default function ServiceCard({
  n,
  title,
  body,
  deliverables = [],
  index = 0,
  isLast = false,
  columns = 4,
}) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })
  const [hover, setHover] = useState(false)

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    target.current.rx = (ny - 0.5) * -6
    target.current.ry = (nx - 0.5) *  6
    target.current.gx = nx * 100
    target.current.gy = ny * 100
    target.current.active = 1
    if (!rafRef.current) loop()
  }

  const onEnter = () => setHover(true)
  const onLeave = () => {
    setHover(false)
    target.current = { rx: 0, ry: 0, gx: 50, gy: 50, active: 0 }
    if (!rafRef.current) loop()
  }

  const loop = () => {
    const t = target.current
    const c = current.current
    c.rx += (t.rx - c.rx) * 0.12
    c.ry += (t.ry - c.ry) * 0.12
    c.gx += (t.gx - c.gx) * 0.18
    c.gy += (t.gy - c.gy) * 0.18
    c.active += (t.active - c.active) * 0.15

    const el = cardRef.current
    if (el) {
      el.style.transform = `perspective(900px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(360px circle at ${c.gx}% ${c.gy}%, rgba(196,255,61,${0.18 * c.active}), transparent 60%)`
      glowRef.current.style.opacity = c.active.toFixed(3)
    }

    const settled =
      Math.abs(t.rx - c.rx) < 0.01 && Math.abs(t.ry - c.ry) < 0.01 &&
      Math.abs(t.active - c.active) < 0.01
    if (!settled) rafRef.current = requestAnimationFrame(loop)
    else rafRef.current = 0
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        padding: '2.5rem',
        borderRight: index < columns - 1 ? '1px solid var(--border)' : 'none',
        borderBottom: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'background 0.4s ease',
        background: hover ? 'rgba(196,255,61,0.02)' : 'transparent',
      }}
      data-cursor="hover"
    >
      {/* HUGE background number — appears on hover */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-2.5rem', right: '-1rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 20vw, 14rem)',
          fontWeight: 500,
          lineHeight: 1,
          color: 'var(--lime)',
          opacity: hover ? 0.11 : 0,
          transform: hover ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          zIndex: 0,
        }}
      >
        {n}
      </span>

      {/* header row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--lime)', fontSize: '0.9rem', fontWeight: 500,
        }}>{n}</span>
        <span style={{
          color: hover ? 'var(--lime)' : 'var(--muted)',
          fontSize: '1.2rem',
          display: 'inline-block',
          transform: hover ? 'translateX(6px) rotate(-8deg)' : 'translateX(0) rotate(0)',
          transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.3s ease',
        }}>→</span>
      </div>

      <h3 className="display" style={{
        fontSize: '1.65rem',
        position: 'relative', zIndex: 1,
      }}>{title}</h3>

      <p style={{
        color: 'var(--muted-2)', fontSize: '0.95rem', lineHeight: 1.65, flexGrow: 1,
        position: 'relative', zIndex: 1,
      }}>{body}</p>

      <ul style={{
        listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
        paddingTop: '0.5rem', borderTop: '1px solid var(--border)',
        marginTop: 'auto',
        position: 'relative', zIndex: 1,
      }}>
        {deliverables.map((d, i) => (
          <li key={d} style={{
            fontSize: '0.72rem',
            color: hover ? 'var(--white)' : 'var(--muted-2)',
            padding: '0.25rem 0.65rem',
            border: `1px solid ${hover ? 'rgba(196,255,61,0.5)' : 'var(--border)'}`,
            borderRadius: '999px',
            opacity: hover ? 1 : 0.7,
            transform: hover ? 'translateY(0)' : 'translateY(4px)',
            transition: `transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.05}s, border-color 0.3s ease, color 0.3s ease, opacity 0.3s ease ${i * 0.03}s`,
            background: hover ? 'rgba(196,255,61,0.05)' : 'transparent',
          }}>{d}</li>
        ))}
      </ul>

      {/* Cursor-following spotlight */}
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
  )
}
