import { useEffect, useMemo, useRef } from 'react'
import {
  ADDONS,
  ADDON_DAYS,
  BASE_DAYS,
  BASE_PAGES,
  BASE_PAGES_BY_PROJECT,
  BASE_PRICES,
  PER_EXTRA_PAGE_DAYS,
  PER_PAGE_COST,
  PROJECT_LABELS,
  SPEED_OPTIONS,
  STUDIO_NAME,
  TECH_OPTIONS,
  buildWaUrl,
  formatIDR
} from '../config'
import { IconArrowRight, IconCheck, IconMinus, IconPlus, IconWhatsApp } from '../icons'
import { useReveal } from '../hooks'

export type ConfiguratorState = {
  category: 'web' | 'chatbot' | 'ai'
  project: string
  tech: string
  pages: number
  addons: string[]
  speed: string
}

type Props = {
  state: ConfiguratorState
  setState: React.Dispatch<React.SetStateAction<ConfiguratorState>>
}

export default function Configurator({ state, setState }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1)

  // Bila kategori berubah dan project tidak lagi valid, pilih item pertama.
  useEffect(() => {
    const validKeys = Object.keys(BASE_PRICES[state.category])
    if (!validKeys.includes(state.project)) {
      setState((s) => ({ ...s, project: validKeys[0] }))
    }
  }, [state.category, state.project, setState])

  // Reset daftar addon saat kategori berubah karena id addon berbeda
  // antar kategori (web vs chatbot vs ai).
  const prevCat = useRef(state.category)
  useEffect(() => {
    if (prevCat.current !== state.category) {
      prevCat.current = state.category
      setState((s) => ({ ...s, addons: [] }))
    }
  }, [state.category, setState])

  // Reset jumlah halaman ke base milik proyek aktif setiap kali user
  // ganti jenis proyek (tugas kuliah 3, portfolio 1, dst).
  const prevProject = useRef(state.project)
  useEffect(() => {
    if (prevProject.current !== state.project) {
      prevProject.current = state.project
      const base = BASE_PAGES_BY_PROJECT[state.project] ?? BASE_PAGES
      setState((s) => ({ ...s, pages: base }))
    }
  }, [state.project, setState])

  const projectKeys = Object.keys(BASE_PRICES[state.category])
  // Addon list aktif sesuai kategori
  const categoryAddons = ADDONS[state.category] || []
  // Halaman dasar untuk proyek aktif
  const projectBasePages = BASE_PAGES_BY_PROJECT[state.project] ?? BASE_PAGES

  // ===== KALKULASI HARGA =====
  const basePrice = BASE_PRICES[state.category][state.project] || 0
  const techOption = TECH_OPTIONS.find((t) => t.id === state.tech)
  const techApplicable = state.category === 'web'
  // Tech cost = %tase harga dasar (Next.js 30 %)
  const techCost = Math.round(basePrice * (techOption?.costPct ?? 0))
  const extraPages = Math.max(0, state.pages - projectBasePages)
  const pagesCost = state.category === 'web' ? extraPages * PER_PAGE_COST : 0
  const addonsCost = state.addons.reduce(
    (acc, id) => acc + (categoryAddons.find((a) => a.id === id)?.cost ?? 0),
    0
  )
  const speed = SPEED_OPTIONS.find((s) => s.id === state.speed)!
  // Biaya kecepatan = %tase dari harga dasar proyek
  const speedCost = Math.round(basePrice * speed.costPct)
  const total = basePrice + (techApplicable ? techCost : 0) + pagesCost + addonsCost + speedCost

  // ===== KALKULASI WAKTU =====
  const days = useMemo(() => {
    const baseDays = BASE_DAYS[state.project] || 7
    const pageDays = state.category === 'web' ? extraPages * PER_EXTRA_PAGE_DAYS : 0
    const addonDaysMap = ADDON_DAYS[state.category] || {}
    const addonDays = state.addons.reduce((acc, id) => acc + (addonDaysMap[id] || 0), 0)
    const raw = (baseDays + pageDays + addonDays) * speed.mult
    const minD = Math.max(2, Math.round(raw))
    const maxD = Math.max(minD + 2, Math.round(raw * 1.25))
    return { min: minD, max: maxD }
  }, [state, extraPages, speed])

  // ===== TOGGLE ADDONS =====
  const toggleAddon = (id: string) => {
    setState((s) => ({
      ...s,
      addons: s.addons.includes(id) ? s.addons.filter((a) => a !== id) : [...s.addons, id]
    }))
  }

  // ===== WHATSAPP MESSAGE =====
  const techLabel = techApplicable
    ? TECH_OPTIONS.find((t) => t.id === state.tech)?.name || '-'
    : 'Sesuai standar studio'

  const addonsLines = state.addons.length
    ? state.addons.map((id) => `- ${categoryAddons.find((a) => a.id === id)?.name}`).join('\n')
    : '- Tidak ada tambahan'

  const message =
    `Halo ${STUDIO_NAME}, saya tertarik dengan studio kalian.\n\n` +
    `*Kategori:* ${state.category === 'web' ? 'Website' : state.category === 'chatbot' ? 'Chatbot' : 'AI Modelling'}\n` +
    `*Jenis Proyek:* ${PROJECT_LABELS[state.category][state.project]}\n` +
    (state.category === 'web' ? `*Teknologi:* ${techLabel}\n*Jumlah Halaman:* ${state.pages}\n` : '') +
    `*Tambahan:*\n${addonsLines}\n` +
    `*Kecepatan:* ${speed.name}\n\n` +
    `*Estimasi Harga:* ${formatIDR(total)}\n` +
    `*Estimasi Waktu:* ${days.min} - ${days.max} hari\n\n` +
    `Mohon info dan jadwal konsultasinya. Terima kasih.`

  const waUrl = buildWaUrl(message)

  return (
    <section
      id="konfigurator"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(80px, 10vw, 160px) 24px',
        background: 'var(--bg-soft)'
      }}
    >
      {/* Header dibungkus rise-in. Sengaja DIPISAH dari .cfg-grid karena
          transform pada parent dapat merusak position: sticky pada child. */}
      <div ref={ref} className={`rise-in ${shown ? 'in' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          02. Rancang sendiri
        </p>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: '0.75rem', maxWidth: 820 }}>
          Konfigurator real-time.
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Tau harga</span> sebelum chat.
        </h2>
        <p style={{ color: 'var(--ink-soft)', maxWidth: 600, marginTop: '1rem', fontSize: '1rem', lineHeight: 1.55 }}>
          Geser, pilih, dan tambah. Perkiraan harga dan waktu kerja kami ikut berubah otomatis. Tidak ada kejutan ketika kamu menekan tombol WhatsApp.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '3rem auto 0',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}
        className="cfg-grid"
      >
          {/* ==== KIRI: panel opsi ==== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Step 1: Kategori */}
            <FieldCard step="01" title="Kategori layanan">
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(['web', 'chatbot', 'ai'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setState((s) => ({ ...s, category: c }))}
                    className={`tab-pill ${state.category === c ? 'active' : ''}`}
                  >
                    {c === 'web' ? 'Website' : c === 'chatbot' ? 'Chatbot' : 'AI Modelling'}
                  </button>
                ))}
              </div>
            </FieldCard>

            {/* Step 2: Jenis Proyek */}
            <FieldCard step="02" title="Jenis proyek">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {projectKeys.map((id) => {
                  const active = state.project === id
                  return (
                    <button
                      key={id}
                      onClick={() => setState((s) => ({ ...s, project: id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 0.9rem',
                        borderRadius: 12,
                        border: '1px solid',
                        borderColor: active ? 'var(--accent)' : 'var(--line)',
                        background: active ? 'var(--accent-soft)' : 'var(--bg)',
                        cursor: 'pointer',
                        color: 'var(--ink)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.93rem' }}>
                        {PROJECT_LABELS[state.category][id]}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', marginTop: 4 }}>
                        {formatIDR(BASE_PRICES[state.category][id])}
                      </div>
                    </button>
                  )
                })}
              </div>
            </FieldCard>

            {/* Step 3: Teknologi (hanya untuk web) */}
            {state.category === 'web' && (
              <FieldCard step="03" title="Teknologi">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {TECH_OPTIONS.map((t) => {
                    const active = state.tech === t.id
                    // Biaya teknologi dinamis berdasarkan harga dasar proyek
                    const dynamicTechCost = Math.round(basePrice * t.costPct)
                    return (
                      <button
                        key={t.id}
                        onClick={() => setState((s) => ({ ...s, tech: t.id }))}
                        style={{
                          textAlign: 'left',
                          padding: '0.85rem 1rem',
                          borderRadius: 12,
                          border: '1px solid',
                          borderColor: active ? 'var(--accent)' : 'var(--line)',
                          background: active ? 'var(--accent-soft)' : 'var(--bg)',
                          cursor: 'pointer',
                          color: 'var(--ink)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600 }}>{t.name}</span>
                          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ink-mute)' }}>
                            {t.costPct === 0 ? 'gratis' : `+ ${formatIDR(dynamicTechCost)}`}
                          </span>
                        </div>
                        <div style={{ marginTop: 4, fontSize: '0.83rem', color: 'var(--ink-soft)' }}>{t.desc}</div>
                      </button>
                    )
                  })}
                </div>
              </FieldCard>
            )}

            {/* Step 4: Halaman (hanya untuk web) */}
            {state.category === 'web' && (
              <FieldCard step="04" title="Jumlah halaman">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    className="step-btn"
                    onClick={() => setState((s) => ({ ...s, pages: Math.max(projectBasePages, s.pages - 1) }))}
                    aria-label="Kurangi halaman"
                  >
                    <IconMinus size={16} />
                  </button>
                  <div style={{ minWidth: 80, textAlign: 'center' }}>
                    <div className="font-display" style={{ fontSize: '2rem', fontWeight: 600 }}>
                      {state.pages}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--ink-mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      halaman
                    </div>
                  </div>
                  <button
                    className="step-btn"
                    onClick={() => setState((s) => ({ ...s, pages: Math.min(50, s.pages + 1) }))}
                    aria-label="Tambah halaman"
                  >
                    <IconPlus size={16} />
                  </button>
                  <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--ink-mute)' }}>
                    {extraPages > 0 ? `+ ${formatIDR(pagesCost)}` : `Termasuk ${projectBasePages} halaman dasar`}
                  </div>
                </div>
              </FieldCard>
            )}

            {/* Step 5: Tambahan (sesuai kategori aktif) */}
            <FieldCard step={state.category === 'web' ? '05' : '03'} title="Tambahan">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                {categoryAddons.map((a) => {
                  const on = state.addons.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.8rem 0.9rem',
                        borderRadius: 12,
                        border: '1px solid',
                        borderColor: on ? 'var(--accent)' : 'var(--line)',
                        background: on ? 'var(--accent-soft)' : 'var(--bg)',
                        cursor: 'pointer',
                        color: 'var(--ink)',
                        textAlign: 'left'
                      }}
                    >
                      <span className={`tg ${on ? 'on' : ''}`} aria-hidden />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.93rem' }}>{a.name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{a.desc}</div>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--ink-mute)' }}>
                        + {formatIDR(a.cost)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </FieldCard>

            {/* Step 6: Kecepatan */}
            <FieldCard step={state.category === 'web' ? '06' : '04'} title="Kecepatan pengerjaan">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem' }}>
                {SPEED_OPTIONS.map((s) => {
                  const active = state.speed === s.id
                  // Biaya kecepatan dihitung sebagai %tase dari harga
                  // dasar proyek aktif, jadi proporsional dengan tier.
                  const dynamicCost = Math.round(basePrice * s.costPct)
                  return (
                    <button
                      key={s.id}
                      onClick={() => setState((st) => ({ ...st, speed: s.id }))}
                      style={{
                        textAlign: 'left',
                        padding: '0.85rem 1rem',
                        borderRadius: 12,
                        border: '1px solid',
                        borderColor: active ? 'var(--accent)' : 'var(--line)',
                        background: active ? 'var(--accent-soft)' : 'var(--bg)',
                        cursor: 'pointer',
                        color: 'var(--ink)'
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: 3 }}>{s.desc}</div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', marginTop: 6 }}>
                        {s.costPct === 0 ? 'tanpa biaya tambahan' : `+ ${formatIDR(dynamicCost)}`}
                      </div>
                    </button>
                  )
                })}
              </div>
            </FieldCard>
          </div>

          {/* ==== KANAN: ringkasan sticky ====
              JANGAN tambahkan `position: relative` inline di sini.
              Inline style menang melawan CSS class biasa dan akan menimpa
              `position: sticky` yang dipasang lewat media query .cfg-summary. */}
          <aside
            style={{
              alignSelf: 'flex-start',
              borderRadius: 22,
              border: '1px solid var(--line)',
              background: 'var(--bg-card)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow)'
            }}
            className="cfg-summary"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <p className="font-mono" style={{ color: 'var(--ink-mute)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Ringkasan
              </p>
              <span className="chip" style={{ background: 'var(--accent)', color: '#fff', border: 'none' }}>
                Real-time
              </span>
            </div>

            <h3 className="h-display" style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.15, marginBottom: '1rem' }}>
              {PROJECT_LABELS[state.category][state.project]}
            </h3>

            <SummaryLine label="Harga dasar" value={formatIDR(basePrice)} />
            {state.category === 'web' && (
              <SummaryLine label={`Teknologi (${techLabel})`} value={techCost === 0 ? 'Termasuk' : `+ ${formatIDR(techCost)}`} />
            )}
            {state.category === 'web' && extraPages > 0 && (
              <SummaryLine label={`Halaman ekstra (${extraPages})`} value={`+ ${formatIDR(pagesCost)}`} />
            )}
            {state.addons.length > 0 && (
              <SummaryLine
                label={`Tambahan (${state.addons.length})`}
                value={`+ ${formatIDR(addonsCost)}`}
              />
            )}
            <SummaryLine label={`Kecepatan ${speed.name}`} value={speedCost === 0 ? 'Termasuk' : `+ ${formatIDR(speedCost)}`} />

            <div
              style={{
                marginTop: '1.2rem',
                paddingTop: '1.2rem',
                borderTop: '1px solid var(--line)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Total perkiraan
                </span>
                <span className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent)' }}>
                  {formatIDR(total)}
                </span>
              </div>
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 12,
                  background: 'var(--bg-soft)',
                  border: '1px dashed var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-mute)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Estimasi waktu
                </span>
                <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600 }}>
                  {days.min} - {days.max} hari
                </span>
              </div>
            </div>

            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ width: '100%', marginTop: '1.25rem' }}>
              <IconWhatsApp size={16} />
              Kirim ke WhatsApp
              <IconArrowRight size={14} />
            </a>

            <p style={{ fontSize: '0.75rem', color: 'var(--ink-mute)', marginTop: '0.75rem', textAlign: 'center' }}>
              Harga final akan dikonfirmasi setelah konsultasi singkat.
            </p>
          </aside>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .cfg-grid { grid-template-columns: 1.4fr 0.9fr !important; align-items: start !important; }
          .cfg-summary {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 110px !important;
            max-height: calc(100vh - 130px);
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  )
}

function FieldCard({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '1.4rem', borderRadius: 18, border: '1px solid var(--line)', background: 'var(--bg-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
        <span
          className="font-mono"
          style={{
            width: 32,
            height: 32,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          {step}
        </span>
        <h4 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 500 }}>
          {title}
        </h4>
      </div>
      {children}
    </div>
  )
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px dashed var(--line-soft)' }}>
      <span style={{ fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{label}</span>
      <span className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink)' }}>
        {value}
      </span>
    </div>
  )
}

// Bantu silence unused import warning ketika section ai
void IconCheck
