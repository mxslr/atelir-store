import { useState } from 'react'
import { FAQS } from '../config'
import { IconPlus } from '../icons'
import { useReveal } from '../hooks'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)
  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg)'
      }}
    >
      <div ref={ref} className={`rise-in ${shown ? 'in' : ''}`} style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem' }} className="faq-head">
          <div>
            <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              07. Pertanyaan
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Yang sering{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>ditanya</span>.
            </h2>
          </div>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="font-display" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', fontWeight: 500, paddingRight: '1rem' }}>
                  {f.q}
                </span>
                <span className="faq-icon" style={{ color: 'var(--accent)' }}>
                  <IconPlus size={22} stroke={2} />
                </span>
              </button>
              <div className="faq-a" style={{ fontSize: '0.96rem', lineHeight: 1.6 }}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
