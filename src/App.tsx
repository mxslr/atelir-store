import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Configurator, { ConfiguratorState } from './components/Configurator'
import Packages from './components/Packages'
import Portfolio from './components/Portfolio'
import Flow from './components/Flow'
import Why from './components/Why'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { useTheme } from './hooks'

export default function App() {
  const { theme, toggle } = useTheme()

  /* State konfigurator dihoist ke sini supaya kartu di Services dapat
     menset kategori plus jenis proyek aktif lalu scroll ke konfigurator. */
  const [cfg, setCfg] = useState<ConfiguratorState>({
    category: 'web',
    project: 'company_profile',
    tech: 'laravel',
    pages: 5,
    addons: [],
    speed: 'normal'
  })

  const handlePick = (cat: 'web' | 'chatbot' | 'ai', projectId: string) => {
    setCfg((s) => ({ ...s, category: cat, project: projectId }))
    // Beri waktu rerender sebelum scroll
    requestAnimationFrame(() => {
      const el = document.getElementById('konfigurator')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="noise-overlay" />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main style={{ position: 'relative' }}>
        <Hero />
        <Marquee />
        <Services onPick={handlePick} />
        <Configurator state={cfg} setState={setCfg} />
        <Packages />
        <Portfolio />
        <Flow />
        <Why />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
