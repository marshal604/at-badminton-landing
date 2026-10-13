export const WARMUP_MINUTES = 5
export const MATCH_MINUTES = 8
export const START_MINUTES = 10 * 60 // 10:00

// "15:10" -> [15, 10]. Empty, malformed and "0:0" (the sheet's placeholder) mean "not played".
export function parseScore(score) {
  if (!score) return null
  const [s1, s2] = String(score).split(':').map(Number)
  if (Number.isNaN(s1) || Number.isNaN(s2)) return null
  if (s1 === 0 && s2 === 0) return null
  return [s1, s2]
}

export function getWinner(score) {
  const parsed = parseScore(score)
  if (!parsed) return null
  const [s1, s2] = parsed
  if (s1 > s2) return 'team1'
  if (s2 > s1) return 'team2'
  return null
}

export function formatTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// Match index used by the Google Sheet: group matches in schedule order, then finals.
export function matchIndexOf(rounds, roundIndex, matchIndex) {
  return rounds.slice(0, roundIndex).reduce((n, r) => n + r.matches.length, 0) + matchIndex
}

export function countGroupMatches(rounds) {
  return rounds.reduce((n, r) => n + r.matches.length, 0)
}

// Adds a warm-up slot before any round in which a team plays for the first time.
export function computeRoundTimings(rounds, startMinutes = START_MINUTES) {
  const seenTeams = new Set()
  let clock = startMinutes

  return rounds.map((round) => {
    const roundTeams = round.matches.flatMap((m) => [m.team1, m.team2])
    const newTeams = roundTeams.filter((t) => !seenTeams.has(t))
    roundTeams.forEach((t) => seenTeams.add(t))

    const hasWarmup = newTeams.length > 0
    const warmupStart = hasWarmup ? formatTime(clock) : null
    if (hasWarmup) clock += WARMUP_MINUTES

    const matchStart = formatTime(clock)
    clock += MATCH_MINUTES

    return { ...round, hasWarmup, warmupStart, matchStart, matchEnd: formatTime(clock), newTeams }
  })
}

// Ranking: most wins first, then fewest points conceded (tournament rule).
export function computeStandings(rounds, scores = []) {
  const stats = new Map()
  const team = (name) => {
    if (!stats.has(name)) {
      stats.set(name, { name, wins: 0, losses: 0, pointsFor: 0, pointsLost: 0, played: 0 })
    }
    return stats.get(name)
  }

  rounds.forEach((round, ri) => {
    round.matches.forEach((match, mi) => {
      const t1 = team(match.team1)
      const t2 = team(match.team2)
      const parsed = parseScore(scores[matchIndexOf(rounds, ri, mi)]?.score)
      if (!parsed) return

      const [s1, s2] = parsed
      t1.played++
      t2.played++
      t1.pointsFor += s1
      t1.pointsLost += s2
      t2.pointsFor += s2
      t2.pointsLost += s1
      if (s1 > s2) { t1.wins++; t2.losses++ }
      if (s2 > s1) { t2.wins++; t1.losses++ }
    })
  })

  return [...stats.values()].sort((a, b) => b.wins - a.wins || a.pointsLost - b.pointsLost)
}

export function isGroupStageComplete(rounds, scores = []) {
  const total = countGroupMatches(rounds)
  return Array.from({ length: total }, (_, i) => parseScore(scores[i]?.score)).every(Boolean)
}
