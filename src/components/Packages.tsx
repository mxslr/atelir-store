import { useState } from 'react'
import { PACKAGES, STUDIO_NAME, buildWaUrl } from '../config'
import { IconArrowRight, IconCheck, IconChevronDown, IconWhatsApp } from '../icons'
import { useReveal } from '../hooks'

/* =========================================================================
   PAKET 4-TIER: Basic, Diamond (populer), Premier, Enterprise.
   Setiap kartu kompak di awal (seragam tinggi tanpa border kosong) dan
   memanjang ketika user menekan tombol "Lihat fitur lengkap".
   Animasi pakai trik grid-template-rows 0fr -> 1fr sehingga tinggi
   menyesuaikan konten secara natural tanpa flash.
   ========================================================================= */
export default function Packages() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)

  return (
    <section
      id="paket"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg)'
      }}
    >
      <div ref={ref} className={`rise-in ${shown ? 'in' : ''}`} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              03. Paket siap pakai
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', maxWidth: 720 }}>
              Tidak mau merakit?
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Pilih paket</span> ini.
            </h2>
          </div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 360, fontSize: '0.98rem', lineHeight: 1.55 }}>
            Empat jalur singkat untuk kamu yang sudah tahu skala kebutuhannya. Klik kartu untuk membuka fitur lengkap.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start'
        }}
        className="pkg-grid"
      >
        {PACKAGES.map((p, i) => (
          <PackageCard key={p.id} p={p} index={i} />
        ))}
      </div>

      <style>{`
        .pkg-card {
          position: relative;
          padding: 1.6rem 1.5rem;
          border-radius: 22px;
          border: 1px solid var(--line);
          background: var(--bg-card);
          color: var(--ink);
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.2,0.7,0.2,1), border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
          overflow: hidden;
        }
        .pkg-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .pkg-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.55s cubic-bezier(0.2,0.7,0.2,1);
        }
        .pkg-card:hover {
          transform: translateY(-6px);
          border-color: var(--ink);
          box-shadow: 0 30px 50px -28px rgba(20,17,13,0.35);
        }
        .pkg-card:hover::before { opacity: 1; }
        .pkg-card:hover::after { transform: scaleX(1); }

        .pkg-card.popular {
          background: var(--ink);
          color: var(--bg);
          border-color: var(--ink);
        }
        .pkg-card.popular:hover {
          border-color: var(--accent);
          box-shadow: 0 30px 60px -22px rgba(192,67,28,0.55);
        }
        .pkg-card.popular::before {
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 38%, transparent), transparent 60%);
        }

        .pkg-expand {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.55s cubic-bezier(0.2,0.7,0.2,1);
        }
        .pkg-expand.open { grid-template-rows: 1fr; }
        .pkg-expand > .pkg-expand-inner { overflow: hidden; min-height: 0; }

        .pkg-toggle-icon {
          transition: transform 0.4s cubic-bezier(0.2,0.7,0.2,1);
        }
        .pkg-card.expanded .pkg-toggle-icon { transform: rotate(180deg); }
      `}</style>
    </section>
  )
}

