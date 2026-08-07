import { NavLink, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

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
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" aria-label="Pandr Solutions Home" style={{
            display: 'flex', alignItems: 'center',
          }}>
            <img
              src="/pandr-logo.jpg"
              alt="Pandr Solutions"
              style={{ height: 34, width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to} to={to} end={end}
                style={({ isActive }) => ({
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--white)' : 'var(--muted-2)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '2px',
                      background: isActive ? 'var(--lime)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }} />
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary" style={{
              padding: '0.65rem 1.25rem', fontSize: '0.85rem',
            }}>
              Start a project
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="hamburger"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '0.5rem', color: '#fff',
              width: 44, height: 44,
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

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.97)',
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
            <Link to="/contact" className="btn-primary" style={{
              marginTop: '2rem', alignSelf: 'flex-start',
            }}>
              Start a project
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </>
  )
}
