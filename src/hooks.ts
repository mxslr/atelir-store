import { useEffect, useRef, useState } from 'react'

/* =========================================================================
   HELPERS PARALLAX
   ========================================================================= */
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

// Pemetaan segmen [a..b] dari progress global ke 0..1, di-clamp dan di-ease.
export const segment = (p: number, a: number, b: number) =>
  easeInOut(clamp((p - a) / (b - a), 0, 1))

/* =========================================================================
   useIsMobile. Mengikuti matchMedia(max-width: 767px)
   ========================================================================= */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

/* =========================================================================
   useScrollProgress. Mengikat progress 0..1 ke sebuah container yang
   panjangnya melebihi viewport. Mendukung sticky scene di dalamnya.
   ========================================================================= */
export function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        if (total <= 0) return setProgress(0)
        const scrolled = -rect.top
        setProgress(clamp(scrolled / total, 0, 1))
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
  }, [ref])
  return progress
}

/* =========================================================================
   useMouseParallax. Loop rAF dengan lerp halus, kembalikan offset {x,y}
   yang dapat dikalikan magnitude tiap layer.
   ========================================================================= */
export function useMouseParallax(speed = 0.07, disabled = false) {
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (disabled) {
      setOffset({ x: 0, y: 0 })
      return
    }
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      target.current = { x: -nx, y: -ny }
    }
    const loop = () => {
      current.current.x = lerp(current.current.x, target.current.x, speed)
      current.current.y = lerp(current.current.y, target.current.y, speed)
      setOffset({ x: current.current.x, y: current.current.y })
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [speed, disabled])

  return offset
}

/* =========================================================================
   useReveal. IntersectionObserver untuk reveal "in" class.
   ========================================================================= */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, shown }
}

/* =========================================================================
   useTheme. Selalu light saat kunjungan pertama (mengabaikan preferensi OS),
   tapi tetap menghormati pilihan manual user yang tersimpan di localStorage.
   ========================================================================= */
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) return saved
    } catch {}
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  return {
    theme,
    toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }
}
