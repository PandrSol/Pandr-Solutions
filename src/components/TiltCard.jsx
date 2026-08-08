import { useRef } from 'react'

/**
 * TiltCard — subtle 3D perspective tilt on hover based on cursor position.
 * A soft lime radial glow follows the cursor within the card.
 * Fully accessible: no functional dependency on hover, just an enhancement.
 */
export default function TiltCard({
  children,
  className,
  style,
  as: Tag = 'div',
  maxTilt = 6,
  glow = true,
  ...rest
}) {
  const ref = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width  // 0..1
    const ny = (e.clientY - r.top) / r.height // 0..1
    target.current.rx = (ny - 0.5) * -2 * maxTilt // rotateX
    target.current.ry = (nx - 0.5) *  2 * maxTilt // rotateY
    target.current.gx = nx * 100
    target.current.gy = ny * 100
    target.current.active = 1

    if (!rafRef.current) loop()
  }

  const onLeave = () => {
    target.current = { rx: 0, ry: 0, gx: 50, gy: 50, active: 0 }
    if (!rafRef.current) loop()
  }

  const loop = () => {
    const t = target.current
    const c = current.current
    c.rx += (t.rx - c.rx) * 0.12
    c.ry += (t.ry - c.ry) * 0.12
    c.gx += (t.gx - c.gx) * 0.15
    c.gy += (t.gy - c.gy) * 0.15
    c.active += (t.active - c.active) * 0.15

    const el = ref.current
    if (el) {
      el.style.transform = `perspective(900px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`
    }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(400px circle at ${c.gx}% ${c.gy}%, rgba(196,255,61,${0.14 * c.active}), transparent 60%)`
      glowRef.current.style.opacity = c.active.toFixed(3)
    }

    const settled =
      Math.abs(t.rx - c.rx) < 0.01 && Math.abs(t.ry - c.ry) < 0.01 &&
      Math.abs(t.active - c.active) < 0.01
    if (!settled) rafRef.current = requestAnimationFrame(loop)
    else rafRef.current = 0
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.05s linear',
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      {glow && (
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </Tag>
  )
}
