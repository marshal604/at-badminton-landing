import { useState, useRef, useEffect } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef(null)

  // Placeholder tracks - replace with actual URLs
  const tracks = [
    { name: 'Tournament Hype', url: '' },
  ]

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`music-player ${showPlayer ? 'expanded' : ''}`}>
      <button
        className="music-toggle"
        onClick={() => setShowPlayer(!showPlayer)}
        aria-label="Toggle music player"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        {isPlaying && (
          <span className="eq-bars">
            <span /><span /><span />
          </span>
        )}
      </button>
      {showPlayer && (
        <div className="music-controls">
          <span className="track-name">{tracks[currentTrack].name}</span>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          <span className="music-hint">即將上線</span>
        </div>
      )}
      <audio ref={audioRef} src={tracks[currentTrack].url} loop />
    </div>
  )
}
