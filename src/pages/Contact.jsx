import { useState } from 'react'
import { motion } from 'framer-motion'
import Aurora from '../components/Aurora'
import { useSEO } from '../hooks/useSEO'

const budgets = ['< $2k', '$2k – $5k', '$5k – $10k', '$10k+']
const timelines = ['ASAP', 'Next month', 'Next quarter', 'Just exploring']
const serviceOptions = ['Local SEO', 'Paid Ads', 'Social Media', 'Website & Brand', 'Not sure yet']

const faqs = [
  {
    q: 'Where are you based, and do you work with clients outside India?',
    a: 'Our studio is in Vizag, Andhra Pradesh. We actively work with businesses in the United States (Nebraska, and remote), the UAE (Dubai), and across India. Every meeting happens over Google Meet or WhatsApp, and every deliverable is shared in a channel you already use.',
  },
  {
    q: 'How much does a typical engagement cost?',
    a: 'It depends on scope. A one-time project like a website build or a brand refresh starts around $2,500. Ongoing marketing retainers begin at $1,200 per month for a single channel and scale from there. We will always tell you honestly what you actually need, and what you can skip for now.',
  },
  {
    q: 'How long until we see results?',
    a: 'For paid advertising, useful data comes in the first two to three weeks. For local SEO, meaningful ranking movement usually shows up between weeks four and eight. For brand and website work, launch typically lands in four to six weeks depending on complexity.',
  },
  {
    q: 'Do you sign contracts, or is it month-to-month?',
    a: 'Most of our retainers are month-to-month with a 30-day notice. Project work is scoped and priced upfront, no surprises. We do not lock clients into 12-month contracts because we would rather earn the next month by doing the work.',
  },
  {
    q: 'Who will actually be doing the work?',
    a: 'The same person you talk to on the first call. We stay small on purpose so the studio principal is inside every project. When we bring in a specialist (motion, dev, photography) you will meet them directly.',
  },
  {
    q: 'What if the project is not a fit?',
    a: 'We will tell you on the first call. If we are not the right team for what you need, we usually know someone who is, and we will make an introduction.',
  },
]

export default function Contact() {
  useSEO({
    title: 'Contact — Pandr Solutions',
    description: 'Tell us about your business. We reply to every message within one business day. Studio in Vizag, India. Working with clients in the US, UAE, and India.',
    path: '/contact',
  })
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    service: '', budget: '', timeline: '', message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`New inquiry — ${form.name}${form.company ? ' / ' + form.company : ''}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Company: ${form.company}\n` +
      `Service: ${form.service}\n` +
      `Budget: ${form.budget}\n` +
      `Timeline: ${form.timeline}\n\n` +
      `Message:\n${form.message}`
    )
    window.location.href = `mailto:pushpit@pandrsol.com?subject=${subject}&body=${body}`
    setSent(true)
  }

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
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="display"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              maxWidth: '15ch', marginBottom: '2rem',
            }}
          >
            Let's build something <span style={{ color: 'var(--lime)' }}>together</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '600px', color: 'var(--muted-2)',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7,
            }}
          >
            Tell us about your business, what is not working, and what a win would look like six
            months from now. We reply to every message within one business day.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'flex-start',
          }} className="contact-grid">

            {/* LEFT: info */}
            <aside>
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Direct</p>
              <a href="mailto:pushpit@pandrsol.com" className="display" style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: 'var(--white)',
                display: 'inline-block',
                borderBottom: '1px solid var(--lime)',
                paddingBottom: '4px',
                marginBottom: '3rem',
              }}>
                pushpit@pandrsol.com
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Studio', value: 'Vizag, Andhra Pradesh, India' },
                  { label: 'Active in', value: 'India · United States · UAE' },
                  { label: 'Response time', value: 'Within 1 business day' },
                  { label: 'Hours', value: 'Mon – Fri, IST + partner-local zones' },
                ].map(item => (
                  <div key={item.label} style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border)',
                  }}>
                    <p className="eyebrow-muted" style={{ marginBottom: '0.4rem' }}>{item.label}</p>
                    <p style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '2.5rem',
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--lime)',
                borderRadius: '14px',
                background: 'rgba(196,255,61,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--lime)',
                    boxShadow: '0 0 12px var(--lime)',
                  }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Now booking for the next quarter
                  </span>
                </div>
                <p style={{ color: 'var(--muted-2)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  We take on a small number of new engagements each quarter to keep quality high.
                </p>
              </div>
            </aside>

            {/* RIGHT: form */}
            <div>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '3rem',
                    border: '1px solid var(--lime)',
                    borderRadius: '20px',
                    background: 'rgba(196,255,61,0.04)',
                  }}
                >
                  <h2 className="display" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                    On its way.
                  </h2>
                  <p style={{ color: 'var(--muted-2)', lineHeight: 1.7 }}>
                    Your email client should have opened with everything filled in. If it did not,
                    write to <a href="mailto:pushpit@pandrsol.com" style={{ color: 'var(--lime)' }}>
                    pushpit@pandrsol.com</a> directly. We reply within one business day.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  display: 'flex', flexDirection: 'column', gap: '1.25rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  background: 'var(--surface)',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Company" name="company" value={form.company} onChange={handleChange} placeholder="Optional" />
                    <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" />
                  </div>

                  <Chips
                    label="What do you need?"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    options={serviceOptions}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="chips-grid">
                    <Chips label="Budget" name="budget" value={form.budget} onChange={handleChange} options={budgets} />
                    <Chips label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={timelines} />
                  </div>

                  <div>
                    <label style={labelStyle}>Tell us more</label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="What is your business, what have you tried, and what would a win look like?"
                      style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                      onFocus={e => e.target.style.borderColor = 'var(--lime)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-strong)'}
                    />
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    marginTop: '0.5rem', flexWrap: 'wrap',
                  }}>
                    <button type="submit" className="btn-primary">
                      Send message <span>→</span>
                    </button>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                      We reply within 1 business day.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Frequently asked</p>
              <h2 className="display" style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                marginBottom: '1.5rem',
              }}>
                Answers before you ask.
              </h2>
              <p style={{ color: 'var(--muted-2)', lineHeight: 1.7, maxWidth: '420px' }}>
                A few things people ask on the first call. If your question is not here,
                write it into the form above.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((f, i) => (
                <details key={i} style={{
                  borderBottom: '1px solid var(--border)',
                  padding: '1.5rem 0',
                }}>
                  <summary style={{
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    listStyle: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '1rem',
                  }}>
                    {f.q}
                    <span style={{
                      color: 'var(--lime)', fontSize: '1.5rem',
                      lineHeight: 1, flexShrink: 0,
                    }}>+</span>
                  </summary>
                  <p style={{
                    color: 'var(--muted-2)', lineHeight: 1.75,
                    marginTop: '1rem', maxWidth: '640px',
                  }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span { transform: rotate(45deg); transition: transform 0.2s; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .chips-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '0.6rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'var(--surface-2)',
  border: '1px solid var(--border-strong)',
  borderRadius: '10px',
  color: 'var(--text)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  fontFamily: 'inherit',
}

function Field({ label, name, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div>
      <label style={labelStyle} htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'var(--lime)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-strong)'}
      />
    </div>
  )
}

function Chips({ label, name, value, onChange, options }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {options.map(opt => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ target: { name, value: opt } })}
              style={{
                padding: '0.55rem 1rem',
                border: `1px solid ${active ? 'var(--lime)' : 'var(--border-strong)'}`,
                background: active ? 'var(--lime)' : 'transparent',
                color: active ? '#000' : 'var(--text)',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: active ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
