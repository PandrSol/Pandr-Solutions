import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Aurora from '../components/Aurora'
import TechOrb from '../components/TechOrb'
import RotatingWord from '../components/RotatingWord'
import { useSEO } from '../hooks/useSEO'

const capabilities = [
  'Local SEO', 'Google Business', 'Meta Ads', 'Google Ads',
  'Social Media', 'Content Studio', 'Web Design', 'Brand Identity',
  'Analytics', 'Landing Pages', 'Email Marketing', 'CRO',
]

const services = [
  {
    n: '01',
    title: 'Local SEO',
    body: 'We help you rank in the map pack, on Google Business, and in the searches your neighbors are actually typing.',
    deliverables: ['GBP optimization', 'Local citations', 'Review strategy', 'Location pages'],
  },
  {
    n: '02',
    title: 'Paid Advertising',
    body: 'High-intent Google, Meta and TikTok campaigns built around one KPI: qualified leads that turn into paying customers.',
    deliverables: ['Google Ads', 'Meta Ads', 'Landing pages', 'A/B testing'],
  },
  {
    n: '03',
    title: 'Social Media',
    body: 'Editorial content calendars, shot on brand, that turn followers into a real community around your business.',
    deliverables: ['Content strategy', 'Reels & shorts', 'Community mgmt', 'Reporting'],
  },
  {
    n: '04',
    title: 'Websites & Brand',
    body: 'Fast, on-brand websites and identity systems that make your business feel worth every dollar you charge.',
    deliverables: ['Brand system', 'Web design', 'CMS build', 'Ongoing support'],
  },
]

const stats = [
  { value: '3', suffix: ' countries', label: 'India, USA, UAE' },
  { value: '10+', suffix: '', label: 'Projects shipped' },
  { value: '24h', suffix: '', label: 'Reply time' },
  { value: '100%', suffix: '', label: 'Client retention' },
]

