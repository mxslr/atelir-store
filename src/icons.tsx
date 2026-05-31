/*
 * Semua ikon di sini digambar tangan sebagai inline SVG sederhana.
 * Tidak memakai lucide-react, heroicons, atau icon pack apa pun.
 * Stroke konsisten 1.6, sudut bulat lembut, ukuran default 22.
 */
import { CSSProperties } from 'react'

type IconProps = {
  size?: number
  stroke?: number
  className?: string
  style?: CSSProperties
}

const base = (size = 22): CSSProperties => ({
  width: size,
  height: size,
  display: 'inline-block',
  flexShrink: 0
})

export const IconLogo = ({ size = 28, className, style }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" style={{ ...base(size), ...style }} className={className}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 2 V30" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 16 H30" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="16" cy="16" r="5" fill="currentColor" />
  </svg>
)

export const IconMenu = ({ size = 22, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M4 7h16" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M4 17h10" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
)

export const IconClose = ({ size = 22, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M5 5l14 14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M19 5L5 19" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
)

export const IconPlus = ({ size = 18, stroke = 1.8, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M12 5v14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M5 12h14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
)

export const IconMinus = ({ size = 18, stroke = 1.8, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
)

export const IconChevronDown = ({ size = 22, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowRight = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowUpRight = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    <path d="M9 7h8v8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconCheck = ({ size = 18, stroke = 1.8, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconSun = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={stroke} />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
)

export const IconMoon = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
  </svg>
)

export const IconWhatsApp = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path
      d="M3.5 20.5l1.4-4.5A8 8 0 1 1 8 19.6l-4.5 1z"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="round"
    />
    <path
      d="M9 9.5c.3 1.2 1.1 2.6 2.2 3.6 1 1 2.4 1.9 3.6 2.2.4.1.9 0 1.2-.3l.5-.5c.3-.3.3-.7 0-1l-1.1-1.1a.7.7 0 0 0-1 0l-.4.4a6.4 6.4 0 0 1-2.4-2.4l.4-.4a.7.7 0 0 0 0-1L11 7.9a.7.7 0 0 0-1 0l-.5.5c-.3.3-.4.8-.5 1.1z"
      fill="currentColor"
    />
  </svg>
)

export const IconInstagram = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={stroke} />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={stroke} />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

export const IconMail = ({ size = 18, stroke = 1.6, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth={stroke} />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
  </svg>
)

export const IconDrag = ({ size = 18, stroke = 1.8, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path d="M9 6L5 12l4 6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 6l4 6-4 6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 4v16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

/* Geometric category marks. Bukan icon pack, bentuk geometris murni. */
export const MarkWeb = ({ size = 26, className, style }: IconProps) => (
  <svg viewBox="0 0 40 40" fill="none" style={{ ...base(size), ...style }} className={className}>
    <rect x="4" y="7" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 13H36" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="10" r="1" fill="currentColor" />
    <circle cx="11.5" cy="10" r="1" fill="currentColor" />
    <path d="M20 36V29" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14 36H26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const MarkChat = ({ size = 26, className, style }: IconProps) => (
  <svg viewBox="0 0 40 40" fill="none" style={{ ...base(size), ...style }} className={className}>
    <path
      d="M8 6h24a3 3 0 013 3v16a3 3 0 01-3 3H17l-7 6V28H8a3 3 0 01-3-3V9a3 3 0 013-3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="17" r="1.5" fill="currentColor" />
    <circle cx="20" cy="17" r="1.5" fill="currentColor" />
    <circle cx="26" cy="17" r="1.5" fill="currentColor" />
  </svg>
)

export const MarkAI = ({ size = 26, className, style }: IconProps) => (
  <svg viewBox="0 0 40 40" fill="none" style={{ ...base(size), ...style }} className={className}>
    <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="20" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="20" cy="34" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="34" cy="20" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M20 8v7M20 25v7M8 20h7M25 20h7" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

/* Tiny dot separator untuk marquee dan pemisah teks */
export const Dot = ({ size = 6, style }: IconProps) => (
  <span
    style={{
      ...style,
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'currentColor',
      opacity: 0.5
    }}
  />
)
