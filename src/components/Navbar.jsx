import { NavLink, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/contact',  label: 'Contact' },
]

/**
 * Navbar — clean editorial header with a floating lime underline that
 * springs between nav items on hover, and a filled pill CTA.
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
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      }}>
        <div className="container" style={{
          padding: '1rem 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          {/* Logo */}
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
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'brightness(1.15)'
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            />
          </Link>

          {/* Nav with floating lime underline */}
          <FloatingNav className="desktop-nav" />

          {/* CTA */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <PillCTA to="/contact">Start a project</PillCTA>
          </div>

          {/* Hamburger */}
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
              <PillCTA to="/contact">Start a project</PillCTA>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 940px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

/* ---------- Floating nav with springing lime underline ---------- */
function FloatingNav({ className }) {
  const wrapRef = useRef(null)
  const [rect, setRect] = useState({ x: 0, w: 0, opacity: 0 })
  const [activeRect, setActiveRect] = useState({ x: 0, w: 0 })
  const location = useLocation()

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const active = wrap.querySelector('a.active')
    if (active) {
      const wRect = wrap.getBoundingClientRect()
      const aRect = active.getBoundingClientRect()
      setActiveRect({ x: aRect.left - wRect.left, w: aRect.width })
      setRect({ x: aRect.left - wRect.left, w: aRect.width, opacity: 1 })
    }
  }, [location.pathname])

  const onEnter = (e) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = e.currentTarget.getBoundingClientRect()
    const wRect = wrap.getBoundingClientRect()
    setRect({ x: r.left - wRect.left, w: r.width, opacity: 1 })
  }
  const onLeave = () => {
    setRect({ x: activeRect.x, w: activeRect.w, opacity: activeRect.w ? 1 : 0 })
  }

  return (
    <nav
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: '0.25rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2px', left: 0,
          transform: `translateX(${rect.x}px)`,
          width: rect.w,
          height: 2,
          background: 'var(--lime)',
          borderRadius: '2px',
          opacity: rect.opacity,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(196,255,61,0.6)',
        }}
      />

      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          style={({ isActive }) => ({
            padding: '0.5rem 1rem',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: isActive ? 'var(--white)' : 'var(--muted-2)',
            transition: 'color 0.3s ease',
            whiteSpace: 'nowrap',
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

/* ---------- CTA ---------- */
function PillCTA({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.6rem 1.2rem',
        background: 'var(--lime)',
        color: '#000',
        fontSize: '0.85rem',
        fontWeight: 600,
        borderRadius: '999px',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: '0 0 0 rgba(196,255,61,0)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,255,61,0.28)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 0 0 rgba(196,255,61,0)'
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10L10 4M10 4H5M10 4V9" />
      </svg>
    </Link>
  )
}
