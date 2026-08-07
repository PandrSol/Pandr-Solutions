import { useEffect, useRef } from 'react'

/**
 * Aurora — subtle, ambient background of drifting gradient blobs.
 * Runs on canvas, ignores pointer events, mobile-friendly (dpr-capped).
 */
export default function Aurora({ intensity = 1, color = '#C4FF3D' }) {
  const canvasRef = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let w = 0, h = 0, dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.45, hue: color, speed: 0.00012, dx: 0.6, dy: -0.4 },
      { x: 0.8, y: 0.7, r: 0.55, hue: '#5B7CFF', speed: 0.00009, dx: -0.5, dy: 0.6 },
      { x: 0.5, y: 0.5, r: 0.4,  hue: '#8B5CF6', speed: 0.00015, dx: 0.7, dy: 0.5 },
    ]

    const start = performance.now()
    const draw = (t) => {
      const dt = t - start
      ctx.clearRect(0, 0, w, h)

      for (const b of blobs) {
        const cx = (b.x + Math.sin(dt * b.speed) * 0.15 * b.dx) * w
        const cy = (b.y + Math.cos(dt * b.speed) * 0.15 * b.dy) * h
        const rad = Math.max(w, h) * b.r
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        g.addColorStop(0, hexToRgba(b.hue, 0.16 * intensity))
        g.addColorStop(0.5, hexToRgba(b.hue, 0.05 * intensity))
        g.addColorStop(1, hexToRgba(b.hue, 0))
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [intensity, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '')
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r},${g},${b},${a})`
}
