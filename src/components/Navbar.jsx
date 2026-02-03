import { useState, useEffect } from 'react'
import './Navbar.css'

const sections = [
  { id: 'hero', label: 'TOP' },
  { id: 'rules', label: '比賽辦法' },
  { id: 'prizes', label: '獎品' },
  { id: 'players', label: '球員' },
  { id: 'schedule', label: '賽程' },
  { id: 'more', label: '更多' },
]

export default function Navbar({ title }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id)
        return el ? { id: s.id, top: el.offsetTop - 120 } : null
      }).filter(Boolean)
      const current = offsets.reverse().find(o => window.scrollY >= o.top)
      if (current) setActiveSection(current.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo('hero')}>
          <span className="logo-icon">🏸</span>
          <span className="logo-text">{title}</span>
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {sections.slice(1).map(s => (
            <li key={s.id}>
              <button
                className={activeSection === s.id ? 'active' : ''}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
                {activeSection === s.id && <span className="active-dot" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
