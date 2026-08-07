import { Link } from 'react-router-dom'

const navGroups = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Work', to: '/work' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Local SEO', to: '/services' },
      { label: 'Ad Campaigns', to: '/services' },
      { label: 'Social Media', to: '/services' },
      { label: 'Content Creation', to: '/services' },
    ],
  },
  {
    title: 'Reach',
    links: [
      { label: 'India', to: '/contact' },
      { label: 'United States', to: '/contact' },
      { label: 'United Arab Emirates', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      paddingTop: 'clamp(4rem, 8vw, 6rem)',
      paddingBottom: '2rem',
      position: 'relative',
    }}>
      <div className="container">
        {/* Big brand row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '3rem',
          paddingBottom: '4rem',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            gap: '2rem', flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: '520px' }}>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Let's work together</p>
              <h2 className="display" style={{
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                marginBottom: '1.5rem',
              }}>
                Ready to grow your local business?
              </h2>
              <p style={{ color: 'var(--muted-2)', fontSize: '1.05rem', maxWidth: '440px' }}>
                Tell us what you're working on. We reply to every message within one business day.
              </p>
            </div>
            <Link to="/contact" className="btn-primary" style={{ padding: '1.1rem 2rem' }}>
              Start a project
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Links grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          padding: '4rem 0',
        }}>
          <div>
            <img src="/pandr-logo.jpg" alt="Pandr Solutions" style={{ height: 32, marginBottom: '1.25rem' }} />
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '260px' }}>
              A digital marketing studio helping ambitious local businesses grow where they are.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href="mailto:pushpit@pandrsol.com" style={{
                color: 'var(--lime)', fontSize: '0.95rem', fontWeight: 500,
                borderBottom: '1px solid var(--lime)',
                paddingBottom: '2px',
              }}>
                pushpit@pandrsol.com
              </a>
            </div>
          </div>

          {navGroups.map(group => (
            <div key={group.title}>
              <p className="eyebrow-muted" style={{ marginBottom: '1.25rem' }}>{group.title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} style={{
                      color: 'var(--text)', fontSize: '0.95rem',
                      transition: 'color 0.2s ease',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '1.75rem', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
            © 2025 Pandr Solutions Pvt Ltd. Based in Vizag, India.
          </span>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
