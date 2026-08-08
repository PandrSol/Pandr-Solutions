import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

/**
 * MagneticLink — a link/button that gently pulls toward the cursor when
 * near, then springs back on leave. Disabled on touch devices.
 *
 * Usage:
 *   <MagneticLink to="/contact" className="btn-primary">Start a project</MagneticLink>
 */
export default function MagneticLink({
  to,
  href,
  onClick,
  className,
  children,
  strength = 0.35,
  radius = 90,
  ...rest
}) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia?.('(pointer: coarse)').matches) return
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    let raf = 0
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const effectRadius = Math.max(r.width, r.height) / 2 + radius
      if (dist < effectRadius) {
        target = { x: dx * strength, y: dy * strength }
      } else {
        target = { x: 0, y: 0 }
      }
    }

    const onLeave = () => { target = { x: 0, y: 0 } }

    const loop = () => {
      current.x += (target.x - current.x) * 0.15
      current.y += (target.y - current.y) * 0.15
      inner.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, radius])

  const inner = (
    <span ref={innerRef} style={{ display: 'inline-flex', willChange: 'transform' }}>
      {children}
    </span>
  )

  const style = { display: 'inline-block' }

  if (to) {
    return (
      <span ref={wrapRef} style={style}>
        <Link to={to} className={className} onClick={onClick} {...rest}>
          {inner}
        </Link>
      </span>
    )
  }
  if (href) {
    return (
      <span ref={wrapRef} style={style}>
        <a href={href} className={className} onClick={onClick} {...rest}>
          {inner}
        </a>
      </span>
    )
  }
  return (
    <span ref={wrapRef} style={style}>
      <button type="button" className={className} onClick={onClick} {...rest}>
        {inner}
      </button>
    </span>
  )
}
