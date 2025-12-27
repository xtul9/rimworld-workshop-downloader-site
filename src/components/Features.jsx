function Features() {
  const features = [
    {
      title: 'No Steam Client Required',
      description: 'Download and update Rimworld mods directly from Steam Workshop using bundled SteamCMD. No need to install the Steam desktop client.'
    },
    {
      title: 'Cross-Platform',
      description: 'Native desktop application for Linux, Windows, and macOS. Built with Tauri for optimal performance and native look.'
    },
    {
      title: 'Smart Mod Detection',
      description: 'Automatically detect outdated mods in your Rimworld mods folder. Query your entire collection and see which mods need updates.'
    },
    {
      title: 'Parallel Downloads',
      description: 'Download up to 4 mods simultaneously using parallel SteamCMD instances with intelligent size-based load balancing for maximum speed.'
    },
    {
      title: 'Comprehensive Mod Management',
      description: 'View all installed mods, search and sort them, force updates, ignore specific updates (with undo), and manage your mod collection with ease.'
    },
    {
      title: 'Backup & Restore',
      description: 'Toggleable automatic backups before updating mods. Restore individual mods or entire collections from backups with a single click.'
    },
    {
      title: 'Real-Time Progress',
      description: 'Track download and update progress in real-time with file system watching. See exactly which mods are being downloaded and installed.'
    },
    {
      title: 'Dark & Light Mode',
      description: 'Automatic system theme detection with manual override. Choose between dark and light mode to match your preference or system settings.'
    },
    {
      title: 'Open Source',
      description: 'Free and open source under MIT license. Contribute, fork, and customize to your needs. Community-driven development.'
    }
  ]

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="early-development-notice">
          <p className="early-development-text">
            <strong>⚠️ Early Development:</strong> This application is in early development phase and bugs may occur. 
            Contributions and bug reports are welcome!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features

