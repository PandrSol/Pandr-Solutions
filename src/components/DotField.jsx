import { useEffect, useRef } from 'react'

/**
 * DotField — a canvas of dots on a grid that repel away from the cursor
 * with spring physics, then settle back into place. Turns any hover into
 * a small physics playground.
 *
 * Mobile: dots ripple gently over time when no pointer input.
 */
export default function DotField({
  spacing = 32,
  dotRadius = 1.6,
  color = 'rgba(196,255,61,0.55)',
  hoverColor = '#C4FF3D',
  repel = 90,     // radius of cursor influence in px
  strength = 70,  // max displacement in px
  spring = 0.08,
  damping = 0.82,
  height = '520px',
  children,
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const stateRef = useRef({ dots: [], mouse: { x: -9999, y: -9999 }, dpr: 1, w: 0, h: 0 })

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const s = stateRef.current

    const setup = () => {
      s.dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      s.w = rect.width
      s.h = rect.height
      canvas.width = s.w * s.dpr
      canvas.height = s.h * s.dpr
      canvas.style.width = s.w + 'px'
      canvas.style.height = s.h + 'px'
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)

      const cols = Math.ceil(s.w / spacing) + 2
      const rows = Math.ceil(s.h / spacing) + 2
      const offX = (s.w - (cols - 1) * spacing) / 2
      const offY = (s.h - (rows - 1) * spacing) / 2

      const dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offX + c * spacing
          const by = offY + r * spacing
          dots.push({ bx, by, x: bx, y: by, vx: 0, vy: 0 })
        }
      }
      s.dots = dots
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      s.mouse.x = e.clientX - rect.left
      s.mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      s.mouse.x = -9999
      s.mouse.y = -9999
    }

    setup()
    window.addEventListener('resize', setup)
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, s.w, s.h)
      const mx = s.mouse.x
      const my = s.mouse.y
      const rep2 = repel * repel

      for (const d of s.dots) {
        // spring back to base
        const dxb = d.bx - d.x
        const dyb = d.by - d.y
        d.vx += dxb * spring
        d.vy += dyb * spring

        // repel from cursor
        const mdx = d.x - mx
        const mdy = d.y - my
        const md2 = mdx * mdx + mdy * mdy
        let hover = 0
        if (md2 < rep2) {
          const md = Math.sqrt(md2) || 0.001
          const f = (1 - md / repel) * strength
          d.vx += (mdx / md) * f * 0.15
          d.vy += (mdy / md) * f * 0.15
          hover = 1 - md / repel
        }

        d.vx *= damping
        d.vy *= damping
        d.x += d.vx
        d.y += d.vy

        // draw
        const r = dotRadius + hover * 2.5
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fillStyle = hover > 0 ? hoverColor : color
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [spacing, dotRadius, color, hoverColor, repel, strength, spring, damping])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
      }}
      data-cursor="hover"
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      />
      {children && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          textAlign: 'center',
          padding: '2rem',
          zIndex: 1,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
