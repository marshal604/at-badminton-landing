import { useState } from 'react'
import './PlayersSection.css'

const teamColors = [
  { bg: 'rgba(0, 240, 255, 0.08)', border: 'rgba(0, 240, 255, 0.2)', accent: '#00f0ff' },
  { bg: 'rgba(255, 62, 108, 0.08)', border: 'rgba(255, 62, 108, 0.2)', accent: '#ff3e6c' },
  { bg: 'rgba(255, 227, 71, 0.08)', border: 'rgba(255, 227, 71, 0.2)', accent: '#ffe347' },
  { bg: 'rgba(120, 200, 80, 0.08)', border: 'rgba(120, 200, 80, 0.2)', accent: '#78c850' },
  { bg: 'rgba(200, 120, 255, 0.08)', border: 'rgba(200, 120, 255, 0.2)', accent: '#c878ff' },
  { bg: 'rgba(255, 160, 60, 0.08)', border: 'rgba(255, 160, 60, 0.2)', accent: '#ffa03c' },
  { bg: 'rgba(60, 180, 255, 0.08)', border: 'rgba(60, 180, 255, 0.2)', accent: '#3cb4ff' },
  { bg: 'rgba(255, 100, 150, 0.08)', border: 'rgba(255, 100, 150, 0.2)', accent: '#ff6496' },
]

function getInitials(name) {
  if (/^[a-zA-Z]/.test(name)) return name[0].toUpperCase()
  return name[0]
}

export default function PlayersSection({ data }) {
  const [filter, setFilter] = useState('all')
  const { teams } = data

  const mixedTeams = teams.filter(t => t.type === 'mixed')
  const mensTeams = teams.filter(t => t.type === 'mens')
  const filtered = filter === 'all' ? teams : filter === 'mixed' ? mixedTeams : mensTeams

  return (
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Players</span>
        <h2 className="section-title">球員介紹</h2>
        <p className="section-subtitle">{teams.length} 組隊伍熱血開戰</p>
      </div>

      <div className="player-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          全部 ({teams.length})
        </button>
        <button className={filter === 'mixed' ? 'active' : ''} onClick={() => setFilter('mixed')}>
          混雙 ({mixedTeams.length})
        </button>
        <button className={filter === 'mens' ? 'active' : ''} onClick={() => setFilter('mens')}>
          男雙 ({mensTeams.length})
        </button>
      </div>

      <div className="teams-grid">
        {filtered.map((team, i) => {
          const color = teamColors[team.id - 1] || teamColors[0]
          return (
            <div
              key={team.id}
              className="team-card"
              style={{
                '--team-bg': color.bg,
                '--team-border': color.border,
                '--team-accent': color.accent,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="team-type-badge">
                {team.typeLabel}
              </div>

              <div className="team-number">#{team.id}</div>

              <div className="team-players">
                {team.players.map((player, pi) => (
                  <div key={pi} className="player-card">
                    <div className="player-avatar">
                      {player.avatar ? (
                        <img src={player.avatar} alt={player.name} />
                      ) : (
                        <span>{getInitials(player.name)}</span>
                      )}
                    </div>
                    <span className="player-name">{player.name}</span>
                  </div>
                ))}
              </div>

              <div className="team-vs">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>

              {/* Decorative corner */}
              <div className="card-corner top-right" />
              <div className="card-corner bottom-left" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
