# AT Badminton Cup

Promo and live-scoring site for **2026 AT 羽球盃**, our badminton club's in-house doubles tournament (8 teams, 2 courts, round robin plus finals).

**Live:** https://marshal604.github.io/at-badminton-landing/ · Event page: [/2026-02-07](https://marshal604.github.io/at-badminton-landing/2026-02-07)

![Event page scroll-through](docs/media/event-page.gif)

<sub>Player photos are blurred in this recording. [MP4 version](docs/media/event-page.mp4)</sub>

## Features

- Event page: hero, rules, prizes, player cards (filter by mixed / men's doubles), schedule, more info
- Schedule with computed start times (5-minute warm-up before a team's first round, 8 minutes per round)
- Tap a team to highlight all of its matches
- Live scores and standings pulled from a Google Sheet every 10 seconds
- Standings ranked by wins, then fewest points conceded; the top four fill the finals bracket once every group match has a score
- Admin scoring mode with batch save
- Home page listing upcoming and past tournaments
- Optional background music

## Tech

React 19, React Router 7, Vite 7, plain CSS. Vitest covers the scheduling and ranking logic. GitHub Actions deploys `main` to GitHub Pages.

## Run locally

```bash
npm ci
npm run dev       # http://localhost:5173/at-badminton-landing/
npm test          # unit tests (src/lib/schedule.test.js)
npm run lint
npm run build     # outputs to dist/
```

## How scoring and Sheet sync work

- Tournament content lives in [`src/data/tournaments.js`](src/data/tournaments.js), keyed by date. Each key becomes a route like `/2026-02-07`.
- `sheetScriptUrl` points to a Google Apps Script web app bound to the score sheet ([`apps-script/Code.gs`](apps-script/Code.gs)):
  - `GET` returns the 20 group matches and 2 finals as `{ scores: [{ score: "15:10", ... }] }`. Match index = order in the schedule, finals last.
  - `POST { matchIndex, score, team1?, team2? }` writes one score. For finals, it also writes the team names.
- [`useSheetScores`](src/hooks/useSheetScores.js) polls the sheet. The UI updates optimistically on save, and polling pauses while you edit.
- Open the event page with `?admin=true` to show **編輯計分**. Enter scores, then press **完成計分** to send every changed row. Sync errors appear under the header.
- An empty score or `0:0` counts as not played.
- GitHub Pages SPA routing uses the `public/404.html` redirect trick, so deep links work.

> **Security note:** `?admin=true` only toggles the UI. Anyone with the Apps Script URL can call `POST`, and that URL ships in the public bundle. Archive the Apps Script deployment after the event, or add a shared-secret check before reusing it.

## Credits

- [@jackyjieliu](https://github.com/jackyjieliu): Google Sheet score sync, admin scoring, standings and dynamic finals (PR #2)
- [@marshal604](https://github.com/marshal604): design and development
