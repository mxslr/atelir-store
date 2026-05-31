import { useReveal } from '../hooks'

const POINTS = [
  {
    n: '01',
    title: 'Nol template.',
    desc: 'Setiap layout, ilustrasi, dan komponen dirancang khusus untuk brand kamu. Klien tetangga tidak akan mendapat tampilan kembar.'
  },
  {
    n: '02',
    title: 'Harga paling masuk akal.',
    desc: 'Kami transparan. Konfigurator kami menunjukkan harga sebelum kamu chat, jadi tidak ada negosiasi panjang yang membuang waktu.'
  },
  {
    n: '03',
    title: 'Tools modern, bukan WordPress.',
    desc: 'Next.js, React, Laravel, Tailwind, dan stack performa tinggi lainnya. Bukan WordPress.'
  },
  {
    n: '04',
    title: 'Bukan hasil AI asal jadi.',
    desc: 'AI hanya alat. Setiap baris kode dan komposisi visual diasah manual oleh developer kami - layak rilis.'
  }
]

export default function Why() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)
  return (
    <section
      id="kenapa"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg-soft)'
      }}
    >
      <div ref={ref} className={`rise-in ${shown ? 'in' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          06. Kenapa kami
        </p>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', maxWidth: 800 }}>
          Empat alasan kenapa klien
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>balik lagi</span>.
        </h2>

        <div
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--line)',
            borderRadius: 22,
            overflow: 'hidden',
            border: '1px solid var(--line)'
          }}
        >
          {POINTS.map((p, i) => (
            <div
              key={p.n}
              style={{
                padding: 'clamp(1.6rem, 3vw, 2.4rem)',
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: 'rise 0.7s ease both',
                animationDelay: `${i * 100}ms`
              }}
            >
              <div className="font-display" style={{ fontSize: 'clamp(3rem, 6vw, 4.6rem)', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>
                {p.n}
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
