import { NavLink, useLocation, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/contact',  label: 'Contact' },
]

const tickerMessages = [
  'Now booking projects for Q4 2025',
  'A tight studio, working across US · UAE · India',
  'Local SEO. Paid ads. Social. Web.',
  'Reply within 1 business day, every day',
]

/**
 * Navbar — a two-tier "command bar" header:
 *  · Thin ticker strip on top: rotating brand status message, subtle
 *    lime accent, fades between messages every 4s.
 *  · Main bar: pulsing-P logo, nav with a floating lime highlight that
 *    springs between hovered items, IST live clock, rotating "Available"
 *    sticker, filled pill CTA.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ticker, setTicker] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    const t = setInterval(() => {
      setTicker(i => (i + 1) % tickerMessages.length)
    }, 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* Fixed header container */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0.04)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        {/* ===== TICKER STRIP ===== */}
        <div style={{
          borderBottom: '1px solid var(--border)',
          padding: '0.4rem 0',
          overflow: 'hidden',
        }}>
          <div className="container" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '2rem',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--muted-2)',
              flex: 1, minWidth: 0,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--lime)',
                boxShadow: '0 0 10px rgba(196,255,61,0.8)',
                animation: 'live-pulse 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{ color: 'var(--lime)', flexShrink: 0 }}>Live</span>
              <span style={{ color: 'var(--border-strong)', flexShrink: 0 }}>·</span>
              <TickerLine index={ticker} messages={tickerMessages} />
            </div>
            <div className="desktop-nav" style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              <LiveClock />
              <span>·</span>
              <span>VIZ / IN</span>
            </div>
          </div>
        </div>

        {/* ===== MAIN BAR ===== */}
        <div className="container" style={{
          padding: '0.85rem 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          {/* Logo with pulsing "live" halo */}
          <PulseLogo />

          {/* Nav with floating cursor spotlight */}
          <FloatingNav className="desktop-nav" />

          {/* Right cluster: rotating sticker + CTA */}
          <div className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <RotatingSticker />
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
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes sticker-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes logo-halo {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </>
  )
}

/* ---------- TICKER MESSAGE ---------- */
function TickerLine({ index, messages }) {
  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0,
      flex: 1,
    }}>
      {messages.map((msg, i) => (
        <span
          key={i}
          style={{
            position: i === index ? 'relative' : 'absolute',
            left: 0, top: 0,
            color: 'var(--text)',
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >{msg}</span>
      ))}
    </span>
  )
}

/* ---------- LIVE CLOCK (IST) ---------- */
function LiveClock() {
  const [time, setTime] = useState(() => formatIST(new Date()))
  useEffect(() => {
    const t = setInterval(() => setTime(formatIST(new Date())), 1000)
    return () => clearInterval(t)
  }, [])
  return <span style={{ color: 'var(--text)' }}>{time}</span>
}

function formatIST(date) {
  const ist = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const h = ist.getHours().toString().padStart(2, '0')
  const m = ist.getMinutes().toString().padStart(2, '0')
  const s = ist.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s} IST`
}

/* ---------- LOGO WITH PULSING HALO ---------- */
function PulseLogo() {
  return (
    <Link to="/" aria-label="Pandr Solutions Home" style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
      position: 'relative',
    }}>
      <img
        src="/pandr-logo.jpg"
        alt="Pandr Solutions"
        style={{
          height: 32, width: 'auto', display: 'block',
          transition: 'filter 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
      />
      {/* pulsing halo dot next to the logo */}
      <span style={{
        position: 'relative',
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--lime)',
        display: 'inline-block',
      }}>
        <span aria-hidden="true" style={{
          position: 'absolute', inset: -2,
          borderRadius: '50%',
          background: 'var(--lime)',
          animation: 'logo-halo 2.2s ease-out infinite',
        }} />
      </span>
    </Link>
  )
}

/* ---------- FLOATING NAV: cursor spotlight that springs between items ---------- */
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
      {/* Floating lime bar underneath */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
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

/* ---------- ROTATING STICKER ---------- */
function RotatingSticker() {
  const text = 'AVAILABLE FOR PROJECTS · '.repeat(2)
  const chars = text.split('')
  const angleStep = 360 / chars.length

  return (
    <div style={{
      position: 'relative',
      width: 56, height: 56,
      flexShrink: 0,
    }}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%', height: '100%',
          animation: 'sticker-spin 14s linear infinite',
        }}
      >
        <defs>
          <path
            id="sticker-arc"
            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <text fill="var(--white)" style={{
          fontSize: '10px',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          <textPath href="#sticker-arc">
            {text}
          </textPath>
        </text>
      </svg>
      {/* center dot */}
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--lime)',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 10px rgba(196,255,61,0.8)',
      }} />
    </div>
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
