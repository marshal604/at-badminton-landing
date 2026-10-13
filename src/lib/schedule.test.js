import { describe, expect, it } from 'vitest'
import { tournaments } from '../data/tournaments'
import {
  computeRoundTimings,
  computeStandings,
  countGroupMatches,
  formatTime,
  getWinner,
  isGroupStageComplete,
  matchIndexOf,
  parseScore,
} from './schedule'

const { rounds } = tournaments['2026-02-07'].schedule

const round = (...pairs) => ({ matches: pairs.map(([team1, team2]) => ({ team1, team2 })) })
const scores = (...list) => list.map((score) => ({ score }))

describe('parseScore', () => {
  it('parses "a:b"', () => expect(parseScore('15:10')).toEqual([15, 10]))
  it('treats empty, malformed and 0:0 as unplayed', () => {
    expect(parseScore('')).toBeNull()
    expect(parseScore(undefined)).toBeNull()
    expect(parseScore('abc')).toBeNull()
    expect(parseScore('0:0')).toBeNull()
  })
})

describe('getWinner', () => {
  it('returns the side with more points', () => {
    expect(getWinner('15:10')).toBe('team1')
    expect(getWinner('14:16')).toBe('team2')
  })
  it('returns null for ties and unplayed matches', () => {
    expect(getWinner('10:10')).toBeNull()
    expect(getWinner('0:0')).toBeNull()
  })
})

describe('formatTime', () => {
  it('pads hours and minutes', () => expect(formatTime(9 * 60 + 5)).toBe('09:05'))
})

describe('computeRoundTimings', () => {
  it('adds a warm-up only when a team plays for the first time', () => {
    const timed = computeRoundTimings([round(['A', 'B']), round(['A', 'B']), round(['A', 'C'])], 600)
    expect(timed.map((r) => [r.warmupStart, r.matchStart, r.matchEnd])).toEqual([
      ['10:00', '10:05', '10:13'],
      [null, '10:13', '10:21'],
      ['10:21', '10:26', '10:34'],
    ])
    expect(timed[2].newTeams).toEqual(['C'])
  })

  it('ends the 2026-02-07 group stage at 11:30', () => {
    expect(computeRoundTimings(rounds).at(-1).matchEnd).toBe('11:30')
  })
})

describe('matchIndexOf', () => {
  it('numbers matches in schedule order', () => {
    const rs = [round(['A', 'B'], ['C', 'D']), round(['A', 'C'])]
    expect(matchIndexOf(rs, 1, 0)).toBe(2)
    expect(countGroupMatches(rounds)).toBe(20)
  })
})

describe('computeStandings', () => {
  const rs = [round(['A', 'B'], ['C', 'D']), round(['A', 'C'], ['B', 'D'])]

  it('ranks by wins, then fewest points lost', () => {
    const table = computeStandings(rs, scores('15:10', '15:3', '15:13', '15:12'))
    expect(table.map((t) => t.name)).toEqual(['A', 'C', 'B', 'D']) // C and B both 1 win; C lost fewer
    expect(table[0]).toMatchObject({ wins: 2, losses: 0, pointsFor: 30, pointsLost: 23, played: 2 })
  })

  it('breaks a wins tie by points lost', () => {
    const table = computeStandings(rs, scores('15:13', '15:5'))
    expect(table.map((t) => t.name)).toEqual(['C', 'A', 'B', 'D'])
  })

  it('ignores unplayed (0:0) matches', () => {
    const table = computeStandings(rs, scores('0:0', '15:10'))
    expect(table.find((t) => t.name === 'A').played).toBe(0)
  })
})

describe('isGroupStageComplete', () => {
  const rs = [round(['A', 'B'], ['C', 'D'])]
  it('requires every group match to have a real score', () => {
    expect(isGroupStageComplete(rs, scores('15:10'))).toBe(false)
    expect(isGroupStageComplete(rs, scores('15:10', '0:0'))).toBe(false)
    expect(isGroupStageComplete(rs, scores('15:10', '15:12', '21:19'))).toBe(true)
  })
})
