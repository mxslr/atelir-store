import { useEffect, useRef, useState } from 'react'
import { IconArrowRight, IconCheck, IconWhatsApp } from '../icons'
import { useIsMobile, useReveal } from '../hooks'
import { STUDIO_NAME, buildWaUrl } from '../config'

/* =========================================================================
   ALUR PEMBELI. Timeline horizontal di desktop, vertikal di mobile.
   Setiap step punya nomor, durasi, judul, dan deskripsi. Garis penghubung
   antar step terisi progresif sesuai posisi scroll user dalam section.
   ========================================================================= */

type Step = {
  n: string
  duration: string
  title: string
  desc: string
  ok: string[]
}

// GANTI urutan atau isi tiap step bila alur kerja studio berubah.
const STEPS: Step[] = [
  {
    n: '01',
    duration: 'Beberapa menit',
    title: 'Kirim pesan',
    desc: 'Klik tombol WhatsApp di mana saja di halaman ini. Kami balas pada jam kerja, biasanya dalam beberapa jam.',
    ok: ['Konsultasi awal gratis', 'Tanpa formulir panjang']
  },
  {
    n: '02',
    duration: 'Hari 1',
    title: 'Konsultasi dan brief',
    desc: 'Kami diskusi singkat untuk paham bisnis, target, dan referensi yang kamu suka. Tidak perlu jadi ahli desain dulu.',
    ok: ['Brief disusun bareng', 'Moodboard awal']
  },
  {
    n: '03',
    duration: 'Hari 2',
    title: 'Penawaran final',
    desc: 'Kamu terima dokumen berisi rincian fitur, harga, dan timeline. Tidak ada biaya tersembunyi.',
    ok: ['DP 50 % untuk mulai', 'Kontrak digital singkat']
  },
  {
    n: '04',
    duration: 'Hari 3 - selesai',
    title: 'Pengerjaan',
    desc: 'Tim kami merakit dari nol. Update progress dikirim berkala lewat WhatsApp, lengkap dengan tautan staging.',
    ok: ['Staging URL terkirim', 'Update setiap milestone']
  },
  {
    n: '05',
    duration: 'Mendekati launch',
    title: 'Revisi terarah',
    desc: 'Kamu cek hasil, kami sesuaikan - pas. Jumlah revisi mengikuti paket yang dipilih agar tetap fokus.',
    ok: ['Catatan revisi terstruktur', 'Round revisi sesuai paket']
  },
  {
    n: '06',
    duration: 'Hari peluncuran',
    title: 'Launching dan serah terima',
    desc: 'Website dipindah ke domain kamu. Kamu terima dokumentasi cara update konten dan kunci akses.',
    ok: ['Pelunasan, lalu live', 'Garansi setelah launch']
  }
]

