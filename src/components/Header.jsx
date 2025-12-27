import logo from '../assets/rwd.png'
import icon from '../assets/icon64.png'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <img src={logo} alt="Rimworld Workshop Downloader" className="header-image" />
          <div className="header-text">
            <div className="header-title-wrapper">
              <img src={icon} alt="" className="header-icon" />
              <h1 className="header-title">Rimworld Workshop Downloader</h1>
            </div>
            <p className="header-subtitle">Download and manage Rimworld mods from Steam Workshop</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

