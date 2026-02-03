import './ShuttlecockBg.css'

export default function ShuttlecockBg() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: 10 + Math.random() * 16,
    opacity: 0.03 + Math.random() * 0.06,
  }))

  return (
    <div className="shuttlecock-bg" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="shuttle-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="18" rx="4" ry="5" />
            <path d="M12 13 L8 2 L12 6 L16 2 Z" />
          </svg>
        </div>
      ))}
      <div className="grid-overlay" />
    </div>
  )
}
