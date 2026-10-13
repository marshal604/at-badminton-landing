import { useCallback, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  MATCH_MINUTES,
  START_MINUTES,
  WARMUP_MINUTES,
  computeRoundTimings,
  computeStandings,
  countGroupMatches,
  formatTime,
  getWinner,
  isGroupStageComplete,
  matchIndexOf,
  parseScore,
} from '../lib/schedule'
import './ScheduleSection.css'

function TypeBadge({ type }) {
  return (
    <span className={`team-badge ${type === 'mixed' ? 'mixed' : 'mens'}`}>
      {type === 'mixed' ? '混' : '男'}
    </span>
  )
}

// Remounted (via key) whenever the sheet value changes, so local state starts from it.
function ScoreInput({ matchIndex, currentScore, onChange }) {
  const [initial1, initial2] = parseScore(currentScore) ?? ['', '']
  const [score1, setScore1] = useState(initial1)
  const [score2, setScore2] = useState(initial2)

  const handleChange1 = (e) => {
    const v = e.target.value
    setScore1(v)
    onChange(matchIndex, v, score2)
  }

  const handleChange2 = (e) => {
    const v = e.target.value
    setScore2(v)
    onChange(matchIndex, score1, v)
  }

  return (
    <div className="score-input-group">
      <input
        type="number"
        min="0"
        max="30"
        className="score-input"
        aria-label="左方得分"
        value={score1}
        onChange={handleChange1}
        placeholder="0"
      />
      <span className="score-colon">:</span>
      <input
        type="number"
        min="0"
        max="30"
        className="score-input"
        aria-label="右方得分"
        value={score2}
        onChange={handleChange2}
        placeholder="0"
      />
    </div>
  )
}

function ScoreDisplay({ score }) {
  const parsed = parseScore(score)
  if (!parsed) return <span className="match-vs">VS</span>
  const winner = getWinner(score)
  return (
    <span className="score-display">
      <span className={winner === 'team1' ? 'score-winner' : 'score-loser'}>{parsed[0]}</span>
      <span className="score-separator">:</span>
      <span className={winner === 'team2' ? 'score-winner' : 'score-loser'}>{parsed[1]}</span>
    </span>
  )
}

function TeamName({ name, type, side, selected, result, onSelect }) {
  const badge = <TypeBadge type={type} />
  return (
    <span
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      className={`match-team ${side} team-clickable${selected ? ' team-selected' : ''} ${result ? `team-${result}` : ''}`}
      onClick={() => onSelect(name)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(name)
        }
      }}
    >
      {side === 'left' && badge}
      {name}
      {side === 'right' && badge}
    </span>
  )
}

function resultOf(winner, side) {
  if (!winner) return null
  return winner === side ? 'won' : 'lost'
}

