import { motion } from 'framer-motion'
import Aurora from '../components/Aurora'
import MagneticLink from '../components/MagneticLink'
import RevealText from '../components/RevealText'
import TiltCard from '../components/TiltCard'
import Counter from '../components/Counter'
import { useSEO } from '../hooks/useSEO'
import { useRef } from 'react'

const projects = [
  {
    n: '01',
    client: 'Maharaja Indian Cuisine',
    location: 'Omaha, Nebraska · USA',
    year: '2024',
    services: ['Local SEO', 'Social Media', 'Content'],
    challenge: 'A beloved neighborhood restaurant that punched below its weight online. Great food, thin reviews, invisible on Google Maps outside a two-mile radius.',
    approach: 'We rebuilt the Google Business Profile from scratch with weekly posts, restructured the review acquisition process at the point of sale, and launched a monthly Instagram Reels calendar shot in-house at the restaurant.',
    outcome: [
      { metric: '+64%', label: 'Google Business profile views in 90 days' },
      { metric: '4.8', label: 'Average rating across 180+ new reviews' },
      { metric: '3x', label: 'Weekly reservations from Google' },
    ],
    quote: {
      text: 'Pandr Solutions significantly improved our local online presence and customer engagement, leading to a noticeable increase in leads and conversions.',
      author: 'Banudevi',
      role: 'Owner, Maharaja Restaurant',
    },
  },
  {
    n: '02',
    client: 'Firefinch Technologies',
    location: 'Dubai · UAE',
    year: '2024',
    services: ['Brand Identity', 'Web Design', 'Development'],
    challenge: 'A UAE-based technology company with strong engineering, but a brand and website that looked like a template. They needed a professional face for enterprise conversations.',
    approach: 'A ground-up brand refresh: new wordmark, type system, color palette and voice. Followed by a full product marketing site designed in Figma and built for performance.',
    outcome: [
      { metric: '1', label: 'Complete brand identity system' },
      { metric: '8', label: 'Marketing pages designed and shipped' },
      { metric: '<2s', label: 'Time to first meaningful paint on mobile' },
    ],
    quote: {
      text: 'We are impressed with the outstanding work from Pandr. Their professionalism and innovative approach translated our vision into a design that aligns perfectly with our brand. They are an invaluable partner.',
      author: 'Kishore Thota',
      role: 'CEO, Firefinch Technologies',
    },
  },
  {
    n: '03',
    client: 'Hindu Temple of Nebraska',
    location: 'Nebraska · USA',
    year: '2024',
    services: ['Custom Software', 'Automation'],
    challenge: 'The temple committee ran annual board elections manually with paper ballots, spreadsheets, and volunteer weekends of tallying. Errors, delays, and disputed results.',
    approach: 'We built a custom secure voting platform with eligibility verification, digital ballots, automated tallying and audit logs. Deployed in time for the 2024 election cycle.',
    outcome: [
      { metric: '100+', label: 'Hours of volunteer work eliminated' },
      { metric: '0', label: 'Ballot disputes since launch' },
      { metric: '100%', label: 'Voter turnout of eligible members' },
    ],
    quote: {
      text: 'Working with Pandr has been a game-changer for our temple committee. Their custom system has significantly reduced our manual work, allowing us to focus on what truly matters.',
      author: 'Sundar Murthy',
      role: 'President, Hindu Temple Nebraska',
    },
  },
]

