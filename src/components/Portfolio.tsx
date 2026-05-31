import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PORTFOLIO, STUDIO_NAME, buildWaUrl } from '../config'
import { IconArrowUpRight, IconClose, IconWhatsApp } from '../icons'
import { useReveal } from '../hooks'

export default function Portfolio() {
  const [active, setActive] = useState<string | null>(null)
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)
  const activeItem = PORTFOLIO.find((p) => p.id === active) || null

  // Tutup modal dengan Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll selama modal terbuka. Pola position:fixed dengan
  // top: -scrollY menjaga posisi visual tetap, mencegah scroll halaman
  // (html maupun body), lalu restore scroll saat modal ditutup.
  //
  // PENTING: html punya scroll-behavior: smooth global, sehingga panggilan
  // scrollTo(0, scrollY) di akhir akan dianimasikan dari 0. Itulah penyebab
  // "scroll dari hero" saat menutup modal. Solusinya: nonaktifkan
  // scroll-behavior sementara, scroll instan ke posisi semula, lalu pulihkan.
  useEffect(() => {
    if (!active) return
    const scrollY = window.scrollY
    const body = document.body
    const html = document.documentElement
    const prev = {
      bodyPos: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
      htmlBehavior: html.style.scrollBehavior
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    html.style.overflow = 'hidden'
    return () => {
      // Matikan scroll-behavior dulu, lalu restore body posisi, baru scroll
      // instan ke koordinat semula. Pulihkan scroll-behavior setelah frame
      // berikutnya supaya scroll smooth lainnya tetap bekerja.
      html.style.scrollBehavior = 'auto'
      body.style.position = prev.bodyPos
      body.style.top = prev.bodyTop
      body.style.left = prev.bodyLeft
      body.style.right = prev.bodyRight
      body.style.width = prev.bodyWidth
      html.style.overflow = prev.htmlOverflow
      window.scrollTo(0, scrollY)
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prev.htmlBehavior
      })
    }
  }, [active])

  return (
    <section
      id="karya"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg-soft)'
      }}
    >
      <div ref={ref} className={`rise-in ${shown ? 'in' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              04. Karya terkurasi
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', maxWidth: 720 }}>
              Bukti, bukan{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>klaim</span>.
            </h2>
          </div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 360, fontSize: '0.98rem', lineHeight: 1.55 }}>
            Klik kartu untuk membuka demo video singkat tiap proyek. Tidak ada dua proyek yang serupa.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.1rem'
          }}
        >
          {PORTFOLIO.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className="card"
              style={{
                background: 'var(--bg-card)',
                padding: 0,
                overflow: 'hidden',
                color: 'var(--ink)',
                cursor: 'pointer',
                textAlign: 'left',
                animation: 'rise 0.7s ease both',
                animationDelay: `${i * 60}ms`,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                {p.image ? (
                  /* Bila pemilik mengisi field image di config.ts, gambar
                     dipakai sebagai thumbnail. Selain itu fallback ke mock. */
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <ThumbMock accent={p.accent} title={p.title} />
                )}
              </div>
              <div style={{ padding: '1.1rem 1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="chip">{p.type}</span>
                  <IconArrowUpRight size={16} style={{ color: 'var(--ink-mute)' }} />
                </div>
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 500, marginTop: '0.75rem' }}>
                  {p.title}
                </h3>
                <p className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', marginTop: 4, letterSpacing: '0.05em' }}>
                  {p.tech}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal dirender lewat React Portal ke document.body supaya lepas
          dari stacking context section Portfolio (z-index 2). Tanpa portal,
          section lain di bawahnya (misal Alur Pembeli, juga z-index 2) yang
          datang berikutnya di DOM dapat menimpa modal saat ditampilkan. */}
      {activeItem && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'clamp(96px, 12vh, 120px)',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            paddingLeft: 16,
            paddingRight: 16,
            zIndex: 9999,
            animation: 'rise 0.35s ease both'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 980,
              width: '100%',
              maxHeight: 'calc(100vh - 132px)',
              background: 'var(--bg-card)',
              borderRadius: 22,
              /* Border 1px sebelumnya tampak sebagai garis putih di kiri
                 kanan video. Cukup mengandalkan shadow untuk pemisahan. */
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', borderBottom: '1px solid var(--line)' }}>
              <div>
                <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 500 }}>{activeItem.title}</h3>
                <p style={{ color: 'var(--ink-mute)', fontSize: '0.82rem', marginTop: 4 }}>
                  {activeItem.type}. {activeItem.tech}.
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Tutup"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconClose size={16} />
              </button>
            </div>

            {/* line-height 0 + fontSize 0 mencegah whitespace baseline default
                dari elemen inline <video>/<img>. Tanpa ini ada celah ~4px di
                bawah video. maxHeight dihitung dari sisa ruang modal supaya
                konten tidak perlu di-scroll. */}
            <div style={{ position: 'relative', background: '#000', aspectRatio: '16/9', maxHeight: 'calc(100vh - 320px)', lineHeight: 0, fontSize: 0 }}>
              {activeItem.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={activeItem.video}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                /* Fallback ketika URL video demo belum diisi. GANTI activeItem.video di config.ts. */
                <DemoFallback accent={activeItem.accent} title={activeItem.title} />
              )}
            </div>

            <div style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <p style={{ color: 'var(--ink-soft)', maxWidth: 600, fontSize: '0.95rem', lineHeight: 1.55 }}>
                {activeItem.description}
              </p>
              <a
                href={buildWaUrl(
                  `Halo ${STUDIO_NAME}, saya mau yang seperti ${activeItem.title}. Mohon info dan jadwal.`
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent"
              >
                <IconWhatsApp size={16} />
                Mau yang seperti ini
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

/* Mockup browser CSS pengganti screenshot proyek. */
function ThumbMock({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${accent}22, ${accent}05 60%), var(--bg-soft)`
      }}
    >
      <div className="mock-window" style={{ position: 'absolute', left: 16, top: 16, right: 16, bottom: 16 }}>
        <div className="mock-window-bar">
          <span className="mock-dot" />
          <span className="mock-dot" />
          <span className="mock-dot" />
        </div>
        <div style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ width: 80, height: 8, background: accent, borderRadius: 4, opacity: 0.85 }} />
          <div style={{ width: '85%', height: 14, background: 'var(--line)', borderRadius: 4 }} />
          <div style={{ width: '60%', height: 14, background: 'var(--line)', borderRadius: 4 }} />
          <div style={{ width: '40%', height: 30, background: accent, borderRadius: 999, opacity: 0.9, marginTop: 6 }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <div style={{ flex: 1, height: 28, background: 'var(--line-soft)', borderRadius: 6 }} />
            <div style={{ flex: 1, height: 28, background: 'var(--line-soft)', borderRadius: 6 }} />
            <div style={{ flex: 1, height: 28, background: 'var(--line-soft)', borderRadius: 6 }} />
          </div>
        </div>
        <span
          className="font-mono"
          style={{
            position: 'absolute',
            right: 12,
            bottom: 10,
            fontSize: '0.65rem',
            color: 'var(--ink-mute)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          {title.split(' ')[0]}
        </span>
      </div>
    </div>
  )
}

function DemoFallback({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(60% 50% at 50% 35%, ${accent}, transparent 70%), #0f0d0a`,
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p
          className="font-mono"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '0.5rem'
          }}
        >
          Demo video placeholder
        </p>
        <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontStyle: 'italic' }}>
          {title}
        </p>
        <p style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: 12 }}>
          Pemilik tinggal mengganti URL video di file config.ts
        </p>
      </div>

      {/* garis grid halus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}
