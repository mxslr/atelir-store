import { useRef } from 'react'
import { clamp, segment, useIsMobile, useMouseParallax, useScrollProgress } from '../hooks'
import { IconArrowRight, IconChevronDown } from '../icons'

/* =========================================================================
   HERO. Sticky viewport scroll scene dengan beberapa layer.
   Mekanisme dipinjam dari pola "Reverie": container tinggi, viewport sticky,
   progress di-clamp 0..1, helper ease, mouse parallax via rAF.
   Aset visual sepenuhnya buatan sendiri (gradient mesh + bentuk geometris).
   ========================================================================= */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const isMobile = useIsMobile()
  const mouse = useMouseParallax(0.07, isMobile)

  // Segmen animasi: Scene 1 redup di 0..0.22, Scene 2 muncul di 0.68..0.84
  const sceneOneOpacity = 1 - segment(progress, 0.0, 0.22)
  const sceneTwoOpacity = segment(progress, 0.5, 0.78)
  const sceneTwoExit = 1 - segment(progress, 0.92, 1.0)

  // Portal abstrak membesar saat scroll
  const portalScale = 1 + segment(progress, 0.0, 0.7) * 2.2
  const portalRotate = progress * 80
  const bgScale = 1 + segment(progress, 0.0, 1.0) * 0.18

  // Magnitude mouse parallax per layer
  const MAG_BG = 8
  const MAG_PORTAL = 22
  const MAG_HEADING = 14
  const MAG_FRONT = 36

  return (
    <div id="top" ref={containerRef} className="scene-container">
      <div className="scene-viewport">

        {/* ============================================================
            LAYER 1. Background mesh + placeholder video.
            Pemilik bisa pasang <video> di sini. Fallback memakai gradien.
            ============================================================ */}
        <div
          className="scene-layer"
          style={{
            transform: `translate3d(${mouse.x * MAG_BG}px, ${mouse.y * MAG_BG}px, 0) scale(${bgScale})`,
            background:
              'radial-gradient(60% 50% at 20% 25%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%),' +
              'radial-gradient(50% 50% at 80% 70%, color-mix(in oklab, var(--green) 40%, transparent), transparent 70%),' +
              'radial-gradient(70% 70% at 50% 50%, color-mix(in oklab, var(--bg-soft) 100%, transparent), var(--bg) 80%)',
            zIndex: 1
          }}
        >
          {/*
            GANTI placeholder ini dengan video brand kamu.
            Hapus comment, isi src dengan URL mp4. Pakai poster sebagai fallback.
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, mixBlendMode: 'multiply' }}
              src="GANTI_URL_VIDEO_KAMU.mp4"
            />
          */}
        </div>

        {/* ============================================================
            LAYER 2. Cincin geometris portal yang membesar.
            ============================================================ */}
        <div
          className="scene-layer"
          style={{
            display: 'grid',
            placeItems: 'center',
            transform: `translate3d(${mouse.x * MAG_PORTAL}px, ${mouse.y * MAG_PORTAL}px, 0) scale(${portalScale}) rotate(${portalRotate}deg)`,
            opacity: 0.85,
            zIndex: 2
          }}
        >
          <PortalRings />
        </div>

        {/* ============================================================
            LAYER 3. Heading scene 1.
            ============================================================ */}
        <div
          className="scene-layer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            opacity: sceneOneOpacity,
            pointerEvents: sceneOneOpacity > 0.15 ? 'auto' : 'none',
            transform: `translate3d(${mouse.x * MAG_HEADING}px, ${mouse.y * MAG_HEADING}px, 0)`,
            zIndex: 5
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              width: '100%',
              textAlign: 'center'
            }}
          >
            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 7rem)',
                marginBottom: '0.5rem',
                color: 'var(--ink)',
                animation: 'rise 1s ease both',
                animationDelay: '0.3s',
                opacity: 0
              }}
            >
              Semua orang berhak punya{' '}
              <br />
              website{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>premium</span>.
            </h1>

            <p
              style={{
                marginTop: '1.5rem',
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                color: 'var(--ink-soft)',
                maxWidth: 640,
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.55,
                animation: 'rise 1s ease both',
                animationDelay: '0.55s',
                opacity: 0
              }}
            >
              Kami merakit website, chatbot, dan model AI untuk merek yang ingin tampil beda. Cepat dikerjakan, harga jujur, dan tidak ada satu pun klien kami mendapat hasil yang sama.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                marginTop: '2rem',
                flexWrap: 'wrap',
                animation: 'rise 1s ease both',
                animationDelay: '0.55s',
                opacity: 0
              }}
            >
              <button
                onClick={() => document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                Rancang website kamu
                <IconArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('karya')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-ghost"
              >
                Lihat hasil karya
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            LAYER 4. Garis-garis tipis dekoratif yang bergerak mengarah ke
            kursor lebih kuat (kedalaman parallax).
            ============================================================ */}
        <div
          className="scene-layer"
          style={{
            pointerEvents: 'none',
            transform: `translate3d(${mouse.x * MAG_FRONT}px, ${mouse.y * MAG_FRONT}px, 0)`,
            zIndex: 6
          }}
        >
          <Corners />
        </div>

        {/* ============================================================
            LAYER 5. Scene 2 statistik dan tagline kedua.
            pointerEvents none ketika tidak terlihat agar tidak menutupi CTA.
            ============================================================ */}
        <div
          className="scene-layer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: sceneTwoOpacity * sceneTwoExit,
            pointerEvents: sceneTwoOpacity * sceneTwoExit > 0.15 ? 'auto' : 'none',
            padding: '0 24px',
            zIndex: 7
          }}
        >
          <StatsScene />
        </div>

        {/* ============================================================
            LAYER 6. Indikator gulir di scene 1.
            ============================================================ */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 'max(28px, env(safe-area-inset-bottom))',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'var(--ink-soft)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            opacity: sceneOneOpacity,
            animation: 'rise 1s ease both',
            animationDelay: '0.9s',
            zIndex: 8
          }}
        >
          {/* letter-spacing hanya pada teks (bukan container) supaya chevron di
              bawah tidak ikut tergeser oleh trailing space. text-indent 0.3em
              mengimbangi trailing letter-spacing agar kata benar-benar center. */}
          <span style={{ letterSpacing: '0.3em', textIndent: '0.3em' }}>Scroll</span>
          <span className="bob" style={{ display: 'inline-flex' }}>
            <IconChevronDown size={20} />
          </span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Sub-components dekorasi
   ============================================================ */