export default function ScheduleSection({ data, scores, error, updateScore, pause, resume }) {
  const { schedule } = data
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const pendingEditsRef = useRef({})
  const [searchParams] = useSearchParams()
  const isAdmin = searchParams.get('admin') === 'true'

  const handleScoreChange = useCallback((matchIndex, score1, score2, extraData) => {
    pendingEditsRef.current[matchIndex] = { score1, score2, extraData }
  }, [])

  const handleStartEditing = () => {
    pendingEditsRef.current = {}
    setIsEditing(true)
    pause?.()
  }

  const handleStopEditing = async () => {
    setSaving(true)
    const edits = pendingEditsRef.current
    for (const [matchIndex, { score1, score2, extraData }] of Object.entries(edits)) {
      if (score1 === '' || score2 === '') continue
      await updateScore(Number(matchIndex), Number(score1), Number(score2), extraData || {})
    }
    pendingEditsRef.current = {}
    setSaving(false)
    setIsEditing(false)
    resume?.()
  }

  const handleTeamClick = (teamName) => {
    setSelectedTeam((prev) => (prev === teamName ? null : teamName))
  }

  const timedRounds = useMemo(() => computeRoundTimings(schedule.rounds), [schedule.rounds])
  const lastRound = timedRounds[timedRounds.length - 1]
  const groupMatchCount = countGroupMatches(schedule.rounds)
  const scoreList = scores ?? []

  const standings = useMemo(
    () => computeStandings(schedule.rounds, scores ?? []),
    [schedule.rounds, scores]
  )
  const groupStageComplete = isGroupStageComplete(schedule.rounds, scoreList)
  const top4 = standings.slice(0, 4)

  return (
    <div className="container">
      <div className="section-header">
        <span className="section-tag">Schedule</span>
        <h2 className="section-title">賽程</h2>
        <p className="section-subtitle">{schedule.format}・{schedule.courts} 面場地</p>
      </div>

      {/* Round-by-round matches */}
      <div className="schedule-phase">
        <div className="phase-header">
          <div className="phase-line" />
          <h3 className="phase-title">預賽對戰表</h3>
          <span className="phase-badge">15 分制</span>
          {isAdmin && (
            <button
              className={`admin-edit-btn ${isEditing ? 'editing' : ''}`}
              onClick={isEditing ? handleStopEditing : handleStartEditing}
              disabled={saving}
            >
              {saving ? '儲存中...' : isEditing ? '完成計分' : '編輯計分'}
            </button>
          )}
          <div className="phase-line" />
        </div>
        {isAdmin && error && <p className="admin-error" role="alert">同步失敗：{error}</p>}

        <div className="schedule-meta">
          <div className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>開始 {formatTime(START_MINUTES)}</span>
          </div>
          <div className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2 2 4-4" />
              <path d="M19 13l2 2-4 4" />
            </svg>
            <span>每場 {MATCH_MINUTES} 分鐘</span>
          </div>
          <div className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>首次上場熱身 {WARMUP_MINUTES} 分鐘</span>
          </div>
          <div className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span>預計 {lastRound.matchEnd} 結束預賽</span>
          </div>
        </div>

        <div className="rounds-list">
          {timedRounds.map((round, ri) => {
            const roundHasSelected = selectedTeam && round.matches.some(
              (m) => m.team1 === selectedTeam || m.team2 === selectedTeam
            )
            const roundDimmed = selectedTeam && !roundHasSelected

            return (
              <div key={round.round} className={`round-card${roundDimmed ? ' round-card--dimmed' : ''}`}>
                <div className="round-header">
                  <span className="round-number">R{round.round}</span>
                  <div className="round-time-info">
                    {round.hasWarmup && (
                      <span className="warmup-badge">
                        {round.warmupStart} 熱身
                      </span>
                    )}
                    <span className="time-badge">
                      {round.matchStart} 開始
                    </span>
                  </div>
                </div>
                {round.hasWarmup && (
                  <div className="warmup-note">
                    首次上場：{round.newTeams.join('、')}
                  </div>
                )}
                <div className="round-matches">
                  {round.matches.map((match, mi) => {
                    const score = scoreList[matchIndexOf(schedule.rounds, ri, mi)]?.score
                    const winner = getWinner(score)
                    const matchHasSelected = selectedTeam && (match.team1 === selectedTeam || match.team2 === selectedTeam)
                    const matchDimmed = selectedTeam && !matchHasSelected

                    return (
                      <div key={mi} className={`match-row ${parseScore(score) ? 'has-score' : ''}${matchHasSelected ? ' match-row--active' : ''}${matchDimmed ? ' match-row--dimmed' : ''}`}>
                        <span className="court-label">{match.court}</span>
                        <TeamName
                          name={match.team1}
                          type={match.team1Type}
                          side="left"
                          selected={selectedTeam === match.team1}
                          result={resultOf(winner, 'team1')}
                          onSelect={handleTeamClick}
                        />
                        <div className="match-score-area">
                          {isEditing ? (
                            <ScoreInput
                              key={score}
                              matchIndex={matchIndexOf(schedule.rounds, ri, mi)}
                              currentScore={score}
                              onChange={handleScoreChange}
                            />
                          ) : (
                            <ScoreDisplay score={score} />
                          )}
                        </div>
                        <TeamName
                          name={match.team2}
                          type={match.team2Type}
                          side="right"
                          selected={selectedTeam === match.team2}
                          result={resultOf(winner, 'team2')}
                          onSelect={handleTeamClick}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Standings */}
      {standings.length > 0 && (
        <div className="schedule-phase">
          <div className="phase-header">
            <div className="phase-line" />
            <h3 className="phase-title">預賽排名</h3>
            <span className="phase-badge">即時更新</span>
            <div className="phase-line" />
          </div>
          <div className="standings-table">
            <div className="standings-header">
              <span className="standings-rank">#</span>
              <span className="standings-name">隊伍</span>
              <span className="standings-stat">勝</span>
              <span className="standings-stat">負</span>
              <span className="standings-stat">得分</span>
              <span className="standings-stat">失分</span>
            </div>
            {standings.map((team, i) => (
              <div key={team.name} className={`standings-row ${i < 4 ? 'qualified' : ''}`}>
                <span className="standings-rank">{i + 1}</span>
                <span className="standings-name">{team.name}</span>
                <span className="standings-stat win">{team.wins}</span>
                <span className="standings-stat">{team.losses}</span>
                <span className="standings-stat">{team.pointsFor}</span>
                <span className="standings-stat">{team.pointsLost}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Finals */}
      <div className="schedule-phase">
        <div className="phase-header">
          <div className="phase-line" />
          <h3 className="phase-title">決賽階段</h3>
          <span className="phase-badge final">21 分制</span>
          <span className="time-badge">{schedule.finals.startTime} 開始</span>
          <div className="phase-line" />
        </div>

        <div className="finals-bracket">
          {schedule.finals.matches.map((match, mi) => {
            const finalMatchIndex = groupMatchCount + mi
            const finalTeam1 = top4[mi === 0 ? 0 : 2]?.name || match.team1
            const finalTeam2 = top4[mi === 0 ? 1 : 3]?.name || match.team2
            const score = scoreList[finalMatchIndex]?.score
            const winner = getWinner(score)

            return (
              <div key={mi} className={`final-match ${mi === 0 ? 'championship' : ''}`}>
                <div className="final-round">{match.round}</div>
                <div className="final-teams">
                  <div className={`final-team ${resultOf(winner, 'team1') ? `final-${resultOf(winner, 'team1')}` : ''}`}>
                    <span className="seed">{groupStageComplete ? finalTeam1 : match.team1}</span>
                  </div>
                  <div className="final-vs">
                    {isEditing ? (
                      <ScoreInput
                        key={score}
                        matchIndex={finalMatchIndex}
                        currentScore={score}
                        onChange={(idx, s1, s2) => handleScoreChange(idx, s1, s2, groupStageComplete ? { team1: finalTeam1, team2: finalTeam2 } : undefined)}
                      />
                    ) : parseScore(score) ? (
                      <ScoreDisplay score={score} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M6 8L2 12L6 16" />
                      </svg>
                    )}
                  </div>
                  <div className={`final-team ${resultOf(winner, 'team2') ? `final-${resultOf(winner, 'team2')}` : ''}`}>
                    <span className="seed">{groupStageComplete ? finalTeam2 : match.team2}</span>
                  </div>
                </div>
                <div className="final-points">{match.points} 分制</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline visual */}
      <div className="schedule-flow">
        <div className="flow-step">
          <div className="flow-dot active" />
          <span>預賽 {timedRounds.length} 輪</span>
        </div>
        <div className="flow-connector" />
        <div className="flow-step">
          <div className="flow-dot" />
          <span>勝場排序</span>
        </div>
        <div className="flow-connector" />
        <div className="flow-step">
          <div className="flow-dot" />
          <span>前四晉級</span>
        </div>
        <div className="flow-connector" />
        <div className="flow-step">
          <div className="flow-dot final" />
          <span>決賽</span>
        </div>
      </div>
    </div>
  )
}
