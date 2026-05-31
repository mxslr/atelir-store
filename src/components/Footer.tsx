import { STUDIO_NAME, buildWaUrl } from '../config'
import { IconLogo, IconWhatsApp } from '../icons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(60px, 8vw, 100px) 24px 32px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--line)'
          }}
          className="footer-grid"
        >
          {/* Kolom brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <IconLogo size={26} />
              <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic' }}>
                {STUDIO_NAME}
              </span>
            </div>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.93rem', lineHeight: 1.6, marginTop: '1rem', maxWidth: 360 }}>
              Studio independen yang merakit website, chatbot, dan model AI dari nol. Berbasis di Indonesia, kerja untuk klien di mana saja.
            </p>
          </div>

          {/* Kolom Layanan */}
          <FooterCol
            title="Layanan"
            links={[
              { label: 'Website', href: '#layanan' },
              { label: 'Chatbot', href: '#layanan' },
              { label: 'AI Modelling', href: '#layanan' },
              { label: 'Alur Kerja', href: '#alur' }
            ]}
          />

          {/* Kolom Perusahaan */}
          <FooterCol
            title="Perusahaan"
            links={[
              { label: 'Karya', href: '#karya' },
              { label: 'Paket', href: '#paket' },
              { label: 'Kenapa Kami', href: '#kenapa' },
              { label: 'Pertanyaan', href: '#faq' }
            ]}
          />

          {/* Kolom Terhubung */}
          <div>
            <h4 className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: '1rem' }}>
              Terhubung
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a
                  href={buildWaUrl(`Halo ${STUDIO_NAME}, saya mau konsultasi.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-u"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
                >
                  <IconWhatsApp size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* baris bawah */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--ink-mute)' }}>
            &copy; {year} {STUDIO_NAME} Store. Hak cipta dilindungi.
          </p>
          <p className="font-display" style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Dibuat dengan kode, bukan template.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: '1rem' }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="link-u" style={{ fontSize: '0.94rem' }}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
