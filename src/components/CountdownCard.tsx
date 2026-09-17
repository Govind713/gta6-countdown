import type { ReactNode } from 'react'

interface CountdownCardProps {
  label: string
  value: number
  index: number
  icon: ReactNode
}

export function CountdownCard({ label, value, index, icon }: CountdownCardProps) {
  return (
    <article className={`countdown-card card-${index}`} aria-label={`${value} ${label}`}>
      <div className="card-topline">
        <span className="card-icon">{icon}</span>
        <span className="card-index">0{index + 1}</span>
      </div>
      <div className="card-value" key={value}>{String(value).padStart(2, '0')}</div>
      <div className="card-label">{label}</div>
      <div className="card-scanline" aria-hidden="true" />
    </article>
  )
}
