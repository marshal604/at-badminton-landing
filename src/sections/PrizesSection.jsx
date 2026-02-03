import './PrizesSection.css'

export default function PrizesSection({ data }) {
  const { prizes, bonuses } = data

  return (
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Prizes</span>
        <h2 className="section-title">比賽獎品</h2>
        <p className="section-subtitle">人人有獎，刮出百萬</p>
      </div>

      <div className="prizes-list">
        {prizes.map((p, i) => (
          <div
            key={i}
            className={`prize-card prize-rank-${i}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="prize-glow" />
            <div className="prize-icon">{p.icon}</div>
            <div className="prize-info">
              <span className="prize-rank">{p.rank}</span>
              <span className="prize-value">{p.prize}</span>
            </div>
            {i === 0 && <div className="champion-badge">CHAMPION</div>}
          </div>
        ))}
      </div>

      <div className="bonus-section">
        <div className="bonus-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          報名好康
        </div>
        <div className="bonus-cards">
          {bonuses.map((b, i) => (
            <div key={i} className="bonus-card">
              <span className="bonus-star">★</span>
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