export default function Work() {
  useSEO({
    title: 'Selected Work — Pandr Solutions',
    description: 'Case studies from Omaha, Dubai, and Nebraska. Restaurants, tech companies, and community organizations. Real challenges, real outcomes.',
    path: '/work',
  })
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        paddingTop: '10rem', paddingBottom: '5rem',
      }}>
        <Aurora intensity={0.7} color="#5B7CFF" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="eyebrow" style={{ marginBottom: '2rem' }}>
            Selected Work · 2023 — 2025
          </motion.p>
          <RevealText as="h1" className="display" style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            maxWidth: '14ch', marginBottom: '2rem',
          }}>
            Real businesses. Real outcomes.
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '640px', color: 'var(--muted-2)',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7,
            }}
          >
            Three case studies from the last year. Restaurants, tech companies, and community
            organizations across three countries. What we did, how we did it, and what happened next.
          </motion.p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          {projects.map((p, i) => (
            <CaseStudy key={p.n} p={p} isLast={i === projects.length - 1} />
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{
        background: 'var(--lime)', color: '#000',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem', alignItems: 'flex-end',
          }}>
            <RevealText as="h2" className="display" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              maxWidth: '18ch',
            }}>
              The pattern behind every project we ship.
            </RevealText>
            {[
              { m: 'Weekly', l: 'Shipping cadence, no exceptions' },
              { m: 'Direct', l: 'Access to the person doing the work' },
              { m: 'Honest', l: 'Numbers, not vanity dashboards' },
            ].map(s => (
              <div key={s.l}>
                <p className="display" style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>{s.m}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.75 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <RevealText as="h2" className="display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '2rem',
          }}>
            Want to be the next case study?
          </RevealText>
          <p style={{ color: 'var(--muted-2)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            We take on a small number of new clients each quarter. Tell us about your business.
          </p>
          <MagneticLink to="/contact" className="btn-primary">
            Start the conversation <span>→</span>
          </MagneticLink>
        </div>
      </section>
    </main>
  )
}

function CaseStudy({ p, isLast }) {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const bigNumRef = useRef(null)

  const onMove = (e) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${nx * 100}% ${ny * 100}%, rgba(196,255,61,0.06), transparent 60%)`
      glowRef.current.style.opacity = '1'
    }
    if (bigNumRef.current) {
      bigNumRef.current.style.transform = `translate3d(${(nx - 0.5) * -14}px, ${(ny - 0.5) * -10}px, 0)`
    }
  }

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (bigNumRef.current) bigNumRef.current.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <article
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: isLast ? '1px solid var(--border)' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* HUGE background number — parallax */}
      <span
        ref={bigNumRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-1rem', right: '-2rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(9rem, 22vw, 20rem)',
          fontWeight: 500,
          lineHeight: 1,
          color: 'rgba(196,255,61,0.05)',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          zIndex: 0,
          transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          willChange: 'transform',
        }}
      >{p.n}</span>

      {/* cursor spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.35s ease',
          zIndex: 0,
        }}
      />
      {/* header */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(60px, 80px) 1fr auto',
        gap: '1.5rem', alignItems: 'flex-start',
        marginBottom: '2.5rem', flexWrap: 'wrap',
      }}>
        <span className="display" style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          color: 'var(--lime)',
        }}>{p.n}</span>
        <div>
          <h2 className="display" style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            marginBottom: '0.75rem',
          }}>
            {p.client}
          </h2>
          <p style={{ color: 'var(--muted-2)', fontSize: '0.95rem' }}>
            {p.location} · {p.year}
          </p>
        </div>
        <div style={{
          display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
        }}>
          {p.services.map(s => (
            <span key={s} style={{
              padding: '0.35rem 0.85rem',
              border: '1px solid var(--border-strong)',
              borderRadius: '999px',
              fontSize: '0.75rem',
              color: 'var(--text)',
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* body */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'clamp(2rem, 4vw, 3rem)',
        marginBottom: '3rem',
      }}>
        <div>
          <p className="eyebrow-muted" style={{ marginBottom: '1rem' }}>Challenge</p>
          <p style={{ color: 'var(--muted-2)', lineHeight: 1.75 }}>{p.challenge}</p>
        </div>
        <div>
          <p className="eyebrow-muted" style={{ marginBottom: '1rem' }}>Approach</p>
          <p style={{ color: 'var(--muted-2)', lineHeight: 1.75 }}>{p.approach}</p>
        </div>
      </div>

      {/* outcome */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        marginBottom: '3rem',
      }}>
        {p.outcome.map(o => (
          <TiltCard key={o.label} maxTilt={5} style={{
            padding: '1.75rem',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            background: 'var(--surface)',
          }}>
            <div className="display" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--lime)',
              marginBottom: '0.5rem',
            }}>{o.metric}</div>
            <p style={{ color: 'var(--muted-2)', fontSize: '0.85rem', lineHeight: 1.5 }}>{o.label}</p>
          </TiltCard>
        ))}
      </div>

      {/* quote */}
      <blockquote style={{
        position: 'relative', zIndex: 1,
        padding: '2rem',
        borderLeft: '2px solid var(--lime)',
        marginLeft: 0,
      }}>
        <p className="display" style={{
          fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
          lineHeight: 1.5, marginBottom: '1.25rem',
          fontWeight: 400,
        }}>
          "{p.quote.text}"
        </p>
        <footer style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'var(--muted)', fontSize: '0.9rem',
        }}>
          <span style={{ color: 'var(--white)', fontWeight: 600 }}>{p.quote.author}</span>
          <span>·</span>
          <span>{p.quote.role}</span>
        </footer>
      </blockquote>
    </article>
  )
}
