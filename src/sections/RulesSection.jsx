import './RulesSection.css'

export default function RulesSection({ data }) {
  const { rules, maxTeams, entryFee } = data

  const ruleCards = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: '隊伍上限',
      value: `${maxTeams} 隊`,
      desc: '額滿截止，不足則調整賽制',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: '預賽制度',
      value: `${rules.groupStage.points} 分制`,
      desc: `Deuce 上限 ${rules.groupStage.deuceMax} 分`,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: '決賽制度',
      value: `${rules.finals.points} 分制`,
      desc: '前四名晉級',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        </svg>
      ),
      title: '報名費',
      value: `$${entryFee}`,
      desc: '每人',
    },
  ]

  return (
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Rules</span>
        <h2 className="section-title">比賽辦法</h2>
        <p className="section-subtitle">公平競技，享受比賽</p>
      </div>

      <div className="rules-grid">
        {ruleCards.map((card, i) => (
          <div key={i} className="rule-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="rule-icon">{card.icon}</div>
            <h3 className="rule-title">{card.title}</h3>
            <div className="rule-value">{card.value}</div>
            <p className="rule-desc">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="rules-detail">
        <div className="detail-card">
          <h4>晉級規則</h4>
          <ul>
            <li>{rules.advancement}</li>
            <li>{rules.finalBracket}</li>
          </ul>
        </div>
        <div className="detail-card">
          <h4>對戰方式</h4>
          <ul>
            <li>8 隊單一組別循環對打</li>
            <li>5 組男雙 + 3 組混雙</li>
            <li>預賽共 11 輪，2 面場地同時進行</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
