import './Footer.css'

export default function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="footer-icon">🏸</span>
          <span className="footer-title">{data.title}</span>
        </div>
        <p className="footer-date">{data.date}</p>
        <div className="footer-divider" />
        <p className="footer-copy">
          AT Badminton Cup &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
