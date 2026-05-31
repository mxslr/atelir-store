import { useState } from 'react'
import { BASE_PRICES, PROJECT_DESC, PROJECT_LABELS, formatIDR } from '../config'
import { MarkAI, MarkChat, MarkWeb, IconArrowUpRight } from '../icons'
import { useReveal } from '../hooks'

type Props = {
  onPick: (cat: 'web' | 'chatbot' | 'ai', projectId: string) => void
}

const TABS: { id: 'web' | 'chatbot' | 'ai'; label: string; mark: React.ReactNode }[] = [
  { id: 'web', label: 'Website', mark: <MarkWeb /> },
  { id: 'chatbot', label: 'Chatbot', mark: <MarkChat /> },
  { id: 'ai', label: 'AI Modelling', mark: <MarkAI /> }
]

export default function Services({ onPick }: Props) {
  const [tab, setTab] = useState<'web' | 'chatbot' | 'ai'>('web')
  const { ref, shown } = useReveal<HTMLDivElement>(0.12)

  const items = Object.keys(BASE_PRICES[tab])

  return (
    <section
      id="layanan"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg)'
      }}
    >
      <div
        ref={ref}
        className={`rise-in ${shown ? 'in' : ''}`}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              01. Layanan
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', maxWidth: 720 }}>
              Tiga lini, satu standar:
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>kerajinan kode</span> yang serius.
            </h2>
          </div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 360, fontSize: '0.98rem', lineHeight: 1.55 }}>
            Klik salah satu kartu untuk langsung membuka konfigurator dengan jenis proyek yang sesuai sudah dipilih.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`tab-pill ${tab === t.id ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          key={tab}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.1rem',
            animation: 'rise 0.6s ease both'
          }}
        >
          {items.map((id, idx) => (
            <button
              key={id}
              onClick={() => onPick(tab, id)}
              className="card"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                background: 'var(--bg-card)',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--ink)',
                animation: 'rise 0.7s ease both',
                animationDelay: `${idx * 70}ms`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: 'var(--accent)' }}>{TABS.find((t) => t.id === tab)?.mark}</div>
                <IconArrowUpRight size={18} style={{ color: 'var(--ink-mute)' }} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 500, lineHeight: 1.15 }}>
                {PROJECT_LABELS[tab][id]}
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                {PROJECT_DESC[tab][id]}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed var(--line)' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ink-mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Mulai dari
                </span>
                <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)' }}>
                  {formatIDR(BASE_PRICES[tab][id])}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
