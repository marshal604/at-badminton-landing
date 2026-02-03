import { Routes, Route, Navigate } from 'react-router-dom'
import TournamentPage from './pages/TournamentPage'

function App() {
  return (
    <Routes>
      <Route path="/:date" element={<TournamentPage />} />
      <Route path="/" element={<Navigate to="/2026-02-07" replace />} />
    </Routes>
  )
}

export default App
