import { motion } from 'framer-motion'
import Aurora from '../components/Aurora'
import MagneticLink from '../components/MagneticLink'
import RevealText from '../components/RevealText'
import TiltCard from '../components/TiltCard'
import { useSEO } from '../hooks/useSEO'
import { useRef } from 'react'

const services = [
  {
    n: '01',
    title: 'Local SEO',
    tagline: 'Be found where your customers already look.',
    body: 'When someone opens Google Maps and searches "best biryani near me" or "pediatric dentist in Dubai," you need to be the first name they see. Our Local SEO practice combines Google Business Profile optimization, structured citation building, review generation, and location-specific content so your business dominates the map pack and organic results in the neighborhoods that matter.',
    deliverables: [
      'Google Business Profile optimization & posting',
      'Local keyword research & landing page strategy',
      'Citation cleanup across 40+ directories',
      'Review acquisition & reputation management',
      'Schema markup & technical local SEO',
      'Monthly ranking & call-tracking reports',
    ],
    for: 'Restaurants, clinics, salons, professional services, brick-and-mortar retail.',
  },
  {
    n: '02',
    title: 'Paid Advertising',
    tagline: 'Every dollar tied to a measurable outcome.',
    body: 'Ads should not be a mystery box. We build high-intent campaigns across Google, Meta, and TikTok that are tied to one KPI you actually care about, whether that is a booked table, a form fill, or a call. Landing pages are built in-house so the click-to-conversion path is controlled end to end. You will always know your cost per lead, and we will always be pushing it down.',
    deliverables: [
      'Google Search, Performance Max & YouTube campaigns',
      'Meta and Instagram lead generation',
      'TikTok Ads for consumer brands',
      'Conversion-first landing pages',
      'Ongoing A/B testing on creative & copy',
      'Pixel, GA4 & server-side event setup',
    ],
    for: 'Businesses ready to scale with a defined budget and revenue target.',
  },
  {
    n: '03',
    title: 'Social + AI Content',
    tagline: 'Owned audiences, powered by AI-native production.',
    body: 'Paid ads rent attention. Social media builds an audience you own. We combine hand-crafted editorial calendars with AI-generated video ads, AI-created post creatives, and image variations at scale, so your feed stays fresh every day without burning out a content team. Reels, Shorts, static posts, and stories, all aligned to a real editorial voice.',
    deliverables: [
      'Monthly content calendar & content pillars',
      'AI-generated video ads for Meta, TikTok, YouTube',
      'AI-created static & carousel post creatives',
      'On-brand reel & short-form video production',
      'Community management & inbox response',
      'Growth analytics & monthly review call',
    ],
    for: 'Brands that want a modern content engine without a full in-house studio.',
  },
  {
    n: '04',
    title: 'Websites & Brand',
    tagline: 'A digital storefront that finally matches the quality of your work.',
    body: 'Your website is the most-visited location your business will ever have. We design and build sites that load fast, look intentional, and are wired for conversion, not vanity. When the brand needs a refresh, we handle that too: logos, type systems, color, and a set of guidelines that keep everything consistent across every touchpoint.',
    deliverables: [
      'Brand identity: logo, type, color, guidelines',
      'Web design in Figma with component system',
      'Custom build on Webflow, WordPress or React',
      'CMS setup so your team can update easily',
      'Performance & SEO groundwork on launch day',
      'Optional ongoing support & iteration',
    ],
    for: 'Businesses relaunching, rebranding, or launching a new product.',
  },
]

const industries = [
  'Restaurants & Food', 'Healthcare & Clinics', 'Real Estate',
  'Technology & SaaS', 'Community & Faith', 'Professional Services',
  'Beauty & Wellness', 'Home Services', 'Retail & E-commerce',
]

const values = [
  { t: 'Honest work', d: 'We tell you when a channel is not right for you, even if it means less revenue for us.' },
  { t: 'Small on purpose', d: 'A tight team so the person you hire is the person doing the work. No account manager buffer.' },
  { t: 'Weekly shipping', d: 'You see progress every week. No two-month "strategy phases" that produce a slide deck and nothing else.' },
  { t: 'One channel', d: 'One shared Slack or WhatsApp thread. Fast answers, no ticket portals, no email chains.' },
]

