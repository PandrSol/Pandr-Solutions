import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

/**
 * TiltCard — 3D perspective tilt + cursor-following glow on desktop.
 * On touch devices (no cursor), transforms into a scroll-triggered
 * fade + rise + soft lime glow that pulses in and settles.
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
  const [isTouch, setIsTouch] = useState(false)
  const ref = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: 0 })
  const [viewRef, inView] = useInView({ threshold: 0.15 })

  useEffect(() => {
    setIsTouch(window.matchMedia?.('(pointer: coarse)').matches)
  }, [])

  // combine both refs
  const setRefs = (el) => {
    ref.current = el
    if (typeof viewRef === 'function') viewRef(el)
    else if (viewRef) viewRef.current = el
  }

  const onMove = (e) => {
    if (isTouch) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    target.current.rx = (ny - 0.5) * -2 * maxTilt
    target.current.ry = (nx - 0.5) *  2 * maxTilt
    target.current.gx = nx * 100
    target.current.gy = ny * 100
    target.current.active = 1
    if (!rafRef.current) loop()
  }

  const onLeave = () => {
    if (isTouch) return
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
      ref={setRefs}
      className={className}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: isTouch
          ? 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
          : 'transform 0.05s linear',
        willChange: 'transform, opacity',
        // Mobile: scroll-triggered rise + fade
        opacity: isTouch && !inView ? 0 : 1,
        transform: isTouch && !inView ? 'translateY(28px)' : undefined,
        ...style,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      {glow && !isTouch && (
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
      {/* Mobile: a subtle static lime edge glow that fades in on scroll */}
      {glow && isTouch && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            boxShadow: inView ? 'inset 0 0 40px rgba(196,255,61,0.04)' : 'inset 0 0 0 rgba(196,255,61,0)',
            transition: 'box-shadow 1s ease 0.2s',
          }}
        />
      )}
    </Tag>
  )
}