function PackageCard({ p, index }: { p: typeof PACKAGES[number]; index: number }) {
  const [open, setOpen] = useState(false)
  const popular = p.popular
  const isEnterprise = p.price === null

  const waMsg = buildWaUrl(
    isEnterprise
      ? `Halo ${STUDIO_NAME}, saya tertarik dengan paket *Enterprise*. Mohon jadwalkan diskusi scope.`
      : `Halo ${STUDIO_NAME}, saya tertarik dengan paket *${p.name}* (${p.priceLabel}). Mohon info lebih lanjut.`
  )

  const surfaceMuted = popular ? 'rgba(244,239,230,0.7)' : 'var(--ink-soft)'

  // Cursor parallax lokal untuk glow pada hover
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 100
    const my = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mx', `${mx}%`)
    e.currentTarget.style.setProperty('--my', `${my}%`)
  }

  return (
    /* Wrapper menampung badge di luar .pkg-card karena card sendiri pakai
       overflow: hidden untuk membatasi glow hover. Tanpa wrapper, badge
       yang positioning top: -14 akan ikut terpotong. */
    <div
      className="pkg-wrap"
      style={{
        position: 'relative',
        animation: 'rise 0.8s ease both',
        animationDelay: `${index * 80}ms`
      }}
    >
      {popular && <PopularBadge />}
      <article
        onMouseMove={onMove}
        className={`pkg-card ${popular ? 'popular' : ''} ${open ? 'expanded' : ''}`}
      >
        {/* === BAGIAN KOMPAK (selalu tampil, seragam antar kartu) === */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: surfaceMuted
          }}
        >
          {p.number} TIER
        </span>
        <h3 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 500, lineHeight: 1, margin: '0.4rem 0 0.65rem' }}>
          {p.name}
        </h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.5, color: surfaceMuted, minHeight: '4.2em' }}>
          {p.subtitle}
        </p>

        <div
          className="font-display"
          style={{
            fontSize: isEnterprise ? '1.85rem' : '2.1rem',
            fontWeight: 600,
            lineHeight: 1,
            marginTop: '1rem'
          }}
        >
          {p.priceLabel}
        </div>
        <div className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: surfaceMuted, marginTop: 6 }}>
          {isEnterprise ? 'sesuai kebutuhan' : 'satu kali bayar'}
        </div>

        <div
          style={{
            marginTop: '1rem',
            padding: '0.6rem 0.85rem',
            borderRadius: 12,
            background: popular ? 'rgba(244,239,230,0.08)' : 'var(--bg-soft)',
            border: '1px dashed',
            borderColor: popular ? 'rgba(244,239,230,0.18)' : 'var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: surfaceMuted }}>
            Waktu pengerjaan
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>{p.workTime}</span>
        </div>
      </div>

      {/* === AREA EXPANDABLE === */}
      <div className={`pkg-expand ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="pkg-expand-inner">
          <div style={{ paddingTop: '1rem', position: 'relative', zIndex: 1 }}>
            {p.speedyAddOn && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 14,
                  background: popular ? 'rgba(192,67,28,0.18)' : 'var(--accent-soft)',
                  border: '1px solid',
                  borderColor: popular ? 'rgba(226,101,54,0.45)' : 'rgba(192,67,28,0.25)',
                  display: 'flex',
                  gap: '0.65rem',
                  alignItems: 'flex-start'
                }}
              >
                <SparkSvg color={popular ? 'var(--accent)' : 'var(--accent-deep)'} />
                <div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: popular ? 'var(--accent)' : 'var(--accent-deep)', fontWeight: 600 }}>
                    {p.speedyAddOn.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: 3, lineHeight: 1.45, opacity: 0.9 }}>
                    {p.speedyAddOn.desc}
                  </div>
                </div>
              </div>
            )}

            {p.highlightFeaturesPrefix && (
              <p
                className="font-display"
                style={{
                  marginTop: '1.2rem',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  fontWeight: 500,
                  lineHeight: 1.3
                }}
              >
                {p.highlightFeaturesPrefix}
              </p>
            )}

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '1.2rem 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}
            >
              {p.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.5
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: popular ? 'var(--accent)' : 'var(--accent-soft)',
                      color: popular ? '#fff' : 'var(--accent-deep)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 3
                    }}
                    aria-hidden
                  >
                    <IconCheck size={10} stroke={2.4} />
                  </span>
                  <span style={{ opacity: 0.92 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* === TOMBOL AKSI BAWAH (selalu tampil) === */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            background: 'transparent',
            border: '1px solid',
            borderColor: popular ? 'rgba(244,239,230,0.25)' : 'var(--line)',
            color: 'inherit',
            padding: '0.7rem 1rem',
            borderRadius: 999,
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            transition: 'background 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = popular ? 'rgba(244,239,230,0.08)' : 'var(--bg-soft)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {open ? 'Tutup detail' : 'Lihat fitur lengkap'}
          <span className="pkg-toggle-icon" style={{ display: 'inline-flex' }}>
            <IconChevronDown size={16} />
          </span>
        </button>

        <a
          href={waMsg}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{
            background: popular ? 'var(--bg)' : 'var(--ink)',
            color: popular ? 'var(--ink)' : 'var(--bg)',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <IconWhatsApp size={16} />
            {p.cta}
          </span>
          <IconArrowRight size={14} />
        </a>
      </div>
      </article>
    </div>
  )
}

/* Bintang sparkle yang digambar manual sebagai SVG (bukan emoji). */
function SparkSvg({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ flexShrink: 0 }}>
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  )
}

/* Badge populer dengan sparkle. */
function PopularBadge() {
  return (
    <span
      className="font-mono"
      style={{
        position: 'absolute',
        top: -14,
        left: 20,
        padding: '0.4rem 0.85rem',
        borderRadius: 999,
        background: 'var(--accent)',
        color: '#fff',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        boxShadow: '0 8px 20px -8px rgba(192,67,28,0.6)',
        zIndex: 5
      }}
    >
      <SparkSvg color="#fff" size={12} />
      Populer
    </span>
  )
}
