import { useEffect, useState } from 'react'
import { IconLogo, IconMenu, IconClose, IconSun, IconMoon, IconWhatsApp } from '../icons'
import { STUDIO_NAME, WA_NUMBER, buildWaUrl } from '../config'

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const MENU = [
  { id: 'layanan', label: 'Layanan' },
  { id: 'konfigurator', label: 'Rancang Sendiri' },
  { id: 'paket', label: 'Paket' },
  { id: 'karya', label: 'Karya' },
  { id: 'kenapa', label: 'Kenapa Kami' }
]

export default function Navbar({ theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const waLink = buildWaUrl(
    `Halo ${STUDIO_NAME}, saya ingin konsultasi gratis tentang website saya.`
  )

  return (
    <header
      style={{
        position: 'fixed',
        top: scrolled ? 12 : 18,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        width: 'min(1200px, calc(100vw - 24px))',
        transition: 'top 0.35s ease'
      }}
    >
      <nav
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.55rem 0.85rem' : '0.85rem 1rem',
          borderRadius: 999,
          transition: 'padding 0.35s ease',
          boxShadow: scrolled ? '0 10px 40px -22px rgba(0,0,0,0.18)' : 'none'
        }}
      >
        {/* Brand */}
        <button
          onClick={() => navTo('top')}
          aria-label={`Buka beranda ${STUDIO_NAME}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink)',
            padding: '0.25rem 0.4rem'
          }}
        >
          <IconLogo size={26} />
          <span
            className="font-display"
            style={{
              fontWeight: 600,
              fontSize: '1.15rem',
              fontStyle: 'italic'
            }}
          >
            {STUDIO_NAME}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '0.62rem',
              opacity: 0.55,
              marginLeft: 4,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            studio
          </span>
        </button>

        {/* Menu desktop */}
        <ul
          className="md:flex"
          style={{
            display: 'none',
            gap: '0.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          {MENU.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => navTo(m.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--ink-soft)',
                  fontWeight: 500,
                  padding: '0.5rem 0.8rem',
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  borderRadius: 999,
                  transition: 'color 0.25s ease, background 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ink)'
                  e.currentTarget.style.background = 'var(--bg-soft)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ink-soft)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onToggleTheme}
            aria-label="Ubah mode terang gelap"
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              background: 'var(--bg-soft)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary md:inline-flex"
            style={{ display: 'none' }}
          >
            <IconWhatsApp size={16} />
            Konsultasi Gratis
          </a>

          {/* Hamburger mobile */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              background: 'var(--ink)',
              color: 'var(--bg)',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {open ? <IconClose size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="md:hidden"
        style={{
          maxHeight: open ? 380 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.45s ease, margin 0.45s ease',
          marginTop: open ? 8 : 0
        }}
      >
        <div
          className="glass"
          style={{
            borderRadius: 22,
            padding: '0.6rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {MENU.map((m) => (
            <button
              key={m.id}
              onClick={() => navTo(m.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--ink)',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: '1px dashed var(--line-soft)'
              }}
            >
              {m.label}
            </button>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ margin: '0.75rem 0.3rem 0.3rem' }}
          >
            <IconWhatsApp size={16} /> Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Inline media query helper karena Tailwind class md:flex hanya kuasai display */}
      <style>{`
        @media (min-width: 768px) {
          .md\\:flex { display: flex !important; }
          .md\\:inline-flex { display: inline-flex !important; }
          .md\\:hidden { display: none !important; }
        }
      `}</style>
    </header>
  )
}