export default function Services() {
  useSEO({
    title: 'Services & About — Pandr Solutions',
    description: 'Local SEO, paid advertising, social media, and website & brand design. A four-discipline digital marketing studio built to ship, not to sell decks.',
    path: '/services',
  })
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        paddingTop: '10rem', paddingBottom: '5rem',
      }}>
        <Aurora intensity={0.7} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="eyebrow" style={{ marginBottom: '2rem' }}>
            Services & About
          </motion.p>
          <RevealText
            as="h1"
            className="display"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              maxWidth: '16ch', marginBottom: '2rem',
            }}
          >
            A studio built to ship, not to sell decks.
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '640px', color: 'var(--muted-2)',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7,
            }}
          >
            Pandr Solutions is a four-discipline digital marketing studio based in India,
            serving ambitious local businesses across India, the United States and the UAE.
            Below is a real, honest look at what we do, how we work, and who we do it for.
          </motion.p>
        </div>
      </section>

      {/* ABOUT / VALUES */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>About Pandr</p>
              <RevealText as="h2" className="display" style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                marginBottom: '1.75rem',
              }}>
                A tight studio. A wide reach.
              </RevealText>
              <p style={{ color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Pandr Solutions started in 2023 with a simple thesis: local businesses deserve the
                same quality of design and marketing that Silicon Valley startups take for granted.
                We now work with restaurants in Omaha, tech companies in Dubai, and community
                organizations in Nebraska, all from our studio in India.
              </p>
              <p style={{ color: 'var(--muted-2)', lineHeight: 1.8 }}>
                We stay deliberately small. Every client works directly with the people executing
                the work, not with account managers who never touch the deliverable. It is slower to
                grow this way, and worth it.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            }}>
              {values.map(v => (
                <TiltCard key={v.t} maxTilt={4} style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  background: 'var(--surface-2)',
                }}>
                  <h3 className="display" style={{
                    fontSize: '1.1rem', marginBottom: '0.5rem',
                    color: 'var(--lime)',
                  }}>{v.t}</h3>
                  <p style={{ color: 'var(--muted-2)', fontSize: '0.85rem', lineHeight: 1.6 }}>{v.d}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES DEEP DIVE */}
      <section className="section">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Services</p>
          <RevealText as="h2" className="display" style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '4rem', maxWidth: '20ch',
          }}>
            Four disciplines. Deep on each.
          </RevealText>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((svc, i) => (
              <ServiceBlock key={svc.title} svc={svc} isLast={i === services.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
          }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Industries</p>
              <RevealText as="h2" className="display" style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                marginBottom: '1.5rem',
              }}>
                Who we work with.
              </RevealText>
              <p style={{ color: 'var(--muted-2)', lineHeight: 1.75 }}>
                We are generalists on purpose. Working across restaurants, clinics, tech companies
                and community organizations means we bring pattern recognition from one category
                into another. Fresh eyes, always.
              </p>
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignContent: 'flex-start',
            }}>
              {industries.map((i, idx) => (
                <span
                  key={i}
                  style={{
                    padding: '0.65rem 1.1rem',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--text)',
                    cursor: 'default',
                    transition: `background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)`,
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--lime)'
                    e.currentTarget.style.borderColor = 'var(--lime)'
                    e.currentTarget.style.color = '#000'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >{i}</span>
              ))}
            </div>
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
            Not sure which of these you need?
          </RevealText>
          <p style={{ color: 'var(--muted-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            That is what a first call is for. Tell us what your business does and what is
            keeping you up at night. We will tell you honestly whether we can help.
          </p>
          <MagneticLink to="/contact" className="btn-primary">
            Book an intro call <span>→</span>
          </MagneticLink>
        </div>
      </section>
    </main>
  )
}

function ServiceBlock({ svc, isLast }) {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const numRef = useRef(null)

  const onMove = (e) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(500px circle at ${nx * 100}% ${ny * 100}%, rgba(196,255,61,0.08), transparent 60%)`
      glowRef.current.style.opacity = '1'
    }
    if (numRef.current) {
      numRef.current.style.transform = `translate3d(${(nx - 0.5) * 8}px, ${(ny - 0.5) * 6}px, 0)`
    }
  }

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (numRef.current) numRef.current.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'minmax(80px, 100px) 1fr',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        padding: 'clamp(2rem, 5vw, 4rem) 0',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        alignItems: 'flex-start',
        overflow: 'hidden',
      }}
    >
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

      <span
        ref={numRef}
        className="display"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'var(--lime)',
          position: 'relative',
          zIndex: 1,
          willChange: 'transform',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >{svc.n}</span>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <h3 className="display" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            marginBottom: '0.75rem',
          }}>{svc.title}</h3>
          <p style={{
            color: 'var(--lime)', fontFamily: 'var(--font-display)',
            fontSize: '1.05rem', marginBottom: '1.25rem',
          }}>{svc.tagline}</p>
          <p style={{ color: 'var(--muted-2)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
            {svc.body}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--white)', fontWeight: 600 }}>Best for: </span>
            {svc.for}
          </p>
        </div>

        <div>
          <p className="eyebrow-muted" style={{ marginBottom: '1.25rem' }}>What you get</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {svc.deliverables.map((d, i) => (
              <DeliverableRow key={d} text={d} delay={i * 0.05} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function DeliverableRow({ text, delay = 0 }) {
  const ref = useRef(null)
  return (
    <li
      ref={ref}
      style={{
        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
        color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5,
        transition: `transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, color 0.2s ease`,
        transform: 'translateX(0)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(8px)'
        e.currentTarget.style.color = 'var(--lime)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0)'
        e.currentTarget.style.color = 'var(--text)'
      }}
    >
      <span style={{ color: 'var(--lime)', flexShrink: 0 }}>◆</span>
      {text}
    </li>
  )
}
