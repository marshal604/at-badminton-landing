import { useEffect, useState } from 'react'
import './HeroSection.css'

export default function HeroSection({ data }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToRules = () => {
    document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* Radial gradient bg */}
      <div className="hero-glow" />
      <div className="hero-glow-secondary" />

      {/* Animated court lines */}
      <svg className="court-lines" viewBox="0 0 1200 600" fill="none" aria-hidden="true">
        <rect x="100" y="50" width="1000" height="500" stroke="rgba(0,240,255,0.08)" strokeWidth="2" />
        <line x1="600" y1="50" x2="600" y2="550" stroke="rgba(0,240,255,0.06)" strokeWidth="2" />
        <line x1="100" y1="300" x2="1100" y2="300" stroke="rgba(0,240,255,0.04)" strokeWidth="1" strokeDasharray="8 4" />
        <rect x="250" y="130" width="700" height="340" stroke="rgba(0,240,255,0.05)" strokeWidth="1" />
      </svg>

      <div className={`hero-content ${loaded ? 'visible' : ''}`}>
        <div className="hero-badge">
          <span className="badge-ping" />
          <span>第二屆</span>
        </div>

        <h1 className="hero-title">
          <span className="title-line title-at">AT</span>
          <span className="title-line title-main">羽球盃</span>
        </h1>

        <div className="hero-date">
          <div className="date-line" />
          <span>{data.date}</span>
          <div className="date-line" />
        </div>

        <p className="hero-desc">
          {data.maxTeams} 隊上限 ・ 報名費 {data.entryFee} 元 / 人
        </p>

        <div className="hero-bonuses">
          {data.bonuses.map((b, i) => (
            <span key={i} className="bonus-tag">{b}</span>
          ))}
        </div>

        <button className="hero-cta" onClick={scrollToRules}>
          <span>查看比賽資訊</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </button>
      </div>

      {/* Decorative shuttlecock */}
      <div className="hero-shuttle" aria-hidden="true">
        <svg width="120" height="160" viewBox="0 0 120 160">
          <defs>
            <linearGradient id="shuttle-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="130" rx="22" ry="28" fill="url(#shuttle-grad)" />
          <path d="M60 100 L35 10 L60 50 L85 10 Z" fill="url(#shuttle-grad)" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
