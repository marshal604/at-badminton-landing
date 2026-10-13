import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = fileURLToPath(new URL('.', import.meta.url))

/** Event ids are the date keys of `tournaments` (the file imports images, so it is read as text). */
function tournamentIds() {
  const src = readFileSync(resolve(root, 'src/data/tournaments.js'), 'utf8')
  return [...src.matchAll(/^\s{2}'(\d{4}-\d{2}-\d{2})':\s*\{/gm)].map((m) => m[1])
}

/**
 * GitHub Pages only knows real files, so /<event-id> used to be answered by 404.html (HTTP 404,
 * then a JS redirect). Writing dist/<event-id>/index.html makes every event URL a real 200 page.
 */
function eventPages() {
  return {
    name: 'event-pages',
    apply: 'build',
    closeBundle() {
      const dist = resolve(root, 'dist')
      for (const id of tournamentIds()) {
        mkdirSync(resolve(dist, id), { recursive: true })
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, id, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eventPages()],
  base: '/at-badminton-landing/',
})
