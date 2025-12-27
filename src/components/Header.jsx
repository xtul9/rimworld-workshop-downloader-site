import logo from '../assets/rwd.png'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <img src={logo} alt="Rimworld Workshop Downloader" className="header-image" />
          <div className="header-text">
            <h1 className="header-title">Rimworld Workshop Downloader</h1>
            <p className="header-subtitle">Download and manage Rimworld mods from Steam Workshop</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