export default function Flow() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile()

  // Progress garis penghubung mengikuti scroll dalam track.
  // Formula yang dipakai: p=0 ketika track top menyentuh 75 % tinggi
  // viewport, dan p=1 ketika track top mencapai 25 % dari atas. Jadi
  // user cukup scroll sekitar setengah layar untuk mengisi penuh seluruh
  // 6 step, jauh lebih cepat daripada versi sebelumnya yang baru penuh
  // saat section nyaris keluar viewport.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        let p: number
        if (isMobile) {
          // Track vertikal dan tinggi. Isi rail mengikuti seberapa jauh track
          // melewati garis pemicu (~62% tinggi layar), sehingga tiap titik
          // menyala tepat saat kartunya sampai di tengah layar dan mundur lagi
          // saat user scroll ke atas. Ini yang membuat animasinya terlihat di
          // mobile (versi lama terisi penuh hanya dalam setengah layar).
          const trigger = vh * 0.62
          p = (trigger - rect.top) / el.offsetHeight
        } else {
          // Desktop: track horizontal pendek, terisi penuh dalam ~setengah
          // layar scroll begitu section masuk viewport.
          const startTop = vh * 0.75
          const endTop = vh * 0.25
          p = (startTop - rect.top) / (startTop - endTop)
        }
        setProgress(Math.max(0, Math.min(1, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isMobile])

  const waUrl = buildWaUrl(`Halo ${STUDIO_NAME}, saya tertarik memulai proyek. Tolong jelaskan alur kerjanya.`)

  return (
    <section
      id="alur"
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
              05. Alur pembeli
            </p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', maxWidth: 760 }}>
              Dari{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>pesan</span>{' '}
              - website kamu menyala.
            </h2>
          </div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 360, fontSize: '0.98rem', lineHeight: 1.55 }}>
            Enam langkah transparan. Kamu tau posisi proyek setiap saat, tanpa harus menebak-nebak.
          </p>
        </div>

        <div ref={trackRef} className="flow-track">
          {/* Garis dasar yang terisi seiring scroll */}
          <div className="flow-rail" aria-hidden>
            <div
              className="flow-rail-fill"
              style={{ '--p': progress } as React.CSSProperties}
            />
          </div>

          {STEPS.map((s, idx) => (
            <StepCard key={s.n} step={s} index={idx} progress={progress} />
          ))}
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ padding: '0.95rem 1.5rem' }}>
            <IconWhatsApp size={16} />
            Mulai dari langkah 01
            <IconArrowRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .flow-track {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .flow-rail {
          position: absolute;
          left: 18px;
          top: 14px;
          bottom: 14px;
          width: 2px;
          background: var(--line);
          border-radius: 2px;
        }
        .flow-rail-fill {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: calc(var(--p) * 100%);
          background: linear-gradient(to bottom, var(--accent), var(--accent-deep));
          border-radius: 2px;
          transition: height 0.2s linear;
        }

        @media (min-width: 1024px) {
          .flow-track {
            grid-template-columns: repeat(6, 1fr);
            gap: 1rem;
          }
          .flow-rail {
            left: 32px;
            right: 32px;
            top: 28px;
            bottom: auto;
            width: auto;
            height: 2px;
          }
          .flow-rail-fill {
            top: 0;
            bottom: 0;
            left: 0;
            right: auto;
            height: 100%;
            width: calc(var(--p) * 100%);
            background: linear-gradient(to right, var(--accent), var(--accent-deep));
            transition: width 0.2s linear;
          }
        }

        .flow-card {
          position: relative;
          padding: 1.2rem 1.2rem 1.3rem;
          padding-left: 3.4rem;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: var(--bg-card);
          transition: transform 0.35s cubic-bezier(0.2,0.7,0.2,1), border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .flow-card:hover {
          transform: translateY(-4px);
          border-color: var(--ink);
          box-shadow: 0 24px 40px -28px rgba(20,17,13,0.35);
        }
        @media (min-width: 1024px) {
          .flow-card {
            padding: 3.6rem 1.2rem 1.4rem;
          }
        }

        .flow-dot {
          position: absolute;
          left: 8px;
          top: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid var(--line);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          color: var(--ink-mute);
          z-index: 2;
          transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease;
        }
        .flow-dot.reached {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          transform: scale(1.08);
        }
        @media (min-width: 1024px) {
          .flow-dot {
            left: 50%;
            top: 14px;
            transform: translateX(-50%);
            width: 32px;
            height: 32px;
            font-size: 0.72rem;
          }
          .flow-dot.reached {
            transform: translateX(-50%) scale(1.08);
          }
        }
      `}</style>
    </section>
  )
}

function StepCard({ step, index, progress }: { step: Step; index: number; progress: number }) {
  const total = STEPS.length
  // Kartu sendiri statis. Yang bergerak mengikuti scroll hanya warna oren pada
  // nomor (dot) dan isi garis penghubung — keduanya otomatis mundur saat
  // user scroll ke atas karena terikat langsung ke progress.
  const threshold = (index + 0.5) / total
  const reached = progress >= threshold

  return (
    <div className="flow-card">
      <span className={`flow-dot ${reached ? 'reached' : ''}`}>{step.n}</span>

      <div
        className="font-mono"
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: reached ? 'var(--accent)' : 'var(--ink-mute)',
          marginBottom: '0.45rem',
          transition: 'color 0.35s ease'
        }}
      >
        {step.duration}
      </div>

      <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.6rem' }}>
        {step.title}
      </h3>

      <p style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--ink-soft)', marginBottom: '0.85rem' }}>
        {step.desc}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {step.ok.map((line) => (
          <li key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--ink)' }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: 'var(--accent-soft)',
                color: 'var(--accent-deep)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 3
              }}
              aria-hidden
            >
              <IconCheck size={8} stroke={2.4} />
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