function PortalRings() {
  return (
    <div
      style={{
        position: 'relative',
        width: 'min(70vw, 720px)',
        aspectRatio: '1/1'
      }}
    >
      {[1, 0.82, 0.64, 0.46, 0.28].map((s, i) => (
        <div
          key={i}
          className="geo-ring"
          style={{
            width: `${s * 100}%`,
            height: `${s * 100}%`,
            left: `${(1 - s) * 50}%`,
            top: `${(1 - s) * 50}%`,
            borderColor: i === 2 ? 'var(--accent)' : 'var(--line)',
            opacity: i === 2 ? 0.6 : 0.4 + i * 0.05
          }}
        />
      ))}

      {/* titik orbit */}
      <svg viewBox="-100 -100 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g className="spin-slow" style={{ transformOrigin: 'center' }}>
          <circle cx="0" cy="-60" r="2.5" fill="var(--accent)" />
          <circle cx="50" cy="35" r="2" fill="var(--ink)" />
          <circle cx="-50" cy="35" r="2" fill="var(--green)" />
        </g>
      </svg>
    </div>
  )
}

function Corners() {
  // dekorasi tipis di sudut viewport
  const corner = (top?: number, right?: number, bottom?: number, left?: number) => (
    <svg
      viewBox="0 0 80 80"
      width="80"
      height="80"
      style={{
        position: 'absolute',
        top,
        right,
        bottom,
        left,
        color: 'var(--ink-mute)',
        opacity: 0.5
      }}
    >
      <path d="M0 30V0H30" stroke="currentColor" fill="none" strokeWidth="1" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
    </svg>
  )
  return (
    <>
      <div style={{ position: 'absolute', top: 90, left: 16, transform: 'rotate(0deg)' }}>{corner(0, undefined, undefined, 0)}</div>
      <div style={{ position: 'absolute', top: 90, right: 16, transform: 'scaleX(-1)' }}>{corner(0, 0)}</div>
      <div style={{ position: 'absolute', bottom: 60, left: 16, transform: 'scaleY(-1)' }}>{corner(undefined, undefined, 0, 0)}</div>
      <div style={{ position: 'absolute', bottom: 60, right: 16, transform: 'scale(-1,-1)' }}>{corner(undefined, 0, 0)}</div>

      <span
        className="font-mono"
        style={{
          position: 'absolute',
          left: 16,
          bottom: 28,
          fontSize: '0.65rem',
          color: 'var(--ink-mute)',
          letterSpacing: '0.15em'
        }}
      >
        N 06 12 S
      </span>
      <span
        className="font-mono"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 28,
          fontSize: '0.65rem',
          color: 'var(--ink-mute)',
          letterSpacing: '0.15em'
        }}
      >
        E 106 49 T
      </span>
    </>
  )
}

function StatsScene() {
  const stats = [
    { v: '20+', label: 'Proyek dirilis' },
    { v: '5 hari', label: 'Rata-rata pengerjaan' },
    { v: '0', label: 'Template dipakai' },
    { v: '100 %', label: 'Mobile friendly' }
  ]
  return (
    <div
      style={{
        maxWidth: 1100,
        width: '100%',
        textAlign: 'center'
      }}
    >
      <p
        className="font-mono"
        style={{
          color: 'var(--ink-mute)',
          fontSize: '0.72rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}
      >
        Apa yang kami bawa ke meja
      </p>
      <h2
        className="h-display"
        style={{
          fontSize: 'clamp(2rem, 5.5vw, 4.6rem)',
          color: 'var(--ink)'
        }}
      >
        <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Kerajinan</span> digital,
        bukan jalan pintas.
      </h2>

      <div
        style={{
          marginTop: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
            <div
              className="font-display"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 500,
                color: 'var(--ink)'
              }}
            >
              {s.v}
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
