import { NavLink, useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/contact',  label: 'Contact' },
]

/**
 * Navbar — clean editorial nav with a slide-up dual-text hover on links,
 * a live availability chip, and a filled pill CTA.
 *
 * The slide-up pattern is a single word rendered twice, stacked; on hover
 * the top copy translates up-and-out while the bottom copy translates
 * up-and-into-place, all in one 0.45s ease. No layout shift, no jank.
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
        background: scrolled ? 'rgba(0,0,0,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem',
        }}>
          {/* Logo */}
          <Link to="/" aria-label="Pandr Solutions Home" style={{
            display: 'inline-flex', alignItems: 'center',
          }}>
            <img
              src="/pandr-logo.jpg"
              alt="Pandr Solutions"
              style={{
                height: 32, width: 'auto', display: 'block',
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

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: '2.5rem',
          }}>
            {links.map(({ to, label, end }) => (
              <SlideLink key={to} to={to} label={label} end={end} />
            ))}
          </nav>

          {/* Right cluster — availability chip + CTA */}
          <div className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid var(--border-strong)',
              fontSize: '0.72rem',
              letterSpacing: '0.05em',
              color: 'var(--muted-2)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--lime)',
                boxShadow: '0 0 8px rgba(196,255,61,0.7)',
                animation: 'availability-pulse 2.4s ease-in-out infinite',
              }} />
              Available
            </span>
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
        @keyframes availability-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        .slide-link .slide-link-stack { transform: translateY(0); }
        .slide-link:hover .slide-link-stack { transform: translateY(-1.4em); }
      `}</style>
    </>
  )
}

/* ---------- Slide-up dual-text nav link ---------- */
function SlideLink({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => (isActive ? 'slide-link active' : 'slide-link')}
    >
      {({ isActive }) => (
        <span
          className="slide-link-inner"
          style={{
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            height: '1.4em',
            lineHeight: '1.4em',
            verticalAlign: 'bottom',
          }}
        >
          {/* stack of two copies; on hover translate the whole stack up by one line */}
          <span
            className="slide-link-stack"
            style={{
              display: 'inline-block',
              transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.15, 1)',
              willChange: 'transform',
            }}
          >
            <span style={{
              display: 'block',
              color: isActive ? 'var(--lime)' : 'var(--white)',
              fontWeight: 500, fontSize: '0.9rem',
              letterSpacing: '-0.01em',
            }}>{label}</span>
            <span style={{
              display: 'block',
              color: 'var(--lime)',
              fontWeight: 500, fontSize: '0.9rem',
              letterSpacing: '-0.01em',
            }}>{label}</span>
          </span>
          {/* active-state indicator: small lime dot underneath */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 4, left: '50%',
              width: 3, height: 3,
              borderRadius: '50%',
              background: 'var(--lime)',
              transform: `translateX(-50%) scale(${isActive ? 1 : 0})`,
              transition: 'transform 0.3s ease',
              boxShadow: isActive ? '0 0 8px var(--lime)' : 'none',
            }}
          />
        </span>
      )}
    </NavLink>
  )
}

/* ---------- Pill CTA ---------- */
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
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,255,61,0.25)'
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
