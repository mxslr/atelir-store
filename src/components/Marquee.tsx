import { Dot } from '../icons'

const ITEMS = [
  'Next.js',
  'Laravel',
  'React',
  'Tailwind',
  'Chatbot AI',
  '3D Web',
  'Animasi Scroll',
  'SEO',
  'TypeScript',
  'Framer Motion',
  'WebGL',
  'PyTorch'
]

export default function Marquee() {
  // Duplikat items agar loop mulus tanpa jeda
  const looped = [...ITEMS, ...ITEMS]
  return (
    <section
      aria-label="Teknologi yang kami pakai"
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-soft)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 36s linear infinite'
        }}
      >
        {looped.map((it, i) => (
          <div
            key={i}
            className="font-display"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              padding: '1.4rem 2rem',
              fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)',
              fontStyle: 'italic',
              color: 'var(--ink)',
              whiteSpace: 'nowrap'
            }}
          >
            {it}
            <Dot size={8} style={{ color: 'var(--accent)' }} />
          </div>
        ))}
      </div>
    </section>
  )
}
