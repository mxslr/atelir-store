import { STUDIO_NAME, buildWaUrl } from '../config'
import { IconArrowRight, IconWhatsApp } from '../icons'
import { useReveal } from '../hooks'

export default function CTA() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.15)
  const wa = buildWaUrl(
    `Halo ${STUDIO_NAME}, saya mau konsultasi gratis tentang proyek website saya.`
  )
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(60px, 8vw, 100px) 24px clamp(80px, 10vw, 120px)',
        background: 'var(--bg-soft)'
      }}
    >
      <div
        ref={ref}
        className={`rise-in ${shown ? 'in' : ''}`}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          borderRadius: 28,
          padding: 'clamp(2rem, 5vw, 4rem)',
          background: 'var(--ink)',
          color: 'var(--bg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow)'
        }}
      >
        {/* Background dekoratif */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, color-mix(in oklab, var(--accent) 80%, transparent), transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, color-mix(in oklab, var(--green) 60%, transparent), transparent 70%)',
            filter: 'blur(30px)',
            opacity: 0.7
          }}
        />

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }} className="cta-grid">
          <div>
            <p className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.75rem' }}>
              Konsultasi gratis
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Punya ide?{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Mari kita</span>{' '}
              bangun.
            </h2>
            <p style={{ marginTop: '1rem', opacity: 0.75, maxWidth: 500, fontSize: '1rem', lineHeight: 1.55 }}>
              Cerita singkat tentang bisnis kamu sudah cukup untuk dimulai. Kami balas dalam beberapa jam, bukan beberapa hari.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="cta-actions">
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ padding: '1rem 1.6rem', fontSize: '1rem' }}>
              <IconWhatsApp size={18} />
              Hubungi via WhatsApp
              <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cta-grid { grid-template-columns: 1.4fr 1fr !important; }
          .cta-actions { justify-content: flex-end !important; }
        }
      `}</style>
    </section>
  )
}
