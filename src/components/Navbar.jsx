import { NavLink, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ScrambleText from './ScrambleText'

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/contact',  label: 'Contact' },
]

/**
 * Navbar with a "morphing capsule" hover indicator that fluidly slides
 * between nav items, per-item scramble text on hover, and a conic-gradient
 * rotating-border CTA. Mobile: full-screen slab menu with large type.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 0',
        background: scrolled ? 'rgba(0,0,0,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <LogoMark />

          <MorphingNav className="desktop-nav" />

          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <ConicCTA to="/contact" label="Start a project" />
          </div>

          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="hamburger"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '0.5rem', color: '#fff',
              width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>
              }
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.98)',
          backdropFilter: 'blur(24px)',
          paddingTop: '5rem',
          display: 'flex', flexDirection: 'column',
        }}>
          <nav className="container" style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
            paddingTop: '2rem',
          }}>
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: isActive ? 'var(--lime)' : 'var(--white)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
              })}>
                {label}
              </NavLink>
            ))}
            <div style={{ marginTop: '2rem' }}>
              <ConicCTA to="/contact" label="Start a project" />
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

/* ---------- Logo with subtle hover ---------- */
function LogoMark() {
  return (
    <Link to="/" aria-label="Pandr Solutions Home" style={{
      display: 'inline-flex', alignItems: 'center',
    }}>
      <img
        src="/pandr-logo.jpg"
        alt="Pandr Solutions"
        style={{
          height: 34, width: 'auto', display: 'block',
          transition: 'filter 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'scale(1.03)' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none' }}
      />
    </Link>
  )
}

/* ---------- The morphing nav ---------- */
function MorphingNav({ className }) {
  const containerRef = useRef(null)
  const [indicator, setIndicator] = useState({ x: 0, w: 0, opacity: 0 })
  const [activeRect, setActiveRect] = useState({ x: 0, w: 0 })
  const location = useLocation()

  // measure active link
  useEffect(() => {
    const wrap = containerRef.current
    if (!wrap) return
    const active = wrap.querySelector('a.active')
    if (active) {
      const wrapRect = wrap.getBoundingClientRect()
      const r = active.getBoundingClientRect()
      setActiveRect({ x: r.left - wrapRect.left, w: r.width })
      setIndicator({ x: r.left - wrapRect.left, w: r.width, opacity: 1 })
    }
  }, [location.pathname])

  const onEnter = (e) => {
    const wrap = containerRef.current
    if (!wrap) return
    const r = e.currentTarget.getBoundingClientRect()
    const wrapRect = wrap.getBoundingClientRect()
    setIndicator({ x: r.left - wrapRect.left, w: r.width, opacity: 1 })
  }
  const onLeave = () => {
    setIndicator({ x: activeRect.x, w: activeRect.w, opacity: activeRect.w ? 1 : 0 })
  }

  return (
    <nav
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center',
        padding: '0.25rem',
        borderRadius: '999px',
        border: '1px solid var(--border-strong)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* the morphing pill */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '4px', bottom: '4px',
          left: 0,
          transform: `translateX(${indicator.x}px)`,
          width: indicator.w,
          opacity: indicator.opacity,
          background: 'var(--lime)',
          borderRadius: '999px',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), width 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {links.map(({ to, label, end }) => (
        <MorphingNavItem
          key={to}
          to={to}
          label={label}
          end={end}
          onEnter={onEnter}
          onLeave={onLeave}
        />
      ))}
    </nav>
  )
}

function MorphingNavItem({ to, label, end, onEnter, onLeave }) {
  const ref = useRef(null)
  return (
    <NavLink
      to={to}
      end={end}
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
      style={({ isActive }) => ({
        position: 'relative',
        zIndex: 1,
        padding: '0.55rem 1.1rem',
        fontSize: '0.85rem',
        fontWeight: 500,
        color: isActive ? '#000' : 'var(--white)',
        borderRadius: '999px',
        transition: 'color 0.3s ease',
        whiteSpace: 'nowrap',
      })}
    >
      <ScrambleText text={label} triggerRef={ref} />
    </NavLink>
  )
}

/* ---------- CTA with rotating conic border ---------- */
function ConicCTA({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        position: 'relative',
        padding: '2px',
        borderRadius: '999px',
        display: 'inline-block',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* rotating conic gradient — behind the button */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-50%', left: '-50%',
          width: '200%', height: '200%',
          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #C4FF3D 300deg, transparent 360deg)',
          animation: 'conic-spin 3.6s linear infinite',
          zIndex: 0,
        }}
      />
      {/* inner solid button */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.55rem 1.1rem',
          background: '#0a0a0a',
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 500,
          borderRadius: '999px',
          transition: 'background 0.3s ease, color 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
      >
        {label}
        <span aria-hidden="true">→</span>
      </span>

      <style>{`
        @keyframes conic-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </Link>
  )
}
