import './MoreInfoSection.css'

export default function MoreInfoSection({ data }) {
  const { moreInfo } = data
  const hasPastContent = moreInfo.pastEvents.length > 0 || moreInfo.videos.length > 0 || moreInfo.links.length > 0

  return (
    <div className="container">
      <div className="section-header">
        <span className="section-tag">More</span>
        <h2 className="section-title">更多資訊</h2>
        <p className="section-subtitle">過往比賽與精彩回顧</p>
      </div>

      {!hasPastContent ? (
        <div className="more-empty">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h3>這是第二屆！</h3>
          <p>本屆比賽結束後，精彩片段和回顧影片將在此更新</p>

          <div className="coming-soon-cards">
            <div className="cs-card">
              <div className="cs-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span>比賽影片</span>
              <span className="cs-status">即將上線</span>
            </div>
            <div className="cs-card">
              <div className="cs-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </div>
              <span>直播連結</span>
              <span className="cs-status">即將上線</span>
            </div>
            <div className="cs-card">
              <div className="cs-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <span>精彩照片</span>
              <span className="cs-status">即將上線</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="more-content">
          {moreInfo.videos.length > 0 && (
            <div className="video-grid">
              {moreInfo.videos.map((video, i) => (
                <div key={i} className="video-embed">
                  <iframe
                    src={video.url}
                    title={video.title || `Video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}

          {moreInfo.links.length > 0 && (
            <div className="links-list">
              {moreInfo.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="info-link">
                  <span>{link.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {moreInfo.pastEvents.length > 0 && (
            <div className="past-events">
              <h3>過往比賽</h3>
              <div className="past-grid">
                {moreInfo.pastEvents.map((event, i) => (
                  <a key={i} href={event.url} className="past-card">
                    <span className="past-date">{event.date}</span>
                    <span className="past-title">{event.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