export default function Home() {
  useSEO({
    title: 'Pandr Solutions — Digital Marketing Studio for Local Businesses',
    description: 'A digital marketing studio based in Vizag, India, helping local businesses across the US, UAE and India grow through Local SEO, paid ads, social media, and websites that convert.',
    path: '/',
  })
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(8rem, 14vh, 11rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}>
        <Aurora intensity={0.8} />

        <div className="container hero-grid" style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
        }}>
          {/* LEFT: type */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
              style={{ marginBottom: '1.75rem' }}
            >
              Digital Marketing Studio · Vizag, India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ display: 'block' }}>Growth for</span>
              <span style={{ display: 'block' }}>
                <RotatingWord
                  words={['restaurants', 'clinics', 'temples', 'startups', 'brands']}
                />
              </span>
              <span style={{ display: 'block' }}>built by real humans.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                maxWidth: '480px',
                fontSize: 'clamp(0.98rem, 1.1vw, 1.05rem)',
                color: 'var(--muted-2)',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
              }}
            >
              A tight team of marketers, designers and engineers helping local businesses across
              the US, UAE and India show up online, get found, and win their neighborhoods.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}
            >
              <Link to="/contact" className="btn-primary">
                Start a project <span style={{ fontSize: '1.1rem' }}>→</span>
              </Link>
              <Link to="/work" className="btn-ghost">
                See our work
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
            style={{
              height: '100%',
              minHeight: '380px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <TechOrb />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: minmax(0, 1fr) !important; }
            .hero-visual { min-height: 320px !important; margin-top: 1rem; }
          }
          .hero-grid h1 { word-break: break-word; overflow-wrap: anywhere; }
          .hero-grid h1 > span { overflow-wrap: anywhere; }
        `}</style>
      </section>

      {/* ===== MARQUEE ===== */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1.75rem 0',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}>
        <div style={{
          display: 'flex', gap: '3rem',
          animation: 'marquee 40s linear infinite',
          width: 'max-content',
        }}>
          {[...capabilities, ...capabilities].map((c, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem', fontWeight: 500,
              color: 'var(--white)', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '3rem',
            }}>
              {c}
              <span style={{ color: 'var(--lime)' }}>◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                borderLeft: '1px solid var(--border)',
                paddingLeft: '1.5rem',
              }}>
                <div className="display" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  color: 'var(--white)',
                  marginBottom: '0.5rem',
                }}>
                  {s.value}<span style={{ color: 'var(--lime)' }}>{s.suffix}</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem',
          }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>What we do</p>
              <h2 className="display" style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                maxWidth: '18ch',
              }}>
                Four disciplines, one team, everything under one roof.
              </h2>
            </div>
            <Link to="/services" className="btn-ghost">
              All services
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'var(--surface-2)',
          }}>
            {services.map((s, i) => (
              <ServiceCard key={s.title} svc={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'flex-start',
          }}>
            <div style={{ position: 'sticky', top: '6rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>How we work</p>
              <h2 className="display" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                marginBottom: '1.75rem',
              }}>
                No fluff. Just work that moves the number that matters.
              </h2>
              <p style={{ color: 'var(--muted-2)', maxWidth: '440px', lineHeight: 1.75 }}>
                Every engagement starts with one question: what is the KPI you actually get paid on?
                We work backwards from there. No dashboards nobody reads. No 60-page decks. Just weekly
                deliverables, one shared Slack channel, and monthly numbers you can take to the bank.
              </p>
            </div>

            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { n: '01', t: 'Discovery', d: 'One deep working session. We map your customer, your competitors, and the one thing your business does better than anyone.' },
                { n: '02', t: 'Strategy', d: 'A one-page plan you can actually read: what we will do, why, and how we will know it worked.' },
                { n: '03', t: 'Execution', d: 'We ship weekly. Ads live, content posted, SEO fixes deployed. You see progress every seven days.' },
                { n: '04', t: 'Optimize', d: 'Monthly report card. What worked, what did not, what we are doubling down on next month.' },
              ].map(step => (
                <li key={step.n} style={{
                  padding: '2rem',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  background: 'var(--surface)',
                  display: 'flex', gap: '1.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--lime)', fontSize: '1.5rem', fontWeight: 500,
                    flexShrink: 0,
                  }}>{step.n}</span>
                  <div>
                    <h3 className="display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.t}</h3>
                    <p style={{ color: 'var(--muted-2)', lineHeight: 1.7 }}>{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORK ===== */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Recent work</p>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              A few we're proud of.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { flag: 'US', loc: 'Omaha, Nebraska', client: 'Maharaja Indian Cuisine', tag: 'Local SEO · Social', result: '+64% Google Business views' },
              { flag: 'AE', loc: 'Dubai, UAE', client: 'Firefinch Technologies', tag: 'Brand · Web', result: 'Full brand + product site launch' },
              { flag: 'US', loc: 'Nebraska, USA', client: 'Hindu Temple Nebraska', tag: 'Custom Software', result: 'Automated 100+ hrs of manual work' },
            ].map(w => (
              <Link key={w.client} to="/work" style={{
                display: 'block',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '2rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--lime)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'flex', gap: '0.5rem', alignItems: 'center',
                  color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '2rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  <span>{w.flag}</span>
                  <span>·</span>
                  <span>{w.loc}</span>
                </div>
                <h3 className="display" style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>
                  {w.client}
                </h3>
                <p style={{ color: 'var(--lime)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                  {w.tag}
                </p>
                <p style={{ color: 'var(--muted-2)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {w.result}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="section" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>Client word</p>
          <blockquote className="display" style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            lineHeight: 1.25,
            marginBottom: '2rem',
          }}>
            "Pandr Solutions significantly improved our local online presence and customer
            engagement, leading to a noticeable increase in leads and conversions."
          </blockquote>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--lime)', color: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700,
            }}>B</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Banudevi</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Owner, Maharaja Restaurant · Omaha, USA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Global reach</p>
          <h2 className="display" style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            maxWidth: '20ch',
            marginBottom: '3rem',
          }}>
            Headquartered in Vizag. Trusted by businesses in three countries.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { region: 'India', city: 'Vizag, Andhra Pradesh', note: 'Home base. Studio, team, and where every project starts.' },
              { region: 'United States', city: 'Omaha, Nebraska', note: 'Restaurants, temples, and community organizations.' },
              { region: 'United Arab Emirates', city: 'Dubai', note: 'Technology companies and B2B brand work.' },
            ].map(r => (
              <div key={r.region} style={{
                padding: '2rem',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
              }}>
                <p style={{
                  color: 'var(--lime)', fontSize: '0.75rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}>{r.region}</p>
                <h3 className="display" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{r.city}</h3>
                <p style={{ color: 'var(--muted-2)', fontSize: '0.9rem', lineHeight: 1.65 }}>{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceCard({ svc, index }) {
  const cols = 4 // assumption for border logic; harmless if fewer
  return (
    <div style={{
      padding: '2.5rem',
      borderRight: index < cols - 1 ? '1px solid var(--border)' : 'none',
      borderBottom: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', gap: '1.25rem',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--lime)', fontSize: '0.9rem', fontWeight: 500,
        }}>{svc.n}</span>
        <span style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>→</span>
      </div>
      <h3 className="display" style={{ fontSize: '1.65rem' }}>{svc.title}</h3>
      <p style={{ color: 'var(--muted-2)', fontSize: '0.95rem', lineHeight: 1.65, flexGrow: 1 }}>
        {svc.body}
      </p>
      <ul style={{
        listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
        paddingTop: '0.5rem', borderTop: '1px solid var(--border)',
        marginTop: 'auto',
      }}>
        {svc.deliverables.map(d => (
          <li key={d} style={{
            fontSize: '0.72rem', color: 'var(--muted-2)',
            padding: '0.25rem 0.65rem',
            border: '1px solid var(--border)',
            borderRadius: '999px',
          }}>{d}</li>
        ))}
      </ul>
    </div>
  )
}
